import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-tCc0-7Lo.mjs";
import { s as usePlan } from "./router-DZj4C1IY.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as UnifyMascot } from "./UnifyMascot-sfREiZQZ.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { $ as CircleAlert, C as Plus, D as MessageSquare, E as Mic, G as Cpu, H as DollarSign, I as Headphones, J as ClipboardList, L as GraduationCap, N as Layers, T as Package, U as Database, X as CircleCheck, _ as ShoppingCart, a as Users, at as Brain, c as TrendingUp, d as Timer, f as Terminal, ft as Activity, g as SlidersHorizontal, h as Smartphone, j as Lightbulb, lt as ArrowUpRight, m as Sparkles, nt as ChevronDown, ot as BookOpen, p as Stethoscope, q as Clock, r as Wrench, st as Bell, t as Zap, tt as ChevronRight, ut as ArrowRight, x as Radio, y as Search, z as FileCode } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { i as formatBRL, n as STATUS_LABEL, t as STATUS_COLOR } from "./orders-DZbTO4dH.mjs";
import { t as usePlan$1 } from "./usePlan-BWmzByx8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CbKx0l1y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EliteDashboard() {
	const { setShowAdminPanel } = usePlan();
	const eliteActions = [
		{
			title: "Diagnóstico Inteligente",
			icon: Stethoscope,
			to: "/chat?prompt=Diagnosticar"
		},
		{
			title: "Avaliar Compra",
			icon: ShoppingCart,
			to: "/chat?prompt=Avaliar"
		},
		{
			title: "IA Especialista",
			icon: Brain,
			to: "/chat"
		},
		{
			title: "Diagnóstico de Placa",
			icon: Cpu,
			to: "/chat?prompt=Placa"
		},
		{
			title: "Cursos Premium",
			icon: GraduationCap,
			to: "/courses"
		},
		{
			title: "Relatórios Avançados",
			icon: TrendingUp,
			to: "/finance"
		}
	];
	const eliteFeatures = [
		{
			title: "Repair Twin",
			desc: "Gêmeo digital do aparelho",
			icon: Layers
		},
		{
			title: "BoardView",
			desc: "Esquemas e BoardViews",
			icon: FileCode
		},
		{
			title: "Osciloscópio",
			desc: "Medições avançadas",
			icon: Radio
		},
		{
			title: "Simulador",
			desc: "Ambiente de testes",
			icon: SlidersHorizontal
		},
		{
			title: "Comandos IA",
			desc: "Agentes especializados",
			icon: Terminal
		},
		{
			title: "Base de Casos",
			desc: "+1.200.000 casos resolvidos",
			icon: Database
		},
		{
			title: "Análise de Curto",
			desc: "Detecção inteligente",
			icon: Zap
		},
		{
			title: "Modo Copiloto",
			desc: "IA guiando seu reparo em tempo real",
			icon: Headphones
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#080608] text-white pb-28 font-sans selection:bg-red-600 selection:text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-30 border-b border-red-950/30 bg-[#080608]/95 px-4 py-3 backdrop-blur-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
						size: 36,
						state: "elite",
						variant: "elite"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.3em] text-red-400",
						children: "Painel Elite"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-white/90",
						children: "Unify RepairAI"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "inline-flex items-center gap-2 rounded-full border border-red-800/50 bg-red-950/40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-200 transition hover:bg-red-900/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), "Atualizações"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowAdminPanel(true),
						className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-800 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-red-900/40 transition hover:scale-105",
						children: "👑 ELITE"
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-4 pt-6 pb-10 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "relative overflow-hidden rounded-[2rem] border border-red-900/40 bg-gradient-to-br from-[#0f0c0d] via-[#130f11] to-[#090707] p-6 shadow-[0_0_120px_-40px_rgba(204,18,18,0.25)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,82,82,0.16),transparent_35%)] opacity-80" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 right-16 h-[420px] w-px bg-red-500/15 blur-sm" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative grid gap-6 lg:grid-cols-[1.8fr_1fr] lg:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-2 rounded-full border border-red-700/60 bg-red-950/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.34em] text-red-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-red-500 animate-pulse" }), "Operando em modo elite"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl",
											children: "Interface de gestão e diagnósticos para quem entrega o melhor resultado."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "max-w-2xl text-sm leading-7 text-red-200/80 sm:text-base",
											children: "Sua central de reparos com insights instantâneos, métricas avançadas e acesso a recursos exclusivos. Tudo pronto para acelerar sua oficina."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "rounded-2xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-red-900/20 transition hover:bg-red-500",
											children: "Abrir Assistente Elite"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "rounded-2xl border border-red-700/60 bg-white/5 px-6 py-3 text-sm font-semibold text-red-200 transition hover:border-red-500/90",
											children: "Ver relatórios premium"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 sm:grid-cols-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-[1.5rem] border border-red-900/40 bg-[#110f10]/95 p-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] uppercase tracking-[0.24em] text-red-400",
														children: "Precisão"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-3 text-2xl font-black text-white",
														children: "99,8%"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-2 text-xs text-red-300",
														children: "de acerto nos diagnósticos IA"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-[1.5rem] border border-red-900/40 bg-[#110f10]/95 p-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] uppercase tracking-[0.24em] text-red-400",
														children: "Velocidade"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-3 text-2xl font-black text-white",
														children: "3,2s"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-2 text-xs text-red-300",
														children: "média de resposta do assistente"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-[1.5rem] border border-red-900/40 bg-[#110f10]/95 p-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] uppercase tracking-[0.24em] text-red-400",
														children: "Base"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-3 text-2xl font-black text-white",
														children: "1,2M"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-2 text-xs text-red-300",
														children: "casos históricos disponíveis"
													})
												]
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative overflow-hidden rounded-[2rem] border border-red-900/40 bg-[#120d0e]/90 p-5 shadow-[0_25px_80px_-40px_rgba(255,0,0,0.35)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-8 right-4 h-24 w-24 rounded-full bg-red-500/10 blur-3xl" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs uppercase tracking-[0.3em] text-red-400",
											children: "Sistema"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-3xl font-black text-white",
											children: "Operação ao vivo"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid place-items-center rounded-3xl bg-red-500/10 p-3 text-red-300",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 space-y-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-3xl border border-red-900/40 bg-[#110f10] p-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between text-xs uppercase tracking-[0.24em] text-red-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AI especialista" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-red-200",
														children: "Ativo"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-3 text-sm font-bold text-white",
													children: "Diagnósticos, planos de ação e cálculos inteligentes prontos para sua oficina."
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-3xl border border-red-900/40 bg-[#110f10] p-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between text-xs uppercase tracking-[0.24em] text-red-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fluxo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-red-200",
														children: "Automatizado"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-3 text-sm font-bold text-white",
													children: "Acompanhe cada OS com histórico visual, alertas e status inteligente."
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-3 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-3xl bg-[#120d0e] p-4 text-sm",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] uppercase tracking-[0.26em] text-red-400",
														children: "Conversão"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-3 text-2xl font-black text-white",
														children: "+42%"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-2 text-xs text-red-300",
														children: "taxa de aprovação em propostas"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-3xl bg-[#120d0e] p-4 text-sm",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] uppercase tracking-[0.26em] text-red-400",
														children: "Confiança"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-3 text-2xl font-black text-white",
														children: "Certificada"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-2 text-xs text-red-300",
														children: "dados seguros e controle total de acesso"
													})
												]
											})]
										})]
									})
								]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-4 xl:grid-cols-[1.5fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 rounded-[2rem] border border-red-900/40 bg-[#090808]/90 p-6 shadow-[0_20px_60px_-30px_rgba(255,0,40,0.25)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.34em] text-red-400",
								children: "Atalhos da Elite"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-2xl font-black text-white",
								children: "Ações rápidas"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded-full border border-red-700/70 bg-red-950/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-red-300 transition hover:border-red-500/90",
								children: "Ver todos"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-3",
							children: eliteActions.map((act) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: act.to,
								className: "group flex flex-col items-center gap-2 rounded-3xl border border-red-900/40 bg-[#110f10] p-4 text-center transition hover:border-red-500/60 hover:bg-red-950/40",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-14 w-14 items-center justify-center rounded-3xl border border-red-800/50 bg-red-950/30 text-red-400 transition group-hover:text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(act.icon, { className: "h-6 w-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-bold text-gray-200 group-hover:text-white",
									children: act.title
								})]
							}, act.title))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[2rem] border border-red-900/40 bg-[#0f0c0d]/90 p-6 shadow-[0_20px_60px_-30px_rgba(255,0,0,0.18)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.3em] text-red-400",
								children: "Recursos principais"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-xl font-black text-white",
								children: "Painel de poder"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1 rounded-full border border-red-700/50 bg-red-950/40 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-red-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" }), " Online"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 grid gap-3",
							children: eliteFeatures.slice(0, 4).map((feat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-3xl border border-red-900/40 bg-[#110f10] p-4 transition hover:border-red-500/60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-800/50 bg-red-950/30 text-red-400 transition group-hover:text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(feat.icon, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-bold text-white",
									children: feat.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] text-red-300",
									children: feat.desc
								})] })]
							}, feat.title))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-3 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[2rem] border border-red-900/40 bg-[#121011] p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.3em] text-red-400",
								children: "Últimos diagnósticos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-lg font-black text-white",
								children: "Casos recentes"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded-full border border-red-700/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-red-300 transition hover:border-red-500/90",
								children: "Histórico"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-3",
							children: [
								{
									device: "iPhone 14 Pro Max",
									issue: "Não carrega",
									status: "Resolvido",
									tone: "emerald"
								},
								{
									device: "Samsung S23 Ultra",
									issue: "Tela não liga",
									status: "Em andamento",
									tone: "amber"
								},
								{
									device: "iPhone 11",
									issue: "Reinicia sozinho",
									status: "Resolvido",
									tone: "emerald"
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-3xl border border-red-900/20 bg-[#0f0d0e] p-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold text-white",
										children: item.device
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-red-300",
										children: item.issue
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ` + (item.tone === "emerald" ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-amber-950 text-amber-300 border border-amber-800"),
										children: item.status
									})]
								})
							}, item.device))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/chat",
						className: "group rounded-[2rem] border border-red-900/40 bg-gradient-to-b from-red-950/30 to-[#120d0e] p-6 text-center transition hover:border-red-500/60 hover:shadow-[0_25px_60px_-30px_rgba(255,0,0,0.45)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-2 text-red-400",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-[0.3em]",
									children: "Assistente Elite"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 text-2xl font-black text-white",
								children: "Fale com a IA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-6 text-red-300",
								children: "Abra o fluxo de voz instantâneo para resolver casos e criar laudos com ajuda do nosso copiloto."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 inline-flex items-center gap-2 rounded-full border border-red-700/70 bg-red-950/60 px-4 py-3 text-sm font-semibold text-red-200 transition group-hover:bg-red-900/70",
								children: ["Iniciar agora ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
							})
						]
					})]
				})
			]
		})]
	});
}
function ProDashboard() {
	const { setShowAdminPanel } = usePlan();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAFAFA] text-[#1A1A1A] pb-24 font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white/90 px-4 py-3 backdrop-blur-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
						size: 32,
						state: "idle",
						variant: "pro"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold tracking-tight text-[#BF0000]",
							children: "Unify"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold text-gray-900",
							children: "RepairAI"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowAdminPanel(true),
						className: "flex items-center gap-1 rounded-full bg-[#BF0000] px-2.5 py-0.5 text-[11px] font-extrabold text-white shadow-sm hover:bg-red-700 transition",
						children: "★ PRO"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "relative rounded-full p-2 text-gray-600 hover:bg-gray-100 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#BF0000] text-[10px] font-bold text-white",
						children: "3"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
					alt: "Robison",
					className: "h-8 w-8 rounded-full border-2 border-red-500/40 object-cover"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-md px-4 pt-4 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center justify-between rounded-3xl bg-gradient-to-r from-red-50/60 via-white to-pink-50/40 p-4 border border-red-100/60 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-[65%] space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-xl font-extrabold tracking-tight text-gray-900 flex items-center gap-1",
							children: ["Boa tarde, Robison ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "animate-bounce",
								children: "👋"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-500 leading-relaxed font-medium",
							children: "Seu assistente inteligente está pronto para te ajudar!"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex items-center justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full bg-red-500/20 blur-xl animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
							size: 78,
							state: "idle",
							variant: "pro"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Pesquisar qualquer problema, modelo, CI...",
							className: "w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-xs text-gray-800 placeholder-gray-400 shadow-sm transition focus:border-[#BF0000] focus:outline-none focus:ring-1 focus:ring-[#BF0000]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "absolute right-3.5 top-3.5 h-4 w-4 text-[#BF0000] animate-pulse" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						{
							title: "Diagnóstico Inteligente",
							desc: "Descreva o defeito e receba o diagnóstico com IA",
							icon: Stethoscope,
							iconColor: "text-red-500 bg-red-50",
							badge: "★ IA",
							badgeClass: "bg-[#BF0000] text-white",
							to: "/chat?prompt=Diagnosticar"
						},
						{
							title: "Avaliar Compra",
							desc: "Análise completa para comprar sem riscos",
							icon: ShoppingCart,
							iconColor: "text-amber-500 bg-amber-50",
							badge: null,
							to: "/chat?prompt=Avaliar"
						},
						{
							title: "IA Especialista",
							desc: "Chat inteligente com IA treinada para assistência técnica",
							icon: Brain,
							iconColor: "text-purple-500 bg-purple-50",
							badge: "PRO",
							badgeClass: "bg-purple-600 text-white",
							to: "/chat"
						},
						{
							title: "Diagnóstico de Placa",
							desc: "Esquemas, pontos de teste e medições",
							icon: Cpu,
							iconColor: "text-blue-500 bg-blue-50",
							badge: "PRO",
							badgeClass: "bg-blue-600 text-white",
							to: "/chat?prompt=Placa"
						},
						{
							title: "Cursos Premium",
							desc: "Aprenda com os melhores técnicos",
							icon: GraduationCap,
							iconColor: "text-emerald-500 bg-emerald-50",
							badge: "PRO",
							badgeClass: "bg-emerald-600 text-white",
							to: "/courses"
						},
						{
							title: "Mercado",
							desc: "Preços, tendências e oportunidades",
							icon: TrendingUp,
							iconColor: "text-orange-500 bg-orange-50",
							badge: null,
							to: "/finance"
						}
					].map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: card.to,
						className: "group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md",
						children: [
							card.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `absolute right-2.5 top-2.5 rounded-full px-2 py-0.5 text-[9px] font-extrabold shadow-sm ${card.badgeClass}`,
								children: card.badge
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl transition ${card.iconColor}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(card.icon, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-bold text-gray-900 group-hover:text-[#BF0000] transition",
									children: card.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[10px] leading-tight text-gray-500 font-normal",
									children: card.desc
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 text-gray-300 group-hover:translate-x-1 group-hover:text-[#BF0000] transition" })
							})
						]
					}, card.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-4 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-medium text-gray-400",
									children: "Receita"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-extrabold text-gray-900",
									children: "R$ 5.840"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 flex items-center justify-between",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8px] font-bold text-red-500",
										children: "↗ 12% vs mês"
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-medium text-gray-400",
									children: "OS Abertas"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-extrabold text-gray-900",
									children: "18"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8px] font-bold text-emerald-500",
										children: "↗ 8% vs ontem"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-3 w-3 text-blue-500" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-medium text-gray-400",
									children: "Precisão da IA"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-extrabold text-gray-900",
									children: "98%"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8px] font-bold text-emerald-500",
										children: "↗ 5% melhora"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-3 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-medium text-gray-400",
									children: "Tempo Médio"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-extrabold text-gray-900",
									children: "1,8 dias"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[8px] font-bold text-purple-500",
										children: "↘ 0,3 dias"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3 text-purple-400" })]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-bold text-gray-900",
							children: "Últimos diagnósticos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/history",
							className: "flex items-center text-[11px] font-bold text-[#BF0000] hover:underline",
							children: ["Ver todos ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-3 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 p-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg",
										children: "📱"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-bold text-gray-900",
									children: "iPhone 11"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-gray-400",
									children: "Tela não liga"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600",
										children: "Resolvido"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-gray-400",
										children: "2h atrás"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 text-gray-300" })
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-3 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 p-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg",
										children: "📱"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-bold text-gray-900",
									children: "Samsung A34"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-gray-400",
									children: "Não carrega"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600",
										children: "Resolvido"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-gray-400",
										children: "5h atrás"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 text-gray-300" })
								]
							})]
						})]
					})]
				})
			]
		})]
	});
}
function StartDashboard() {
	const { setShowAdminPanel } = usePlan();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAFAFA] text-[#1A1A1A] pb-24 font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white/90 px-4 py-3 backdrop-blur-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
					size: 32,
					state: "idle",
					variant: "start"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold tracking-tight text-[#BF0000]",
						children: "Unify"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-gray-900 -mt-1",
						children: "RepairAI"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowAdminPanel(true),
						className: "rounded-full bg-red-50 border border-red-200 px-2.5 py-1 text-[11px] font-bold text-[#BF0000] hover:bg-red-100 transition",
						children: "START"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "relative rounded-full p-2 text-gray-600 hover:bg-gray-100 transition",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#BF0000] text-[10px] font-bold text-white",
							children: "3"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
						alt: "Robison",
						className: "h-8 w-8 rounded-full border border-gray-200 object-cover"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-md px-4 pt-5 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-1.5",
					children: ["Bom dia, Robison ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "animate-bounce inline-block",
						children: "👋"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-gray-500 font-medium",
					children: "Como posso ajudar hoje?"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-3 h-4 w-4 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Buscar função...",
						className: "w-full rounded-2xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 shadow-sm transition focus:border-[#BF0000] focus:outline-none focus:ring-1 focus:ring-[#BF0000]"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						{
							title: "Diagnosticar",
							desc: "Descreva o defeito e receba o diagnóstico",
							icon: Stethoscope,
							to: "/chat?prompt=Diagnosticar"
						},
						{
							title: "Avaliar aparelho",
							desc: "Saiba se vale a pena comprar ou revender",
							icon: DollarSign,
							to: "/chat?prompt=Avaliar"
						},
						{
							title: "Guia de reparo",
							desc: "Passo a passo completo para o reparo",
							icon: BookOpen,
							to: "/knowledge"
						},
						{
							title: "Diagnóstico de placa",
							desc: "Esquemas, pontos e medições",
							icon: Cpu,
							to: "/chat?prompt=Placa"
						},
						{
							title: "Consultar IMEI",
							desc: "Verifique informações do aparelho",
							icon: Smartphone,
							to: "/orders/new"
						},
						{
							title: "Problemas de carga",
							desc: "Soluções para falhas de carregamento",
							icon: Zap,
							to: "/chat?prompt=Carga"
						}
					].map((act) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: act.to,
						className: "group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#BF0000] group-hover:bg-[#BF0000] group-hover:text-white transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(act.icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-bold text-gray-900 group-hover:text-[#BF0000] transition",
								children: act.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] leading-tight text-gray-500 font-normal",
								children: act.desc
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-gray-400 group-hover:translate-x-1 group-hover:text-[#BF0000] transition" })
						})]
					}, act.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-[70%] space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-xs font-bold text-[#BF0000]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dica do dia" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-gray-600 leading-snug",
							children: "Mantenha sempre suas ferramentas organizadas e seu ambiente limpo."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
							size: 64,
							state: "idle",
							variant: "start"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-bold text-gray-900",
							children: "Resumo do dia"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-600",
							children: ["Hoje ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 text-gray-400" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-4 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-medium text-gray-500",
										children: "OS abertas"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-base font-extrabold text-gray-900",
										children: "12"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 flex justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-3.5 w-3.5 text-red-500" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-medium text-gray-500",
										children: "Em reparo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-base font-extrabold text-gray-900",
										children: "4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 flex justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-3.5 w-3.5 text-orange-500" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-medium text-gray-500",
										children: "Finalizadas"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-base font-extrabold text-gray-900",
										children: "81"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 flex justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-gray-100 bg-white p-2.5 shadow-sm text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-medium text-gray-500",
										children: "Receita"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-xs font-extrabold text-gray-900 truncate",
										children: "R$ 4.250"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 flex justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5 text-blue-500" })
									})
								]
							})
						]
					})]
				})
			]
		})]
	});
}
var PLAN_LABEL = {
	start: "START",
	pro: "PRO",
	elite: "ELITE"
};
function DashboardPage() {
	const { plan } = usePlan$1();
	const planName = plan;
	const label = PLAN_LABEL[planName] ?? "START";
	if (planName === "elite") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EliteDashboard, {});
	if (planName === "pro") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProDashboard, {});
	if (planName === "start") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartDashboard, {});
	const [m, setM] = (0, import_react.useState)(null);
	const [recent, setRecent] = (0, import_react.useState)([]);
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		(async () => {
			const { data: u } = await supabase.auth.getUser();
			if (u.user) {
				const { data: p } = await supabase.from("profiles").select("display_name").eq("id", u.user.id).maybeSingle();
				setDisplayName(p?.display_name ?? u.user.email?.split("@")[0] ?? "");
			}
			const now = /* @__PURE__ */ new Date();
			const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
			const { data: orders } = await supabase.from("service_orders").select("id, number, status, created_at, customers(name), devices(brand, model)").gte("created_at", monthStart).order("created_at", { ascending: false });
			const list = orders ?? [];
			const openStatuses = [
				"awaiting_diagnosis",
				"awaiting_approval",
				"in_repair",
				"awaiting_part"
			];
			const deliveredThisMonth = list.filter((o) => o.status === "delivered");
			setM({
				open: list.filter((o) => openStatuses.includes(o.status)).length,
				in_repair: list.filter((o) => o.status === "in_repair").length,
				awaiting_part: list.filter((o) => o.status === "awaiting_part").length,
				awaiting_approval: list.filter((o) => o.status === "awaiting_approval").length,
				ready: list.filter((o) => o.status === "ready").length,
				delivered_month: deliveredThisMonth.length,
				revenue_month_cents: 0,
				avg_repair_days: 0
			});
			const { data: r } = await supabase.from("service_orders").select("id, number, status, created_at, customers(name), devices(brand, model)").order("created_at", { ascending: false }).limit(5);
			setRecent(r ?? []);
		})();
	}, []);
	const kpis = [
		{
			label: "OS abertas",
			value: m?.open ?? "—",
			icon: ClipboardList,
			accent: "primary"
		},
		{
			label: "Em reparo",
			value: m?.in_repair ?? "—",
			icon: Clock,
			accent: "info"
		},
		{
			label: "Aguard. peça",
			value: m?.awaiting_part ?? "—",
			icon: Package,
			accent: "warn"
		},
		{
			label: "Aguard. aprov.",
			value: m?.awaiting_approval ?? "—",
			icon: CircleAlert,
			accent: "warn"
		},
		{
			label: "Prontos",
			value: m?.ready ?? "—",
			icon: CircleCheck,
			accent: "success"
		},
		{
			label: "Entregues (mês)",
			value: m?.delivered_month ?? "—",
			icon: CircleCheck,
			accent: "primary"
		},
		{
			label: "Receita (mês)",
			value: m ? formatBRL(m.revenue_month_cents) : "—",
			icon: TrendingUp,
			accent: "primary"
		},
		{
			label: "Tempo médio",
			value: m?.avg_repair_days ? `${m.avg_repair_days.toFixed(1)} d` : "—",
			icon: Timer,
			accent: "muted"
		}
	];
	const shortcuts = [
		{
			to: "/chat",
			label: "Diagnóstico IA",
			icon: MessageSquare
		},
		{
			to: "/orders/new",
			label: "Nova OS",
			icon: Plus
		},
		{
			to: "/customers",
			label: "Clientes",
			icon: Users
		},
		{
			to: "/knowledge",
			label: "Conhecimento",
			icon: BookOpen
		}
	];
	const greeting = greetingFor(/* @__PURE__ */ new Date());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-[calc(100dvh-5rem)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-x-0 top-0 h-72 hero-aura",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative px-4 pt-5 pb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-5 flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider", planName === "elite" && "bg-primary/15 text-primary elite-glow", planName === "pro" && "gradient-primary text-primary-foreground", planName === "start" && "bg-muted text-muted-foreground"),
									children: [planName === "elite" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-2.5 w-2.5" }), label]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-muted-foreground",
									children: formatDate(/* @__PURE__ */ new Date())
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-2xl font-bold leading-tight tracking-tight",
								children: [greeting, displayName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground font-normal",
									children: [", ", firstName(displayName)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: "Aqui está sua bancada hoje."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
							size: 72,
							state: "idle",
							aura: planName !== "start",
							elite: planName === "elite"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-5 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					children: shortcuts.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: s.to,
						className: "group flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium transition hover:border-primary/50 hover:text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-3.5 w-3.5" }), s.label]
					}, s.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("relative mb-4 overflow-hidden rounded-2xl p-5 text-primary-foreground", "gradient-primary shadow-[0_20px_50px_-20px_oklch(0.505_0.235_27.5/0.55)]"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex items-end justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-medium uppercase tracking-widest opacity-80",
								children: "Receita do mês"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-3xl font-bold tracking-tight",
								children: m ? formatBRL(m.revenue_month_cents) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 flex items-center gap-1 text-xs opacity-90",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" }),
									m?.delivered_month ?? 0,
									" OS entregues"
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "secondary",
							size: "sm",
							className: "rounded-full bg-white/15 text-white hover:bg-white/25 border-0 backdrop-blur",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/finance",
								children: "Financeiro"
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2.5",
					children: kpis.slice(0, 6).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("relative overflow-hidden rounded-2xl border border-border bg-card p-3.5 transition", "hover:border-primary/40", planName === "elite" && "hover:shadow-[0_0_24px_oklch(0.62_0.26_27.5/0.25)]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-medium text-muted-foreground",
								children: k.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex h-7 w-7 items-center justify-center rounded-full", k.accent === "primary" && "bg-primary/10 text-primary", k.accent === "info" && "bg-blue-500/10 text-blue-500", k.accent === "warn" && "bg-amber-500/10 text-amber-500", k.accent === "success" && "bg-emerald-500/10 text-emerald-500", k.accent === "muted" && "bg-muted text-muted-foreground"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(k.icon, { className: "h-3.5 w-3.5" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-2xl font-bold tracking-tight",
							children: k.value
						})]
					}, k.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2.5 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-bold",
							children: "Atividade recente"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/orders",
							className: "inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:underline",
							children: ["Ver todas ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" })]
						})]
					}), recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-dashed border-border p-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnifyMascot, {
								size: 56,
								state: "idle",
								className: "mx-auto opacity-70"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: "Nenhuma OS ainda."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "mt-3 rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/orders/new",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Criar primeira OS"]
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: recent.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/orders/$id",
							params: { id: o.id },
							className: "group flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3.5 transition hover:border-primary/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xs",
									children: ["#", o.number]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-semibold",
										children: o.customers?.name ?? "—"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: o.devices ? `${o.devices.brand} ${o.devices.model}` : "Sem aparelho"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: cn(STATUS_COLOR[o.status], "shrink-0 text-[10px]"),
								children: STATUS_LABEL[o.status]
							})]
						}) }, o.id))
					})]
				})
			]
		})]
	});
}
function greetingFor(d) {
	const h = d.getHours();
	if (h < 12) return "Bom dia";
	if (h < 18) return "Boa tarde";
	return "Boa noite";
}
function firstName(name) {
	return name.trim().split(/\s+/)[0];
}
function formatDate(d) {
	return d.toLocaleDateString("pt-BR", {
		weekday: "long",
		day: "2-digit",
		month: "long"
	});
}
//#endregion
export { DashboardPage as component };
