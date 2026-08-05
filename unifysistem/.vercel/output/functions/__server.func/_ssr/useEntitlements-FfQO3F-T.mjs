import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as supabase } from "./client-tCc0-7Lo.mjs";
import { a as hasAccessToApp, o as normalizeSubscriptionStatus } from "./router-DZj4C1IY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useEntitlements-FfQO3F-T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useEntitlements() {
	const [state, setState] = (0, import_react.useState)({
		loading: true,
		userId: null,
		isAdmin: false,
		isPro: false,
		plan: "free",
		canPremium: false
	});
	(0, import_react.useEffect)(() => {
		let active = true;
		(async () => {
			const { data: u } = await supabase.auth.getUser();
			const uid = u.user?.id ?? null;
			if (!uid) {
				if (active) setState({
					loading: false,
					userId: null,
					isAdmin: false,
					isPro: false,
					plan: "free",
					canPremium: false
				});
				return;
			}
			const [{ data: roles }, { data: profile }] = await Promise.all([supabase.from("user_roles").select("role").eq("user_id", uid), supabase.from("profiles").select("subscription_status").eq("id", uid).maybeSingle()]);
			const isAdmin = (roles ?? []).some((r) => r.role === "admin");
			const plan = normalizeSubscriptionStatus(profile?.subscription_status);
			const isPro = plan === "pro" || plan === "elite";
			if (active) setState({
				loading: false,
				userId: uid,
				isAdmin,
				isPro,
				plan,
				canPremium: isAdmin || hasAccessToApp(plan)
			});
		})();
		return () => {
			active = false;
		};
	}, []);
	return state;
}
//#endregion
export { useEntitlements as t };
