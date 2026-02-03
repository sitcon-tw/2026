import type { Advertisement, AgendaDataFile, AgendaSessionRaw, AgendaSpeakerRaw, AgendaTagRaw } from "@/types/agenda";
import { sessionTypeCodeToInternal } from "@/types/agenda";

export type Lang = "zh" | "en";

export interface SpeakerResolved {
	name: string;
	avatar?: string;
}

/**
 * Normalized agenda item for AgendaTimeline / SessionBlock (internal shape).
 * speakers and tags are resolved from session.speakers / session.tags via agenda metadata.
 */
export interface AgendaItemNormalized {
	id: string;
	type: string;
	venue: string;
	/** When non-null/non-empty, session spans these rooms (overlay). When null/empty, use venue only (single room). */
	broadcast: string[] | null;
	name: string;
	description: string;
	speakers: SpeakerResolved[];
	tags: string[];
	startTime: string;
	endTime: string;
	slidoLink?: string;
	slidesLink?: string;
	notesLink?: string;
	advertisement?: Advertisement;
	extended?: boolean;
}

function buildSpeakerMap(speakers: AgendaSpeakerRaw[] | undefined, lang: Lang): Map<string, SpeakerResolved> {
	const map = new Map<string, SpeakerResolved>();
	if (!speakers) return map;
	for (const s of speakers) {
		const name = lang === "zh" ? s.zh?.name : s.en?.name;
		if (name !== undefined) map.set(s.id, { name, avatar: s.avatar });
	}
	return map;
}

function buildTagMap(tags: AgendaTagRaw[] | undefined, lang: Lang): Map<string, string> {
	const map = new Map<string, string>();
	if (!tags) return map;
	for (const t of tags) {
		const name = lang === "zh" ? t.zh?.name : t.en?.name;
		if (name !== undefined) map.set(t.id, name);
	}
	return map;
}

export function normalizeAgendaSession(session: AgendaSessionRaw, lang: Lang, options?: { speakerMap?: Map<string, SpeakerResolved>; tagMap?: Map<string, string> }): AgendaItemNormalized {
	const zh = session.zh ?? { title: "", description: "" };
	const en = session.en ?? { title: "", description: "" };
	const speakerMap = options?.speakerMap;
	const tagMap = options?.tagMap;
	const speakerIds = session.speakers ?? [];
	const tagIds = session.tags ?? [];
	const speakers: SpeakerResolved[] = speakerMap ? speakerIds.map(id => speakerMap.get(id) ?? { name: id }) : speakerIds.map(id => ({ name: id }));
	const tags: string[] = tagMap ? tagIds.map(id => tagMap.get(id) ?? id) : tagIds;
	return {
		id: session.id,
		type: sessionTypeCodeToInternal(session.type),
		venue: session.room ?? "",
		broadcast: session.broadcast ?? null,
		name: lang === "zh" ? zh.title : en.title,
		description: lang === "zh" ? zh.description : en.description,
		speakers,
		tags,
		startTime: session.start,
		endTime: session.end,
		slidoLink: session.qa ?? undefined,
		slidesLink: session.slide ?? undefined,
		notesLink: session.co_write ?? undefined,
		advertisement: undefined
	};
}

/**
 * Normalize all sessions from full agenda file, resolving session.speakers and session.tags via metadata.
 */
export function normalizeAgendaSessionsFromFile(data: AgendaDataFile, lang: Lang): AgendaItemNormalized[] {
	const sessions = (data.sessions ?? []) as AgendaSessionRaw[];
	const speakerMap = buildSpeakerMap(data.speakers, lang);
	const tagMap = buildTagMap(data.tags, lang);
	return sessions.map(s => normalizeAgendaSession(s, lang, { speakerMap, tagMap }));
}
