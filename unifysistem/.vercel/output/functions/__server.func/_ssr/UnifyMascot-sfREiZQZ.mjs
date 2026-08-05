import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/UnifyMascot-sfREiZQZ.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Unify — the official RepairAI mascot.
* Responsive, state-aware mascot with a premium glow and fallback image.
*/
function UnifyMascot({ state = "idle", size = 96, className, variant = "start", aura = false, elite = false }) {
	const isElite = variant === "elite" || state === "elite" || elite;
	const isError = state === "error";
	const isSuccess = state === "success" || state === "celebrating";
	const isThinking = state === "thinking" || state === "analyzing" || state === "searching";
	const isTyping = state === "typing" || state === "speaking";
	const isListening = state === "listening";
	const isScanning = state === "scanning";
	const isLearning = state === "learning";
	const isSleeping = state === "sleeping";
	const eyesClosed = isThinking || isTyping || isSuccess || isLearning || isSleeping;
	const animation = isError ? "unify-shake 0.4s ease-in-out infinite" : isSuccess ? "unify-float 2s ease-in-out infinite, unify-breathe 1.8s ease-in-out infinite" : isSleeping ? "unify-breathe 5s ease-in-out infinite" : "unify-float 4s ease-in-out infinite, unify-breathe 4s ease-in-out infinite";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative inline-flex items-center justify-center select-none transition-all duration-300", className),
		style: {
			width: size,
			height: size
		},
		"aria-label": `Unify mascot — ${state}`,
		children: [
			aura && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 -z-10 animate-aura rounded-full",
				style: {
					background: "var(--gradient-glow)",
					filter: "blur(10px)"
				}
			}),
			isElite && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-2 left-1/2 h-4 w-4/5 -translate-x-1/2 rounded-full bg-red-600/40 blur-md animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-full w-full",
				style: { animation },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 120 120",
					className: "h-full w-full drop-shadow-sm",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
								id: "unify-body-light",
								cx: "50%",
								cy: "35%",
								r: "65%",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "#ffffff"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "70%",
										stopColor: "#f4f4f7"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "#e5e5eb"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
								id: "unify-body-elite",
								cx: "50%",
								cy: "35%",
								r: "65%",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "#2a2a2e"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "70%",
										stopColor: "#18181b"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "#09090b"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
								id: "unify-shadow",
								cx: "50%",
								cy: "50%",
								r: "50%",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: isElite ? "rgba(191, 0, 0, 0.4)" : "rgba(0,0,0,0.18)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "rgba(0,0,0,0)"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
								id: "red-eye-glow",
								x: "-20%",
								y: "-20%",
								width: "140%",
								height: "140%",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
									stdDeviation: "2",
									result: "blur"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feComposite", {
									in: "SourceGraphic",
									in2: "blur",
									operator: "over"
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: "60",
							cy: "112",
							rx: "28",
							ry: "5",
							fill: "url(#unify-shadow)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M60 12\r\n               C 32 12, 18 34, 18 60\r\n               L 18 92\r\n               C 18 100, 26 104, 32 100\r\n               C 38 96, 44 100, 50 102\r\n               C 56 104, 64 104, 70 102\r\n               C 76 100, 82 96, 88 100\r\n               C 94 104, 102 100, 102 92\r\n               L 102 60\r\n               C 102 34, 88 12, 60 12 Z",
							fill: isElite ? "url(#unify-body-elite)" : "url(#unify-body-light)",
							stroke: isElite ? "#BF0000" : isError ? "#BF0000" : "rgba(0,0,0,0.08)",
							strokeWidth: isElite ? 2 : isError ? 1.5 : 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							transform: "translate(60 34)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M-8 -8 L -8 3 C -8 8, -4 11, 0 11 C 4 11, 8 8, 8 3 L 8 -8",
								stroke: "#BF0000",
								strokeWidth: "3.4",
								strokeLinecap: "round",
								fill: "none",
								filter: isElite ? "url(#red-eye-glow)" : void 0
							})
						}),
						isElite ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							fill: "#BF0000",
							filter: "url(#red-eye-glow)",
							children: isSleeping ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								stroke: "#BF0000",
								strokeWidth: "2.5",
								strokeLinecap: "round",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "40",
									y1: "62",
									x2: "52",
									y2: "62"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "68",
									y1: "62",
									x2: "80",
									y2: "62"
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
									cx: "46",
									cy: "62",
									rx: "4",
									ry: "5"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
									cx: "74",
									cy: "62",
									rx: "4",
									ry: "5"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
									cx: "46",
									cy: "62",
									rx: "1.5",
									ry: "2",
									fill: "#FFFFFF"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
									cx: "74",
									cy: "62",
									rx: "1.5",
									ry: "2",
									fill: "#FFFFFF"
								})
							] })
						}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							stroke: "#1a1a1a",
							strokeWidth: "2.5",
							strokeLinecap: "round",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "42",
									y1: "58",
									x2: "50",
									y2: "66"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "50",
									y1: "58",
									x2: "42",
									y2: "66"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "70",
									y1: "58",
									x2: "78",
									y2: "66"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "78",
									y1: "58",
									x2: "70",
									y2: "66"
								})
							]
						}) : eyesClosed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							stroke: "#1a1a1a",
							strokeWidth: "2.2",
							strokeLinecap: "round",
							fill: "none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M40 62 Q 46 58 52 62" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M68 62 Q 74 58 80 62" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							fill: "#1a1a1a",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
								cx: "46",
								cy: "62",
								rx: "3.2",
								ry: "4.2",
								style: {
									transformOrigin: "46px 62px",
									animation: "unify-blink 4s infinite"
								}
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
								cx: "74",
								cy: "62",
								rx: "3.2",
								ry: "4.2",
								style: {
									transformOrigin: "74px 62px",
									animation: "unify-blink 4s infinite"
								}
							})]
						}),
						isElite ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M50 78 Q 60 84 70 78",
							stroke: "#BF0000",
							strokeWidth: "2.2",
							fill: "none",
							strokeLinecap: "round",
							filter: "url(#red-eye-glow)"
						}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M50 82 L 54 78 L 58 82 L 62 78 L 66 82 L 70 78",
							stroke: "#1a1a1a",
							strokeWidth: "2",
							fill: "none",
							strokeLinecap: "round"
						}) : isSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M48 78 Q 60 92 72 78",
							stroke: "#1a1a1a",
							strokeWidth: "2.5",
							fill: "none",
							strokeLinecap: "round"
						}) : isThinking || isTyping ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							fill: "#1a1a1a",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "52",
									cy: "80",
									r: "1.8",
									style: {
										animation: "dot-bounce 1.2s infinite",
										animationDelay: "0s"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "60",
									cy: "80",
									r: "1.8",
									style: {
										animation: "dot-bounce 1.2s infinite",
										animationDelay: "0.2s"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "68",
									cy: "80",
									r: "1.8",
									style: {
										animation: "dot-bounce 1.2s infinite",
										animationDelay: "0.4s"
									}
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M52 80 Q 60 85 68 80",
							stroke: "#1a1a1a",
							strokeWidth: "2",
							fill: "none",
							strokeLinecap: "round"
						}),
						isScanning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "18",
							y: "60",
							width: "84",
							height: "2",
							fill: "#BF0000",
							opacity: "0.8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
								attributeName: "y",
								from: "20",
								to: "100",
								dur: "1.4s",
								repeatCount: "indefinite"
							})
						}),
						isListening && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							stroke: "#BF0000",
							strokeWidth: "1.5",
							fill: "none",
							opacity: "0.6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("circle", {
								cx: "60",
								cy: "60",
								r: "52",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
									attributeName: "r",
									from: "44",
									to: "58",
									dur: "1.2s",
									repeatCount: "indefinite"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
									attributeName: "opacity",
									from: "0.7",
									to: "0",
									dur: "1.2s",
									repeatCount: "indefinite"
								})]
							})
						}),
						isSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							transform: "translate(90 90)",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								r: "12",
								fill: "#10B981"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M-5 0 L -1 4 L 5 -3",
								stroke: "white",
								strokeWidth: "2.5",
								fill: "none",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})]
						})
					]
				})
			}),
			isThinking && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute -bottom-1 left-1/2 flex gap-1 -translate-x-1/2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-1.5 w-1.5 rounded-full bg-primary",
						style: { animation: "dot-bounce 1.2s infinite" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-1.5 w-1.5 rounded-full bg-primary",
						style: { animation: "dot-bounce 1.2s infinite 0.2s" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-1.5 w-1.5 rounded-full bg-primary",
						style: { animation: "dot-bounce 1.2s infinite 0.4s" }
					})
				]
			})
		]
	});
}
//#endregion
export { UnifyMascot as t };
