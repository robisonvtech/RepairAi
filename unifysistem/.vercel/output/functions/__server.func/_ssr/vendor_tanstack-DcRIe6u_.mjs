import { t as __exportAll } from "./vendor_react-CFh17dx8.mjs";
import { o as getServerFnById, t as TSS_SERVER_FUNCTION } from "./vendor_react-CFh17dx82.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vendor_tanstack-DcRIe6u_.js
var empty_plugin_adapters_exports = /* @__PURE__ */ __exportAll({
	hasPluginAdapters: () => false,
	pluginSerializationAdapters: () => pluginSerializationAdapters
});
var pluginSerializationAdapters = [];
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
export { createServerRpc as n, empty_plugin_adapters_exports as r, createSsrRpc as t };
