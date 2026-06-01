import fs from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const TEAM_DATA_PATH = "src/data/team.json";
const AVATAR_ROOT = "public/img/avatar";
const FRONT_DIR = path.join(AVATAR_ROOT, "front");
const BACK_DIR = path.join(AVATAR_ROOT, "back");
const STAFF_DIR = path.join(AVATAR_ROOT, "staff");

const imagePath = (dir, name) => path.join(dir, `${name}.webp`);

const fileExists = async file => {
	try {
		await fs.access(file);
		return true;
	} catch {
		return false;
	}
};

const parseColor = color => {
	const normalized = String(color || "")
		.trim()
		.replace(/^#/, "");
	if (!/^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(normalized)) {
		throw new Error(`Invalid avatar color: ${color}`);
	}

	const hex =
		normalized.length === 3
			? normalized
					.split("")
					.map(char => char + char)
					.join("")
			: normalized;

	return {
		r: Number.parseInt(hex.slice(0, 2), 16),
		g: Number.parseInt(hex.slice(2, 4), 16),
		b: Number.parseInt(hex.slice(4, 6), 16),
		alpha: 1
	};
};

const dimensionsOf = async file => {
	const { width, height } = await sharp(file).metadata();
	if (!width || !height) {
		throw new Error(`Cannot read image dimensions: ${file}`);
	}
	return { width, height };
};

const writeWebp = async (image, outputPath) => {
	await image.webp({ quality: 90 }).toFile(outputPath);
};

const generateDefaultAvatar = async (name, backPath, frontPath, outputPath) => {
	const { width, height } = await dimensionsOf(backPath);
	await writeWebp(
		sharp({
			create: {
				width,
				height,
				channels: 4,
				background: { r: 0, g: 0, b: 0, alpha: 0 }
			}
		}).composite([
			{ input: backPath, left: 0, top: 0 },
			{ input: frontPath, left: 0, top: 0 }
		]),
		outputPath
	);
};

const generateColorAvatar = async (name, frontPath, color, outputPath) => {
	const { width, height } = await dimensionsOf(frontPath);
	await writeWebp(
		sharp({
			create: {
				width,
				height,
				channels: 4,
				background: parseColor(color)
			}
		}).composite([{ input: frontPath, left: 0, top: 0 }]),
		outputPath
	);
};

const generateNoBackgroundAvatar = async (backPath, outputPath) => {
	await writeWebp(sharp(backPath), outputPath);
};

const main = async () => {
	const members = JSON.parse(await fs.readFile(TEAM_DATA_PATH, "utf8"));
	const seenNames = new Set();
	const outputs = [];

	await fs.mkdir(STAFF_DIR, { recursive: true });
	const existingFiles = await fs.readdir(STAFF_DIR);
	await Promise.all(existingFiles.filter(file => file.endsWith(".webp")).map(file => fs.unlink(path.join(STAFF_DIR, file))));

	for (const member of members) {
		if (!member.name || seenNames.has(member.name)) continue;
		seenNames.add(member.name);

		const name = member.name;
		const mode = member.mode || "default";
		const frontPath = imagePath(FRONT_DIR, name);
		const backPath = imagePath(BACK_DIR, name);
		const outputPath = imagePath(STAFF_DIR, name);

		if (mode === "color") {
			if (!(await fileExists(frontPath))) throw new Error(`Missing front avatar for ${name}`);
			await generateColorAvatar(name, frontPath, member.color, outputPath);
		} else if (mode === "nobg") {
			if (!(await fileExists(backPath))) throw new Error(`Missing back avatar for ${name}`);
			await generateNoBackgroundAvatar(backPath, outputPath);
		} else {
			if (!(await fileExists(backPath))) throw new Error(`Missing back avatar for ${name}`);
			if (!(await fileExists(frontPath))) throw new Error(`Missing front avatar for ${name}`);
			await generateDefaultAvatar(name, backPath, frontPath, outputPath);
		}

		outputs.push(outputPath);
	}

	console.log(`wrote ${outputs.length} staff avatars to ${STAFF_DIR}`);
};

main().catch(error => {
	console.error(error);
	process.exit(1);
});
