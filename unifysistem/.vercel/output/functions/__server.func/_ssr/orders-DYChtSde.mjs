import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as Outlet, m as useMatchRoute, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-tCc0-7Lo.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { C as Plus, y as Search } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { a as formatOSNumber, n as STATUS_LABEL, r as STATUS_ORDER, t as STATUS_COLOR } from "./orders-DZbTO4dH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-DYChtSde.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OrdersLayout() {
	const matchRoute = useMatchRoute();
	if (matchRoute({ to: "/orders/new" }) || matchRoute({
		to: "/orders/$id",
		fuzzy: true
	})) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersList, {});
}
function OrdersList() {
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data } = await supabase.from("service_orders").select("id, number, status, reported_issue, created_at, customers(name), devices(brand, model)").order("created_at", { ascending: false }).limit(200);
			setOrders(data ?? []);
			setLoading(false);
		})();
	}, []);
	const filtered = orders.filter((o) => {
		if (filter !== "all" && o.status !== filter) return false;
		if (!q.trim()) return true;
		const s = q.toLowerCase();
		return String(o.number).includes(s) || (o.customers?.name.toLowerCase().includes(s) ?? false) || o.devices && `${o.devices.brand} ${o.devices.model}`.toLowerCase().includes(s) || o.reported_issue.toLowerCase().includes(s);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-aura absolute inset-x-0 top-0 -z-10 h-64" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-4 flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-wider text-primary",
						children: "Operação"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: "Ordens de Serviço"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [orders.length, " OS no total"]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					className: "gradient-primary text-primary-foreground shadow-[0_8px_24px_-8px_oklch(0.505_0.235_27.5/0.5)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/orders/new",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Nova OS"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-card mb-3 flex items-center gap-2 rounded-2xl px-3 py-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Buscar por número, cliente, aparelho...",
					className: "h-9 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex gap-1.5 overflow-x-auto pb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter("all"),
					className: cn("shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition", filter === "all" ? "gradient-primary border-transparent text-primary-foreground shadow-[0_6px_16px_-8px_oklch(0.505_0.235_27.5/0.6)]" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"),
					children: "Todas"
				}), STATUS_ORDER.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter(s),
					className: cn("shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition", filter === s ? "gradient-primary border-transparent text-primary-foreground shadow-[0_6px_16px_-8px_oklch(0.505_0.235_27.5/0.6)]" : "border-border bg-card/50 text-muted-foreground hover:text-foreground"),
					children: STATUS_LABEL[s]
				}, s))]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: [
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton h-16 rounded-2xl" }, i))
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "premium-card p-10 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Nenhuma OS encontrada."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Crie a primeira para começar."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: filtered.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "animate-fade-up",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/orders/$id",
						params: { id: o.id },
						className: "premium-card premium-card-hover block p-3.5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "gradient-text text-sm font-bold",
										children: formatOSNumber(o.number)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate text-sm font-medium",
										children: o.customers?.name ?? "—"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 truncate text-xs text-muted-foreground",
									children: [o.devices ? `${o.devices.brand} ${o.devices.model} — ` : "", o.reported_issue]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: cn("shrink-0 text-[10px] font-semibold", STATUS_COLOR[o.status]),
								children: STATUS_LABEL[o.status]
							})]
						})
					})
				}, o.id))
			})
		]
	});
}
//#endregion
export { OrdersLayout as component };
