"use client";

import Link from "next/link";
import { Calendar, MapPin, Users, Mail, Info, X, Dices, ExternalLink } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube, faInstagram, faThreads, faFlickr, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";

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

    const styles = [
      'color: #00ff88; font-weight: bold; font-size: 14px; text-shadow: 0 0 10px #00ff88;',
    ];

    console.log(sitconAsciiArt, ...styles);

    // 額外的彩色訊息
    console.log('%c🎰 試試看年會時光機功能！', 'color: #ffd700; font-size: 16px; font-weight: bold;');
    // 隱藏彩蛋訊息
    console.log('%cHey! 發現了隱藏的控制台彩蛋！🎉', 'background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 18px; font-weight: bold; padding: 10px;');
  }, []);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isSlotMachineSpinning, setIsSlotMachineSpinning] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [slotMachineDisplay, setSlotMachineDisplay] = useState("2024");
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
    const startDate = new Date('2025-07-13');
    const endDate = new Date('2026-03-28');
    const now = new Date();

    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const remainingDays = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const progressDays = totalDays - remainingDays;
    const progressPercentage = Math.max(0, Math.min(100, (progressDays / totalDays) * 100));

    return {
      totalDays,
      remainingDays: Math.max(0, remainingDays),
      progressPercentage,
      isEventPassed: now > endDate
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

  const spinSlotMachine = () => {
    if (isSlotMachineSpinning) return;

    setIsSlotMachineSpinning(true);

    const spinDuration = 2000; // 2秒
    // 根據設備調整動畫頻率，手機使用較慢的頻率
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const spinInterval = isMobile ? 150 : 100; // 手機150ms，桌面100ms
    const totalSpins = spinDuration / spinInterval;
    let currentSpin = 0;

    const spinEffect = setInterval(() => {
      const randomYear = years[Math.floor(Math.random() * years.length)].year;
      setSlotMachineDisplay(randomYear);
      currentSpin++;

      if (currentSpin >= totalSpins) {
        clearInterval(spinEffect);
        // 最終結果
        const finalYear = years[Math.floor(Math.random() * years.length)].year;
        setSelectedYear(finalYear);
        setSlotMachineDisplay(finalYear);
        setIsSlotMachineSpinning(false);
      }
    }, spinInterval);
  };

  const goToSelectedYear = () => {
    const yearData = years.find(y => y.year === selectedYear);
    if (yearData) {
      window.open(yearData.url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      {/* Main Content */}
      <div className="text-center space-y-6 md:space-y-8 animate-fade-in max-w-4xl w-full">
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight animate-fade-in-up">
          SITCON 2026
        </h1>

        {/* Subtitle */}
        <div className="space-y-3 md:space-y-4 animate-fade-in-up animation-delay-300">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
            學生計算機年會
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-base md:text-lg text-gray-400">
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
            href="https://forms.gle/rr93tuxJ9m9uStDf9"
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className="px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
          >
            <Users className="w-4 h-4 md:w-5 md:h-5" />
            工人預約跳坑
          </Link>

          <Link
            href="https://groups.google.com/g/sitcon-general/"
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className="px-6 md:px-8 py-3 md:py-4 border border-white/20 text-white rounded-lg font-medium hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
          >
            <Mail className="w-4 h-4 md:w-5 md:h-5" />
            郵件論壇
          </Link>

          <button
            onClick={() => setIsAboutOpen(true)}
            className="px-6 md:px-8 py-3 md:py-4 border border-white/20 text-white rounded-lg font-medium hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
          >
            <Info className="w-4 h-4 md:w-5 md:h-5" />
            關於 SITCON
          </button>
        </div>

        {/* 時間軸 */}
        <div className="flex justify-center animate-fade-in-up animation-delay-1000 px-4">
          <div className="timeline-card rounded-lg p-4 md:p-6 space-y-4 w-full sm:w-auto sm:min-w-[450px] md:min-w-[575px]">
            {/* 標題 */}
            {/* 
            <div className="text-center space-y-2">
              <h3 className="text-lg md:text-xl font-bold text-white">
                🚀 距離 SITCON 2026 還有
              </h3>
              {timelineData.isEventPassed ? (
                <p className="text-2xl md:text-3xl font-bold text-green-400">
                  🎉 年會已結束！
                </p>
              ) : (
                <p className="text-2xl md:text-3xl font-bold text-blue-400 timeline-number">
                  {timelineData.remainingDays} 天
                </p>
              )}
            </div>
            */}

            {/* 進度條 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs md:text-sm text-gray-400">
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


              <div className="flex justify-between text-xs text-gray-500">
                <span>籌備開始</span>
                <span className="text-center">
                  {timelineData.isEventPassed ? '已完成' : '進行中'}
                </span>
                <span>年會舉辦</span>
              </div>
            </div>


            {/* 詳細資訊 */}
            {/* 
            {!timelineData.isEventPassed && (
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                 <div className="space-y-1">
                   <p className="text-xs text-gray-400">總籌備時間</p>
                   <p className="text-sm font-semibold text-white timeline-number">{timelineData.totalDays} 天</p>
                 </div>
                 <div className="space-y-1">
                   <p className="text-xs text-gray-400">已籌備時間</p>
                   <p className="text-sm font-semibold text-green-400 timeline-number">
                     {timelineData.totalDays - timelineData.remainingDays} 天
                   </p>
                 </div>
                 <div className="space-y-1">
                   <p className="text-xs text-gray-400">剩餘時間</p>
                   <p className="text-sm font-semibold text-orange-400 timeline-number">
                     {timelineData.remainingDays} 天
                   </p>
                 </div>
               </div>
                
            )}
               */}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/2 rounded-full blur-3xl" style={{ animation: 'subtlePulse 4s ease-in-out infinite' }}></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/2 rounded-full blur-3xl" style={{ animation: 'subtlePulse 4s ease-in-out infinite 2s' }}></div>
      </div>

      {isAboutOpen && (
        <div
          className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 ${isClosing ? 'modal-backdrop-exit' : 'modal-backdrop-enter'
            }`}
          onClick={closeModal}
        >
          <div
            className={`bg-zinc-900 rounded-lg max-w-2xl w-full max-h-[90vh] md:max-h-[80vh] overflow-y-auto ${isClosing ? 'modal-content-exit' : 'modal-content-enter'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 md:p-6 border-b border-zinc-700 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold text-white">關於 SITCON</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                title="關閉對話框"
                aria-label="關閉對話框"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 md:p-6 space-y-5">
              <div>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  學生計算機年會（Students' Information Technology Conference）自 2012 年發起，以學生為本、由學生自發舉辦，長期投身學生資訊教育與推廣開源精神，希望引領更多學子踏入資訊的殿堂，更冀望所有對資訊有興趣的學生，能夠在年會裏齊聚一堂，彼此激盪、傳承、啟發，達到「學以致用、教學相長」的實際展現。
                </p>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-3">歷年年會</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {years.map((item) => (
                    <Link
                      key={item.year}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      prefetch={false}
                      className="text-center px-3 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-md border border-zinc-600 hover:border-blue-400 transition-all duration-200 text-sm font-medium min-h-[40px] flex items-center justify-center"
                    >
                      {item.year}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-3">聯絡我們</h3>
                <div className="bg-zinc-800 rounded-md p-3">
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
                <h3 className="text-base md:text-lg font-semibold text-white mb-3">社群媒體</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      prefetch={false}
                      className="flex items-center gap-2 px-3 py-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors text-sm font-medium min-h-[40px]"
                    >
                      <FontAwesomeIcon icon={social.icon} className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{social.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-3">年會時光機 🎰</h3>
                <div className="bg-zinc-800 rounded-lg p-4 space-y-4">
                  <p className="text-sm text-gray-400 text-center">
                    想回顧哪一年的 SITCON？來抽抽看吧！
                  </p>

                  <div className="flex items-center justify-center">
                    <div className="bg-zinc-700 rounded-lg px-6 py-4 border-2 border-zinc-600">
                      <div className={`text-3xl font-bold text-center w-[80px] font-mono slot-machine-display ${isSlotMachineSpinning ? 'text-yellow-400' : 'text-white'}`}>
                        {slotMachineDisplay}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={spinSlotMachine}
                      disabled={isSlotMachineSpinning}
                      className={`flex-1 px-4 py-2.5 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 ${isSlotMachineSpinning
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-yellow-600 hover:bg-yellow-500 text-white'
                        }`}
                    >
                      <Dices className="w-4 h-4" />
                      {isSlotMachineSpinning ? '轉動中...' : '隨機抽取'}
                    </button>

                    <button
                      onClick={goToSelectedYear}
                      className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      前往 {selectedYear}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 