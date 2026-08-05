import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-tCc0-7Lo.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as hasAccessToApp } from "./router-DZj4C1IY.mjs";
import { t as UnifyMascot } from "./UnifyMascot-sfREiZQZ.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-8Hw-uoh6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var checkoutPlans = [
	{
		key: "basic",
		label: "Básico",
		url: "https://pay.cakto.com.br/35cd3tw_1003437",
		description: "Acesso inicial"
	},
	{
		key: "pro",
		label: "Pro",
		url: "https://pay.cakto.com.br/39rgatt_1003515",
		description: "Recursos avançados"
	},
	{
		key: "elite",
		label: "Elite",
		url: "https://pay.cakto.com.br/3bd8aqj_1003534",
		description: "Acesso completo"
	}
];
function AuthPage() {
	const navigate = useNavigate();
	const [tab, setTab] = (0, import_react.useState)("login");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [paymentRequired, setPaymentRequired] = (0, import_react.useState)(false);
	const [selectedPlan, setSelectedPlan] = (0, import_react.useState)("basic");
	async function canAccess(userId) {
		const [{ data: profile }, { data: roles }] = await Promise.all([supabase.from("profiles").select("subscription_status").eq("id", userId).maybeSingle(), supabase.from("user_roles").select("role").eq("user_id", userId)]);
		return hasAccessToApp(profile?.subscription_status) || (roles ?? []).some((role) => role.role === "admin");
	}
	function openCheckout(plan = selectedPlan) {
		const planConfig = checkoutPlans.find((item) => item.key === plan);
		if (!planConfig?.url) return toast.error(`Checkout do plano ${planConfig?.label ?? plan} ainda nao foi configurado.`);
		window.location.assign(planConfig.url);
	}
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(async ({ data }) => {
			if (!data.session?.user) return;
			if (await canAccess(data.session.user.id)) navigate({ to: "/chat" });
			else {
				await supabase.auth.signOut();
				setPaymentRequired(true);
			}
		});
	}, [navigate]);
	async function handleLogin(e) {
		e.preventDefault();
		setLoading(true);
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setLoading(false);
		if (error) return toast.error(error.message);
		if (!data.user || !await canAccess(data.user.id)) {
			await supabase.auth.signOut();
			setPaymentRequired(true);
			return toast.error("Sua assinatura ainda nao esta ativa.");
		}
		toast.success("Bem-vindo!");
		navigate({ to: "/chat" });
	}
	async function handleSignup(e) {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: window.location.origin,
				data: { display_name: name }
			}
		});
		setLoading(false);
		if (error) return toast.error(error.message);
		await supabase.auth.signOut();
		toast.success("Conta criada. Continue para assinar.");
		openCheckout(selectedPlan);
	}
	async function handleReset(e) {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
		setLoading(false);
		if (error) return toast.error(error.message);
		toast.success("E-mail de redefinicao enviado.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex flex-col items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
						size: 88,
						state: "idle"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-2 text-2xl font-bold tracking-tight",
						children: ["Repair", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "AI"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Assistente Unify para tecnicos"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-sm",
				children: [paymentRequired && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "Assinatura necessaria"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Escolha o plano e continue para o checkout."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-2",
							children: checkoutPlans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSelectedPlan(plan.key),
								className: `w-full rounded-lg border px-3 py-2 text-left ${selectedPlan === plan.key ? "border-primary bg-primary/10" : "border-border bg-background"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: plan.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-muted-foreground",
										children: plan.description
									})]
								})
							}, plan.key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "mt-3 w-full",
							onClick: () => openCheckout(selectedPlan),
							children: "Assinar agora"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					value: tab,
					onValueChange: (v) => setTab(v),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "login",
								children: "Entrar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "signup",
								children: "Criar conta"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "login",
							className: "mt-4",
							children: tab === "reset" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleReset,
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "r-email",
											children: "E-mail"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "r-email",
											type: "email",
											required: true,
											value: email,
											onChange: (e) => setEmail(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full",
										disabled: loading,
										children: "Enviar link"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setTab("login"),
										className: "w-full text-xs text-muted-foreground hover:text-foreground",
										children: "Voltar"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleLogin,
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "l-email",
											children: "E-mail"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "l-email",
											type: "email",
											required: true,
											value: email,
											onChange: (e) => setEmail(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "l-pw",
											children: "Senha"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "l-pw",
											type: "password",
											required: true,
											value: password,
											onChange: (e) => setPassword(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full",
										disabled: loading,
										children: loading ? "Entrando..." : "Entrar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setTab("reset"),
										className: "w-full text-xs text-muted-foreground hover:text-foreground",
										children: "Esqueci minha senha"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "signup",
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSignup,
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "s-name",
											children: "Nome"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "s-name",
											required: true,
											value: name,
											onChange: (e) => setName(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "s-email",
											children: "E-mail"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "s-email",
											type: "email",
											required: true,
											value: email,
											onChange: (e) => setEmail(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "s-pw",
											children: "Senha"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "s-pw",
											type: "password",
											required: true,
											minLength: 6,
											value: password,
											onChange: (e) => setPassword(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full",
										disabled: loading,
										children: loading ? "Criando..." : "Criar conta e assinar"
									})
								]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-center text-xs text-muted-foreground",
				children: ["Ao continuar, voce concorda com nossos termos de uso. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "underline",
					children: "Voltar"
				})]
			})
		]
	});
}
//#endregion
export { AuthPage as component };
