import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-tCc0-7Lo.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { C as Plus, Q as CircleArrowDown, T as Package, Z as CircleArrowUp, s as TriangleAlert, u as Trash2, y as Search } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-B8mBdC_P.mjs";
import { i as formatBRL } from "./orders-DZbTO4dH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-Xb8qNpRr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InventoryPage() {
	const [parts, setParts] = (0, import_react.useState)([]);
	const [q, setQ] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		sku: "",
		brand: "",
		model: "",
		category: "",
		cost: "0,00",
		price: "0,00",
		stock_qty: "0",
		min_stock: "0",
		notes: ""
	});
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		const { data } = await supabase.from("parts").select("*").order("name");
		setParts(data ?? []);
		setLoading(false);
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	function openNew() {
		setEditing(null);
		setForm({
			name: "",
			sku: "",
			brand: "",
			model: "",
			category: "",
			cost: "0,00",
			price: "0,00",
			stock_qty: "0",
			min_stock: "0",
			notes: ""
		});
		setOpen(true);
	}
	function openEdit(p) {
		setEditing(p);
		setForm({
			name: p.name,
			sku: p.sku ?? "",
			brand: p.brand ?? "",
			model: p.model ?? "",
			category: p.category ?? "",
			cost: (p.cost_cents / 100).toFixed(2).replace(".", ","),
			price: (p.price_cents / 100).toFixed(2).replace(".", ","),
			stock_qty: String(p.stock_qty),
			min_stock: String(p.min_stock),
			notes: p.notes ?? ""
		});
		setOpen(true);
	}
	async function save() {
		if (!form.name.trim()) return toast.error("Informe o nome da peça.");
		const { data: u } = await supabase.auth.getUser();
		if (!u.user) return toast.error("Faça login.");
		const payload = {
			owner_id: u.user.id,
			name: form.name.trim(),
			sku: form.sku.trim() || null,
			brand: form.brand.trim() || null,
			model: form.model.trim() || null,
			category: form.category.trim() || null,
			cost_cents: Math.round(parseFloat(form.cost.replace(",", ".") || "0") * 100),
			price_cents: Math.round(parseFloat(form.price.replace(",", ".") || "0") * 100),
			stock_qty: parseInt(form.stock_qty, 10) || 0,
			min_stock: parseInt(form.min_stock, 10) || 0,
			notes: form.notes.trim() || null
		};
		const { error } = await (editing ? supabase.from("parts").update(payload).eq("id", editing.id) : supabase.from("parts").insert(payload));
		if (error) return toast.error(error.message);
		toast.success(editing ? "Peça atualizada." : "Peça cadastrada.");
		setOpen(false);
		load();
	}
	async function adjust(p, delta) {
		const newQty = p.stock_qty + delta;
		if (newQty < 0) return toast.error("Estoque não pode ficar negativo.");
		const { data: u } = await supabase.auth.getUser();
		if (!u.user) return;
		const { error } = await supabase.from("parts").update({ stock_qty: newQty }).eq("id", p.id);
		if (error) return toast.error(error.message);
		await supabase.from("stock_movements").insert({
			owner_id: u.user.id,
			part_id: p.id,
			type: delta > 0 ? "in" : "adjust",
			qty: Math.abs(delta),
			reason: delta > 0 ? "Entrada manual" : "Ajuste manual"
		});
		load();
	}
	async function remove(p) {
		if (!confirm(`Excluir "${p.name}"?`)) return;
		const { error } = await supabase.from("parts").delete().eq("id", p.id);
		if (error) return toast.error(error.message);
		toast.success("Peça excluída.");
		load();
	}
	const filtered = parts.filter((p) => {
		if (!q.trim()) return true;
		const s = q.toLowerCase();
		return p.name.toLowerCase().includes(s) || (p.sku?.toLowerCase().includes(s) ?? false) || (p.brand?.toLowerCase().includes(s) ?? false) || (p.model?.toLowerCase().includes(s) ?? false);
	});
	const low = parts.filter((p) => p.stock_qty <= p.min_stock).length;
	const totalValue = parts.reduce((s, p) => s + p.stock_qty * p.cost_cents, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-bold",
					children: "Estoque"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						parts.length,
						" peças · valor: ",
						formatBRL(totalValue)
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: openNew,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Nova"]
				})]
			}),
			low > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-amber-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: low }), " peça(s) com estoque abaixo do mínimo."] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Buscar peça, SKU, marca...",
					className: "pl-9"
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-8 text-center text-sm text-muted-foreground",
				children: "Carregando…"
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "mx-auto mb-2 h-6 w-6" }), "Nenhuma peça no estoque."]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: filtered.map((p) => {
					const isLow = p.stock_qty <= p.min_stock;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-xl border border-border bg-card p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => openEdit(p),
								className: "min-w-0 flex-1 text-left",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate text-sm font-semibold",
											children: p.name
										}), isLow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "border-amber-500/40 bg-amber-500/10 text-[10px] text-amber-700 dark:text-amber-300",
											children: "Baixo"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 text-xs text-muted-foreground",
										children: [
											p.brand,
											p.model,
											p.sku
										].filter(Boolean).join(" · ") || "Sem detalhes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex items-center gap-3 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-medium",
												children: [p.stock_qty, " un"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground",
												children: ["custo ", formatBRL(p.cost_cents)]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-primary",
												children: ["venda ", formatBRL(p.price_cents)]
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										onClick: () => adjust(p, 1),
										title: "Entrada",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleArrowUp, { className: "h-4 w-4 text-emerald-600" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										onClick: () => adjust(p, -1),
										title: "Saída",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleArrowDown, { className: "h-4 w-4 text-orange-600" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										onClick: () => remove(p),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
									})
								]
							})]
						})
					}, p.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-h-[90vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "Editar peça" : "Nova peça" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.name,
									onChange: (e) => setForm({
										...form,
										name: e.target.value
									}),
									placeholder: "Tela iPhone 11"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Marca" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.brand,
											onChange: (e) => setForm({
												...form,
												brand: e.target.value
											})
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Modelo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.model,
											onChange: (e) => setForm({
												...form,
												model: e.target.value
											})
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "SKU" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.sku,
											onChange: (e) => setForm({
												...form,
												sku: e.target.value
											})
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoria" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.category,
											onChange: (e) => setForm({
												...form,
												category: e.target.value
											}),
											placeholder: "Tela, bateria..."
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Custo (R$)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.cost,
											onChange: (e) => setForm({
												...form,
												cost: e.target.value
											})
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Venda (R$)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: form.price,
											onChange: (e) => setForm({
												...form,
												price: e.target.value
											})
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Estoque" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											value: form.stock_qty,
											onChange: (e) => setForm({
												...form,
												stock_qty: e.target.value
											})
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Mínimo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											value: form.min_stock,
											onChange: (e) => setForm({
												...form,
												min_stock: e.target.value
											})
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Observações" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: form.notes,
									onChange: (e) => setForm({
										...form,
										notes: e.target.value
									})
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setOpen(false),
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: save,
							children: "Salvar"
						})] })
					]
				})]
			})
		]
	});
}
//#endregion
export { InventoryPage as component };
