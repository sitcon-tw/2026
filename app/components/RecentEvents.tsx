"use client";

import Link from "next/link";
import { Calendar, MapPin, Clock, Star, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
// @ts-ignore
// const recentEventsData = require("./recentEvents.json");

const ICS_URL = "https://corsproxy.io/?https://calendar.google.com/calendar/ical/ull8p8ceof4sdba5na86s016p8%40group.calendar.google.com/public/basic.ics";
const RANGE_START = new Date("2025-07-13");
const RANGE_END = new Date("2026-03-30");

function parseICS(icsText: string) {
  // 解析 .ics，支援多行欄位與欄位前後空白
  const events: any[] = [];
  // 將多行欄位合併（RFC 5545: 以空白或 tab 開頭的行為上一行延續）
  const normalized = icsText.replace(/\r?\n[ \t]/g, "");
  const veventBlocks = normalized.split("BEGIN:VEVENT").slice(1);
  for (const block of veventBlocks) {
    // 取欄位值
    const get = (key: string) => {
      const match = block.match(new RegExp(`${key}:([^\n\r]+)`, "i"));
      return match ? match[1].trim() : "";
    };
    const dtstart = get("DTSTART");
    const dtend = get("DTEND");
    let summary = get("SUMMARY");
    let description = get("DESCRIPTION");
    if (description) {
      // 先將 \n 轉為實體換行
      description = description.replace(/\\n/g, "\n");
      // Google Meet 特例：只保留第一行
      const meetMatch = description.match(/^使用 Google Meet 加入：.*$/m);
      if (meetMatch) {
        description = meetMatch[0];
      }
      description = description.replace(/\n/g, "<br>");
    }
    let location = get("LOCATION");
    let url = get("URL");
    let conference = get("X-GOOGLE-CONFERENCE");
    // SUMMARY 前後空白去除
    summary = summary.trim();
    // DESCRIPTION 取第一個 http(s) 連結作為 link
    let link = url || conference;
    if (!link && description) {
      const urlMatch = description.match(/https?:\/\/[^\s\\]+/);
      if (urlMatch) link = urlMatch[0];
    }
    if (conference) {
      location = "Google Meet 線上會議";
    }
    // 解析日期與時間（支援 UTC 格式，並轉為台灣時區）
    let eventDateObj: Date | null = null;
    if (/^\d{8}T\d{6}Z$/.test(dtstart)) {
      // e.g. 20250716T143000Z
      eventDateObj = new Date(dtstart.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, "$1-$2-$3T$4:$5:$6Z"));
      // 轉為台灣時區

    } else if (/^\d{8}$/.test(dtstart)) {
      // e.g. 20250716（整天）
      eventDateObj = new Date(dtstart.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3T00:00:00+08:00"));
    }
    if (!eventDateObj) continue;
    if (eventDateObj < RANGE_START || eventDateObj > RANGE_END) continue;
    // 產生 YYYY-MM-DD 與 HH:mm
    const pad = (n: number) => n.toString().padStart(2, "0");
    const dateStr = `${eventDateObj.getFullYear()}-${pad(eventDateObj.getMonth() + 1)}-${pad(eventDateObj.getDate())}`;
    const timeStr = `${pad(eventDateObj.getHours())}:${pad(eventDateObj.getMinutes())}`;
    events.push({
      id: dtstart + summary,
      title: summary,
      date: dateStr,
      time: timeStr,
      location,
      description,
      type: "meeting",
      link: link || "#",
      duration: 2,
    });
  }
  return events;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: string;
  link: string;
  duration?: number; // 活動持續時間（小時），預設 3 小時
}

type EventStatus = "upcoming" | "ongoing" | "completed";

export default function RecentEvents() {
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(ICS_URL)
      .then(r => r.text())
      .then(text => {
        const events = parseICS(text);
        if (events.length > 0) {
          setRecentEvents(events.sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateB.getTime() - dateA.getTime();
          }));
        } else {
          setRecentEvents([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setRecentEvents([]);
        setLoading(false);
      });
  }, []);

  // 計算活動狀態
  const calculateEventStatus = (date: string, time: string, duration: number = 3): EventStatus => {
    const now = new Date();
    const eventDateTime = new Date(`${date} ${time}`);
    const eventEndTime = new Date(eventDateTime.getTime() + duration * 60 * 60 * 1000);

    if (now < eventDateTime) {
      return "upcoming";
    } else if (now >= eventDateTime && now <= eventEndTime) {
      return "ongoing";
    } else {
      return "completed";
    }
  };

  // 取得狀態顯示文字
  const getStatusText = (status: EventStatus): string => {
    switch (status) {
      case "upcoming":
        return "即將舉行";
      case "ongoing":
        return "進行中";
      case "completed":
        return "已結束";
      default:
        return "未知狀態";
    }
  };

  // 取得狀態樣式
  const getStatusStyle = (status: EventStatus): string => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "ongoing":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "completed":
        return "bg-gray-600/20 text-gray-400 border border-gray-600/30";
      default:
        return "bg-gray-600/20 text-gray-400 border border-gray-600/30";
    }
  };

  // 取得邊框樣式
  const getBorderStyle = (status: EventStatus): string => {
    switch (status) {
      case "upcoming":
        return "border-l-4 border-l-blue-500";
      case "ongoing":
        return "border-l-4 border-l-green-500";
      case "completed":
        return "border-l-4 border-l-gray-600";
      default:
        return "border-l-4 border-l-gray-600";
    }
  };

  // 規則：
  // - 即將舉行、進行中：一律顯示（不受 5 筆限制）
  // - 已結束：僅在未達 5 筆時補滿至 5 筆
  const eventsWithStatus = recentEvents.map((event) => ({
    event,
    status: calculateEventStatus(event.date, event.time, event.duration),
  }));

  const nonCompletedEvents = eventsWithStatus.filter(
    ({ status }) => status === "upcoming" || status === "ongoing"
  );
  const completedEvents = eventsWithStatus.filter(({ status }) => status === "completed");

  const limitedVisibleEvents = [
    ...nonCompletedEvents,
    ...completedEvents.slice(0, Math.max(0, 5 - nonCompletedEvents.length)),
  ];

  const visibleEvents = showAll ? eventsWithStatus : limitedVisibleEvents;
  const hasMoreToShow = !showAll && visibleEvents.length < eventsWithStatus.length;

  return (
    <div className="flex justify-center animate-fade-in-up animation-delay-1200 px-4">
      <div className="timeline-card rounded-lg p-4 md:p-6 space-y-4 w-full max-w-4xl">
        <div className="text-center space-y-2">
          <h3 className="text-lg md:text-xl font-bold text-foreground flex items-center justify-center gap-2">
            <Star className="w-5 h-5" />
            最近活動
          </h3>
          <p className="text-sm text-text-secondary">掌握最新 SITCON 活動資訊</p>
        </div>

        <div className="space-y-3">
          {visibleEvents.map(({ event, status }) => {
            // 業界常見寫法：先在函式體內計算所需變數，再回傳 JSX
            const normalizedLocation = (event.location || "").toLowerCase();
            let hasSafeLink = false;
            let hasMeetLink = false;
            try {
              const urlObj = new URL(event.link);
              hasSafeLink = urlObj.protocol === "http:" || urlObj.protocol === "https:";
              hasMeetLink = hasSafeLink && (urlObj.hostname === "meet.google.com" || urlObj.hostname.endsWith(".meet.google.com"));
            } catch (_) {
              hasSafeLink = false;
              hasMeetLink = false;
            }
            const isOnline = normalizedLocation.includes("google meet") || hasMeetLink;

            let href: string;
            if (isOnline && hasMeetLink) {
              href = event.link;
            } else if (event.location && event.location.trim() !== "") {
              href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;
            } else {
              href = "https://www.google.com/maps";
            }

            const locationLinkTitle = isOnline ? "開啟 Google Meet" : `在地圖開啟 ${event.location || "地圖"}`;
            const locationLinkText = event.location || "地圖";

            return (
              <div
                key={event.id}
                className={`bg-card-background backdrop-blur-sm rounded-lg p-4 border border-card-border hover:border-card-border transition-all duration-300 ${getBorderStyle(status)}`}
              >
                <div className="space-y-3">
                  {/* Title and Status Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm md:text-base leading-tight text-left">
                        {event.title}
                      </h4>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusStyle(status)}`}
                    >
                      {getStatusText(status)}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="text-left">
                    <p className="text-text-muted text-xs md:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: event.description }} />
                  </div>

                  {/* Date, Time, Location - Mobile Optimized */}
                  <div className="space-y-2 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4">
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Calendar className="w-3 h-3 flex-shrink-0" />
                      <span>
                        {(() => {
                          const date = new Date(event.date);
                          const year = date.getFullYear();
                          const month = date.getMonth() + 1;
                          const day = date.getDate();
                          return `${year} 年 ${month} 月 ${day} 日`;
                        })()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors underline decoration-dotted underline-offset-2"
                        title={locationLinkTitle}
                      >
                        {locationLinkText}
                      </a>
                    </div>
                  </div>

                  {/* Action Button */}
                  {event.link && event.link !== "#" && status !== "completed" && (
                    <div className="flex justify-end pt-1">
                      <Link
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        prefetch={false}
                        className="liquid-glass-btn secondary small"
                        aria-label={`前往 ${event.title}`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="hidden sm:inline">前往</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {loading && (
            <div className="flex justify-center py-6">
              <span className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-500 h-8 w-8 inline-block" />
            </div>
          )}
          {(hasMoreToShow || showAll) && (
            <div className="flex justify-center pt-1">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="liquid-glass-btn secondary small"
                aria-label={showAll ? "顯示較少" : "顯示更多"}
              >
                {showAll ? "顯示較少" : "顯示更多"}
              </button>
            </div>
          )}
        </div>

        <div className="text-center pt-2">
          <Link
            href="https://calendar.google.com/calendar/embed?src=ull8p8ceof4sdba5na86s016p8%40group.calendar.google.com&ctz=Asia%2FTaipei"
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm underline decoration-dotted underline-offset-2"
          >
            加入 SITCON 行事曆同步最新活動資訊 →
          </Link>
        </div>
      </div>
    </div>
  );
} 