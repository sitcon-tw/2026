/**
 * Agenda schema from agenda_now.json.
 * Type codes: Ev = Generic, K = Keynote, P = Presentation, U = Undefined (開放式), E = Espresso, S = Sponsored (合作議程)
 */
export type SessionTypeCode = "Ev" | "K" | "P" | "U" | "E" | "S";

export const SESSION_TYPE_CODES = {
	Ev: "generic",
	K: "keynote",
	P: "presentation",
	U: "undefined",
	E: "espresso",
	S: "sponsored"
} as const satisfies Record<SessionTypeCode, string>;

export type SessionTypeInternal = "generic" | "keynote" | "presentation" | "undefined" | "espresso" | "sponsored";

export function sessionTypeCodeToInternal(code: string): SessionTypeInternal {
	const mapped = (SESSION_TYPE_CODES as Record<string, string>)[code];
	return (mapped as SessionTypeInternal) ?? "generic";
}

export interface AgendaSessionZhEn {
	title: string;
	description: string;
}

export interface Advertisement {
	title?: string;
	company?: string;
	positions?: Array<{ title: string; link?: string }>;
	description?: string;
	logo?: string;
}

export interface AgendaSessionRaw {
	id: string;
	type: SessionTypeCode;
	room: string;
	broadcast: string[] | null;
	start: string;
	end: string;
	qa: string | null;
	slide: string | null;
	co_write: string | null;
	record?: string | null;
	live?: string | null;
	language?: string | null;
	uri?: string;
	zh: AgendaSessionZhEn;
	en: AgendaSessionZhEn;
	speakers: string[];
	tags: string[];
}

export interface AgendaSpeakerRaw {
	id: string;
	avatar?: string;
	zh?: { name: string; bio?: string };
	en?: { name: string; bio?: string };
}

export interface AgendaTagRaw {
	id: string;
	zh?: { name: string; description?: string };
	en?: { name: string; description?: string };
}

export interface AgendaDataFile {
	sessions: AgendaSessionRaw[];
	speakers?: AgendaSpeakerRaw[];
	session_types?: unknown[];
	rooms?: unknown[];
	tags?: AgendaTagRaw[];
}
