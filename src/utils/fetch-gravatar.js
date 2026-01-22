import crypto from "crypto";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

const CSV_FILE = "src/utils/a.csv";
const OUTPUT_DIR = "avatars";
const CONCURRENCY = 20;

if (!fs.existsSync(OUTPUT_DIR)) {
	fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const csvText = fs.readFileSync(CSV_FILE, "utf-8");

const records = parse(csvText, {
	columns: true,
	skip_empty_lines: true,
	trim: true,
	relax_column_count: true
});

function isDriveUrl(url) {
	return typeof url === "string" && url.includes("drive.google.com");
}

function gravatarUrl(email, size = 500) {
	const hash = crypto.createHash("md5").update(email.trim().toLowerCase()).digest("hex");

	return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

async function downloadAvatar({ nickname, email }) {
	const url = gravatarUrl(email);
	const outPath = path.join(OUTPUT_DIR, `${nickname}.png`);

	try {
		const res = await fetch(url);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);

		const buf = Buffer.from(await res.arrayBuffer());
		await fs.promises.writeFile(outPath, buf);

		console.log(`✅ ${nickname}`);
		return { nickname, status: "ok" };
	} catch (err) {
		console.error(`❌ ${nickname}: ${err.message}`);
		return { nickname, status: "error", error: err.message };
	}
}

function chunk(arr, size) {
	const out = [];
	for (let i = 0; i < arr.length; i += size) {
		out.push(arr.slice(i, i + size));
	}
	return out;
}

// ---------- 主流程 ----------

const tasks = records
	.map(row => {
		const nickname = row["暱稱"];
		const email = row["mail"];
		const avatar = (row["有頭像"] || "").trim();

		if (!nickname || !email) return null;
		if (isDriveUrl(avatar)) return null;

		return { nickname, email };
	})
	.filter(Boolean);

const results = [];

for (const batch of chunk(tasks, CONCURRENCY)) {
	const batchResults = await Promise.all(batch.map(task => downloadAvatar(task)));
	results.push(...batchResults);
}

// ---------- summary ----------

const ok = results.filter(r => r.status === "ok").length;
const fail = results.filter(r => r.status === "error").length;

console.log("\n=== Summary ===");
console.log("Downloaded:", ok);
console.log("Failed:", fail);
