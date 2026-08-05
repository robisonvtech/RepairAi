import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-tCc0-7Lo.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route$7 } from "./router-DZj4C1IY.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { C as Plus, K as Copy, S as Printer, dt as ArrowLeft, n as X, u as Trash2 } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { a as formatOSNumber, i as formatBRL, n as STATUS_LABEL, o as publicBaseUrl, r as STATUS_ORDER, t as STATUS_COLOR } from "./orders-DZbTO4dH.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders._id-DZiUaBj4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
function OrderDetail() {
	const { id } = Route$7.useParams();
	const nav = useNavigate();
	const [o, setO] = (0, import_react.useState)(null);
	const [events, setEvents] = (0, import_react.useState)([]);
	const [qr, setQr] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [orderParts, setOrderParts] = (0, import_react.useState)([]);
	const [stock, setStock] = (0, import_react.useState)([]);
	const [selectedPartId, setSelectedPartId] = (0, import_react.useState)("");
	const [manualName, setManualName] = (0, import_react.useState)("");
	const [manualPrice, setManualPrice] = (0, import_react.useState)("0,00");
	const [addQty, setAddQty] = (0, import_react.useState)("1");
	const load = (0, import_react.useCallback)(async () => {
		const { data } = await supabase.from("service_orders").select("*, customers(id, name, phone, email), devices(id, brand, model, imei, color, device_password, battery_pct, accessories, condition)").eq("id", id).maybeSingle();
		setO(data);
		const { data: ev } = await supabase.from("service_order_events").select("id, type, payload, created_at").eq("order_id", id).order("created_at", { ascending: true });
		setEvents(ev ?? []);
		if (data?.public_token) {
			const url = `${publicBaseUrl()}/track/${data.public_token}`;
			const dataUrl = await import_lib.toDataURL(url, {
				width: 200,
				margin: 1
			});
			setQr(dataUrl);
		}
		const { data: op } = await supabase.from("order_parts").select("id, part_id, name, qty, unit_price_cents").eq("order_id", id).order("created_at", { ascending: true });
		setOrderParts(op ?? []);
		const { data: st } = await supabase.from("parts").select("id, name, brand, model, price_cents, stock_qty").order("name");
		setStock(st ?? []);
	}, [id]);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	async function updateStatus(s) {
		setSaving(true);
		const { error } = await supabase.from("service_orders").update({ status: s }).eq("id", id);
		setSaving(false);
		if (error) return toast.error(error.message);
		toast.success("Status atualizado.");
		load();
	}
	async function saveField(patch) {
		setSaving(true);
		const { error } = await supabase.from("service_orders").update(patch).eq("id", id);
		setSaving(false);
		if (error) return toast.error(error.message);
		toast.success("Salvo.");
		load();
	}
	async function addPart() {
		const qty = parseInt(addQty, 10) || 1;
		if (qty <= 0) return toast.error("Quantidade inválida.");
		const { data: u } = await supabase.auth.getUser();
		if (!u.user) return;
		let payload;
		if (selectedPartId) {
			const p = stock.find((s) => s.id === selectedPartId);
			if (!p) return toast.error("Peça não encontrada.");
			if (p.stock_qty < qty) return toast.error("Estoque insuficiente.");
			payload = {
				owner_id: u.user.id,
				order_id: id,
				part_id: p.id,
				name: p.name,
				qty,
				unit_price_cents: p.price_cents
			};
		} else {
			if (!manualName.trim()) return toast.error("Selecione uma peça ou informe o nome.");
			const cents = Math.round(parseFloat(manualPrice.replace(",", ".") || "0") * 100);
			payload = {
				owner_id: u.user.id,
				order_id: id,
				part_id: null,
				name: manualName.trim(),
				qty,
				unit_price_cents: cents
			};
		}
		const { error } = await supabase.from("order_parts").insert(payload);
		if (error) return toast.error(error.message);
		toast.success("Peça adicionada.");
		setSelectedPartId("");
		setManualName("");
		setManualPrice("0,00");
		setAddQty("1");
		load();
	}
	async function removePart(pid) {
		const { error } = await supabase.from("order_parts").delete().eq("id", pid);
		if (error) return toast.error(error.message);
		load();
	}
	async function removeOrder() {
		if (!confirm("Excluir esta OS? Esta ação não pode ser desfeita.")) return;
		const { error } = await supabase.from("service_orders").delete().eq("id", id);
		if (error) return toast.error(error.message);
		toast.success("OS excluída.");
		nav({ to: "/orders" });
	}
	const partsTotal = orderParts.reduce((s, p) => s + p.qty * p.unit_price_cents, 0);
	if (!o) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-6 text-sm text-muted-foreground",
		children: "Carregando…"
	});
	const trackUrl = `${publicBaseUrl()}/track/${o.public_token}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-aura absolute inset-x-0 top-0 -z-10 h-56" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-4 flex items-center gap-2 print:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/orders",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "gradient-text text-2xl font-bold tracking-tight",
							children: formatOSNumber(o.number)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: ["Criada em ", new Date(o.created_at).toLocaleString("pt-BR")]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						onClick: () => window.print(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "ghost",
						onClick: removeOrder,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "premium-card mb-4 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: STATUS_COLOR[o.status],
						children: STATUS_LABEL[o.status]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: STATUS_ORDER.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: saving || s === o.status,
						onClick: () => updateStatus(s),
						className: `rounded-full border px-3 py-1 text-[11px] font-semibold transition ${s === o.status ? "gradient-primary border-transparent text-primary-foreground shadow-[0_6px_16px_-8px_oklch(0.505_0.235_27.5/0.6)]" : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"}`,
						children: STATUS_LABEL[s]
					}, s))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-4 rounded-xl border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-sm font-semibold",
						children: "Cliente"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: o.customers?.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							o.customers?.phone ?? "—",
							" · ",
							o.customers?.email ?? "—"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-4 rounded-xl border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-sm font-semibold",
						children: "Aparelho"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium",
						children: [
							o.devices?.brand,
							" ",
							o.devices?.model
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-2 grid grid-cols-2 gap-y-1 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "IMEI"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: o.devices?.imei ?? "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Cor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: o.devices?.color ?? "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Senha"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-mono",
								children: o.devices?.device_password ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Bateria"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: o.devices?.battery_pct ? `${o.devices.battery_pct}%` : "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Acessórios"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: o.devices?.accessories?.length ? o.devices.accessories.join(", ") : "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Condição"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: o.devices?.condition ?? "—" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-4 rounded-xl border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-sm font-semibold",
						children: "Serviço"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Defeito relatado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								defaultValue: o.reported_issue,
								rows: 2,
								onBlur: (e) => e.target.value !== o.reported_issue && saveField({ reported_issue: e.target.value })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Diagnóstico técnico"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								defaultValue: o.diagnosis ?? "",
								rows: 3,
								onBlur: (e) => saveField({ diagnosis: e.target.value || null })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Valor"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										defaultValue: (o.price_cents / 100).toFixed(2).replace(".", ","),
										onBlur: (e) => {
											const cents = Math.round(parseFloat(e.target.value.replace(",", ".") || "0") * 100);
											if (cents !== o.price_cents) saveField({ price_cents: cents });
										}
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Garantia (dias)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										defaultValue: o.warranty_days,
										onBlur: (e) => {
											const v = parseInt(e.target.value, 10) || 0;
											if (v !== o.warranty_days) saveField({ warranty_days: v });
										}
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Prazo"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										defaultValue: o.estimated_delivery ?? "",
										onBlur: (e) => saveField({ estimated_delivery: e.target.value || null })
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Nota para o cliente (aparece no link público)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								defaultValue: o.customer_notes ?? "",
								rows: 2,
								onBlur: (e) => saveField({ customer_notes: e.target.value || null })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Notas internas (só técnico)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								defaultValue: o.internal_notes ?? "",
								rows: 2,
								onBlur: (e) => saveField({ internal_notes: e.target.value || null })
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-1 text-right text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground",
							children: ["Peças: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: formatBRL(partsTotal)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-semibold",
							children: ["Total: ", formatBRL(o.price_cents + partsTotal)]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-4 rounded-xl border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-sm font-semibold",
						children: "Peças usadas"
					}),
					orderParts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Nenhuma peça vinculada."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mb-3 space-y-1.5",
						children: orderParts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-medium",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-muted-foreground",
									children: [
										p.qty,
										"× · ",
										formatBRL(p.unit_price_cents),
										" un"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: formatBRL(p.qty * p.unit_price_cents)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									onClick: () => removePart(p.id),
									className: "print:hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5 text-destructive" })
								})]
							})]
						}, p.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-dashed border-border p-2 print:hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Do estoque"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: selectedPartId || "none",
									onValueChange: (v) => setSelectedPartId(v === "none" ? "" : v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecionar peça..." }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "none",
										children: "— Peça avulsa (manual) —"
									}), stock.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: s.id,
										disabled: s.stock_qty <= 0,
										children: [
											s.name,
											s.brand ? ` · ${s.brand}` : "",
											" — ",
											s.stock_qty,
											" un · ",
											formatBRL(s.price_cents)
										]
									}, s.id))] })]
								})]
							}),
							!selectedPartId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Nome"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: manualName,
									onChange: (e) => setManualName(e.target.value),
									placeholder: "Ex: Cola B7000"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Preço (R$)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: manualPrice,
									onChange: (e) => setManualPrice(e.target.value)
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-24",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Qtd"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										value: addQty,
										onChange: (e) => setAddQty(e.target.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: addPart,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Adicionar peça"]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-4 rounded-xl border border-border bg-card p-4 print:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-sm font-semibold",
					children: "Acompanhamento do cliente"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [qr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: qr,
						alt: "QR",
						className: "h-24 w-24 rounded border border-border"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: trackUrl
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => {
									navigator.clipboard.writeText(trackUrl);
									toast.success("Link copiado.");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), " Copiar link"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: trackUrl,
									target: "_blank",
									rel: "noreferrer",
									children: "Abrir"
								})
							})]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-card p-4 print:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-sm font-semibold",
					children: "Timeline"
				}), events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Sem eventos."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-2",
					children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "flex gap-3 border-l-2 border-primary/30 pl-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-medium",
								children: [
									e.type === "created" && "OS criada",
									e.type === "status_change" && `Status: ${STATUS_LABEL[e.payload.from] ?? e.payload.from} → ${STATUS_LABEL[e.payload.to] ?? e.payload.to}`,
									e.type !== "created" && e.type !== "status_change" && e.type
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: new Date(e.created_at).toLocaleString("pt-BR")
							})]
						})
					}, e.id))
				})]
			})
		]
	});
}
//#endregion
export { OrderDetail as component };
