import { n as __exportAll } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as buildSystemPrompt } from "./prompt-BZG73IfD.mjs";
import { t as applyContextWindow } from "./memory-CkcAkHNh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gateway.server-DwpX14po.js
var gateway_server_DwpX14po_exports = /* @__PURE__ */ __exportAll({
	a: () => gateway_server_exports,
	i: () => gatewayTranscribe,
	n: () => gatewaySpeech,
	r: () => gatewayStream,
	t: () => checkRateLimit
});
function num(value, fallback) {
	const parsed = value === void 0 ? NaN : Number(value);
	return Number.isFinite(parsed) ? parsed : fallback;
}
function readAIConfig() {
	const provider = (process.env["AI_PROVIDER"] ?? "openai").trim().toLowerCase();
	return {
		provider,
		fallbackProviders: (process.env["AI_FALLBACK_PROVIDERS"] ?? "openrouter,gemini,claude,lovable").split(",").map((p) => p.trim().toLowerCase()).filter((p) => p && p !== provider),
		model: process.env["MODEL_NAME"]?.trim() || void 0,
		temperature: num(process.env["TEMPERATURE"], .4),
		maxTokens: num(process.env["MAX_TOKENS"], 4096),
		timeoutMs: num(process.env["AI_TIMEOUT_MS"], 12e4),
		maxRetries: num(process.env["AI_MAX_RETRIES"], 2),
		contextWindowMessages: num(process.env["AI_CONTEXT_MESSAGES"], 24),
		cacheTtlMs: num(process.env["AI_CACHE_TTL_MS"], 6e4)
	};
}
/** Default model per provider when MODEL_NAME is not set. */
var DEFAULT_MODELS = {
	openai: "gpt-4o",
	openrouter: "openai/gpt-4o",
	gemini: "gemini-2.5-pro",
	claude: "claude-sonnet-4-20250514",
	deepseek: "deepseek-chat",
	mistral: "mistral-large-latest",
	groq: "llama-3.3-70b-versatile",
	lovable: "google/gemini-2.5-pro"
};
var AICapabilityError = class extends Error {
	constructor(provider, capability) {
		super(`O provedor "${provider}" não suporta "${capability}".`);
		this.name = "AICapabilityError";
	}
};
var AIProviderError = class extends Error {
	status;
	retryable;
	provider;
	constructor(provider, status, message) {
		super(message);
		this.name = "AIProviderError";
		this.provider = provider;
		this.status = status;
		this.retryable = status === 408 || status === 409 || status === 429 || status >= 500;
	}
};
/**
* Shared implementation for every OpenAI-compatible provider
* (OpenAI, OpenRouter, Gemini's OpenAI endpoint, DeepSeek, Mistral, Groq, ...).
*
* A new provider of this family = ~15 lines (see ./openai/index.ts).
*/
function toProviderContent(content) {
	if (typeof content === "string") return content;
	return content.map((part) => {
		if (part.type === "text") return {
			type: "text",
			text: part.text
		};
		if (part.type === "image") return {
			type: "image_url",
			image_url: { url: part.dataUrl }
		};
		return {
			type: "file",
			file: {
				filename: part.filename,
				file_data: part.dataUrl
			}
		};
	});
}
var OpenAICompatibleProvider = class {
	id;
	label;
	opts;
	constructor(opts) {
		this.opts = opts;
		this.id = opts.id;
		this.label = opts.label;
	}
	isConfigured() {
		return Boolean(process.env[this.opts.apiKeyEnv]);
	}
	capabilities() {
		return this.opts.capabilities;
	}
	apiKey() {
		const key = process.env[this.opts.apiKeyEnv];
		if (!key) throw new AIProviderError(this.id, 401, `${this.opts.apiKeyEnv} não configurada.`);
		return key;
	}
	headers(extra) {
		const auth = this.opts.authHeader ?? "Authorization";
		return {
			"Content-Type": "application/json",
			[auth]: auth === "Authorization" ? `Bearer ${this.apiKey()}` : this.apiKey(),
			...this.opts.headers ?? {},
			...extra ?? {}
		};
	}
	buildBody(req, stream) {
		const model = req.model ?? this.opts.defaultModel;
		const body = {
			model,
			stream,
			messages: req.messages.map((m) => {
				const base = {
					role: m.role,
					content: toProviderContent(m.content)
				};
				if (m.toolCallId) base["tool_call_id"] = m.toolCallId;
				if (m.name) base["name"] = m.name;
				if (m.toolCalls?.length) base["tool_calls"] = m.toolCalls.map((t) => ({
					id: t.id,
					type: "function",
					function: {
						name: t.name,
						arguments: t.arguments
					}
				}));
				return base;
			})
		};
		if (typeof req.temperature === "number" && !/^gpt-5/.test(model)) body["temperature"] = req.temperature;
		if (req.maxTokens) body[/^(gpt-5|o[1-4])/.test(model) ? "max_completion_tokens" : "max_tokens"] = req.maxTokens;
		if (req.tools?.length) {
			body["tools"] = req.tools.map((t) => ({
				type: "function",
				function: {
					name: t.name,
					description: t.description,
					parameters: t.parameters
				}
			}));
			body["tool_choice"] = typeof req.toolChoice === "object" ? {
				type: "function",
				function: { name: req.toolChoice.name }
			} : req.toolChoice ?? "auto";
		}
		if (req.jsonSchema) body["response_format"] = {
			type: "json_schema",
			json_schema: {
				name: req.jsonSchema.name,
				schema: req.jsonSchema.schema,
				strict: true
			}
		};
		else if (req.json) body["response_format"] = { type: "json_object" };
		if (stream) body["stream_options"] = { include_usage: true };
		return body;
	}
	async post(path, body, signal) {
		const res = await fetch(`${this.opts.baseUrl}${path}`, {
			method: "POST",
			headers: this.headers(),
			body: JSON.stringify(body),
			signal: signal ?? null
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new AIProviderError(this.id, res.status, text.slice(0, 400) || res.statusText);
		}
		return res;
	}
	async chat(req) {
		const started = Date.now();
		const json = await (await this.post("/chat/completions", this.buildBody(req, false), req.signal)).json();
		const choice = json.choices?.[0];
		return {
			content: choice?.message?.content ?? "",
			toolCalls: choice?.message?.tool_calls?.map((t) => ({
				id: t.id,
				name: t.function.name,
				arguments: t.function.arguments
			})),
			finishReason: choice?.finish_reason,
			model: json.model ?? req.model ?? this.opts.defaultModel,
			provider: this.id,
			usage: json.usage ? {
				promptTokens: json.usage.prompt_tokens ?? 0,
				completionTokens: json.usage.completion_tokens ?? 0,
				totalTokens: json.usage.total_tokens ?? 0
			} : void 0,
			latencyMs: Date.now() - started
		};
	}
	async *stream(req) {
		const started = Date.now();
		const res = await this.post("/chat/completions", this.buildBody(req, true), req.signal);
		if (!res.body) throw new AIProviderError(this.id, 500, "Stream vazio.");
		const reader = res.body.getReader();
		const decoder = new TextDecoder();
		let buffer = "";
		let full = "";
		let model = req.model ?? this.opts.defaultModel;
		let usage;
		let finishReason;
		const toolAcc = /* @__PURE__ */ new Map();
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			buffer += decoder.decode(value, { stream: true });
			const lines = buffer.split("\n");
			buffer = lines.pop() ?? "";
			for (const raw of lines) {
				const line = raw.trim();
				if (!line.startsWith("data:")) continue;
				const payload = line.slice(5).trim();
				if (payload === "[DONE]") continue;
				let parsed;
				try {
					parsed = JSON.parse(payload);
				} catch {
					continue;
				}
				if (parsed.model) model = parsed.model;
				if (parsed.usage) usage = {
					promptTokens: parsed.usage.prompt_tokens ?? 0,
					completionTokens: parsed.usage.completion_tokens ?? 0,
					totalTokens: parsed.usage.total_tokens ?? 0
				};
				const choice = parsed.choices?.[0];
				if (choice?.finish_reason) finishReason = choice.finish_reason;
				const text = choice?.delta?.content;
				if (text) {
					full += text;
					yield {
						type: "delta",
						text
					};
				}
				for (const tc of choice?.delta?.tool_calls ?? []) {
					const cur = toolAcc.get(tc.index) ?? {
						id: tc.id ?? `tool_${tc.index}`,
						name: "",
						arguments: ""
					};
					if (tc.id) cur.id = tc.id;
					if (tc.function?.name) cur.name += tc.function.name;
					if (tc.function?.arguments) cur.arguments += tc.function.arguments;
					toolAcc.set(tc.index, cur);
				}
			}
		}
		for (const tool of toolAcc.values()) yield {
			type: "tool_call",
			toolCall: tool
		};
		yield {
			type: "done",
			response: {
				content: full,
				toolCalls: toolAcc.size ? Array.from(toolAcc.values()) : void 0,
				finishReason,
				model,
				provider: this.id,
				usage,
				latencyMs: Date.now() - started
			}
		};
	}
	/** Vision / PDF / OCR share the chat endpoint with multimodal content parts. */
	vision(req) {
		if (!this.capabilities().includes("vision")) throw new AICapabilityError(this.id, "vision");
		return this.chat(req);
	}
	async audio(req) {
		if (!this.capabilities().includes("audio")) throw new AICapabilityError(this.id, "audio");
		const form = new FormData();
		form.append("file", new Blob([req.data], { type: req.mimeType }), req.filename);
		form.append("model", req.model ?? this.opts.transcriptionModel ?? "whisper-1");
		if (req.language) form.append("language", req.language);
		const auth = this.opts.authHeader ?? "Authorization";
		const res = await fetch(`${this.opts.baseUrl}/audio/transcriptions`, {
			method: "POST",
			headers: {
				[auth]: auth === "Authorization" ? `Bearer ${this.apiKey()}` : this.apiKey(),
				...this.opts.headers ?? {}
			},
			body: form
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new AIProviderError(this.id, res.status, text.slice(0, 300) || res.statusText);
		}
		return { text: (await res.json()).text ?? "" };
	}
	async speech(req) {
		if (!this.capabilities().includes("speech")) throw new AICapabilityError(this.id, "speech");
		return {
			audio: await (await this.post("/audio/speech", {
				model: req.model ?? this.opts.speechModel ?? "gpt-4o-mini-tts",
				voice: req.voice ?? "alloy",
				input: req.text,
				response_format: req.format ?? "mp3"
			})).arrayBuffer(),
			mimeType: `audio/${req.format ?? "mp3"}`
		};
	}
	async embeddings(req) {
		if (!this.capabilities().includes("embeddings")) throw new AICapabilityError(this.id, "embeddings");
		const model = req.model ?? this.opts.embeddingModel ?? "text-embedding-3-small";
		const json = await (await this.post("/embeddings", {
			model,
			input: req.input,
			encoding_format: "float"
		})).json();
		return {
			embeddings: (json.data ?? []).map((d) => d.embedding),
			model,
			provider: this.id,
			usage: json.usage ? {
				promptTokens: json.usage.prompt_tokens ?? 0,
				completionTokens: 0,
				totalTokens: json.usage.total_tokens ?? 0
			} : void 0
		};
	}
	async moderation(input) {
		if (!this.capabilities().includes("moderation")) throw new AICapabilityError(this.id, "moderation");
		const first = (await (await this.post("/moderations", {
			model: this.opts.moderationModel ?? "omni-moderation-latest",
			input
		})).json()).results?.[0];
		return {
			flagged: Boolean(first?.flagged),
			categories: first?.categories ?? {},
			provider: this.id
		};
	}
};
/** Primary provider. */
var OpenAIProvider = class extends OpenAICompatibleProvider {
	constructor() {
		super({
			id: "openai",
			label: "OpenAI",
			baseUrl: process.env["OPENAI_BASE_URL"] ?? "https://api.openai.com/v1",
			apiKeyEnv: "OPENAI_API_KEY",
			defaultModel: DEFAULT_MODELS["openai"],
			capabilities: [
				"chat",
				"stream",
				"vision",
				"pdf",
				"audio",
				"speech",
				"embeddings",
				"moderation",
				"tools",
				"json"
			],
			transcriptionModel: process.env["STT_MODEL"] ?? "gpt-4o-mini-transcribe",
			speechModel: process.env["TTS_MODEL"] ?? "gpt-4o-mini-tts",
			embeddingModel: process.env["EMBEDDING_MODEL"] ?? "text-embedding-3-small"
		});
	}
};
/** Secondary provider — access to hundreds of models through one key. */
var OpenRouterProvider = class extends OpenAICompatibleProvider {
	constructor() {
		super({
			id: "openrouter",
			label: "OpenRouter",
			baseUrl: process.env["OPENROUTER_BASE_URL"] ?? "https://openrouter.ai/api/v1",
			apiKeyEnv: "OPENROUTER_API_KEY",
			defaultModel: DEFAULT_MODELS["openrouter"],
			capabilities: [
				"chat",
				"stream",
				"vision",
				"pdf",
				"embeddings",
				"tools",
				"json"
			],
			headers: {
				"HTTP-Referer": process.env["APP_URL"] ?? "https://unifysistem.lovable.app",
				"X-Title": "Unify RepairAI"
			}
		});
	}
};
/** Google Gemini through its OpenAI-compatible endpoint. */
var GeminiProvider = class extends OpenAICompatibleProvider {
	constructor() {
		super({
			id: "gemini",
			label: "Google Gemini",
			baseUrl: process.env["GEMINI_BASE_URL"] ?? "https://generativelanguage.googleapis.com/v1beta/openai",
			apiKeyEnv: "GEMINI_API_KEY",
			defaultModel: DEFAULT_MODELS["gemini"],
			capabilities: [
				"chat",
				"stream",
				"vision",
				"pdf",
				"embeddings",
				"tools",
				"json"
			],
			embeddingModel: "text-embedding-004"
		});
	}
};
/**
* Anthropic Claude — native Messages API (not OpenAI-compatible).
* Implements the exact same AIProvider interface.
*/
var BASE = process.env["CLAUDE_BASE_URL"] ?? "https://api.anthropic.com/v1";
function splitDataUrl(dataUrl) {
	const match = /^data:([^;]+);base64,(.*)$/.exec(dataUrl);
	return {
		mediaType: match?.[1] ?? "image/jpeg",
		data: match?.[2] ?? ""
	};
}
function toClaudeContent(content) {
	if (typeof content === "string") return [{
		type: "text",
		text: content
	}];
	return content.map((part) => {
		if (part.type === "text") return {
			type: "text",
			text: part.text
		};
		const { mediaType, data } = splitDataUrl(part.dataUrl);
		if (part.type === "image") return {
			type: "image",
			source: {
				type: "base64",
				media_type: mediaType,
				data
			}
		};
		return {
			type: "document",
			source: {
				type: "base64",
				media_type: mediaType,
				data
			}
		};
	});
}
var ClaudeProvider = class {
	id = "claude";
	label = "Anthropic Claude";
	isConfigured() {
		return Boolean(process.env["CLAUDE_API_KEY"] ?? process.env["ANTHROPIC_API_KEY"]);
	}
	capabilities() {
		return [
			"chat",
			"stream",
			"vision",
			"pdf",
			"tools",
			"json"
		];
	}
	key() {
		const key = process.env["CLAUDE_API_KEY"] ?? process.env["ANTHROPIC_API_KEY"];
		if (!key) throw new AIProviderError(this.id, 401, "CLAUDE_API_KEY não configurada.");
		return key;
	}
	body(req, stream) {
		const system = req.messages.filter((m) => m.role === "system").map((m) => typeof m.content === "string" ? m.content : "").join("\n\n");
		return {
			model: req.model ?? DEFAULT_MODELS["claude"],
			max_tokens: req.maxTokens ?? 4096,
			temperature: req.temperature,
			system: system || void 0,
			stream,
			messages: req.messages.filter((m) => m.role === "user" || m.role === "assistant").map((m) => ({
				role: m.role,
				content: toClaudeContent(m.content)
			})),
			tools: req.tools?.map((t) => ({
				name: t.name,
				description: t.description,
				input_schema: t.parameters
			}))
		};
	}
	async post(req, stream) {
		const res = await fetch(`${BASE}/messages`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": this.key(),
				"anthropic-version": "2023-06-01"
			},
			body: JSON.stringify(this.body(req, stream)),
			signal: req.signal ?? null
		});
		if (!res.ok) {
			const text = await res.text().catch(() => "");
			throw new AIProviderError(this.id, res.status, text.slice(0, 400) || res.statusText);
		}
		return res;
	}
	async chat(req) {
		const started = Date.now();
		const json = await (await this.post(req, false)).json();
		const text = (json.content ?? []).filter((c) => c.type === "text").map((c) => c.text ?? "").join("");
		const toolCalls = (json.content ?? []).filter((c) => c.type === "tool_use").map((c) => ({
			id: c.id ?? "",
			name: c.name ?? "",
			arguments: JSON.stringify(c.input ?? {})
		}));
		return {
			content: text,
			toolCalls: toolCalls.length ? toolCalls : void 0,
			finishReason: json.stop_reason,
			model: json.model ?? DEFAULT_MODELS["claude"],
			provider: this.id,
			usage: json.usage ? {
				promptTokens: json.usage.input_tokens ?? 0,
				completionTokens: json.usage.output_tokens ?? 0,
				totalTokens: (json.usage.input_tokens ?? 0) + (json.usage.output_tokens ?? 0)
			} : void 0,
			latencyMs: Date.now() - started
		};
	}
	async *stream(req) {
		const started = Date.now();
		const res = await this.post(req, true);
		if (!res.body) throw new AIProviderError(this.id, 500, "Stream vazio.");
		const reader = res.body.getReader();
		const decoder = new TextDecoder();
		let buffer = "";
		let full = "";
		let usage;
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			buffer += decoder.decode(value, { stream: true });
			const lines = buffer.split("\n");
			buffer = lines.pop() ?? "";
			for (const raw of lines) {
				const line = raw.trim();
				if (!line.startsWith("data:")) continue;
				try {
					const evt = JSON.parse(line.slice(5).trim());
					if (evt.type === "content_block_delta" && evt.delta?.text) {
						full += evt.delta.text;
						yield {
							type: "delta",
							text: evt.delta.text
						};
					}
					if (evt.usage) usage = {
						promptTokens: evt.usage.input_tokens ?? 0,
						completionTokens: evt.usage.output_tokens ?? 0,
						totalTokens: (evt.usage.input_tokens ?? 0) + (evt.usage.output_tokens ?? 0)
					};
				} catch {
					continue;
				}
			}
		}
		yield {
			type: "done",
			response: {
				content: full,
				model: req.model ?? DEFAULT_MODELS["claude"],
				provider: this.id,
				usage,
				latencyMs: Date.now() - started
			}
		};
	}
	vision(req) {
		return this.chat(req);
	}
	async audio(_req) {
		throw new AICapabilityError(this.id, "audio");
	}
	async embeddings(_req) {
		throw new AICapabilityError(this.id, "embeddings");
	}
	async moderation(_input) {
		throw new AICapabilityError(this.id, "moderation");
	}
};
/**
* Emergency fallback only — used when no external provider key is configured
* yet, so the product keeps working during the migration. Set AI_PROVIDER and
* the matching key to take it out of the chain.
*/
var LovableFallbackProvider = class extends OpenAICompatibleProvider {
	constructor() {
		super({
			id: "lovable",
			label: "Fallback interno",
			baseUrl: "https://ai.gateway.lovable.dev/v1",
			apiKeyEnv: "LOVABLE_API_KEY",
			defaultModel: DEFAULT_MODELS["lovable"],
			capabilities: [
				"chat",
				"stream",
				"vision",
				"pdf",
				"tools",
				"json",
				"embeddings"
			]
		});
	}
};
/**
* Provider registry + selection.
*
* To add a provider: implement `AIProvider`, import it here and add one entry
* to `FACTORIES`. Nothing else in the application changes.
*/
var FACTORIES = {
	openai: () => new OpenAIProvider(),
	openrouter: () => new OpenRouterProvider(),
	gemini: () => new GeminiProvider(),
	claude: () => new ClaudeProvider(),
	lovable: () => new LovableFallbackProvider(),
	deepseek: () => new OpenAICompatibleProvider({
		id: "deepseek",
		label: "DeepSeek",
		baseUrl: "https://api.deepseek.com/v1",
		apiKeyEnv: "DEEPSEEK_API_KEY",
		defaultModel: DEFAULT_MODELS["deepseek"],
		capabilities: [
			"chat",
			"stream",
			"tools",
			"json"
		]
	}),
	mistral: () => new OpenAICompatibleProvider({
		id: "mistral",
		label: "Mistral",
		baseUrl: "https://api.mistral.ai/v1",
		apiKeyEnv: "MISTRAL_API_KEY",
		defaultModel: DEFAULT_MODELS["mistral"],
		capabilities: [
			"chat",
			"stream",
			"vision",
			"tools",
			"json",
			"embeddings"
		]
	}),
	groq: () => new OpenAICompatibleProvider({
		id: "groq",
		label: "Groq",
		baseUrl: "https://api.groq.com/openai/v1",
		apiKeyEnv: "GROQ_API_KEY",
		defaultModel: DEFAULT_MODELS["groq"],
		capabilities: [
			"chat",
			"stream",
			"audio",
			"tools",
			"json"
		],
		transcriptionModel: "whisper-large-v3"
	})
};
var cache = /* @__PURE__ */ new Map();
function getProvider(id) {
	const key = id.trim().toLowerCase();
	const factory = FACTORIES[key];
	if (!factory) return null;
	let instance = cache.get(key);
	if (!instance) {
		instance = factory();
		cache.set(key, instance);
	}
	return instance;
}
/** Ordered chain: primary provider first, then configured fallbacks. */
function resolveProviderChain(preferred) {
	const config = readAIConfig();
	const order = [preferred ?? config.provider, ...config.fallbackProviders];
	const seen = /* @__PURE__ */ new Set();
	const chain = [];
	for (const id of order) {
		if (!id || seen.has(id)) continue;
		seen.add(id);
		const provider = getProvider(id);
		if (provider?.isConfigured()) chain.push(provider);
	}
	return chain;
}
/** USD per 1M tokens (input, output). Extend freely. */
var PRICING = {
	"gpt-4o": [2.5, 10],
	"gpt-4o-mini": [.15, .6],
	"gpt-4.1": [2, 8],
	"gpt-4.1-mini": [.4, 1.6],
	"gemini-2.5-pro": [1.25, 10],
	"gemini-2.5-flash": [.3, 2.5],
	"claude-sonnet-4-20250514": [3, 15],
	"deepseek-chat": [.27, 1.1]
};
function estimateCostUsd(model, promptTokens, completionTokens) {
	const key = Object.keys(PRICING).find((m) => model.includes(m));
	if (!key) return void 0;
	const [inPrice, outPrice] = PRICING[key];
	return promptTokens / 1e6 * inPrice + completionTokens / 1e6 * outPrice;
}
async function logUsage(record) {
	try {
		console.info(`[ai] ${record.operation} provider=${record.provider} model=${record.model} tokens=${record.totalTokens} latency=${record.latencyMs}ms cost=${record.costUsd?.toFixed(6) ?? "n/a"} status=${record.status}`);
		const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
		await supabaseAdmin.from("ai_usage_logs").insert({
			user_id: record.userId,
			conversation_id: record.conversationId ?? null,
			provider: record.provider,
			model: record.model,
			operation: record.operation,
			prompt_tokens: record.promptTokens,
			completion_tokens: record.completionTokens,
			total_tokens: record.totalTokens,
			latency_ms: record.latencyMs,
			cost_usd: record.costUsd ?? null,
			status: record.status,
			error_message: record.errorMessage ?? null,
			fallback_used: record.fallbackUsed ?? false
		});
	} catch (error) {
		console.warn("[ai] analytics falhou:", error instanceof Error ? error.message : error);
	}
}
function usageFromResponse(res) {
	const promptTokens = res.usage?.promptTokens ?? 0;
	const completionTokens = res.usage?.completionTokens ?? 0;
	return {
		promptTokens,
		completionTokens,
		totalTokens: res.usage?.totalTokens ?? promptTokens + completionTokens,
		costUsd: estimateCostUsd(res.model, promptTokens, completionTokens)
	};
}
/**
* AI Gateway — the single entry point the application uses.
*
* Handles: provider selection, automatic retry, fallback provider, timeout,
* rate-limit detection, response caching, context window/memory and analytics.
*/
var gateway_server_exports = /* @__PURE__ */ __exportAll$1({
	checkRateLimit: () => checkRateLimit,
	gatewayChat: () => gatewayChat,
	gatewaySpeech: () => gatewaySpeech,
	gatewayStream: () => gatewayStream,
	gatewayTranscribe: () => gatewayTranscribe
});
var RATE_LIMIT_MAX = Number(process.env["AI_RATE_LIMIT_PER_MIN"] ?? 20);
var buckets = /* @__PURE__ */ new Map();
function checkRateLimit(key) {
	const now = Date.now();
	const bucket = buckets.get(key);
	if (!bucket || bucket.resetAt < now) {
		buckets.set(key, {
			count: 1,
			resetAt: now + 6e4
		});
		return;
	}
	bucket.count += 1;
	if (bucket.count > RATE_LIMIT_MAX) throw new AIProviderError("gateway", 429, "Limite de requisições atingido. Aguarde 1 minuto.");
}
var responseCache = /* @__PURE__ */ new Map();
function cacheKey(messages, model) {
	return `${model ?? ""}|${JSON.stringify(messages).slice(0, 4e3)}`;
}
function prepareMessages(messages, opts) {
	const config = readAIConfig();
	const conversation = messages.filter((m) => m.role !== "system");
	const { messages: windowed } = applyContextWindow(conversation, config.contextWindowMessages);
	if (opts.raw) return windowed;
	return [{
		role: "system",
		content: buildSystemPrompt(opts.skillLevel ?? "auto", opts.longTermMemory)
	}, ...windowed];
}
function baseRequest(messages, opts, signal) {
	const config = readAIConfig();
	return {
		messages,
		model: opts.model ?? config.model,
		temperature: opts.temperature ?? config.temperature,
		maxTokens: opts.maxTokens ?? config.maxTokens,
		tools: opts.tools,
		json: opts.json,
		jsonSchema: opts.jsonSchema,
		signal
	};
}
var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function gatewayChat(messages, opts = {}) {
	const config = readAIConfig();
	const chain = resolveProviderChain(opts.provider);
	if (chain.length === 0) throw new AIProviderError("gateway", 503, "Nenhum provedor de IA configurado. Defina OPENAI_API_KEY (ou outra chave) e AI_PROVIDER.");
	const prepared = prepareMessages(messages, opts);
	const key = cacheKey(prepared, opts.model ?? config.model);
	const cached = responseCache.get(key);
	if (cached && Date.now() - cached.at < config.cacheTtlMs) return cached.response;
	let lastError;
	for (let index = 0; index < chain.length; index++) {
		const provider = chain[index];
		for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), config.timeoutMs);
			try {
				const response = await provider.chat(baseRequest(prepared, opts, controller.signal));
				clearTimeout(timer);
				const usage = usageFromResponse(response);
				logUsage({
					userId: opts.userId ?? null,
					conversationId: opts.conversationId ?? null,
					provider: provider.id,
					model: response.model,
					operation: "chat",
					...usage,
					latencyMs: response.latencyMs,
					status: "success",
					fallbackUsed: index > 0
				});
				responseCache.set(key, {
					at: Date.now(),
					response: {
						...response,
						...usage
					}
				});
				return {
					...response,
					costUsd: usage.costUsd
				};
			} catch (error) {
				clearTimeout(timer);
				lastError = error;
				if ((error instanceof AIProviderError ? error.retryable : true) && attempt < config.maxRetries) {
					await sleep(400 * 2 ** attempt);
					continue;
				}
				logUsage({
					userId: opts.userId ?? null,
					conversationId: opts.conversationId ?? null,
					provider: provider.id,
					model: opts.model ?? config.model ?? "unknown",
					operation: "chat",
					promptTokens: 0,
					completionTokens: 0,
					totalTokens: 0,
					latencyMs: 0,
					status: "error",
					errorMessage: error instanceof Error ? error.message : String(error),
					fallbackUsed: index > 0
				});
				break;
			}
		}
	}
	throw lastError instanceof Error ? lastError : new AIProviderError("gateway", 500, "Falha em todos os provedores de IA.");
}
async function* gatewayStream(messages, opts = {}) {
	const config = readAIConfig();
	const chain = resolveProviderChain(opts.provider);
	if (chain.length === 0) {
		yield {
			type: "error",
			message: "Nenhum provedor de IA configurado. Defina OPENAI_API_KEY e AI_PROVIDER.",
			code: "no_provider"
		};
		return;
	}
	const prepared = prepareMessages(messages, opts);
	for (let index = 0; index < chain.length; index++) {
		const provider = chain[index];
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), config.timeoutMs);
		let emitted = false;
		try {
			for await (const event of provider.stream(baseRequest(prepared, opts, controller.signal))) {
				if (event.type === "delta") emitted = true;
				if (event.type === "done") {
					const usage = usageFromResponse(event.response);
					logUsage({
						userId: opts.userId ?? null,
						conversationId: opts.conversationId ?? null,
						provider: provider.id,
						model: event.response.model,
						operation: "stream",
						...usage,
						latencyMs: event.response.latencyMs,
						status: "success",
						fallbackUsed: index > 0
					});
					yield {
						type: "done",
						response: {
							...event.response,
							costUsd: usage.costUsd
						}
					};
					clearTimeout(timer);
					return;
				}
				yield event;
			}
			clearTimeout(timer);
			return;
		} catch (error) {
			clearTimeout(timer);
			const message = error instanceof Error ? error.message : String(error);
			logUsage({
				userId: opts.userId ?? null,
				conversationId: opts.conversationId ?? null,
				provider: provider.id,
				model: opts.model ?? config.model ?? "unknown",
				operation: "stream",
				promptTokens: 0,
				completionTokens: 0,
				totalTokens: 0,
				latencyMs: 0,
				status: "error",
				errorMessage: message,
				fallbackUsed: index > 0
			});
			if (emitted || index === chain.length - 1) {
				yield {
					type: "error",
					message,
					code: "provider_error"
				};
				return;
			}
		}
	}
}
async function gatewayTranscribe(req, opts = {}) {
	const chain = resolveProviderChain(opts.provider).filter((p) => p.capabilities().includes("audio"));
	if (chain.length === 0) throw new AIProviderError("gateway", 503, "Nenhum provedor com transcrição de áudio configurado.");
	let lastError;
	for (const provider of chain) {
		const started = Date.now();
		try {
			const result = await provider.audio(req);
			logUsage({
				userId: opts.userId ?? null,
				provider: provider.id,
				model: req.model ?? "stt",
				operation: "audio",
				promptTokens: 0,
				completionTokens: 0,
				totalTokens: 0,
				latencyMs: Date.now() - started,
				status: "success"
			});
			return result;
		} catch (error) {
			lastError = error;
		}
	}
	throw lastError instanceof Error ? lastError : /* @__PURE__ */ new Error("Falha ao transcrever áudio.");
}
async function gatewaySpeech(text, opts = {}) {
	const provider = resolveProviderChain(opts.provider).find((p) => p.capabilities().includes("speech") && typeof p.speech === "function");
	if (!provider?.speech) throw new AIProviderError("gateway", 503, "Nenhum provedor com síntese de voz configurado.");
	return provider.speech({ text });
}
//#endregion
export { gateway_server_DwpX14po_exports as a, gatewayTranscribe as i, gatewaySpeech as n, gatewayStream as r, checkRateLimit as t };
