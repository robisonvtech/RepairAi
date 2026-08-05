import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-tCc0-7Lo.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as UnifyMascot } from "./UnifyMascot-sfREiZQZ.mjs";
import { F as History, tt as ChevronRight, u as Trash2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-CrPkOj8T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HistoryPage() {
	const navigate = useNavigate();
	const [list, setList] = (0, import_react.useState)([]);
	const [q, setQ] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	async function load() {
		setLoading(true);
		const { data, error } = await supabase.from("conversations").select("id,title,updated_at").order("updated_at", { ascending: false });
		setLoading(false);
		if (error) return toast.error(error.message);
		setList(data ?? []);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	async function remove(id) {
		const { error } = await supabase.from("conversations").delete().eq("id", id);
		if (error) return toast.error(error.message);
		setList((p) => p.filter((c) => c.id !== id));
		toast.success("Conversa removida.");
	}
	const filtered = list.filter((c) => c.title.toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-4 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-bold",
					children: "Histórico"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Suas conversas com a Unify."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Buscar...",
				className: "mb-3 w-full rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm outline-none focus:border-primary"
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-10 text-center text-sm text-muted-foreground",
				children: "Carregando..."
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center py-16 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
					size: 80,
					state: "idle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: list.length === 0 ? "Nenhuma conversa ainda." : "Nada encontrado."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "group flex items-center gap-1 rounded-xl border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => navigate({
							to: "/chat",
							search: { c: c.id }
						}),
						className: "flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: c.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: new Date(c.updated_at).toLocaleString("pt-BR")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 shrink-0 text-muted-foreground" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => remove(c.id),
						className: "mr-2 rounded-md p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
						"aria-label": "Remover",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})]
				}, c.id))
			})
		]
	});
}
//#endregion
export { HistoryPage as component };
