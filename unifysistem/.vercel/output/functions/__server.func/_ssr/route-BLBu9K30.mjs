import { _ as Link, l as useLocation, p as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as UnifyMascot } from "./UnifyMascot-sfREiZQZ.mjs";
import { J as ClipboardList, L as GraduationCap, M as LayoutDashboard, o as User } from "../_libs/lucide-react.mjs";
import { t as usePlan } from "./usePlan-BWmzByx8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-BLBu9K30.js
var import_jsx_runtime = require_jsx_runtime();
var leftItems = [{
	to: "/dashboard",
	label: "Painel",
	icon: LayoutDashboard
}, {
	to: "/orders",
	label: "Ordens",
	icon: ClipboardList
}];
var rightItems = [{
	to: "/courses",
	label: "Cursos",
	icon: GraduationCap
}, {
	to: "/profile",
	label: "Perfil",
	icon: User
}];
function BottomNav() {
	const { pathname } = useLocation();
	const chatActive = pathname === "/chat" || pathname.startsWith("/chat/");
	const NavLink = ({ to, label, icon: Icon }) => {
		const active = pathname === to || pathname.startsWith(to + "/");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			className: cn("flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors", active ? "text-primary" : "text-muted-foreground hover:text-foreground"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("h-5 w-5 transition-transform", active && "stroke-[2.5] scale-110") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom)]",
		"aria-label": "Navegação principal",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background via-background/80 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex max-w-2xl items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card mx-3 mb-3 flex flex-1 items-stretch rounded-full px-2 shadow-[0_10px_40px_-20px_oklch(0_0_0/0.3)]",
				children: [
					leftItems.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, { ...i }, i.to)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-16",
						"aria-hidden": true
					}),
					rightItems.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, { ...i }, i.to))
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/chat",
				className: cn("absolute left-1/2 -translate-x-1/2 -top-3 flex h-16 w-16 items-center justify-center rounded-full", "gradient-primary shadow-[0_10px_30px_-8px_oklch(0.505_0.235_27.5/0.5)] transition-transform", "hover:scale-105 active:scale-95", chatActive && "elite-glow"),
				"aria-label": "Falar com a Unify",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
					size: 44,
					state: chatActive ? "celebrating" : "idle"
				})
			})]
		})]
	});
}
function AuthedLayout() {
	const { plan } = usePlan();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-[calc(5.5rem+env(safe-area-inset-bottom))] transition-colors",
		"data-plan": plan,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-2xl px-4 pt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})]
	});
}
//#endregion
export { AuthedLayout as component };
