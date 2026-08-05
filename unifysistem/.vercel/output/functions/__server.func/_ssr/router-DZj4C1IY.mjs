import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { M as redirect, c as HeadContent, d as createRouter, g as createRootRouteWithContext, h as createFileRoute, m as lazyRouteComponent, p as Outlet, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as __exportAll } from "./vendor_react-CFh17dx8.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { i as sanitizeUserContent, r as containsDangerousRequest, t as REFUSAL } from "./prompt-BZG73IfD.mjs";
import { t as supabase } from "./client-tCc0-7Lo.mjs";
import { n as extractLongTermFacts } from "./memory-CkcAkHNh.mjs";
import { i as gatewayTranscribe, n as gatewaySpeech, r as gatewayStream, t as checkRateLimit } from "./gateway.server-DwpX14po.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DZj4C1IY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var PlanContext = (0, import_react.createContext)(void 0);
function PlanProvider({ children }) {
	const [plan, setPlanState] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("unify_plan");
			if (saved && [
				"start",
				"pro",
				"elite"
			].includes(saved)) return saved;
		}
		return "pro";
	});
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(true);
	const [showAdminPanel, setShowAdminPanel] = (0, import_react.useState)(false);
	const [activeMascotState, setActiveMascotState] = (0, import_react.useState)("idle");
	const setPlan = (newPlan) => {
		setPlanState(newPlan);
		if (typeof window !== "undefined") localStorage.setItem("unify_plan", newPlan);
	};
	(0, import_react.useEffect)(() => {
		const prefersDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
		const shouldUseDark = plan === "elite" || plan === "pro" || prefersDark;
		document.documentElement.classList.toggle("dark", shouldUseDark);
		document.documentElement.style.colorScheme = shouldUseDark ? "dark" : "light";
		if (typeof window !== "undefined") localStorage.setItem("unify_theme", shouldUseDark ? "dark" : "light");
	}, [plan]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanContext.Provider, {
		value: {
			plan,
			setPlan,
			isAdmin,
			setIsAdmin,
			showAdminPanel,
			setShowAdminPanel,
			activeMascotState,
			setActiveMascotState
		},
		children
	});
}
function usePlan() {
	const context = (0, import_react.useContext)(PlanContext);
	if (!context) throw new Error("usePlan must be used within a PlanProvider");
	return context;
}
var styles_default = "/assets/styles-iL05WW16.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Página não encontrada."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
					children: "Voltar"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "Algo deu errado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: error.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						router.invalidate();
						reset();
					},
					className: "mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
					children: "Tentar novamente"
				})
			]
		})
	});
}
var Route$24 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#BF0000"
			},
			{ title: "RepairAI — Assistente Unify para reparo de celulares" },
			{
				name: "description",
				content: "IA especialista em reparo de celulares. Diagnóstico por foto, vídeo e áudio para técnicos e revendedores."
			},
			{
				name: "author",
				content: "RepairAI"
			},
			{
				property: "og:title",
				content: "RepairAI — Assistente Unify para reparo de celulares"
			},
			{
				property: "og:description",
				content: "IA especialista em reparo de celulares. Diagnóstico por foto, vídeo e áudio para técnicos e revendedores."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "RepairAI — Assistente Unify para reparo de celulares"
			},
			{
				name: "twitter:description",
				content: "IA especialista em reparo de celulares. Diagnóstico por foto, vídeo e áudio para técnicos e revendedores."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3ab4b0d1-86cc-4de7-a102-a22b390c8e03/id-preview-ab0ca964--de19bdfc-bce4-4ea5-aab8-055825f389e9.lovable.app-1784666588292.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3ab4b0d1-86cc-4de7-a102-a22b390c8e03/id-preview-ab0ca964--de19bdfc-bce4-4ea5-aab8-055825f389e9.lovable.app-1784666588292.png"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$24.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
				router.invalidate();
				if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
			}
		});
		return () => sub.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PlanProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			richColors: true
		})] })
	});
}
var $$splitComponentImporter$17 = () => import("./routes-DTEZEvkE.mjs");
var Route$23 = createFileRoute("/")({
	ssr: false,
	beforeLoad: async () => {
		const { data } = await supabase.auth.getSession();
		if (data.session) throw redirect({ to: "/chat" });
		throw redirect({ to: "/auth" });
	},
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var ACTIVE_PLANS = /* @__PURE__ */ new Set([
	"start",
	"pro",
	"elite"
]);
var PLAN_VALUES = /* @__PURE__ */ new Set([
	"start",
	"pro",
	"elite",
	"free",
	"inactive"
]);
function normalizeSubscriptionStatus(value) {
	if (typeof value === "string") {
		const normalized = value.trim().toLowerCase();
		if (PLAN_VALUES.has(normalized)) return normalized;
	}
	return "free";
}
function hasAccessToApp(value) {
	return ACTIVE_PLANS.has(normalizeSubscriptionStatus(value));
}
function getPlanFromCaktoProductId(productId, env) {
	const normalizedId = productId?.trim();
	if (!normalizedId) return "free";
	const mappings = [
		["start", env.CAKTO_START_PRODUCT_ID],
		["pro", env.CAKTO_PRO_PRODUCT_ID],
		["elite", env.CAKTO_ELITE_PRODUCT_ID],
		["pro", env.CAKTO_PRODUCT_ID]
	];
	for (const [plan, configuredId] of mappings) if (configuredId && normalizedId === configuredId.trim()) return plan;
	return "free";
}
var $$splitComponentImporter$16 = () => import("./route-BLBu9K30.mjs");
var Route$22 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		const [{ data: profile }, { data: roles }] = await Promise.all([supabase.from("profiles").select("subscription_status").eq("id", data.user.id).maybeSingle(), supabase.from("user_roles").select("role").eq("user_id", data.user.id)]);
		if (!(roles ?? []).some((role) => role.role === "admin") && !hasAccessToApp(profile?.subscription_status)) {
			await supabase.auth.signOut();
			throw redirect({ to: "/auth" });
		}
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./auth-8Hw-uoh6.mjs");
var Route$21 = createFileRoute("/auth")({
	ssr: false,
	head: () => ({ meta: [{ title: "Entrar - RepairAI" }, {
		name: "description",
		content: "Entre no RepairAI para diagnosticar celulares com a IA Unify."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./reset-password-BFx5xWyz.mjs");
var Route$20 = createFileRoute("/reset-password")({
	ssr: false,
	head: () => ({ meta: [{ title: "Redefinir senha — RepairAI" }, {
		name: "description",
		content: "Defina uma nova senha para sua conta RepairAI."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./chat-P5ZZgk_K.mjs");
var Route$19 = createFileRoute("/_authenticated/chat")({
	validateSearch: (s) => ({ c: typeof s.c === "string" ? s.c : void 0 }),
	head: () => ({ meta: [
		{ title: "Chat — RepairAI" },
		{
			name: "description",
			content: "Converse com a Unify: diagnóstico, reparo e avaliação de celulares por IA."
		},
		{
			property: "og:title",
			content: "Chat — RepairAI"
		},
		{
			property: "og:description",
			content: "IA especialista em reparo de celulares."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./courses-BsdYIx8y.mjs");
var Route$18 = createFileRoute("/_authenticated/courses")({
	head: () => ({ meta: [
		{ title: "Cursos — RepairAI" },
		{
			name: "description",
			content: "Do básico à microsolda: cursos profissionais de reparo de celulares."
		},
		{
			property: "og:title",
			content: "Cursos — RepairAI"
		},
		{
			property: "og:description",
			content: "Aprenda reparo, microsolda, Face ID, diagnóstico e mais."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./customers-WCzjeTVi.mjs");
var Route$17 = createFileRoute("/_authenticated/customers")({
	head: () => ({ meta: [{ title: "Clientes — RepairAI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./dashboard-CbKx0l1y.mjs");
var Route$16 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [{ title: "Painel — Unify RepairAI" }, {
		name: "description",
		content: "Painel de inteligência artificial e gestão da sua assistência técnica."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./finance-BSrKZuNG.mjs");
var Route$15 = createFileRoute("/_authenticated/finance")({
	head: () => ({ meta: [{ title: "Financeiro — RepairAI" }, {
		name: "description",
		content: "Contas a receber, a pagar e fluxo de caixa."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./history-CrPkOj8T.mjs");
var Route$14 = createFileRoute("/_authenticated/history")({
	head: () => ({ meta: [
		{ title: "Histórico — RepairAI" },
		{
			name: "description",
			content: "Todas as suas análises, diagnósticos e avaliações ficam salvos aqui."
		},
		{
			property: "og:title",
			content: "Histórico — RepairAI"
		},
		{
			property: "og:description",
			content: "Suas conversas anteriores com a Unify."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./inventory-Xb8qNpRr.mjs");
var Route$13 = createFileRoute("/_authenticated/inventory")({
	head: () => ({ meta: [{ title: "Estoque — RepairAI" }, {
		name: "description",
		content: "Controle de peças e movimentações do estoque."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./knowledge-DmNrD9_y.mjs");
var Route$12 = createFileRoute("/_authenticated/knowledge")({
	head: () => ({ meta: [
		{ title: "Base de conhecimento — RepairAI" },
		{
			name: "description",
			content: "Compartilhe soluções, guias e esquemas. A comunidade treina a IA Unify."
		},
		{
			property: "og:title",
			content: "Base de conhecimento — RepairAI"
		},
		{
			property: "og:description",
			content: "Contribua com soluções de reparo revisadas por administradores."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./more-7csH0AlF.mjs");
var Route$11 = createFileRoute("/_authenticated/more")({
	head: () => ({ meta: [{ title: "Mais — RepairAI" }, {
		name: "description",
		content: "Acesse clientes, estoque, financeiro, cursos e mais."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./orders-DYChtSde.mjs");
var Route$10 = createFileRoute("/_authenticated/orders")({
	head: () => ({ meta: [{ title: "Ordens de Serviço — RepairAI" }, {
		name: "description",
		content: "Gerencie todas as OS da sua assistência técnica."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./profile-DJyBTeAm.mjs");
var Route$9 = createFileRoute("/_authenticated/profile")({
	head: () => ({ meta: [
		{ title: "Perfil — RepairAI" },
		{
			name: "description",
			content: "Gerencie seu perfil e assinatura RepairAI."
		},
		{
			property: "og:title",
			content: "Perfil — RepairAI"
		},
		{
			property: "og:description",
			content: "Sua conta e preferências."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./track._token-Pi5ero6V.mjs");
var Route$8 = createFileRoute("/track/$token")({
	head: () => ({ meta: [
		{ title: "Acompanhar reparo — RepairAI" },
		{
			name: "description",
			content: "Acompanhe o andamento do seu reparo em tempo real."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./orders._id-DZiUaBj4.mjs");
var Route$7 = createFileRoute("/_authenticated/orders/$id")({
	head: () => ({ meta: [{ title: "OS — RepairAI" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./orders.new-Yb8qp993.mjs");
var Route$6 = createFileRoute("/_authenticated/orders/new")({
	head: () => ({ meta: [{ title: "Nova OS — RepairAI" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route$5 = createFileRoute("/api/admin/users")({ server: { handlers: {
	GET: async () => {
		try {
			const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
			const { data: profiles } = await supabaseAdmin.from("profiles").select("id, display_name, subscription_status, avatar_url, created_at");
			const { data: roles } = await supabaseAdmin.from("user_roles").select("user_id, role");
			const roleMap = /* @__PURE__ */ new Map();
			(roles ?? []).forEach((r) => {
				const arr = roleMap.get(r.user_id) ?? [];
				arr.push(r.role);
				roleMap.set(r.user_id, arr);
			});
			const users = (profiles ?? []).map((p) => ({
				id: p.id,
				display_name: p.display_name,
				subscription_status: p.subscription_status,
				avatar_url: p.avatar_url,
				created_at: p.created_at,
				roles: roleMap.get(p.id) ?? []
			}));
			return new Response(JSON.stringify({ users }), {
				status: 200,
				headers: { "content-type": "application/json" }
			});
		} catch (err) {
			console.error("[Admin] list users error", err?.message ?? err);
			return new Response(JSON.stringify({ error: "Could not list users" }), {
				status: 500,
				headers: { "content-type": "application/json" }
			});
		}
	},
	POST: async ({ request }) => {
		let body;
		try {
			body = await request.json();
		} catch {
			return new Response(JSON.stringify({ error: "Invalid JSON" }), {
				status: 400,
				headers: { "content-type": "application/json" }
			});
		}
		const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
		const password = typeof body.password === "string" ? body.password : void 0;
		const display_name = typeof body.display_name === "string" ? body.display_name : null;
		const role = typeof body.role === "string" ? body.role : null;
		if (!email || !password) return new Response(JSON.stringify({ error: "email and password are required" }), {
			status: 400,
			headers: { "content-type": "application/json" }
		});
		try {
			const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
			const created = await supabaseAdmin.auth.admin.createUser({
				email,
				password,
				user_metadata: { display_name }
			});
			if (created?.error) {
				console.error("[Admin] create user error", created.error);
				return new Response(JSON.stringify({ error: created.error.message ?? "Could not create user" }), {
					status: 500,
					headers: { "content-type": "application/json" }
				});
			}
			const user = created?.user ?? created?.data ?? null;
			if (!user || !user.id) return new Response(JSON.stringify({ error: "No user returned from auth" }), {
				status: 500,
				headers: { "content-type": "application/json" }
			});
			await supabaseAdmin.from("profiles").upsert({
				id: user.id,
				display_name,
				subscription_status: "free"
			});
			if (role) await supabaseAdmin.from("user_roles").insert({
				user_id: user.id,
				role
			});
			return new Response(JSON.stringify({ user: {
				id: user.id,
				email
			} }), {
				status: 201,
				headers: { "content-type": "application/json" }
			});
		} catch (err) {
			console.error("[Admin] create user unexpected error", err?.message ?? err);
			return new Response(JSON.stringify({ error: "Could not create user" }), {
				status: 500,
				headers: { "content-type": "application/json" }
			});
		}
	}
} } });
/**
* Bearer-token authentication for the AI HTTP routes (SSE needs raw HTTP,
* so the server-function middleware is not available here).
*/
async function authenticateRequest(request) {
	const header = request.headers.get("Authorization") ?? "";
	const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
	if (!token) return null;
	const url = process.env["SUPABASE_URL"];
	const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["SUPABASE_ANON_KEY"];
	if (!url || !key) return null;
	const { data, error } = await createClient(url, key, {
		auth: {
			persistSession: false,
			autoRefreshToken: false
		},
		global: { fetch: (input, init) => {
			const headers = new Headers(init?.headers);
			if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
			headers.set("apikey", key);
			return fetch(input, {
				...init,
				headers
			});
		} }
	}).auth.getUser(token);
	if (error || !data.user) return null;
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const [roles, profile] = await Promise.all([supabaseAdmin.from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin"), supabaseAdmin.from("profiles").select("subscription_status").eq("id", data.user.id).maybeSingle()]);
	return {
		id: data.user.id,
		email: data.user.email ?? null,
		isAdmin: (roles.data ?? []).length > 0,
		isPro: profile.data?.subscription_status === "pro"
	};
}
/**
* Streaming chat endpoint (Server-Sent Events).
* Tokens are pushed to the browser as they are produced.
*/
function sse(data) {
	return `data: ${JSON.stringify(data)}\n\n`;
}
var Route$4 = createFileRoute("/api/ai/chat")({ server: { handlers: { POST: async ({ request }) => {
	const user = await authenticateRequest(request);
	if (!user) return new Response("Unauthorized", { status: 401 });
	let body;
	try {
		body = await request.json();
	} catch {
		return new Response("Corpo inválido.", { status: 400 });
	}
	const incoming = body.messages;
	if (!Array.isArray(incoming) || incoming.length === 0 || incoming.length > 80) return new Response("Requisição inválida.", { status: 400 });
	for (const m of incoming) {
		if (m.role !== "user" && m.role !== "assistant") return new Response("Papel inválido.", { status: 400 });
		if (typeof m.content !== "string" || m.content.length > 12e3) return new Response("Mensagem muito longa.", { status: 400 });
		if (m.attachments && m.attachments.length > 6) return new Response("Máximo de 6 anexos.", { status: 400 });
	}
	try {
		checkRateLimit(`chat:${user.id}`);
	} catch (error) {
		return new Response(error instanceof Error ? error.message : "Rate limit", { status: 429 });
	}
	let skill = body.skillLevel ?? "auto";
	if (skill === "advanced" && !user.isAdmin && !user.isPro) skill = "auto";
	const messages = incoming.map((m) => {
		if (m.role !== "user") return {
			role: "assistant",
			content: m.content
		};
		const safe = sanitizeUserContent(m.content);
		const text = containsDangerousRequest(safe) ? REFUSAL : safe;
		if (m.attachments?.length) return {
			role: "user",
			content: [{
				type: "text",
				text: text || "Analise os anexos e me diga o que você vê."
			}, ...m.attachments.map((a) => a.type === "image" ? {
				type: "image",
				dataUrl: a.dataUrl,
				mimeType: a.mimeType
			} : {
				type: "file",
				filename: a.filename ?? "documento.pdf",
				dataUrl: a.dataUrl,
				mimeType: a.mimeType
			})]
		};
		return {
			role: "user",
			content: text
		};
	});
	const facts = extractLongTermFacts(messages);
	const encoder = new TextEncoder();
	const stream = new ReadableStream({ async start(controller) {
		try {
			for await (const event of gatewayStream(messages, {
				userId: user.id,
				conversationId: body.conversationId ?? null,
				skillLevel: skill,
				longTermMemory: facts.length ? facts.join("\n") : void 0,
				provider: body.provider,
				model: body.model
			})) if (event.type === "delta") controller.enqueue(encoder.encode(sse({
				type: "delta",
				text: event.text
			})));
			else if (event.type === "tool_call") controller.enqueue(encoder.encode(sse({
				type: "tool_call",
				toolCall: event.toolCall
			})));
			else if (event.type === "error") controller.enqueue(encoder.encode(sse({
				type: "error",
				message: event.message
			})));
			else controller.enqueue(encoder.encode(sse({
				type: "done",
				provider: event.response.provider,
				model: event.response.model,
				usage: event.response.usage,
				costUsd: event.response.costUsd,
				latencyMs: event.response.latencyMs
			})));
		} catch (error) {
			controller.enqueue(encoder.encode(sse({
				type: "error",
				message: error instanceof Error ? error.message : "Erro na IA."
			})));
		} finally {
			controller.enqueue(encoder.encode("data: [DONE]\n\n"));
			controller.close();
		}
	} });
	return new Response(stream, { headers: {
		"Content-Type": "text/event-stream; charset=utf-8",
		"Cache-Control": "no-cache, no-transform",
		Connection: "keep-alive",
		"X-Accel-Buffering": "no"
	} });
} } } });
/** Text-to-speech: returns audio for the given text. */
var Route$3 = createFileRoute("/api/ai/speech")({ server: { handlers: { POST: async ({ request }) => {
	const user = await authenticateRequest(request);
	if (!user) return new Response("Unauthorized", { status: 401 });
	try {
		checkRateLimit(`tts:${user.id}`);
	} catch (error) {
		return new Response(error instanceof Error ? error.message : "Rate limit", { status: 429 });
	}
	const text = (await request.json().catch(() => null))?.text?.trim();
	if (!text) return new Response("Texto ausente.", { status: 400 });
	if (text.length > 4e3) return new Response("Texto muito longo.", { status: 413 });
	try {
		const { audio, mimeType } = await gatewaySpeech(text, { userId: user.id });
		return new Response(audio, { headers: {
			"Content-Type": mimeType,
			"Cache-Control": "no-store"
		} });
	} catch (error) {
		return new Response(error instanceof Error ? error.message : "Falha ao gerar áudio.", { status: 502 });
	}
} } } });
/** Speech-to-text (voice input): wav, mp3, m4a, ogg, webm. */
var ALLOWED = [
	"audio/wav",
	"audio/x-wav",
	"audio/mpeg",
	"audio/mp3",
	"audio/mp4",
	"audio/m4a",
	"audio/x-m4a",
	"audio/ogg",
	"audio/webm"
];
var Route$2 = createFileRoute("/api/ai/transcribe")({ server: { handlers: { POST: async ({ request }) => {
	const user = await authenticateRequest(request);
	if (!user) return new Response("Unauthorized", { status: 401 });
	try {
		checkRateLimit(`stt:${user.id}`);
	} catch (error) {
		return new Response(error instanceof Error ? error.message : "Rate limit", { status: 429 });
	}
	const file = (await request.formData().catch(() => null))?.get("file");
	if (!(file instanceof File)) return new Response("Arquivo de áudio ausente.", { status: 400 });
	if (file.size > 20971520) return new Response("Áudio acima de 20MB.", { status: 413 });
	const mimeType = file.type || "audio/webm";
	if (!ALLOWED.some((m) => mimeType.startsWith(m))) return new Response("Formato de áudio não suportado.", { status: 415 });
	try {
		const { text } = await gatewayTranscribe({
			data: await file.arrayBuffer(),
			filename: file.name || "audio.webm",
			mimeType,
			language: "pt"
		}, { userId: user.id });
		return Response.json({ text });
	} catch (error) {
		return new Response(error instanceof Error ? error.message : "Falha ao transcrever.", { status: 502 });
	}
} } } });
var ACTIVE_EVENTS = /* @__PURE__ */ new Set(["purchase_approved", "subscription_renewed"]);
var REVOKED_EVENTS = /* @__PURE__ */ new Set([
	"refund",
	"chargeback",
	"subscription_canceled"
]);
var Route$1 = createFileRoute("/api/cakto/webhook")({ server: { handlers: { POST: async ({ request }) => {
	const configuredSecret = process.env.CAKTO_WEBHOOK_SECRET;
	if (!configuredSecret) {
		console.error("[Cakto] CAKTO_WEBHOOK_SECRET is not configured.");
		return new Response("Webhook not configured", { status: 503 });
	}
	let payload;
	try {
		payload = await request.json();
	} catch {
		return new Response("Invalid JSON", { status: 400 });
	}
	if (payload.secret !== configuredSecret) return new Response("Unauthorized", { status: 401 });
	const event = typeof payload.event === "string" ? payload.event : "";
	const email = typeof payload.data?.customer?.email === "string" ? payload.data.customer.email.trim().toLowerCase() : "";
	const productId = typeof payload.data?.product?.id === "string" ? payload.data.product.id : "";
	const configuredProductId = process.env.CAKTO_PRODUCT_ID;
	const startProductId = process.env.CAKTO_START_PRODUCT_ID;
	const proProductId = process.env.CAKTO_PRO_PRODUCT_ID;
	const eliteProductId = process.env.CAKTO_ELITE_PRODUCT_ID;
	const knownProductIds = [
		configuredProductId,
		startProductId,
		proProductId,
		eliteProductId
	].filter(Boolean);
	if (!email || !event || knownProductIds.length === 0 || !knownProductIds.includes(productId)) return new Response(null, { status: 204 });
	const subscriptionId = typeof payload.data?.subscription?.id === "string" ? payload.data.subscription.id : null;
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const status = ACTIVE_EVENTS.has(event) ? getPlanFromCaktoProductId(productId, {
		CAKTO_PRODUCT_ID: configuredProductId,
		CAKTO_START_PRODUCT_ID: startProductId,
		CAKTO_PRO_PRODUCT_ID: proProductId,
		CAKTO_ELITE_PRODUCT_ID: eliteProductId
	}) : "inactive";
	if (!ACTIVE_EVENTS.has(event) && !REVOKED_EVENTS.has(event)) return new Response(null, { status: 204 });
	const { error } = await supabaseAdmin.rpc("set_cakto_subscription_status", {
		_email: email,
		_status: status === "inactive" ? "inactive" : status,
		_product_id: productId,
		_subscription_id: subscriptionId
	});
	if (error) {
		console.error("[Cakto] Could not update subscription:", error.message);
		return new Response("Could not update subscription", { status: 500 });
	}
	return new Response(null, { status: 204 });
} } } });
var Route = createFileRoute("/api/admin/users/$id")({ server: { handlers: {
	GET: async ({ params, request }) => {
		try {
			const id = params.id;
			const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
			const { data: profile } = await supabaseAdmin.from("profiles").select("id, display_name, subscription_status, avatar_url, created_at").eq("id", id).maybeSingle();
			const { data: roles } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", id);
			const { data: events } = await supabaseAdmin.from("service_order_events").select("id, type, payload, created_at").eq("actor_id", id).order("created_at", { ascending: false }).limit(50);
			return new Response(JSON.stringify({
				profile,
				roles: roles ?? [],
				events: events ?? []
			}), {
				status: 200,
				headers: { "content-type": "application/json" }
			});
		} catch (err) {
			console.error("[Admin] get user error", err?.message ?? err);
			return new Response(JSON.stringify({ error: "Could not fetch user" }), {
				status: 500,
				headers: { "content-type": "application/json" }
			});
		}
	},
	PATCH: async ({ params, request }) => {
		try {
			const id = params.id;
			const body = await request.json();
			const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
			const updates = {};
			if (typeof body.subscription_status === "string") updates.subscription_status = body.subscription_status;
			if (Object.keys(updates).length > 0) await supabaseAdmin.from("profiles").update(updates).eq("id", id);
			if (Array.isArray(body.roles)) {
				await supabaseAdmin.from("user_roles").delete().eq("user_id", id);
				const toInsert = body.roles.map((r) => ({
					user_id: id,
					role: r
				}));
				if (toInsert.length) await supabaseAdmin.from("user_roles").insert(toInsert);
			}
			return new Response(JSON.stringify({ ok: true }), {
				status: 200,
				headers: { "content-type": "application/json" }
			});
		} catch (err) {
			console.error("[Admin] patch user error", err?.message ?? err);
			return new Response(JSON.stringify({ error: "Could not update user" }), {
				status: 500,
				headers: { "content-type": "application/json" }
			});
		}
	}
} } });
var IndexRoute = Route$23.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$24
});
var AuthenticatedRouteRoute = Route$22.update({
	id: "/_authenticated",
	getParentRoute: () => Route$24
});
var AuthRoute = Route$21.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$24
});
var ResetPasswordRoute = Route$20.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$24
});
var AuthenticatedChatRoute = Route$19.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCoursesRoute = Route$18.update({
	id: "/courses",
	path: "/courses",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCustomersRoute = Route$17.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$16.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFinanceRoute = Route$15.update({
	id: "/finance",
	path: "/finance",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedHistoryRoute = Route$14.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedInventoryRoute = Route$13.update({
	id: "/inventory",
	path: "/inventory",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedKnowledgeRoute = Route$12.update({
	id: "/knowledge",
	path: "/knowledge",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMoreRoute = Route$11.update({
	id: "/more",
	path: "/more",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOrdersRoute = Route$10.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfileRoute = Route$9.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AuthenticatedRouteRoute
});
var TrackTokenRoute = Route$8.update({
	id: "/track/$token",
	path: "/track/$token",
	getParentRoute: () => Route$24
});
var AuthenticatedOrdersIdRoute = Route$7.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AuthenticatedOrdersRoute
});
var AuthenticatedOrdersNewRoute = Route$6.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AuthenticatedOrdersRoute
});
var ApiAdminUsersRoute = Route$5.update({
	id: "/api/admin/users",
	path: "/api/admin/users",
	getParentRoute: () => Route$24
});
var ApiAiChatRoute = Route$4.update({
	id: "/api/ai/chat",
	path: "/api/ai/chat",
	getParentRoute: () => Route$24
});
var ApiAiSpeechRoute = Route$3.update({
	id: "/api/ai/speech",
	path: "/api/ai/speech",
	getParentRoute: () => Route$24
});
var ApiAiTranscribeRoute = Route$2.update({
	id: "/api/ai/transcribe",
	path: "/api/ai/transcribe",
	getParentRoute: () => Route$24
});
var ApiCaktoWebhookRoute = Route$1.update({
	id: "/api/cakto/webhook",
	path: "/api/cakto/webhook",
	getParentRoute: () => Route$24
});
var ApiAdminUsersIdRoute = Route.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => ApiAdminUsersRoute
});
var AuthenticatedOrdersRouteChildren = {
	AuthenticatedOrdersIdRoute,
	AuthenticatedOrdersNewRoute
};
var AuthenticatedRouteRouteChildren = {
	AuthenticatedChatRoute,
	AuthenticatedCoursesRoute,
	AuthenticatedCustomersRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedFinanceRoute,
	AuthenticatedHistoryRoute,
	AuthenticatedInventoryRoute,
	AuthenticatedKnowledgeRoute,
	AuthenticatedMoreRoute,
	AuthenticatedOrdersRoute: AuthenticatedOrdersRoute._addFileChildren(AuthenticatedOrdersRouteChildren),
	AuthenticatedProfileRoute
};
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var ApiAdminUsersRouteChildren = { ApiAdminUsersIdRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	AuthRoute,
	ResetPasswordRoute,
	TrackTokenRoute,
	ApiAdminUsersRoute: ApiAdminUsersRoute._addFileChildren(ApiAdminUsersRouteChildren),
	ApiAiChatRoute,
	ApiAiSpeechRoute,
	ApiAiTranscribeRoute,
	ApiCaktoWebhookRoute
};
var routeTree = Route$24._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { hasAccessToApp as a, Route$19 as i, Route$7 as n, normalizeSubscriptionStatus as o, Route$8 as r, usePlan as s, router_exports as t };
