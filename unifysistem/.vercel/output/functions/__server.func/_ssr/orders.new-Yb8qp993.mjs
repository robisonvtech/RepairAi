import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-tCc0-7Lo.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { dt as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.new-Yb8qp993.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewOrder() {
	const nav = useNavigate();
	const [customers, setCustomers] = (0, import_react.useState)([]);
	const [customerId, setCustomerId] = (0, import_react.useState)("");
	const [newCustomer, setNewCustomer] = (0, import_react.useState)({
		name: "",
		phone: ""
	});
	const [device, setDevice] = (0, import_react.useState)({
		brand: "",
		model: "",
		imei: "",
		color: "",
		device_password: "",
		accessories: "",
		condition: "",
		battery_pct: ""
	});
	const [reported, setReported] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)("");
	const [warranty, setWarranty] = (0, import_react.useState)("90");
	const [estimated, setEstimated] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data } = await supabase.from("customers").select("id, name, phone").order("name").limit(500);
			setCustomers(data ?? []);
		})();
	}, []);
	async function submit(e) {
		e.preventDefault();
		if (!reported.trim()) return toast.error("Informe o defeito relatado.");
		if (!device.brand.trim() || !device.model.trim()) return toast.error("Informe marca e modelo.");
		if (!customerId && !newCustomer.name.trim()) return toast.error("Selecione ou cadastre um cliente.");
		setSaving(true);
		try {
			const { data: u } = await supabase.auth.getUser();
			const uid = u.user?.id;
			if (!uid) throw new Error("Sessão expirada.");
			let finalCustomerId = customerId;
			if (!finalCustomerId) {
				if (newCustomer.phone) {
					const { data: dup } = await supabase.from("customers").select("id").eq("phone", newCustomer.phone).maybeSingle();
					if (dup) finalCustomerId = dup.id;
				}
				if (!finalCustomerId) {
					const { data: c, error: cErr } = await supabase.from("customers").insert({
						owner_id: uid,
						name: newCustomer.name.trim(),
						phone: newCustomer.phone.trim() || null
					}).select("id").single();
					if (cErr) throw cErr;
					finalCustomerId = c.id;
				}
			}
			const accessories = device.accessories.split(",").map((a) => a.trim()).filter(Boolean);
			const { data: dev, error: dErr } = await supabase.from("devices").insert({
				owner_id: uid,
				customer_id: finalCustomerId,
				brand: device.brand.trim(),
				model: device.model.trim(),
				imei: device.imei.trim() || null,
				color: device.color.trim() || null,
				device_password: device.device_password.trim() || null,
				accessories,
				condition: device.condition.trim() || null,
				battery_pct: device.battery_pct ? parseInt(device.battery_pct, 10) : null
			}).select("id").single();
			if (dErr) throw dErr;
			const { data: order, error: oErr } = await supabase.from("service_orders").insert({
				owner_id: uid,
				customer_id: finalCustomerId,
				device_id: dev.id,
				reported_issue: reported.trim(),
				price_cents: price ? Math.round(parseFloat(price.replace(",", ".")) * 100) : 0,
				warranty_days: parseInt(warranty, 10) || 90,
				estimated_delivery: estimated || null
			}).select("id").single();
			if (oErr) throw oErr;
			toast.success("OS criada!");
			nav({
				to: "/orders/$id",
				params: { id: order.id }
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Erro ao criar OS.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-4 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/orders",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-bold",
				children: "Nova OS"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-3 text-sm font-semibold",
							children: "Cliente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Cliente existente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: customerId,
							onChange: (e) => setCustomerId(e.target.value),
							className: "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "— Novo cliente —"
							}), customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: c.id,
								children: [
									c.name,
									" ",
									c.phone ? `(${c.phone})` : ""
								]
							}, c.id))]
						}),
						!customerId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Nome *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: newCustomer.name,
									onChange: (e) => setNewCustomer({
										...newCustomer,
										name: e.target.value
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Telefone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: newCustomer.phone,
									onChange: (e) => setNewCustomer({
										...newCustomer,
										phone: e.target.value
									})
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-sm font-semibold",
						children: "Aparelho"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Marca *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: device.brand,
								onChange: (e) => setDevice({
									...device,
									brand: e.target.value
								}),
								placeholder: "Apple, Samsung..."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Modelo *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: device.model,
								onChange: (e) => setDevice({
									...device,
									model: e.target.value
								}),
								placeholder: "iPhone 13, S23..."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "IMEI"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: device.imei,
								onChange: (e) => setDevice({
									...device,
									imei: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Cor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: device.color,
								onChange: (e) => setDevice({
									...device,
									color: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Senha do aparelho"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: device.device_password,
								onChange: (e) => setDevice({
									...device,
									device_password: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Bateria (%)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: device.battery_pct,
								onChange: (e) => setDevice({
									...device,
									battery_pct: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Acessórios (separados por vírgula)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: device.accessories,
									onChange: (e) => setDevice({
										...device,
										accessories: e.target.value
									}),
									placeholder: "Capa, cabo, película"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Condição / observações"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: device.condition,
									onChange: (e) => setDevice({
										...device,
										condition: e.target.value
									}),
									placeholder: "Trincado, riscos na traseira..."
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-3 text-sm font-semibold",
							children: "Serviço"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Defeito relatado *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: reported,
							onChange: (e) => setReported(e.target.value),
							rows: 3,
							placeholder: "Ex.: Não liga após queda."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Valor (R$)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: price,
									onChange: (e) => setPrice(e.target.value),
									placeholder: "0,00"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Garantia (dias)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: warranty,
									onChange: (e) => setWarranty(e.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Prazo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: estimated,
									onChange: (e) => setEstimated(e.target.value)
								})] })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: saving,
					className: "w-full",
					children: saving ? "Salvando…" : "Criar OS"
				})
			]
		})]
	});
}
//#endregion
export { NewOrder as component };
