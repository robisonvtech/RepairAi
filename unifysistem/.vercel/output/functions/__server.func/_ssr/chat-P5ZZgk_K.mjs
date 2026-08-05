import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as useServerFn, r as createServerFn } from "./vendor_react-CFh17dx82.mjs";
import { t as createSsrRpc } from "./vendor_tanstack-DcRIe6u_.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-B2BiZdKy.mjs";
import { t as supabase } from "./client-tCc0-7Lo.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Route$19 } from "./router-DZj4C1IY.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as UnifyMascot } from "./UnifyMascot-sfREiZQZ.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { a as Label2, c as RadioItem2, d as SubContent2, f as SubTrigger2, i as ItemIndicator2, l as Root2, n as Content2, o as Portal2, p as Trigger, r as Item2, s as RadioGroup2, t as CheckboxItem2, u as Separator2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as useEntitlements } from "./useEntitlements-FfQO3F-T.mjs";
import { A as Lock, G as Cpu, H as DollarSign, L as GraduationCap, P as ImagePlus, V as Droplets, Y as Circle, ct as Battery, h as Smartphone, it as Camera, n as X, ot as BookOpen, r as Wrench, rt as Check, t as Zap, tt as ChevronRight, v as Send, y as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-P5ZZgk_K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Non-streaming chat (used as fallback and by the offline queue).
* The streaming path lives in /api/ai/chat.
*/
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
}).handler(createSsrRpc("c28b865880f1c7b48158fb653c2fe7243ba440c9ef170e0ae220b9c72b71d3aa"));
/**
* Client-side helpers for the AI gateway: SSE streaming, voice input,
* offline queue and attachment handling.
*/
async function authHeader() {
	const { data } = await supabase.auth.getSession();
	const token = data.session?.access_token;
	if (!token) throw new Error("Sessão expirada. Entre novamente.");
	return `Bearer ${token}`;
}
/** Streams the assistant answer token by token via Server-Sent Events. */
async function streamChat(payload, handlers) {
	const res = await fetch("/api/ai/chat", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: await authHeader()
		},
		body: JSON.stringify(payload),
		signal: handlers.signal ?? null
	});
	if (!res.ok || !res.body) {
		const message = await res.text().catch(() => "") || "Falha ao contatar a IA.";
		throw new Error(message);
	}
	const reader = res.body.getReader();
	const decoder = new TextDecoder();
	let buffer = "";
	let full = "";
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		buffer += decoder.decode(value, { stream: true });
		const lines = buffer.split("\n");
		buffer = lines.pop() ?? "";
		for (const raw of lines) {
			const line = raw.trim();
			if (!line.startsWith("data:")) continue;
			const payloadText = line.slice(5).trim();
			if (payloadText === "[DONE]") continue;
			try {
				const event = JSON.parse(payloadText);
				if (event.type === "delta") {
					full += event.text;
					handlers.onDelta(event.text);
				} else if (event.type === "error") handlers.onError?.(event.message);
				else if (event.type === "done") handlers.onDone?.(event);
			} catch {
				continue;
			}
		}
	}
	return full;
}
var ACCEPTED_IMAGE = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
	"image/heic",
	"image/heif"
];
var ACCEPTED_DOC = ["application/pdf"];
function fileToDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});
}
function inline(text) {
	const out = [];
	const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
	let last = 0;
	let m;
	let key = 0;
	while ((m = regex.exec(text)) !== null) {
		if (m.index > last) out.push(text.slice(last, m.index));
		const t = m[0];
		if (t.startsWith("**")) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t.slice(2, -2) }, key++));
		else if (t.startsWith("`")) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			className: "rounded bg-black/10 px-1 py-0.5 font-mono text-[0.85em]",
			children: t.slice(1, -1)
		}, key++));
		else out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: t.slice(1, -1) }, key++));
		last = m.index + t.length;
	}
	if (last < text.length) out.push(text.slice(last));
	return out;
}
function MarkdownLite({ content, className }) {
	const lines = content.split("\n");
	const blocks = [];
	let list = null;
	let paragraph = [];
	let k = 0;
	function flushParagraph() {
		if (paragraph.length) {
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap",
				children: inline(paragraph.join(" "))
			}, k++));
			paragraph = [];
		}
	}
	function flushList() {
		if (list) {
			const L = list;
			const Tag = L.ordered ? "ol" : "ul";
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				className: cn(L.ordered ? "list-decimal" : "list-disc", "ml-5 space-y-0.5"),
				children: L.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: inline(it) }, i))
			}, k++));
			list = null;
		}
	}
	for (const raw of lines) {
		const line = raw.trimEnd();
		if (!line.trim()) {
			flushParagraph();
			flushList();
			continue;
		}
		const h = /^(#{1,3})\s+(.*)$/.exec(line);
		if (h) {
			flushParagraph();
			flushList();
			const level = h[1].length;
			const cls = level === 1 ? "text-lg font-bold mt-1" : level === 2 ? "text-base font-semibold mt-1" : "text-sm font-semibold mt-1";
			blocks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cls,
				children: inline(h[2])
			}, k++));
			continue;
		}
		const ol = /^(\d+)\.\s+(.*)$/.exec(line);
		const ul = /^[-*]\s+(.*)$/.exec(line);
		if (ol) {
			flushParagraph();
			if (!list || !list.ordered) {
				flushList();
				list = {
					ordered: true,
					items: []
				};
			}
			list.items.push(ol[2]);
			continue;
		}
		if (ul) {
			flushParagraph();
			if (!list || list.ordered) {
				flushList();
				list = {
					ordered: false,
					items: []
				};
			}
			list.items.push(ul[1]);
			continue;
		}
		flushList();
		paragraph.push(line);
	}
	flushParagraph();
	flushList();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("space-y-2 text-sm leading-relaxed", className),
		children: blocks
	});
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuRadioGroup = RadioGroup2;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var SKILL_LABEL = {
	auto: "Auto",
	beginner: "Iniciante",
	advanced: "Avançado"
};
var QUICK_ACTIONS = [
	{
		icon: Wrench,
		label: "Diagnosticar falha",
		prompt: "Preciso diagnosticar uma falha. Vou descrever os sintomas: "
	},
	{
		icon: DollarSign,
		label: "Avaliar valor",
		prompt: "Avalie o valor de mercado deste celular para revenda. Modelo: "
	},
	{
		icon: BookOpen,
		label: "Guia de reparo",
		prompt: "Me passe um guia passo-a-passo de reparo para: "
	},
	{
		icon: Cpu,
		label: "Diagnóstico de placa",
		prompt: "Preciso de diagnóstico a nível de placa. Sintomas: "
	},
	{
		icon: Search,
		label: "Consultar IMEI",
		prompt: "Explique como consultar e o que verificar neste IMEI: "
	},
	{
		icon: Droplets,
		label: "Dano por água",
		prompt: "Aparelho sofreu dano por água. Sintomas atuais: "
	},
	{
		icon: Zap,
		label: "Problemas de carga",
		prompt: "O aparelho não carrega corretamente. Detalhes: "
	},
	{
		icon: Smartphone,
		label: "Tela / Display",
		prompt: "Problema de tela/display: "
	},
	{
		icon: Battery,
		label: "Bateria",
		prompt: "Problema de bateria (saúde/consumo/desliga): "
	},
	{
		icon: Camera,
		label: "Câmera",
		prompt: "Problema de câmera: "
	}
];
function ChatPage() {
	const search = Route$19.useSearch();
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [attachments, setAttachments] = (0, import_react.useState)([]);
	const [state, setState] = (0, import_react.useState)("idle");
	const [conversationId, setConversationId] = (0, import_react.useState)(null);
	const [userId, setUserId] = (0, import_react.useState)(null);
	const [skillLevel, setSkillLevel] = (0, import_react.useState)("auto");
	const bottomRef = (0, import_react.useRef)(null);
	const textareaRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const send = useServerFn(sendChat);
	const { canPremium } = useEntitlements();
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data } = await supabase.auth.getUser();
			const uid = data.user?.id ?? null;
			setUserId(uid);
			if (uid) {
				const { data: p } = await supabase.from("profiles").select("skill_level").eq("id", uid).maybeSingle();
				const lvl = p?.skill_level ?? "auto";
				if (lvl === "auto" || lvl === "beginner" || lvl === "advanced") setSkillLevel(lvl);
			}
		})();
		textareaRef.current?.focus();
	}, []);
	(0, import_react.useEffect)(() => {
		const cid = search.c;
		if (!cid || cid === conversationId) return;
		(async () => {
			const { data, error } = await supabase.from("messages").select("id, role, content, attachments, created_at").eq("conversation_id", cid).order("created_at", { ascending: true });
			if (error) return toast.error("Não foi possível abrir a conversa.");
			setConversationId(cid);
			setMessages((data ?? []).map((m) => ({
				id: m.id,
				role: m.role,
				content: m.content,
				attachments: Array.isArray(m.attachments) ? m.attachments : void 0
			})));
		})();
	}, [search.c, conversationId]);
	async function updateSkill(next) {
		if (next === "advanced" && !canPremium) {
			toast.error("Modo Avançado é exclusivo Pro (R$ 19,90/mês).");
			return;
		}
		setSkillLevel(next);
		if (!userId) return;
		const { error } = await supabase.from("profiles").update({ skill_level: next }).eq("id", userId);
		if (error) toast.error("Não foi possível salvar a preferência.");
	}
	(0, import_react.useEffect)(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, state]);
	async function ensureConversation() {
		if (conversationId) return conversationId;
		if (!userId) throw new Error("Sessão expirada.");
		const { data, error } = await supabase.from("conversations").insert({
			user_id: userId,
			title: "Nova conversa"
		}).select("id").single();
		if (error || !data) throw new Error(error?.message ?? "Falha ao criar conversa.");
		setConversationId(data.id);
		return data.id;
	}
	async function handleFiles(files) {
		if (!files) return;
		const arr = Array.from(files).slice(0, 4);
		const results = [];
		for (const f of arr) {
			const isImage = ACCEPTED_IMAGE.includes(f.type) || f.type.startsWith("image/");
			const isDoc = ACCEPTED_DOC.includes(f.type);
			if (!isImage && !isDoc) {
				toast.error(`${f.name}: formato não suportado.`);
				continue;
			}
			if (f.size > 12582912) {
				toast.error(`${f.name}: arquivo acima de 12MB.`);
				continue;
			}
			const dataUrl = await fileToDataUrl(f);
			results.push({
				type: isImage ? "image" : "file",
				dataUrl,
				filename: f.name,
				mimeType: f.type
			});
		}
		setAttachments((prev) => [...prev, ...results].slice(0, 4));
	}
	async function submit() {
		const text = input.trim();
		if (!text && attachments.length === 0) return;
		if (state === "thinking" || state === "typing") return;
		const userMsg = {
			id: crypto.randomUUID(),
			role: "user",
			content: text || "Analise as imagens.",
			attachments: attachments.length ? [...attachments] : void 0
		};
		const nextMessages = [...messages, userMsg];
		setMessages(nextMessages);
		setInput("");
		setAttachments([]);
		setState(attachments.length ? "scanning" : "thinking");
		try {
			const convId = await ensureConversation();
			await supabase.from("messages").insert({
				conversation_id: convId,
				user_id: userId,
				role: "user",
				content: userMsg.content,
				attachments: userMsg.attachments ?? []
			});
			if (nextMessages.length === 1) await supabase.from("conversations").update({ title: text.slice(0, 60) || "Conversa com imagens" }).eq("id", convId);
			setState("typing");
			const turns = nextMessages.map((m) => ({
				role: m.role,
				content: m.content,
				attachments: m.attachments
			}));
			const assistantId = crypto.randomUUID();
			setMessages((prev) => [...prev, {
				id: assistantId,
				role: "assistant",
				content: ""
			}]);
			let answer = "";
			try {
				answer = await streamChat({
					messages: turns,
					skillLevel,
					conversationId: convId
				}, {
					onDelta: (chunk) => {
						answer += chunk;
						setMessages((prev) => prev.map((m) => m.id === assistantId ? {
							...m,
							content: m.content + chunk
						} : m));
					},
					onError: (message) => toast.error(message)
				});
			} catch {
				answer = (await send({ data: {
					messages: turns,
					skillLevel,
					conversationId: convId
				} })).content;
				setMessages((prev) => prev.map((m) => m.id === assistantId ? {
					...m,
					content: answer
				} : m));
			}
			if (!answer.trim()) throw new Error("A IA não retornou resposta.");
			await supabase.from("messages").insert({
				conversation_id: convId,
				user_id: userId,
				role: "assistant",
				content: answer
			});
			setState("success");
			setTimeout(() => setState("idle"), 1400);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Erro desconhecido";
			toast.error(msg);
			setState("error");
			setTimeout(() => setState("idle"), 1600);
		} finally {
			textareaRef.current?.focus();
		}
	}
	const empty = messages.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[calc(100dvh-4.5rem)] flex-col bg-[radial-gradient(circle_at_top,_rgba(191,0,0,0.08),_transparent_48%)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex items-center gap-3 border-b border-border/80 bg-background/90 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
						size: 36,
						state
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-sm font-semibold leading-tight",
							children: "Unify"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								state === "thinking" && "Analisando...",
								state === "typing" && "Digitando...",
								state === "scanning" && "Analisando imagem...",
								state === "success" && "Diagnóstico concluído",
								state === "error" && "Ocorreu um erro",
								(state === "idle" || state === "listening" || state === "learning") && "IA especialista em reparo de celulares"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							className: "h-8 gap-1.5 rounded-full px-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-3.5 w-3.5" }), SKILL_LABEL[skillLevel]]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "end",
						className: "w-56",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Nível de resposta" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuRadioGroup, {
								value: skillLevel,
								onValueChange: (v) => updateSkill(v),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioItem, {
										value: "auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm",
												children: "Automático"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Unify detecta seu nível"
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioItem, {
										value: "beginner",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm",
												children: "Iniciante"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Linguagem simples, ensinando cada termo"
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuRadioItem, {
										value: "advanced",
										disabled: !canPremium,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-1 items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm",
													children: "Avançado"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground",
													children: "Placa, tensões, microsolda"
												})]
											}), !canPremium && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mt-0.5 h-3.5 w-3.5 text-muted-foreground" })]
										})
									})
								]
							})
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-4xl flex-1 flex-col gap-4 px-4 py-4",
				children: [
					empty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center rounded-3xl border border-border/70 bg-card/70 p-6 text-center shadow-sm backdrop-blur",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
								size: 120,
								state: "idle"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-xl font-bold tracking-tight text-foreground",
								children: "Como posso te ajudar hoje?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-xs text-sm text-muted-foreground",
								children: "Descreva o defeito, envie fotos ou áudio — a Unify diagnostica com atenção e linguagem mais humana."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid w-full grid-cols-2 gap-2 sm:grid-cols-3",
								children: QUICK_ACTIONS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setInput(a.prompt);
										textareaRef.current?.focus();
									},
									className: "flex flex-col items-center gap-1.5 rounded-2xl border border-border/70 bg-card/90 p-3 text-xs font-medium transition hover:border-primary/40 hover:bg-accent/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-center leading-tight",
										children: a.label
									})]
								}, a.label))
							})
						]
					}) : messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBubble, { m }, m.id)),
					(state === "thinking" || state === "typing" || state === "scanning") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end gap-2 animate-fade-up",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
							size: 32,
							state,
							aura: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl rounded-bl-sm bg-muted px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-1.5 w-1.5 animate-bounce rounded-full bg-primary",
										style: { animationDelay: "0ms" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-1.5 w-1.5 animate-bounce rounded-full bg-primary",
										style: { animationDelay: "150ms" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-1.5 w-1.5 animate-bounce rounded-full bg-primary",
										style: { animationDelay: "300ms" }
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: bottomRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky bottom-0 border-t border-border/80 bg-background/95 px-3 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.05)] backdrop-blur",
				children: [attachments.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 flex gap-2 overflow-x-auto",
					children: attachments.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: a.dataUrl,
							alt: "anexo",
							className: "h-full w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setAttachments((p) => p.filter((_, idx) => idx !== i)),
							className: "absolute right-0.5 top-0.5 rounded-full bg-black/60 p-0.5 text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
						})]
					}, i))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "image/*",
							multiple: true,
							className: "hidden",
							onChange: (e) => {
								handleFiles(e.target.files);
								e.target.value = "";
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							className: "shrink-0",
							onClick: () => fileRef.current?.click(),
							"aria-label": "Anexar imagem",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							ref: textareaRef,
							value: input,
							onChange: (e) => setInput(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									submit();
								}
							},
							placeholder: "Descreva o defeito...",
							rows: 1,
							className: "max-h-32 min-h-10 resize-none rounded-2xl border border-border/70 bg-muted/60 text-foreground"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "icon",
							onClick: submit,
							disabled: state === "thinking" || state === "typing" || !input.trim() && attachments.length === 0,
							className: cn("shrink-0 rounded-full bg-primary text-primary-foreground shadow-sm"),
							"aria-label": "Enviar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
						})
					]
				})]
			})
		]
	});
}
function MessageBubble({ m }) {
	const isUser = m.role === "user";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-end gap-2 animate-fade-up", isUser ? "justify-end" : "justify-start"),
		children: [!isUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
			size: 32,
			state: "idle"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("max-w-[84%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm", isUser ? "rounded-br-sm bg-[color:var(--chat-user)] text-[color:var(--chat-user-foreground)]" : "rounded-bl-sm border border-border/70 bg-card/95 text-foreground"),
			children: [m.attachments && m.attachments.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 flex flex-wrap gap-1",
				children: m.attachments.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: a.dataUrl,
					alt: "",
					className: "h-24 w-24 rounded-lg object-cover"
				}, i))
			}), isUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "whitespace-pre-wrap break-words",
				children: m.content
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownLite, { content: m.content })]
		})]
	});
}
//#endregion
export { ChatPage as component };
