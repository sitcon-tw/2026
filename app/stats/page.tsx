"use client";

import { useState, useEffect } from "react";
import { Calendar, DollarSign, GitCommit, AlertCircle, RefreshCw, Eye, FileText } from "lucide-react";
import Link from "next/link";

interface StatsConfig {
  sponsorship: {
    current_amount: number;
    target_amount: number;
    currency: string;
    last_updated: string;
  };
  cfp: {
    current_submissions: number;
    target_submissions: number;
    last_updated: string;
  };
  panda_kpi: {
    current_amount: number;
    target_amount: number;
    currency: string;
    last_updated: string;
  };
  project_info: {
    github_repo: string;
    gitlab_project_id: string;
    hackmd_recruit_url: string;
    start_date: string;
    event_date: string;
  };
}

interface StatsData {
  countdown: {
    totalDays: number;
    remainingDays: number;
    progressPercentage: number;
    isEventPassed: boolean;
  };
  sponsorship: {
    current: number;
    target: number;
    percentage: number;
    currency: string;
    lastUpdated: string;
  };
  cfp: {
    current: number;
    target: number;
    percentage: number;
    lastUpdated: string;
  };
  panda_kpi: {
    current: number;
    target: number;
    percentage: number;
    currency: string;
    lastUpdated: string;
  };
  github: {
    commits: number;
    isLoading: boolean;
    error: string | null;
  };
  gitlab: {
    issues: number;
    isLoading: boolean;
    error: string | null;
  };
  hackmd: {
    views: number;
    isLoading: boolean;
    error: string | null;
  };
}

export default function StatsPage() {
  const [config, setConfig] = useState<StatsConfig | null>(null);
  const [stats, setStats] = useState<StatsData>({
    countdown: {
      totalDays: 0,
      remainingDays: 0,
      progressPercentage: 0,
      isEventPassed: false,
    },
    sponsorship: {
      current: 0,
      target: 0,
      percentage: 0,
      currency: "TWD",
      lastUpdated: "",
    },
    cfp: {
      current: 0,
      target: 0,
      percentage: 0,
      lastUpdated: "",
    },
    panda_kpi: {
      current: 0,
      target: 0,
      percentage: 0,
      currency: "TWD",
      lastUpdated: "",
    },
    github: {
      commits: 0,
      isLoading: true,
      error: null,
    },
    gitlab: {
      issues: 0,
      isLoading: true,
      error: null,
    },
    hackmd: {
      views: 0,
      isLoading: true,
      error: null,
    },
  });

  // 載入配置文件
  useEffect(() => {
    fetch('/2026/data/stats-config.json')
      .then(response => response.json())
      .then((configData: StatsConfig) => {
        setConfig(configData);
        // 更新贊助資料
        const sponsorshipPercentage = (configData.sponsorship.current_amount / configData.sponsorship.target_amount) * 100;
        // 更新 CFP 資料
        const cfpPercentage = (configData.cfp.current_submissions / configData.cfp.target_submissions) * 100;
        // 更新 Panda KPI 資料
        const pandaKpiPercentage = (configData.panda_kpi.current_amount / configData.panda_kpi.target_amount) * 100;
        
        setStats(prev => ({
          ...prev,
          sponsorship: {
            current: configData.sponsorship.current_amount,
            target: configData.sponsorship.target_amount,
            percentage: sponsorshipPercentage,
            currency: configData.sponsorship.currency,
            lastUpdated: configData.sponsorship.last_updated,
          },
          cfp: {
            current: configData.cfp.current_submissions,
            target: configData.cfp.target_submissions,
            percentage: cfpPercentage,
            lastUpdated: configData.cfp.last_updated,
          },
          panda_kpi: {
            current: configData.panda_kpi.current_amount,
            target: configData.panda_kpi.target_amount,
            percentage: pandaKpiPercentage,
            currency: configData.panda_kpi.currency,
            lastUpdated: configData.panda_kpi.last_updated,
          }
        }));
      })
      .catch(error => {
        console.error('Error loading config:', error);
      });
  }, []);

  // 計算倒數天數
  useEffect(() => {
    if (!config) return;

    const calculateCountdown = () => {
      const startDate = new Date(config.project_info.start_date);
      const eventDate = new Date(config.project_info.event_date);
      const now = new Date();

      const totalDays = Math.ceil((eventDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const remainingDays = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      const progressDays = totalDays - remainingDays;
      const progressPercentage = Math.max(0, Math.min(100, (progressDays / totalDays) * 100));

      setStats(prev => ({
        ...prev,
        countdown: {
          totalDays,
          remainingDays: Math.max(0, remainingDays),
          progressPercentage,
          isEventPassed: now > eventDate,
        }
      }));
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000 * 60 * 60); // 每小時更新

    return () => clearInterval(interval);
  }, [config]);

  // 獲取 GitHub commits 數量
  useEffect(() => {
    if (!config) return;

    const fetchGitHubCommits = async () => {
      try {
        setStats(prev => ({ ...prev, github: { ...prev.github, isLoading: true, error: null } }));
        
        // 使用 GitHub API 獲取 commits
        const response = await fetch(`https://api.github.com/repos/${config.project_info.github_repo}/commits?per_page=1`);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        // 從 Link header 中獲取總數
        const linkHeader = response.headers.get('Link');
        let totalCommits = 1;
        
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/);
          if (match) {
            totalCommits = parseInt(match[1]);
          }
        }

        setStats(prev => ({
          ...prev,
          github: {
            commits: totalCommits,
            isLoading: false,
            error: null,
          }
        }));
      } catch (error) {
        console.error('Error fetching GitHub commits:', error);
        setStats(prev => ({
          ...prev,
          github: {
            commits: 0,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          }
        }));
      }
    };

    fetchGitHubCommits();
  }, [config]);

  // 獲取 GitLab issues 數量
  useEffect(() => {
    if (!config) return;

    const fetchGitLabIssues = async () => {
      try {
        setStats(prev => ({ ...prev, gitlab: { ...prev.gitlab, isLoading: true, error: null } }));
        
        // 使用 GitLab API 獲取 issues
        const response = await fetch(`https://gitlab.com/api/v4/projects/${encodeURIComponent(config.project_info.gitlab_project_id)}/issues?state=opened&per_page=100`);
        
        if (!response.ok) {
          throw new Error(`GitLab API error: ${response.status}`);
        }

        const issues = await response.json();
        
        setStats(prev => ({
          ...prev,
          gitlab: {
            issues: issues.length,
            isLoading: false,
            error: null,
          }
        }));
      } catch (error) {
        console.error('Error fetching GitLab issues:', error);
        setStats(prev => ({
          ...prev,
          gitlab: {
            issues: 0,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          }
        }));
      }
    };

    fetchGitLabIssues();
  }, [config]);

  // 獲取 HackMD 瀏覽次數
  useEffect(() => {
    const fetchHackMDViews = async () => {
      try {
        setStats(prev => ({ ...prev, hackmd: { ...prev.hackmd, isLoading: true, error: null } }));
        
        // 嘗試使用 CORS 代理抓取 HackMD 頁面
        const proxyUrl = 'https://corsproxy.io/?url=';
        const targetUrl = encodeURIComponent('https://hackmd.io/@SITCON/2026-recruit');
        
        const response = await fetch(`${proxyUrl}${targetUrl}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 檢查響應內容類型，直接當作 HTML 處理
        const html = await response.text();
        
        // 使用正則表達式解析瀏覽次數，從 window.publishProps 的 JSON 中提取
        // HackMD 將瀏覽次數存在 window.publishProps 的 viewCount 中
        const publishPropsMatch = html.match(/window\.publishProps\s*=\s*JSON\.parse\(`([^`]+)`\)/);
        
        let views = 0;
        if (publishPropsMatch && publishPropsMatch[1]) {
          try {
            // 解析 JSON 字符串中的 viewCount
            const viewCountMatch = publishPropsMatch[1].match(/"viewCount":(\d+)/);
            if (viewCountMatch && viewCountMatch[1]) {
              views = parseInt(viewCountMatch[1], 10);
            }
          } catch (error) {
            console.error('Error parsing publishProps JSON:', error);
          }
        }

        setStats(prev => ({
          ...prev,
          hackmd: {
            views,
            isLoading: false,
            error: null,
          }
        }));
      } catch (error) {
        console.error('Error fetching HackMD views:', error);
        // 如果抓取失敗，顯示提示信息
        setStats(prev => ({
          ...prev,
          hackmd: {
            views: 0,
            isLoading: false,
            error: 'CORS 限制，無法自動抓取數據',
          }
        }));
      }
    };

    fetchHackMDViews();
  }, []);

  const refreshData = () => {
    window.location.reload();
  };

  if (!config) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-text-muted">載入配置中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 lg:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mb-6">
          <h1 className="text-3xl lg:text-5xl font-bold">SITCON 2026 數據一覽</h1>
          <p className="text-text-muted mt-2">讓你看到 SITCON 2026 有沒有快燒起來了</p>
        </div>
        <div className="flex gap-4 justify-center">
          <button
            onClick={refreshData}
            className="liquid-glass-btn secondary"
            title="刷新數據"
          >
            <RefreshCw className="w-4 h-4" />
            刷新
          </button>
          <Link href="/" className="liquid-glass-btn primary">
            回到首頁
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* 倒數天數 */}
        <div className="stats-card">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">年會倒數</h2>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-blue-400 mb-2">
                {stats.countdown.isEventPassed ? "已結束" : stats.countdown.remainingDays}
              </div>
              {!stats.countdown.isEventPassed && (
                <div className="text-text-muted">天後開始</div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-text-secondary">
                <span>{config.project_info.start_date}</span>
                <span>{stats.countdown.progressPercentage.toFixed(1)}%</span>
                <span>{config.project_info.event_date}</span>
              </div>
              
              <div className="w-full bg-zinc-800 rounded-full h-3">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${stats.countdown.progressPercentage}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-text-secondary">
                <span>籌備開始</span>
                <span>{stats.countdown.isEventPassed ? "已完成" : "進行中"}</span>
                <span>年會舉辦</span>
              </div>
            </div>
          </div>
        </div>

        {/* 贊助金額 */}
        <div className="stats-card">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-semibold">贊助進度</h2>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-yellow-400 mb-2">
                {stats.sponsorship.current.toLocaleString()} {stats.sponsorship.currency}
              </div>
              <div className="text-text-muted text-sm">
                目標: {stats.sponsorship.target.toLocaleString()} {stats.sponsorship.currency}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">達成率</span>
                <span className="text-yellow-400 font-semibold">{stats.sponsorship.percentage.toFixed(1)}%</span>
              </div>
              
              <div className="w-full bg-zinc-800 rounded-full h-3">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(100, stats.sponsorship.percentage)}%` }}
                />
              </div>
              
              <div className="text-xs text-text-secondary text-right">
                最後更新: {stats.sponsorship.lastUpdated}
              </div>
            </div>
          </div>
        </div>

        {/* Panda 行銷組長 KPI */}
        <div className="stats-card">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-pink-400" />
            <h2 className="text-xl font-semibold">Panda 行銷組長 KPI</h2>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-pink-400 mb-2">
                {stats.panda_kpi.current.toLocaleString()} {stats.panda_kpi.currency}
              </div>
              <div className="text-text-muted text-sm">
                目標: {stats.panda_kpi.target.toLocaleString()} {stats.panda_kpi.currency}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">達成率</span>
                <span className="text-pink-400 font-semibold">{stats.panda_kpi.percentage.toFixed(1)}%</span>
              </div>
              
              <div className="w-full bg-zinc-800 rounded-full h-3">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-pink-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(100, stats.panda_kpi.percentage)}%` }}
                />
              </div>
              
              <div className="text-xs text-text-secondary text-right">
                最後更新: {stats.panda_kpi.lastUpdated}
              </div>
            </div>
          </div>
        </div>

        {/* CFP 稿件統計 */}
        <div className="stats-card">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-semibold">稿件徵收</h2>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-purple-400 mb-2">
                {stats.cfp.current.toLocaleString()} 篇
              </div>
              <div className="text-text-muted text-sm">
                目標: {stats.cfp.target.toLocaleString()} 篇
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">完成率</span>
                <span className="text-purple-400 font-semibold">{stats.cfp.percentage.toFixed(1)}%</span>
              </div>
              
              <div className="w-full bg-zinc-800 rounded-full h-3">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min(100, stats.cfp.percentage)}%` }}
                />
              </div>
              
              <div className="text-xs text-text-secondary text-right">
                最後更新: {stats.cfp.lastUpdated}
              </div>
            </div>
          </div>
        </div>

        

        {/* GitHub Commits */}
        <div className="stats-card">
          <div className="flex items-center gap-3 mb-6">
            <GitCommit className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-semibold">官網 GitHub Commits</h2>
          </div>
          
          <div className="text-center">
            {stats.github.isLoading ? (
              <div className="flex items-center justify-center gap-2 text-text-muted">
                <RefreshCw className="w-4 h-4 animate-spin" />
                載入中...
              </div>
            ) : stats.github.error ? (
              <div className="text-red-400 space-y-2">
                <AlertCircle className="w-8 h-8 mx-auto" />
                <div className="text-sm">載入失敗</div>
                <div className="text-xs text-text-muted">{stats.github.error}</div>
              </div>
            ) : (
              <div>
                <div className="text-4xl lg:text-6xl font-bold text-green-400 mb-2">
                  {stats.github.commits}
                </div>
                <div className="text-text-muted">次</div>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <Link
              href={`https://github.com/${config.project_info.github_repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 text-sm underline"
            >
              查看專案
            </Link>
          </div>
        </div>

        

        {/* GitLab Issues */}
        <div className="stats-card">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-semibold">籌備 GitLab Issues</h2>
          </div>
          
          <div className="text-center">
            {stats.gitlab.isLoading ? (
              <div className="flex items-center justify-center gap-2 text-text-muted">
                <RefreshCw className="w-4 h-4 animate-spin" />
                載入中...
              </div>
            ) : stats.gitlab.error ? (
              <div className="text-red-400 space-y-2">
                <AlertCircle className="w-8 h-8 mx-auto" />
                <div className="text-sm">載入失敗</div>
                <div className="text-xs text-text-muted">{stats.gitlab.error}</div>
              </div>
            ) : (
              <div>
                <div className="text-4xl lg:text-6xl font-bold text-orange-400 mb-2">
                  {stats.gitlab.issues}
                </div>
                <div className="text-text-muted">張</div>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <Link
              href={`https://gitlab.com/${config.project_info.gitlab_project_id}/-/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 text-sm underline"
            >
              查看議題
            </Link>
          </div>
        </div>

        

        {/* HackMD 瀏覽次數 */}
        <div className="stats-card">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-semibold">招募頁面瀏覽</h2>
          </div>
          
          <div className="text-center">
            {stats.hackmd.isLoading ? (
              <div className="flex items-center justify-center gap-2 text-text-muted">
                <RefreshCw className="w-4 h-4 animate-spin" />
                載入中...
              </div>
            ) : stats.hackmd.error ? (
              <div className="text-red-400 space-y-2">
                <AlertCircle className="w-8 h-8 mx-auto" />
                <div className="text-sm">載入失敗</div>
                <div className="text-xs text-text-muted">{stats.hackmd.error}</div>
              </div>
            ) : (
              <div>
                <div className="text-4xl lg:text-6xl font-bold text-cyan-400 mb-2">
                  {stats.hackmd.views.toLocaleString()}
                </div>
                <div className="text-text-muted">次瀏覽</div>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <Link
              href="https://hackmd.io/@SITCON/2026-recruit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 text-sm underline"
            >
              查看招募頁面
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center text-text-muted text-sm">
        <p>數據僅供參考，基本上除了贊助進度和稿件統計外應該是實時更新才對^^ 但不排除被 429</p>
        <p className="mt-1">手動更新項目的配置文件位置: <code className="bg-zinc-800 px-2 py-1 rounded text-xs">public/data/stats-config.json</code></p>
      </div>
    </div>
  );
} 