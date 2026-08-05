import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-tCc0-7Lo.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { C as Plus, O as Mail, w as Phone, y as Search } from "../_libs/lucide-react.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, t as Dialog } from "./dialog-B8mBdC_P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-WCzjeTVi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CustomersPage() {
	const [list, setList] = (0, import_react.useState)([]);
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		email: "",
		doc: "",
		address: "",
		notes: ""
	});
	async function load() {
		const { data } = await supabase.from("customers").select("*").order("created_at", { ascending: false }).limit(500);
		setList(data ?? []);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	async function submit(e) {
		e.preventDefault();
		if (!form.name.trim()) return toast.error("Nome obrigatório.");
		const { data: u } = await supabase.auth.getUser();
		if (!u.user) return;
		if (form.phone) {
			const { data: dup } = await supabase.from("customers").select("id").eq("phone", form.phone.trim()).maybeSingle();
			if (dup) return toast.error("Já existe um cliente com esse telefone.");
		}
		const { error } = await supabase.from("customers").insert({
			owner_id: u.user.id,
			name: form.name.trim(),
			phone: form.phone.trim() || null,
			email: form.email.trim() || null,
			doc: form.doc.trim() || null,
			address: form.address.trim() || null,
			notes: form.notes.trim() || null
		});
		if (error) return toast.error(error.message);
		toast.success("Cliente cadastrado.");
		setForm({
			name: "",
			phone: "",
			email: "",
			doc: "",
			address: "",
			notes: ""
		});
		setOpen(false);
		load();
	}
	const filtered = list.filter((c) => {
		if (!q.trim()) return true;
		const s = q.toLowerCase();
		return c.name.toLowerCase().includes(s) || (c.phone?.includes(s) ?? false) || (c.email?.toLowerCase().includes(s) ?? false);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-bold",
					children: "Clientes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [list.length, " cadastrados."]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open,
					onOpenChange: setOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Novo"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "max-w-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Novo cliente" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submit,
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Nome *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.name,
									onChange: (e) => setForm({
										...form,
										name: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Telefone"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.phone,
										onChange: (e) => setForm({
											...form,
											phone: e.target.value
										})
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Documento"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.doc,
										onChange: (e) => setForm({
											...form,
											doc: e.target.value
										})
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "E-mail"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									value: form.email,
									onChange: (e) => setForm({
										...form,
										email: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Endereço"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.address,
									onChange: (e) => setForm({
										...form,
										address: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Notas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: form.notes,
									onChange: (e) => setForm({
										...form,
										notes: e.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "w-full",
									children: "Salvar"
								})
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Buscar por nome, telefone, e-mail...",
					className: "pl-9"
				})]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground",
				children: "Nenhum cliente encontrado."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border bg-card p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground",
							children: [c.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3" }),
									" ",
									c.phone
								]
							}), c.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3 w-3" }),
									" ",
									c.email
								]
							})]
						}),
						c.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: c.notes
						})
					]
				}, c.id))
			})
		]
	});
}
//#endregion
export { CustomersPage as component };
