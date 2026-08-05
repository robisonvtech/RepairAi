import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-tCc0-7Lo.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as UnifyMascot } from "./UnifyMascot-sfREiZQZ.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { C as Plus, ot as BookOpen } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, t as Dialog } from "./dialog-B8mBdC_P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/knowledge-DmNrD9_y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KnowledgePage() {
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		body: "",
		category: ""
	});
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	async function load() {
		setLoading(true);
		const { data, error } = await supabase.from("knowledge_posts").select("*").order("created_at", { ascending: false }).limit(50);
		setLoading(false);
		if (error) return toast.error(error.message);
		setPosts(data ?? []);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	async function create(e) {
		e.preventDefault();
		if (!form.title.trim() || !form.body.trim()) return;
		setSubmitting(true);
		const { data: user } = await supabase.auth.getUser();
		const { error } = await supabase.from("knowledge_posts").insert({
			author_id: user.user.id,
			title: form.title.trim(),
			body: form.body.trim(),
			category: form.category.trim() || null
		});
		setSubmitting(false);
		if (error) return toast.error(error.message);
		toast.success("Enviado para revisão. Obrigado por contribuir!");
		setOpen(false);
		setForm({
			title: "",
			body: "",
			category: ""
		});
		load();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-4 flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-bold",
						children: "Base de conhecimento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Soluções da comunidade revisadas pela equipe."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open,
					onOpenChange: setOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), "Contribuir"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Nova contribuição" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: create,
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "k-title",
									children: "Título"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "k-title",
									required: true,
									value: form.title,
									onChange: (e) => setForm({
										...form,
										title: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "k-cat",
									children: "Categoria (opcional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "k-cat",
									placeholder: "ex.: iPhone 11, Carga, Placa",
									value: form.category,
									onChange: (e) => setForm({
										...form,
										category: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "k-body",
									children: "Solução / Guia"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "k-body",
									required: true,
									rows: 6,
									value: form.body,
									onChange: (e) => setForm({
										...form,
										body: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full",
								disabled: submitting,
								children: submitting ? "Enviando..." : "Enviar para revisão"
							})
						]
					})] })]
				})
			]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "py-16 text-center text-sm text-muted-foreground",
			children: "Carregando..."
		}) : posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center py-16 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
				size: 80,
				state: "learning"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "Nenhum artigo ainda. Seja o primeiro a contribuir."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: posts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "flex-1 text-sm font-semibold",
							children: p.title
						}), p.status !== "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: "text-[10px]",
							children: p.status === "pending" ? "Em revisão" : "Rejeitado"
						})]
					}),
					p.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1 text-xs text-primary",
						children: p.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "whitespace-pre-wrap text-sm text-muted-foreground",
						children: [p.body.slice(0, 300), p.body.length > 300 ? "..." : ""]
					})
				]
			}, p.id))
		})]
	});
}
//#endregion
export { KnowledgePage as component };
