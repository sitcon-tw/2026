/**
 * Text Reveal Animation on Scroll
 * 使用 GSAP + ScrollTrigger 實現滾動時文字逐行出現的效果
 *
 * 使用方式：
 * - 標題：加上 class="text-reveal-title"
 * - 段落：加上 class="text-reveal-paragraph"
 *
 * 如果元素內已經有 <br> 標籤，會自動以 <br> 為分行依據
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * 檢查元素是否包含 br 標籤
 */
const hasBrTags = (element: HTMLElement): boolean => {
	return element.innerHTML.includes("<br");
};

/**
 * 根據 br 標籤拆分文字
 */
const splitByBrTags = (element: HTMLElement): void => {
	// 如果已經處理過，跳過
	if (element.dataset.textRevealed === "true") return;

	const html = element.innerHTML;
	// 以 <br>, <br/>, <br /> 或帶有 class 的 br 標籤分割
	const lines = html.split(/<br[^>]*\/?>/gi).filter(line => line.trim() !== "");

	if (lines.length === 0) return;

	// 構建新的 HTML 結構
	const wrapper = document.createElement("div");
	wrapper.className = "text-reveal-wrapper";

	lines.forEach(lineHTML => {
		const lineDiv = document.createElement("div");
		lineDiv.className = "text-reveal-line";

		const span = document.createElement("span");
		span.innerHTML = lineHTML.trim();
		span.className = "text-reveal-content";

		lineDiv.appendChild(span);
		wrapper.appendChild(lineDiv);
	});

	// 替換原有內容
	element.innerHTML = "";
	element.appendChild(wrapper);
	element.dataset.textRevealed = "true";
};

/**
 * 將文字元素拆分成每一行，並包裹在 span 中
 * 使用國小數學計算每行的文字寬度
 */
const splitTextIntoLines = (element: HTMLElement): void => {
	// 如果已經處理過，跳過
	if (element.dataset.textRevealed === "true") return;

	// 如果有 br 標籤，使用 br 分割
	if (hasBrTags(element)) {
		splitByBrTags(element);
		return;
	}

	const text = element.textContent || "";

	// 創建一個隱藏的測量元素
	const measureEl = document.createElement("span");
	measureEl.style.cssText = `
    visibility: hidden;
    position: absolute;
    white-space: nowrap;
    font: inherit;
    letter-spacing: inherit;
  `;
	element.appendChild(measureEl);

	// 獲取元素的可用寬度
	const containerWidth = element.clientWidth;

	// 若元素尚未完成排版或為隱藏狀態，可能導致寬度為 0，
	// 此時不進行行拆分，避免使用無效的寬度計算。
	if (containerWidth <= 0) {
		if (measureEl.parentNode === element) {
			element.removeChild(measureEl);
		}
		return;
	}
	// 將文字拆分成單詞（支援中英文混合）
	// 中文字元各自成為一個單位，英文單詞為一個單位
	const segments: string[] = [];
	let currentWord = "";

	for (const char of text) {
		// 中文字元範圍（擴充支援 CJK 擴展區與相容表意文字）
		if (/[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2ebef}\uf900-\ufaff]/u.test(char)) {
			if (currentWord) {
				segments.push(currentWord);
				currentWord = "";
			}
			segments.push(char);
		} else if (/\s/.test(char)) {
			if (currentWord) {
				segments.push(currentWord);
				currentWord = "";
			}
			segments.push(char);
		} else {
			currentWord += char;
		}
	}
	if (currentWord) {
		segments.push(currentWord);
	}

	// 計算每一行
	const lines: string[] = [];
	let currentLine = "";

	for (const segment of segments) {
		const testLine = currentLine + segment;
		measureEl.textContent = testLine;

		if (measureEl.offsetWidth > containerWidth && currentLine !== "") {
			lines.push(currentLine.trim());
			currentLine = segment;
		} else {
			currentLine = testLine;
		}
	}

	if (currentLine.trim()) {
		lines.push(currentLine.trim());
	}

	// 移除測量元素
	element.removeChild(measureEl);

	// 如果沒有行或只有空行，保持原樣
	if (lines.length === 0 || lines.every(l => l.trim() === "")) {
		return;
	}

	// 構建新的 HTML 結構
	const wrapper = document.createElement("div");
	wrapper.className = "text-reveal-wrapper";

	lines.forEach(lineText => {
		const lineDiv = document.createElement("div");
		lineDiv.className = "text-reveal-line";

		const span = document.createElement("span");
		span.textContent = lineText;
		span.className = "text-reveal-content";

		lineDiv.appendChild(span);
		wrapper.appendChild(lineDiv);
	});

	// 替換原有內容
	element.innerHTML = "";
	element.appendChild(wrapper);
	element.dataset.textRevealed = "true";
};

/**
 * 初始化標題的滾動動畫
 */
const initTitleReveal = (element: HTMLElement): void => {
	// 如果元素已經有動畫，跳過
	if (element.dataset.animationInitialized === "true") return;

	splitTextIntoLines(element);

	const spans = element.querySelectorAll(".text-reveal-content");
	if (spans.length === 0) return;

	gsap.set(spans, { y: "100%", opacity: 0, skewY: 7 });

	gsap.to(spans, {
		y: "0%",
		opacity: 1,
		skewY: 0,
		duration: 1.2,
		ease: "power4.out",
		stagger: {
			amount: 0.3
		},
		scrollTrigger: {
			trigger: element,
			start: "top 95%",
			once: true
		}
	});

	// 標記元素已初始化動畫
	element.dataset.animationInitialized = "true";
};

/**
 * 初始化段落的滾動動畫
 */
const initParagraphReveal = (element: HTMLElement): void => {
	// 如果元素已經有動畫，跳過
	if (element.dataset.animationInitialized === "true") return;

	splitTextIntoLines(element);

	const spans = element.querySelectorAll(".text-reveal-content");
	if (spans.length === 0) return;

	gsap.set(spans, { y: "100%", opacity: 0, skewY: 5 });

	gsap.to(spans, {
		y: "0%",
		opacity: 1,
		skewY: 0,
		duration: 1,
		ease: "power3.out",
		stagger: {
			amount: 0.25
		},
		scrollTrigger: {
			trigger: element,
			start: "top 95%",
			once: true
		}
	});

	// 標記元素已初始化動畫
	element.dataset.animationInitialized = "true";
};

/**
 * 初始化所有文字揭示動畫
 */
export const initTextReveal = (): void => {
	// 處理標題
	const titles = document.querySelectorAll<HTMLElement>(".text-reveal-title");
	titles.forEach(el => initTitleReveal(el));

	// 處理段落
	const paragraphs = document.querySelectorAll<HTMLElement>(".text-reveal-paragraph");
	paragraphs.forEach(el => initParagraphReveal(el));
};

/**
 * 重新初始化（用於頁面切換後）
 */
export const refreshTextReveal = (): void => {
	ScrollTrigger.refresh();
};

/**
 * 清理所有 ScrollTrigger（用於頁面離開時）
 */
export const cleanupTextReveal = (): void => {
	ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// 自動初始化
if (typeof window !== "undefined") {
	// 頁面首次載入
	document.addEventListener("DOMContentLoaded", () => {
		initTextReveal();
	});

	// Astro 頁面切換後重新初始化
	document.addEventListener("astro:page-load", () => {
		initTextReveal();
	});

	// 視窗大小改變時重新計算
	let resizeTimeout: ReturnType<typeof setTimeout>;
	window.addEventListener("resize", () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			// 重新拆分文字並刷新動畫
			document.querySelectorAll<HTMLElement>(".text-reveal-title, .text-reveal-paragraph").forEach(el => {
				delete el.dataset.textRevealed;
				delete el.dataset.animationInitialized;
			});
			cleanupTextReveal();
			initTextReveal();
		}, 300);
	});
}
