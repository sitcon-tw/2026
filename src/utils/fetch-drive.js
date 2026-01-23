import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

const CSV_FILE = "src/utils/a.csv";
const OUTPUT_DIR = "drive";
const CONCURRENCY = 5;

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

const extractDriveFileId = url => {
	if (!url) return null;

	// open?id=XXXX
	const openMatch = url.match(/[?&]id=([^&]+)/);
	if (openMatch) return openMatch[1];

	// /file/d/XXXX/
	const fileMatch = url.match(/\/file\/d\/([^/]+)/);
	if (fileMatch) return fileMatch[1];

	return null;
};

const driveDownloadUrl = fileId => {
	return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

const downloadDriveAvatar = async ({ nickname, fileId }) => {
	const url = driveDownloadUrl(fileId);
	const outPath = path.join(OUTPUT_DIR, `${nickname}.jpg`);

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
};

const chunk = (arr, size) => {
	const out = [];
	for (let i = 0; i < arr.length; i += size) {
		out.push(arr.slice(i, i + size));
	}
	return out;
};

// -------- 主流程 --------

const tasks = records
	.map(row => {
		const nickname = row["暱稱"];
		const avatar = (row["有頭像"] || "").trim();

		const fileId = extractDriveFileId(avatar);
		if (!nickname || !fileId) return null;

		return { nickname, fileId };
	})
	.filter(Boolean);

console.log(`📦 需要下載 ${tasks.length} 個 Drive 頭像`);

const results = [];

for (const batch of chunk(tasks, CONCURRENCY)) {
	const batchResults = await Promise.all(batch.map(task => downloadDriveAvatar(task)));
	results.push(...batchResults);
}

// -------- summary --------

const ok = results.filter(r => r.status === "ok").length;
const fail = results.filter(r => r.status === "error").length;

console.log("\n=== Summary ===");
console.log("Downloaded:", ok);
console.log("Failed:", fail);
