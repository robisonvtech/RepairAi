import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-tCc0-7Lo.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as UnifyMascot } from "./UnifyMascot-sfREiZQZ.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { R as Gem, W as Crown, b as Save, k as LogOut, m as Sparkles } from "../_libs/lucide-react.mjs";
import { t as usePlan } from "./usePlan-BWmzByx8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-DJyBTeAm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)("");
	const [subscription, setSubscription] = (0, import_react.useState)("free");
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data: user } = await supabase.auth.getUser();
			if (!user.user) return;
			setEmail(user.user.email ?? "");
			const { data: p } = await supabase.from("profiles").select("*").eq("id", user.user.id).maybeSingle();
			if (p) {
				setDisplayName(p.display_name ?? "");
				setAvatarUrl(p.avatar_url ?? "");
				setSubscription(p.subscription_status ?? "free");
			}
		})();
	}, []);
	async function save() {
		setLoading(true);
		const { data: user } = await supabase.auth.getUser();
		if (!user.user) return;
		const { error } = await supabase.from("profiles").upsert({
			id: user.user.id,
			display_name: displayName,
			avatar_url: avatarUrl || null
		});
		setLoading(false);
		if (error) return toast.error(error.message);
		toast.success("Perfil atualizado.");
	}
	async function logout() {
		await supabase.auth.signOut();
		navigate({ to: "/auth" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-aura absolute inset-x-0 top-0 -z-10 h-72" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "premium-card relative overflow-hidden p-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex items-center justify-center",
						children: avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: avatarUrl,
							alt: "",
							className: "h-24 w-24 rounded-full border-2 border-primary object-cover shadow-[0_10px_30px_-10px_oklch(0.505_0.235_27.5/0.5)]"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
							size: 112,
							state: "idle",
							aura: true,
							elite: subscription === "elite"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-xl font-bold tracking-tight",
						children: displayName || "Técnico"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${subscription === "elite" ? "gradient-primary text-primary-foreground elite-glow" : subscription === "pro" ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
						children: subscription === "elite" ? "ELITE · Acesso total" : subscription === "pro" ? "PRO Mensal · R$ 19,90" : "Plano Gratuito"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanSwitcher, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 space-y-3 premium-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Informações"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "p-name",
							children: "Nome"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "p-name",
							value: displayName,
							onChange: (e) => setDisplayName(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "p-avatar",
							children: "URL da foto de perfil (opcional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "p-avatar",
							placeholder: "https://...",
							value: avatarUrl,
							onChange: (e) => setAvatarUrl(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: save,
						disabled: loading,
						className: "w-full gradient-primary text-primary-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "mr-2 h-4 w-4" }),
							" ",
							loading ? "Salvando..." : "Salvar alterações"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: logout,
				className: "mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-destructive transition hover:bg-destructive/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sair"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-center text-xs text-muted-foreground",
				children: "Unify RepairAI · v1.0"
			})
		]
	});
}
function PlanSwitcher() {
	const { plan, canSwitch, setOverride, override } = usePlan();
	if (!canSwitch) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-4 premium-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				children: "Visualizar como plano"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground",
				children: "Admin: alterne entre os três layouts."
			})] }), override && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setOverride(null),
				className: "text-[11px] font-medium text-primary hover:underline",
				children: "Restaurar"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-2",
			children: [
				{
					id: "start",
					label: "START",
					desc: "Light minimal",
					icon: Sparkles
				},
				{
					id: "pro",
					label: "PRO",
					desc: "Light premium",
					icon: Crown
				},
				{
					id: "elite",
					label: "ELITE",
					desc: "Dark futurista",
					icon: Gem
				}
			].map((o) => {
				const active = plan === o.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setOverride(o.id),
					className: cn("flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition", active ? "gradient-primary border-transparent text-primary-foreground shadow-[0_10px_24px_-10px_oklch(0.505_0.235_27.5/0.5)]" : "border-border bg-card hover:border-primary/40"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o.icon, { className: cn("h-5 w-5", active ? "text-primary-foreground" : "text-primary") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold tracking-wide",
							children: o.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-[10px]", active ? "text-primary-foreground/80" : "text-muted-foreground"),
							children: o.desc
						})
					]
				}, o.id);
			})
		})]
	});
}
//#endregion
export { ProfilePage as component };
