"use client";

import Link from "next/link";
import { Calendar, MapPin, Users, Mail, Info, X, Handshake } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faYoutube,
  faInstagram,
  faThreads,
  faFlickr,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import RecentEvents from "./components/RecentEvents";
import TimeMachine from "./components/TimeMachine";

export default function Home() {
  // 在頁面載入時輸出 SITCON 超大圖標到主控台
  useEffect(() => {
    const sitconAsciiArt = `
%c
  ███████ ██ ████████  ██████  ██████  ███    ██ 
  ██      ██    ██    ██      ██    ██ ████   ██ 
  ███████ ██    ██    ██      ██    ██ ██ ██  ██ 
       ██ ██    ██    ██      ██    ██ ██  ██ ██ 
  ███████ ██    ██     ██████  ██████  ██   ████

    🎓 學生計算機年會 2026 🎓
    ✨ Students' Information Technology Conference ✨
    
    🚀 歡迎來到 SITCON 2026！
    📅 時間：2026 年 3 月 28 日 (六)
    📍 地點：中央研究院人文社會科學館
    
    跳坑表單！ https://forms.gle/rr93tuxJ9m9uStDf9
    加入郵件論壇 https://groups.google.com/g/sitcon-general/
    
    `;

    const styles = ["color: #00ff88; font-weight: bold; font-size: 14px; text-shadow: 0 0 10px #00ff88;"];

    console.log(sitconAsciiArt, ...styles);

    // 額外的彩色訊息
    console.log("%c🎰 試試看年會時光機功能！", "color: #ffd700; font-size: 16px; font-weight: bold;");
    // 隱藏彩蛋訊息
    console.log(
      "%cHey! 發現了隱藏的控制台彩蛋！🎉",
      "background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 18px; font-weight: bold; padding: 10px;"
    );
  }, []);
  
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 更新時間
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000 * 60); // 每分鐘更新一次

    return () => clearInterval(timer);
  }, []);

  // 計算時間軸數據
  const calculateTimelineData = () => {
    const startDate = new Date("2025-07-13");
    const endDate = new Date("2026-03-28");
    const now = new Date();

    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const remainingDays = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const progressDays = totalDays - remainingDays;
    const progressPercentage = Math.max(0, Math.min(100, (progressDays / totalDays) * 100));

    return {
      totalDays,
      remainingDays: Math.max(0, remainingDays),
      progressPercentage,
      isEventPassed: now > endDate,
    };
  };

  const timelineData = calculateTimelineData();

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsAboutOpen(false);
      setIsClosing(false);
    }, 300); // 動畫持續時間
  };

  const years = [
    { year: "2013", url: "https://sitcon.org/2013" },
    { year: "2014", url: "https://sitcon.org/2014" },
    { year: "2015", url: "https://sitcon.org/2015" },
    { year: "2016", url: "https://sitcon.org/2016" },
    { year: "2017", url: "https://sitcon.org/2017" },
    { year: "2018", url: "https://sitcon.org/2018" },
    { year: "2019", url: "https://sitcon.org/2019" },
    { year: "2020", url: "https://sitcon.org/2020" },
    { year: "2021", url: "https://sitcon.org/2021" },
    { year: "2022", url: "https://sitcon.org/2022" },
    { year: "2024", url: "https://sitcon.org/2024" },
    { year: "2025", url: "https://sitcon.org/2025" },
  ];

  const socialLinks = [
    { name: "Facebook", url: "https://sitcon.org/fb", icon: faFacebook },
    { name: "YouTube", url: "https://sitcon.org/yt", icon: faYoutube },
    { name: "Instagram", url: "https://sitcon.org/instagram", icon: faInstagram },
    { name: "Threads", url: "https://sitcon.org/threads", icon: faThreads },
    { name: "Flickr", url: "https://sitcon.org/flickr", icon: faFlickr },
    { name: "Telegram", url: "https://sitcon.org/tg", icon: faTelegram },
  ];



  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      {/* 第一屏 - SITCON 2026 主要內容 */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        {/* Main Content */}
        <div className="text-center space-y-6 md:space-y-8 animate-fade-in max-w-4xl w-full">
          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight animate-fade-in-up">
            SITCON 2026
          </h1>

          {/* Subtitle */}
          <div className="space-y-3 md:space-y-4 animate-fade-in-up animation-delay-300">
            <p className="text-lg sm:text-xl md:text-2xl text-text-muted">學生計算機年會</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-base md:text-lg text-text-secondary">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                <span>2026 年 3 月 28 日 (六)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                <Link
                  href="https://maps.google.com?q=中央研究院人文社會科學館"
                  target="_blank"
                  rel="noopener noreferrer"
                  prefetch={false}
                  className="text-center hover:text-blue-400 transition-colors cursor-pointer underline decoration-dotted underline-offset-2"
                >
                  中央研究院人文社會科學館
                </Link>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in-up animation-delay-600 px-4">
            <Link
              href="https://i.sitcon.org/2026cfs-form/"
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
              className="liquid-glass-btn primary large"
              aria-label="索取贊助徵求書 - 開啟新視窗"
            >
              <Handshake />
              索取贊助徵求書
            </Link>

            <Link
              href="https://groups.google.com/g/sitcon-general/"
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
              className="liquid-glass-btn secondary large"
              aria-label="郵件論壇 - 開啟新視窗"
            >
              <Mail />
              郵件論壇
            </Link>

            {/* <Link
              href="https://hackmd.io/@SITCON/2026-recruit"
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
              className="liquid-glass-btn primary large fire-effect fire-animate hot-recruit-btn"
              aria-label="工人招募資訊 - 開啟新視窗"
            >
              <Users />
              工人招募資訊
            </Link> */}

            <button
              onClick={() => setIsAboutOpen(true)}
              className="liquid-glass-btn secondary large"
              aria-label="關於 SITCON - 開啟對話框"
            >
              <Info />
              關於 SITCON
            </button>
          </div>

          {/* 時間軸 */}
          <div className="flex justify-center animate-fade-in-up animation-delay-1000 px-4">
            <div className="timeline-card rounded-lg p-4 md:p-6 space-y-4 w-full sm:w-auto sm:min-w-[450px] md:min-w-[575px]">
              {/* 進度條 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs md:text-sm text-text-secondary">
                  <span>2025/7/13</span>
                  <span>{timelineData.progressPercentage.toFixed(1)}%</span>
                  <span>2026/3/28</span>
                </div>

                <div className="w-full bg-zinc-800 rounded-full h-2 md:h-3 timeline-progress-bar">
                  <div
                    className="h-full progress-gradient rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${timelineData.progressPercentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-text-secondary">
                  <span>籌備開始</span>
                  <span className="text-center">{timelineData.isEventPassed ? "已完成" : "進行中"}</span>
                  <span>年會舉辦</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 背景動畫 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/2 rounded-full blur-3xl"
            style={{ animation: "subtlePulse 4s ease-in-out infinite" }}
          ></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/2 rounded-full blur-3xl"
            style={{ animation: "subtlePulse 4s ease-in-out infinite 2s" }}
          ></div>
        </div>

        {/* 向下滑動提示 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2 text-text-secondary">
            <span className="text-sm">向下滑動查看最新活動</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* 第二屏 - 最近活動 */}
      <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-background via-background to-background">
        <RecentEvents />
      </div>

      {/* 關於 SITCON 彈出視窗 */}
      {isAboutOpen && (
        <div
          className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 ${
            isClosing ? "modal-backdrop-exit" : "modal-backdrop-enter"
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-card-background rounded-lg max-w-2xl w-full max-h-[90vh] md:max-h-[80vh] overflow-y-auto ${
              isClosing ? "modal-content-exit" : "modal-content-enter"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 md:p-6 border-b border-card-border flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">關於 SITCON</h2>
              <button
                onClick={closeModal}
                className="liquid-glass-btn icon-only"
                title="關閉對話框"
                aria-label="關閉對話框"
              >
                <X />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-5">
              <div>
                <p className="text-text-muted leading-relaxed text-sm md:text-base">
                  學生計算機年會（Students' Information Technology Conference）自 2012
                  年發起，以學生為本、由學生自發舉辦，長期投身學生資訊教育與推廣開源精神，希望引領更多學子踏入資訊的殿堂，更冀望所有對資訊有興趣的學生，能夠在年會裏齊聚一堂，彼此激盪、傳承、啟發，達到「學以致用、教學相長」的實際展現。
                </p>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">歷年年會</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {years.map((item) => (
                    <Link
                      key={item.year}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      prefetch={false}
                      className="liquid-glass-btn secondary small"
                      aria-label={`前往 ${item.year} 年會網站`}
                    >
                      {item.year}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">聯絡我們</h3>
                <div className="bg-card-background rounded-md p-3">
                  <Link
                    href="mailto:contact@sitcon.org"
                    prefetch={false}
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium break-all"
                  >
                    contact@sitcon.org
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-3">社群媒體</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      prefetch={false}
                      className="liquid-glass-btn secondary small"
                      aria-label={`${social.name} 社群媒體頁面`}
                    >
                      <FontAwesomeIcon icon={social.icon} className="fa-icon" />
                      <span className="truncate">{social.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              <TimeMachine />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
