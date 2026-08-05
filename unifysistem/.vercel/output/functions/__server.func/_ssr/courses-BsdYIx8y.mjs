import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as useEntitlements } from "./useEntitlements-FfQO3F-T.mjs";
import { A as Lock, L as GraduationCap, W as Crown, rt as Check } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses-BsdYIx8y.js
var import_jsx_runtime = require_jsx_runtime();
var COURSES = [
	{
		title: "Fundamentos do reparo",
		level: "Iniciante",
		lessons: 12,
		duration: "3h"
	},
	{
		title: "Diagnóstico com multímetro",
		level: "Iniciante",
		lessons: 8,
		duration: "2h"
	},
	{
		title: "Reparo de iPhone completo",
		level: "Intermediário",
		lessons: 24,
		duration: "8h"
	},
	{
		title: "Reparo Android completo",
		level: "Intermediário",
		lessons: 22,
		duration: "7h"
	},
	{
		title: "Microsolda BGA/Reballing",
		level: "Avançado",
		lessons: 18,
		duration: "9h"
	},
	{
		title: "Reparo de placa lógica",
		level: "Avançado",
		lessons: 30,
		duration: "12h"
	},
	{
		title: "Face ID e True Depth",
		level: "Avançado",
		lessons: 14,
		duration: "5h"
	},
	{
		title: "Leitura de esquemas",
		level: "Intermediário",
		lessons: 16,
		duration: "6h"
	},
	{
		title: "Osciloscópio & fonte",
		level: "Avançado",
		lessons: 10,
		duration: "4h"
	},
	{
		title: "Recuperação de dados",
		level: "Avançado",
		lessons: 12,
		duration: "4h"
	},
	{
		title: "Gestão de assistência técnica",
		level: "Iniciante",
		lessons: 10,
		duration: "3h"
	}
];
var FEATURES = [
	"Acesso a todos os cursos e módulos",
	"Aulas em vídeo em HD",
	"Downloads de PDF e esquemas",
	"Certificados de conclusão",
	"Novos cursos toda semana",
	"Uso ilimitado da IA Unify"
];
function CoursesPage() {
	const { canPremium, isAdmin } = useEntitlements();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-aura absolute inset-x-0 top-0 -z-10 h-64" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-4 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "gradient-primary flex h-12 w-12 items-center justify-center rounded-2xl text-primary-foreground shadow-[0_10px_24px_-8px_oklch(0.505_0.235_27.5/0.5)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-wider text-primary",
					children: "Aprender"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold tracking-tight",
					children: "Cursos"
				})] })]
			}),
			canPremium ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "premium-card mb-5 flex items-center gap-3 border-primary/30 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: isAdmin ? "Acesso ELITE · Administrador" : "Assinatura PRO ativa"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Todos os cursos e o Modo Avançado liberados."
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "gradient-primary mb-5 overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-[0_20px_60px_-20px_oklch(0.505_0.235_27.5/0.5)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "mb-3 bg-white/20 text-white hover:bg-white/20",
						children: "PRO Mensal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold leading-tight",
						children: "Acesso total à plataforma"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-white/80",
						children: "R$ 19,90/mês · cancele quando quiser"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-1.5 text-sm",
						children: FEATURES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 shrink-0" }),
								" ",
								f
							]
						}, f))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "mt-5 w-full bg-white text-primary hover:bg-white/90",
						onClick: () => toast.info("Assinatura em breve — vamos avisá-lo por e-mail."),
						children: "Assinar PRO — R$ 19,90/mês"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
				children: "Catálogo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
				children: COURSES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "premium-card premium-card-hover p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-sm font-semibold leading-snug",
								children: c.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: [
									c.lessons,
									" aulas · ",
									c.duration
								]
							})]
						}), canPremium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-4 w-4 shrink-0 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 shrink-0 text-muted-foreground" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "mt-2 text-[10px]",
						children: c.level
					})]
				}, c.title))
			})
		]
	});
}
//#endregion
export { CoursesPage as component };
