//#region node_modules/.nitro/vite/services/ssr/assets/orders-DZbTO4dH.js
var STATUS_LABEL = {
	awaiting_diagnosis: "Aguardando diagnóstico",
	awaiting_approval: "Aguardando aprovação",
	awaiting_part: "Aguardando peça",
	in_repair: "Em reparo",
	ready: "Pronto para retirada",
	delivered: "Entregue",
	warranty: "Garantia",
	cancelled: "Cancelado"
};
var STATUS_COLOR = {
	awaiting_diagnosis: "bg-slate-500/15 text-slate-600 dark:text-slate-300 border-slate-500/30",
	awaiting_approval: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
	awaiting_part: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30",
	in_repair: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
	ready: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
	delivered: "bg-primary/15 text-primary border-primary/30",
	warranty: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30",
	cancelled: "bg-muted text-muted-foreground border-border"
};
var STATUS_ORDER = [
	"awaiting_diagnosis",
	"awaiting_approval",
	"awaiting_part",
	"in_repair",
	"ready",
	"delivered",
	"warranty",
	"cancelled"
];
function formatBRL(cents) {
	return (cents / 100).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL"
	});
}
function formatOSNumber(n) {
	return `#${String(n).padStart(5, "0")}`;
}
/**
* Base URL pública para links compartilháveis (rastreamento, QR).
* Usa o domínio publicado quando estamos em preview do editor Lovable,
* caso contrário usa o próprio origin. Garante que o cliente final
* acesse sem cair na tela de login do preview.
*/
var PUBLIC_APP_URL = "https://unifysistem.lovable.app";
function publicBaseUrl() {
	if (typeof window === "undefined") return PUBLIC_APP_URL;
	const host = window.location.hostname;
	if (host.includes("lovableproject.com") || host.includes("id-preview--") || host === "localhost") return PUBLIC_APP_URL;
	return window.location.origin;
}
//#endregion
export { formatOSNumber as a, formatBRL as i, STATUS_LABEL as n, publicBaseUrl as o, STATUS_ORDER as r, STATUS_COLOR as t };
