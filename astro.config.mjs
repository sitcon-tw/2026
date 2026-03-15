// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
	site: "https://sitcon.org",
	base: "/2026",
	output: "static",
	trailingSlash: "always",
	redirects: {
		"/events": "/2026/info/",
		"/poster": "/2026/agenda/#gallery",
		"/traffic": "/2026/info/",
		"/tickets": "/2026/info/",
		"/staff": "/2026/team/",
		"/sponsor": "/2026/#sponsors"
	},
	build: {
		format: "directory"
	},
	vite: {
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src")
			}
		}
	},
	i18n: {
		defaultLocale: "zh",
		locales: ["zh", "en"],
		routing: {
			prefixDefaultLocale: false // / 是中文
		}
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: "zh",
				locales: {
					zh: "zh-TW",
					en: "en-US"
				}
			},
			filter: page => {
				return !page.includes("/quotation");
			}
		})
	]
});
