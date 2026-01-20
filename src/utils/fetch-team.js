import fs from "node:fs/promises";

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMvNABVUw5itBqqYEXVoquYv4jwLABDrqO2JvGEiH7k1Dlrevf5xUfeIRnDtNhhE5eLzqFAcp1qUxL/pub?gid=1512360346&single=true&output=csv";

const TEAM_MAP = {
	總召組: "general",
	行政組: "administration",
	議程組: "agenda",
	場務組: "operations",
	設計組: "design",
	財務組: "finance",
	紀錄組: "recording",
	製播組: "production",
	開發組: "development",
	編輯組: "editorial",
	行銷組: "marketing"
};

const ROLE_MAP = {
	/* ===== 總召組 ===== */
	總召: "chief",
	副召: "deputy_chief",

	/* ===== 通用組級 ===== */
	組長: "head",
	副組長: "deputy",

	/* ===== 行政 / 通用 ===== */
	組員: "member",

	/* ===== 財務 ===== */
	出納: "treasurer",

	/* ===== 議程 ===== */
	議程股股長: "agenda_lead",

	/* ===== 場務（股長） ===== */
	機動股長: "ops_mobility_lead",
	報到股長: "ops_registration_lead",
	餐飲股長: "ops_catering_lead",
	物流股長: "ops_logistics_lead",

	/* ===== 場務（股員） ===== */
	機動股: "ops_mobility",
	報到股: "ops_registration",
	餐飲股: "ops_catering",
	物流股: "ops_logistics",

	/* ===== 行銷 ===== */
	小精靈: "marketing_helper"
};

const normalizeTeam = team => {
	return TEAM_MAP[team] || team;
};

function normalizeRole(role) {
	return ROLE_MAP[role] || "member";
}

function parseCSV(text) {
	const rows = [];
	let current = [];
	let cell = "";
	let inQuotes = false;

	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		const next = text[i + 1];

		if (char === '"' && next === '"') {
			cell += '"';
			i++;
		} else if (char === '"') {
			inQuotes = !inQuotes;
		} else if (char === "," && !inQuotes) {
			current.push(cell);
			cell = "";
		} else if (char === "\n" && !inQuotes) {
			current.push(cell);
			rows.push(current);
			current = [];
			cell = "";
		} else {
			cell += char;
		}
	}

	current.push(cell);
	rows.push(current);
	return rows;
}

const buildMember = row => {
	const [name, description, link, team1, role1, team2, role2, team3, role3] = row;

	const teams = [];

	const push = (team, role) => {
		if (!team || !role) return;
		teams.push({
			name: normalizeTeam(team),
			role: normalizeRole(role)
		});
	};

	push(team1, role1);
	push(team2, role2);
	push(team3, role3);

	const obj = {
		name,
		description,
		teams
	};

	if (link && link !== "無") {
		obj.link = link;
	}

	return obj;
};

const main = async () => {
	const res = await fetch(CSV_URL);
	const csv = await res.text();

	const rows = parseCSV(csv);
	rows.shift(); // remove header

	const members = rows.filter(r => r[0]).map(buildMember);

	await fs.writeFile("src/data/team.json", JSON.stringify(members, null, 2), "utf8");

	console.log(`✅ wrote team.json (${members.length} entries)`);
};

main().catch(err => {
	console.error(err);
	process.exit(1);
});
