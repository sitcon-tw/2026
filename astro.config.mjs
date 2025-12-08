// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://sitcon.org",
	base: "/2026",
	output: "static",
	trailingSlash: "ignore",
	build: {
		format: "directory"
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: "zh-Hant",
				locales: {
					"zh-Hant": "zh-TW",
					en: "en-US"
				}
			},
			filter: page => {
				return !page.includes("/quotation");
			}
		})
	]
});
