import { t as __exportAll } from "./vendor_react-CFh17dx8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/memory-CkcAkHNh.js
var memory_exports = /* @__PURE__ */ __exportAll({
	applyContextWindow: () => applyContextWindow,
	extractLongTermFacts: () => extractLongTermFacts,
	summarizeLocally: () => summarizeLocally
});
/**
* Keeps the newest `maxMessages` turns; older turns are condensed into a
* single summary message so the conversation never overflows the window.
*/
function applyContextWindow(messages, maxMessages, previousSummary) {
	if (messages.length <= maxMessages) {
		if (!previousSummary) return {
			messages,
			overflow: []
		};
		return {
			messages: [{
				role: "system",
				content: `Resumo da conversa anterior:\n${previousSummary}`
			}, ...messages],
			overflow: []
		};
	}
	const overflow = messages.slice(0, messages.length - maxMessages);
	const recent = messages.slice(messages.length - maxMessages);
	return {
		messages: [{
			role: "system",
			content: `Resumo da conversa anterior:\n${summarizeLocally(overflow, previousSummary)}`
		}, ...recent],
		overflow
	};
}
/** Cheap deterministic summary used as fallback / seed for the model summary. */
function summarizeLocally(messages, previousSummary) {
	return [previousSummary, ...messages.map((m) => {
		const text = typeof m.content === "string" ? m.content : m.content.map((p) => p.type === "text" ? p.text : `[${p.type}]`).join(" ");
		return `- ${m.role === "user" ? "Usuário" : "Unify"}: ${text.replace(/\s+/g, " ").slice(0, 220)}`;
	})].filter(Boolean).join("\n").slice(0, 4e3);
}
/**
* Long-term memory: durable facts worth carrying across conversations
* (device models, recurring symptoms, tools the technician owns).
*/
function extractLongTermFacts(messages) {
	const facts = /* @__PURE__ */ new Set();
	const deviceRe = /\b(iphone|galaxy|redmi|poco|moto\s?g|moto\s?e|realme|xiaomi|samsung|motorola|oppo|vivo|honor|huawei|asus|zenfone|nokia|lg|sony)\s?[\w\d\s+]{0,14}/gi;
	for (const m of messages) {
		if (m.role !== "user") continue;
		const text = typeof m.content === "string" ? m.content : m.content.map((p) => p.type === "text" ? p.text : "").join(" ");
		for (const match of text.match(deviceRe) ?? []) facts.add(`Aparelho citado: ${match.trim()}`);
	}
	return Array.from(facts).slice(0, 20);
}
//#endregion
export { extractLongTermFacts as n, memory_exports as r, applyContextWindow as t };
