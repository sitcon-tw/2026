import fs from "fs";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
	html: false,
	linkify: true
});

const INPUT = "public/sessions-web.json";
const OUTPUT = "public/sessions.json";

/* ---------- Step 1: Copy INPUT to OUTPUT ---------- */
fs.copyFileSync(INPUT, OUTPUT);

/* ---------- helpers ---------- */
const render = s => (typeof s === "string" ? md.render(s) : s);

/* ---------- Step 2: Process markdown in INPUT ---------- */
const inputData = JSON.parse(fs.readFileSync(INPUT, "utf-8"));
const outputData = structuredClone(inputData);

/* sessions */
if (Array.isArray(inputData.sessions)) {
	for (const session of inputData.sessions) {
		for (const lang of ["zh", "en"]) {
			if (session[lang]?.description) {
				session[lang].description = render(session[lang].description);
			}
		}
	}
}

/* speakers */
if (Array.isArray(inputData.speakers)) {
	for (const speaker of inputData.speakers) {
		for (const lang of ["zh", "en"]) {
			if (speaker[lang]?.bio) {
				speaker[lang].bio = render(speaker[lang].bio);
			}
		}
	}
}

fs.writeFileSync(INPUT, JSON.stringify(inputData, null, 2));

/* ---------- Step 3: Process avatar paths in OUTPUT ---------- */

/* avatar rewrite */
if (Array.isArray(outputData.speakers)) {
	for (const speaker of outputData.speakers) {
		if (typeof speaker.avatar === "string" && speaker.avatar.startsWith("https://sitcon.org/2026/img/avatar/speaker/")) {
			const filename = speaker.avatar.split("/").pop();
			speaker.avatar = "https://sitcon.org/2026/img/avatar/speaker/large/" + filename;
		}
	}
}

fs.writeFileSync(OUTPUT, JSON.stringify(outputData, null, 2));
