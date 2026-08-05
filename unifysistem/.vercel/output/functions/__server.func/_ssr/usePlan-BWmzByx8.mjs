import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as useEntitlements } from "./useEntitlements-FfQO3F-T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/usePlan-BWmzByx8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var STORAGE_KEY = "unify:plan-override";
function readOverride() {
	if (typeof window === "undefined") return null;
	const v = window.localStorage.getItem(STORAGE_KEY);
	return v === "start" || v === "pro" || v === "elite" ? v : null;
}
/**
* Derives the user's plan from entitlements and applies the `data-plan`
* attribute to the <html> element so global tokens switch instantly.
* Admins can override to preview any plan.
*/
function usePlan() {
	const { isAdmin, isPro, loading } = useEntitlements();
	const [override, setOverrideState] = (0, import_react.useState)(() => readOverride());
	const plan = isAdmin && override ? override : isAdmin ? "elite" : isPro ? "pro" : "start";
	const setOverride = (0, import_react.useCallback)((next) => {
		if (typeof window === "undefined") return;
		if (next === null) window.localStorage.removeItem(STORAGE_KEY);
		else window.localStorage.setItem(STORAGE_KEY, next);
		setOverrideState(next);
	}, []);
	(0, import_react.useEffect)(() => {
		if (loading) return;
		const root = document.documentElement;
		root.setAttribute("data-plan", plan);
		const shouldUseDark = plan === "elite" || plan === "pro";
		root.classList.toggle("dark", shouldUseDark);
		root.style.colorScheme = shouldUseDark ? "dark" : "light";
	}, [plan, loading]);
	return {
		plan,
		label: plan === "elite" ? "ELITE" : plan === "pro" ? "PRO" : "START",
		badgeClass: plan === "elite" ? "bg-primary text-primary-foreground shadow-[0_0_20px_oklch(0.62_0.26_27.5/0.6)]" : plan === "pro" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
		isDark: plan === "elite" || plan === "pro",
		canSwitch: isAdmin,
		setOverride,
		override
	};
}
//#endregion
export { usePlan as t };
