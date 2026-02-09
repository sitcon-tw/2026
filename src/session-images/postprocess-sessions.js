import fs from "fs";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
	html: false,
	linkify: true
});

const INPUT = process.argv[2] ?? "public/sessions-web.json";
const OUTPUT = process.argv[3] ?? "public/sessions.json";

const data = JSON.parse(fs.readFileSync(INPUT, "utf-8"));

/* ---------- helpers ---------- */
const render = s => (typeof s === "string" ? md.render(s) : s);

/* ---------- sessions ---------- */
if (Array.isArray(data.sessions)) {
	for (const session of data.sessions) {
		for (const lang of ["zh", "en"]) {
			if (session[lang]?.description) {
				session[lang].description_html = render(session[lang].description);
			}
		}
	}
}

/* ---------- speakers ---------- */
if (Array.isArray(data.speakers)) {
	for (const speaker of data.speakers) {
		for (const lang of ["zh", "en"]) {
			if (speaker[lang]?.bio) {
				speaker[lang].bio_html = render(speaker[lang].bio);
			}
		}
	}
}

fs.writeFileSync(INPUT, JSON.stringify(data, null, 2));

/* avatar rewrite */
if (Array.isArray(data.speakers)) {
	for (const speaker of data.speakers) {
		if (typeof speaker.avatar === "string" && speaker.avatar.startsWith("https://sitcon.org/2026/img/avatar/speaker/")) {
			const filename = speaker.avatar.split("/").pop();
			speaker.avatar = "https://sitcon.org/2026/img/avatar/speaker/large/" + filename;
		}
	}
}

fs.writeFileSync(OUTPUT, JSON.stringify(data, null, 2));
