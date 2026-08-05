import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-tCc0-7Lo.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
import { B as ExternalLink, C as Plus, X as CircleCheck, c as TrendingUp, i as Wallet, l as TrendingDown, u as Trash2 } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogFooter, t as Dialog } from "./dialog-B8mBdC_P.mjs";
import { i as formatBRL } from "./orders-DZbTO4dH.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/finance-BSrKZuNG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_LABEL = {
	pending: "Pendente",
	paid: "Pago",
	cancelled: "Cancelado"
};
var STATUS_CLASS = {
	pending: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
	paid: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
	cancelled: "bg-muted text-muted-foreground border-border"
};
function FinancePage() {
	const [txs, setTxs] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		type: "expense",
		description: "",
		category: "",
		amount: "0,00",
		due_date: "",
		status: "pending",
		payment_method: ""
	});
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		const { data } = await supabase.from("finance_transactions").select("*").order("due_date", {
			ascending: true,
			nullsFirst: false
		}).limit(500);
		setTxs(data ?? []);
		setLoading(false);
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	async function save() {
		if (!form.description.trim()) return toast.error("Informe a descrição.");
		const { data: u } = await supabase.auth.getUser();
		if (!u.user) return;
		const cents = Math.round(parseFloat(form.amount.replace(",", ".") || "0") * 100);
		if (cents <= 0) return toast.error("Valor inválido.");
		const { error } = await supabase.from("finance_transactions").insert({
			owner_id: u.user.id,
			type: form.type,
			description: form.description.trim(),
			category: form.category.trim() || null,
			amount_cents: cents,
			status: form.status,
			due_date: form.due_date || null,
			paid_at: form.status === "paid" ? (/* @__PURE__ */ new Date()).toISOString() : null,
			payment_method: form.payment_method.trim() || null
		});
		if (error) return toast.error(error.message);
		toast.success("Lançamento salvo.");
		setOpen(false);
		setForm({
			type: "expense",
			description: "",
			category: "",
			amount: "0,00",
			due_date: "",
			status: "pending",
			payment_method: ""
		});
		load();
	}
	async function markPaid(tx) {
		const { error } = await supabase.from("finance_transactions").update({
			status: "paid",
			paid_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", tx.id);
		if (error) return toast.error(error.message);
		toast.success("Baixado como pago.");
		load();
	}
	async function remove(tx) {
		if (!confirm("Excluir este lançamento?")) return;
		const { error } = await supabase.from("finance_transactions").delete().eq("id", tx.id);
		if (error) return toast.error(error.message);
		load();
	}
	const now = /* @__PURE__ */ new Date();
	const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
	const inMonth = (d) => d ? new Date(d) >= monthStart : false;
	const receivablesPending = txs.filter((t) => t.type === "income" && t.status === "pending");
	const payablesPending = txs.filter((t) => t.type === "expense" && t.status === "pending");
	const incomeMonth = txs.filter((t) => t.type === "income" && t.status === "paid" && inMonth(t.paid_at)).reduce((s, t) => s + t.amount_cents, 0);
	const expenseMonth = txs.filter((t) => t.type === "expense" && t.status === "paid" && inMonth(t.paid_at)).reduce((s, t) => s + t.amount_cents, 0);
	const balanceMonth = incomeMonth - expenseMonth;
	const totalReceivable = receivablesPending.reduce((s, t) => s + t.amount_cents, 0);
	const totalPayable = payablesPending.reduce((s, t) => s + t.amount_cents, 0);
	const kpis = [
		{
			label: "Receita do mês",
			value: formatBRL(incomeMonth),
			icon: TrendingUp,
			color: "text-emerald-600"
		},
		{
			label: "Despesa do mês",
			value: formatBRL(expenseMonth),
			icon: TrendingDown,
			color: "text-orange-600"
		},
		{
			label: "Saldo do mês",
			value: formatBRL(balanceMonth),
			icon: Wallet,
			color: balanceMonth >= 0 ? "text-primary" : "text-destructive"
		},
		{
			label: "A receber",
			value: formatBRL(totalReceivable),
			icon: TrendingUp,
			color: "text-amber-600"
		},
		{
			label: "A pagar",
			value: formatBRL(totalPayable),
			icon: TrendingDown,
			color: "text-red-600"
		}
	];
	function TxRow({ t }) {
		const overdue = t.status === "pending" && t.due_date && new Date(t.due_date) < new Date(now.toDateString());
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "rounded-xl border border-border bg-card p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-sm font-semibold",
									children: t.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: `text-[10px] ${STATUS_CLASS[t.status]}`,
									children: STATUS_LABEL[t.status]
								}),
								overdue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "border-destructive/40 bg-destructive/10 text-[10px] text-destructive",
									children: "Vencido"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: [
								t.category,
								t.due_date && `venc. ${new Date(t.due_date).toLocaleDateString("pt-BR")}`,
								t.payment_method
							].filter(Boolean).join(" · ") || "—"
						}),
						t.order_id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/orders/$id",
							params: { id: t.order_id },
							className: "mt-1 inline-flex items-center gap-1 text-[11px] text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" }), " Abrir OS"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `text-sm font-bold ${t.type === "income" ? "text-emerald-600" : "text-orange-600"}`,
						children: [t.type === "income" ? "+" : "−", formatBRL(t.amount_cents)]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex justify-end gap-1",
						children: [t.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							onClick: () => markPaid(t),
							title: "Baixar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-emerald-600" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							onClick: () => remove(t),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-destructive" })
						})]
					})]
				})]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-bold",
					children: "Financeiro"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Contas, caixa e recebimentos."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => setOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Novo"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 grid grid-cols-2 gap-2",
				children: kpis.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] text-muted-foreground",
							children: k.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(k.icon, { className: `h-4 w-4 ${k.color}` })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-lg font-bold",
						children: k.value
					})]
				}, k.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "receivable",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "grid w-full grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "receivable",
							children: "A receber"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "payable",
							children: "A pagar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "all",
							children: "Todos"
						})
					]
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-8 text-center text-sm text-muted-foreground",
					children: "Carregando…"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "receivable",
						children: receivablesPending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { label: "Nenhuma conta a receber." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2",
							children: receivablesPending.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxRow, { t }, t.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "payable",
						children: payablesPending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { label: "Nenhuma conta a pagar." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2",
							children: payablesPending.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxRow, { t }, t.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "all",
						children: txs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { label: "Nenhum lançamento." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2",
							children: txs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TxRow, { t }, t.id))
						})
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Novo lançamento" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tipo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.type,
									onValueChange: (v) => setForm({
										...form,
										type: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "income",
										children: "Receita"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "expense",
										children: "Despesa"
									})] })]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.status,
									onValueChange: (v) => setForm({
										...form,
										status: v
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "pending",
											children: "Pendente"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "paid",
											children: "Pago"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "cancelled",
											children: "Cancelado"
										})
									] })]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.description,
								onChange: (e) => setForm({
									...form,
									description: e.target.value
								}),
								placeholder: "Aluguel, compra de peças..."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoria" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.category,
										onChange: (e) => setForm({
											...form,
											category: e.target.value
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Valor (R$) *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.amount,
										onChange: (e) => setForm({
											...form,
											amount: e.target.value
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Vencimento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										value: form.due_date,
										onChange: (e) => setForm({
											...form,
											due_date: e.target.value
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Forma pgto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.payment_method,
										onChange: (e) => setForm({
											...form,
											payment_method: e.target.value
										}),
										placeholder: "Pix, cartão..."
									})] })
								]
							})
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
				] })
			})
		]
	});
}
function Empty({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-3 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground",
		children: label
	});
}
//#endregion
export { FinancePage as component };
