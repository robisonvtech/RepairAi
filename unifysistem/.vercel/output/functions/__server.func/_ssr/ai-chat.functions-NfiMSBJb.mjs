import { r as createServerFn } from "./vendor_react-CFh17dx82.mjs";
import { n as createServerRpc } from "./vendor_tanstack-DcRIe6u_.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B2BiZdKy.mjs";
import { i as sanitizeUserContent, r as containsDangerousRequest, t as REFUSAL } from "./prompt-BZG73IfD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-chat.functions-NfiMSBJb.js
/**
* Non-streaming chat (used as fallback and by the offline queue).
* The streaming path lives in /api/ai/chat.
*/
var sendChat_createServerFn_handler = createServerRpc({
	id: "c28b865880f1c7b48158fb653c2fe7243ba440c9ef170e0ae220b9c72b71d3aa",
	name: "sendChat",
	filename: "src/lib/ai-chat.functions.ts"
}, (opts) => sendChat.__executeServer(opts));
var sendChat = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => {
	const d = input;
	if (!d || !Array.isArray(d.messages)) throw new Error("Requisição inválida.");
	if (d.messages.length === 0 || d.messages.length > 80) throw new Error("Conversa muito longa.");
	for (const m of d.messages) {
		if (m.role !== "user" && m.role !== "assistant") throw new Error("Papel inválido.");
		if (typeof m.content !== "string" || m.content.length > 12e3) throw new Error("Mensagem muito longa.");
		if (m.attachments && m.attachments.length > 6) throw new Error("Máximo de 6 anexos.");
	}
	const skill = d.skillLevel ?? "auto";
	if (![
		"auto",
		"beginner",
		"advanced"
	].includes(skill)) throw new Error("Nível inválido.");
	return d;
}).handler(sendChat_createServerFn_handler, async ({ data, context }) => {
	const { gatewayChat, checkRateLimit } = await import("./gateway.server-DwpX14po.mjs").then((n) => n.a);
	const { extractLongTermFacts } = await import("./memory-CkcAkHNh.mjs").then((n) => n.r);
	const { supabase, userId } = context;
	checkRateLimit(`chat:${userId}`);
	let skill = data.skillLevel ?? "auto";
	if (skill === "advanced") {
		const [{ data: roles }, { data: profile }] = await Promise.all([supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin"), supabase.from("profiles").select("subscription_status").eq("id", userId).maybeSingle()]);
		const isAdmin = (roles ?? []).length > 0;
		const isPro = profile?.subscription_status === "pro";
		if (!isAdmin && !isPro) skill = "auto";
	}
	const messages = data.messages.map((m) => {
		if (m.role !== "user") return {
			role: "assistant",
			content: m.content
		};
		const safe = sanitizeUserContent(m.content);
		const text = containsDangerousRequest(safe) ? REFUSAL : safe;
		if (m.attachments?.length) return {
			role: "user",
			content: [{
				type: "text",
				text: text || "Analise os anexos e me diga o que você vê."
			}, ...m.attachments.map((a) => a.type === "image" ? {
				type: "image",
				dataUrl: a.dataUrl,
				mimeType: a.mimeType
			} : {
				type: "file",
				filename: a.filename ?? "documento.pdf",
				dataUrl: a.dataUrl,
				mimeType: a.mimeType
			})]
		};
		return {
			role: "user",
			content: text
		};
	});
	const facts = extractLongTermFacts(messages);
	const response = await gatewayChat(messages, {
		userId,
		conversationId: data.conversationId ?? null,
		skillLevel: skill,
		longTermMemory: facts.length ? facts.join("\n") : void 0,
		provider: data.provider,
		model: data.model
	});
	return {
		content: response.content || "Sem resposta.",
		provider: response.provider,
		model: response.model,
		usage: response.usage ?? null,
		costUsd: response.costUsd ?? null,
		latencyMs: response.latencyMs
	};
});
//#endregion
export { sendChat_createServerFn_handler };
