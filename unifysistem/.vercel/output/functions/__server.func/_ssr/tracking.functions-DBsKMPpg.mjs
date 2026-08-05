import { r as createServerFn } from "./vendor_react-CFh17dx82.mjs";
import { n as createServerRpc } from "./vendor_tanstack-DcRIe6u_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tracking.functions-DBsKMPpg.js
var getTracking_createServerFn_handler = createServerRpc({
	id: "44349b834a517b77e70481c86ca918c5795b2c70b992c06bf131eed1cb9c69e5",
	name: "getTracking",
	filename: "src/lib/tracking.functions.ts"
}, (opts) => getTracking.__executeServer(opts));
var getTracking = createServerFn({ method: "GET" }).validator((d) => {
	const t = d?.token;
	if (!t || typeof t !== "string" || t.length < 8 || t.length > 128) throw new Error("Token inválido.");
	return { token: t };
}).handler(getTracking_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-Bw6iWMJ-.mjs");
	const { data: rpc, error } = await supabaseAdmin.rpc("get_tracking", { _token: data.token });
	if (error) throw new Error(error.message);
	return { json: JSON.stringify(rpc ?? null) };
});
//#endregion
export { getTracking_createServerFn_handler };
