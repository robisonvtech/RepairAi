import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { F as History, L as GraduationCap, T as Package, a as Users, i as Wallet, ot as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/more-7csH0AlF.js
var import_jsx_runtime = require_jsx_runtime();
var links = [
	{
		to: "/customers",
		label: "Clientes",
		desc: "Cadastro e histórico",
		icon: Users,
		color: "text-blue-600"
	},
	{
		to: "/inventory",
		label: "Estoque",
		desc: "Peças e movimentações",
		icon: Package,
		color: "text-orange-600"
	},
	{
		to: "/finance",
		label: "Financeiro",
		desc: "A receber, a pagar e caixa",
		icon: Wallet,
		color: "text-emerald-600"
	},
	{
		to: "/history",
		label: "Histórico IA",
		desc: "Conversas anteriores",
		icon: History,
		color: "text-slate-600"
	},
	{
		to: "/knowledge",
		label: "Base de conhecimento",
		desc: "Guias da comunidade",
		icon: BookOpen,
		color: "text-violet-600"
	},
	{
		to: "/courses",
		label: "Cursos",
		desc: "Treinamentos Pro",
		icon: GraduationCap,
		color: "text-primary"
	}
];
function MorePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-bold",
				children: "Mais"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Ferramentas complementares da sua assistência."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-2",
			children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: l.to,
				className: "rounded-xl border border-border bg-card p-3 transition hover:border-primary/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(l.icon, { className: `h-5 w-5 ${l.color}` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-sm font-semibold",
						children: l.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] text-muted-foreground",
						children: l.desc
					})
				]
			}, l.to))
		})]
	});
}
//#endregion
export { MorePage as component };
