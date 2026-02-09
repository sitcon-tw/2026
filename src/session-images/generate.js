import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");

registerFont(path.join(ROOT, "session-images/GenKiGothic2TW-B.otf"), { family: "GenKiGothic" });

const WIDTH = 1200;
const HEIGHT = 600;

const AVATAR_AREA = {
	x: 776,
	y: 0,
	width: 424,
	height: 600
};

const MASK_PATH = [
	[923, 0],
	[1200, 0],
	[1200, 600],
	[776, 600]
];

const MASK_BOUNDS = {
	x: 776,
	y: 0,
	width: 1200 - 776, // 424
	height: 600
};

const BADGE_COLORS = {
	K: "#7A4A00", // Keynote
	P: "#005F6A", // Presentation
	E: "#5B2D8B", // Espresso
	PD: "#8A1F3D", // 論壇
	L: "#2E6B3F", // Lightning Talk
	S: "#444444", // 合作議程
	U: "#444444" // 開放式議程
};

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
	let line = "";

	for (const ch of text) {
		const test = line + ch;
		if (ctx.measureText(test).width > maxWidth) {
			ctx.fillText(line, x, y);
			line = ch;
			y += lineHeight;
		} else {
			line = test;
		}
	}
	if (line) ctx.fillText(line, x, y);
}

function drawBadge(ctx, typeName, typeId) {
	const bg = BADGE_COLORS[typeId] ?? "#333";

	ctx.fillStyle = bg;
	ctx.fillRect(80, 80, 185, 48);

	ctx.fillStyle = "#fff";
	ctx.font = "bold 24px GenKiGothic";
	ctx.textBaseline = "middle";
	ctx.fillText(typeName, 96, 104);
}

function clipAvatarMask(ctx) {
	ctx.beginPath();
	MASK_PATH.forEach(([x, y], i) => {
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	});
	ctx.closePath();
	ctx.clip();
}

async function drawAvatars(ctx, speakerIds) {
	if (!speakerIds || speakerIds.length === 0) return;

	const count = speakerIds.length;
	const sliceHeight = AVATAR_AREA.height / count;

	for (let i = 0; i < count; i++) {
		const speakerId = speakerIds[i];
		if (!speakerId) continue;

		const avatarPath = path.join(ROOT, "../public/img/avatar/speaker/large", `${speakerId}.webp`);

		if (!fs.existsSync(avatarPath)) continue;

		// ① 先 cover 成「遮罩外接矩形大小」
		const buffer = await sharp(avatarPath)
			.resize(MASK_BOUNDS.width, Math.ceil(MASK_BOUNDS.height / count), {
				fit: "cover",
				position: "centre"
			})
			.png()
			.toBuffer();

		const img = await loadImage(buffer);

		// ② 套用斜邊遮罩再畫
		ctx.save();
		clipAvatarMask(ctx);

		ctx.drawImage(img, MASK_BOUNDS.x, MASK_BOUNDS.y + (MASK_BOUNDS.height / count) * i, MASK_BOUNDS.width, MASK_BOUNDS.height / count);

		ctx.restore();
	}
}

async function generateSessionImage(session, speakerMap, typeMap) {
	const canvas = createCanvas(WIDTH, HEIGHT);
	const ctx = canvas.getContext("2d");

	const base = await loadImage(path.join(ROOT, "session-images/base.png"));
	ctx.drawImage(base, 0, 0, WIDTH, HEIGHT);

	const typeName = typeMap[session.type]?.zh?.name ?? "";
	drawBadge(ctx, typeName, session.type);

	ctx.fillStyle = "#ffffff";
	ctx.font = "bold 48px GenKiGothic";
	drawWrappedText(ctx, session.zh.title, 80, 190, 700, 64);

	const speakerNames = session.speakers
		.map(id => speakerMap[id]?.zh?.name)
		.filter(Boolean)
		.join("、");

	ctx.font = "28px GenKiGothic";
	ctx.fillText(speakerNames, 80, 380);

	await drawAvatars(ctx, session.speakers);

	const deco = await loadImage(path.join(ROOT, "session-images/deco.png"));
	ctx.drawImage(deco, 0, 0, WIDTH, HEIGHT);

	const outPath = path.join(ROOT, "../public", "img", "session", `${session.id}.png`);
	const pngBuffer = canvas.toBuffer("image/png");
	const webpBuffer = await sharp(pngBuffer).webp({ quality: 80 }).toBuffer();
	fs.writeFileSync(outPath.replace(/\.png$/, ".webp"), webpBuffer);
	console.log(`✓ ${session.id}.webp`);
}

async function main() {
	const data = JSON.parse(fs.readFileSync(path.join(ROOT, "../public/sessions.json"), "utf8"));

	const speakerMap = Object.fromEntries(data.speakers.map(s => [s.id, s]));

	const typeMap = Object.fromEntries(data.session_types.map(t => [t.id, t]));

	if (!fs.existsSync(path.join(ROOT, "../public", "img", "session"))) {
		fs.mkdirSync(path.join(ROOT, "../public", "img", "session"));
	}

	const sessions = data.sessions.filter(session => ["K", "P", "E", "PD", "L", "S", "U"].includes(session.type)).filter(session => session.zh?.title);

	const BATCH_SIZE = 10;
	let completed = 0;

	for (let i = 0; i < sessions.length; i += BATCH_SIZE) {
		const batch = sessions.slice(i, i + BATCH_SIZE);
		const tasks = batch.map(session => generateSessionImage(session, speakerMap, typeMap));
		await Promise.all(tasks);
		completed += batch.length;
		console.log(`進度: ${completed}/${sessions.length}`);
	}

	console.log(`\n✅ 完成！共生成 ${sessions.length} 張圖片`);
}

await main();
