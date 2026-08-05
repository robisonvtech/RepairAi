import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as useServerFn, r as createServerFn } from "./vendor_react-CFh17dx82.mjs";
import { t as createSsrRpc } from "./vendor_tanstack-DcRIe6u_.mjs";
import { r as Route$8 } from "./router-DZj4C1IY.mjs";
import { r as Wrench } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { a as formatOSNumber, i as formatBRL, n as STATUS_LABEL, t as STATUS_COLOR } from "./orders-DZbTO4dH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track._token-Pi5ero6V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getTracking = createServerFn({ method: "GET" }).validator((d) => {
	const t = d?.token;
	if (!t || typeof t !== "string" || t.length < 8 || t.length > 128) throw new Error("Token inválido.");
	return { token: t };
}).handler(createSsrRpc("44349b834a517b77e70481c86ca918c5795b2c70b992c06bf131eed1cb9c69e5"));
function TrackPage() {
	const { token } = Route$8.useParams();
	const fetchTracking = useServerFn(getTracking);
	const [data, setData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		fetchTracking({ data: { token } }).then((res) => setData(JSON.parse(res.json) ?? "notfound")).catch(() => setData("notfound"));
	}, [token, fetchTracking]);
	if (data === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-center text-sm text-muted-foreground",
		children: "Carregando…"
	});
	if (data === "notfound") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md p-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-2 text-xl font-bold",
			children: "OS não encontrada"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Confira o link recebido."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md px-4 py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-5 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-bold",
						children: "Acompanhamento de reparo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "RepairAI"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mb-4 rounded-2xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: "Ordem de Serviço"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-bold",
							children: formatOSNumber(data.number)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: STATUS_COLOR[data.status],
							children: STATUS_LABEL[data.status]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [
							"Olá, ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data.customer.name }),
							"! Aqui está o status do seu ",
							data.device.brand,
							" ",
							data.device.model,
							"."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mb-4 rounded-2xl border border-border bg-card p-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-xs",
								children: "Aparelho"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-right",
								children: [
									data.device.brand,
									" ",
									data.device.model
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-xs",
								children: "Defeito"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: data.reported_issue
							}),
							data.diagnosis && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-xs",
								children: "Diagnóstico"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: data.diagnosis
							})] }),
							data.price_cents > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-xs",
								children: "Valor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right font-semibold",
								children: formatBRL(data.price_cents)
							})] }),
							data.estimated_delivery && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-xs",
								children: "Prazo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: new Date(data.estimated_delivery).toLocaleDateString("pt-BR")
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-xs",
								children: "Garantia"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-right",
								children: [data.warranty_days, " dias"]
							})
						]
					}), data.customer_notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-lg bg-muted/50 p-3 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-muted-foreground",
							children: "Mensagem do técnico"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: data.customer_notes
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-sm font-semibold",
						children: "Histórico"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-3",
						children: data.events.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "flex gap-3 border-l-2 border-primary/40 pl-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-medium",
								children: [e.type === "created" && "OS aberta", e.type === "status_change" && `${STATUS_LABEL[e.payload.from] ?? ""} → ${STATUS_LABEL[e.payload.to] ?? ""}`]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: new Date(e.created_at).toLocaleString("pt-BR")
							})] })
						}, i))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-[11px] text-muted-foreground",
					children: "Powered by RepairAI"
				})
			]
		})
	});
}
//#endregion
export { TrackPage as component };
