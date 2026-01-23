import en from "@/i18n/en.json";
import zhHant from "@/i18n/zh.json";

export type Lang = "zh" | "en";

export const translations = {
	zh: zhHant,
	en: en
} as const;

export const getLangFromUrl = (url: URL): Lang => {
	const pathname = url.pathname;
	// Check if path starts with /en/ or /2026/en/
	if (pathname.match(/^(\/2026)?(\/en)(\/|$)/)) {
		return "en";
	}
	return "zh";
};

export const useTranslations = (lang: Lang) => {
	return translations[lang];
};

export const getLocalePath = (path: string, lang: Lang): string => {
	// Remove leading /2026 if present
	const cleanPath = path.replace(/^\/2026/, "");
	// Remove /en prefix if present
	const basePath = cleanPath.replace(/^\/en/, "");

	if (lang === "en") {
		return `/2026/en${basePath || "/"}`;
	}
	return `/2026${basePath || "/"}`;
};

export const getAlternateUrl = (currentPath: string, targetLang: Lang): string => {
	return getLocalePath(currentPath, targetLang);
};

// Language-specific metadata
export const langMeta = {
	zh: {
		htmlLang: "zh-TW",
		ogLocale: "zh_TW"
	},
	en: {
		htmlLang: "en",
		ogLocale: "en_US"
	}
} as const;
