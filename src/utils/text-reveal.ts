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
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

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

const CJK = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2ebef}\uf900-\ufaff]/gu;

const ZWSP = "\u200B";

/**
 * 當我有 GSAP 套件的時候我為什麼還會需要自己學國小數學呢
 */
const splitTextIntoLines = (element: HTMLElement) => {
	// 避免重複 split
	if (element.dataset.textRevealed === "true") return null;

	// 如果有 br 標籤，respect br
	if (hasBrTags(element)) {
		splitByBrTags(element);
		return null;
	}

	const split = SplitText.create(element, {
		type: "lines",
		mask: "lines",
		autoSplit: true,

		prepareText: (text: string) => {
			return text.replace(CJK, m => m + ZWSP);
		},
		wordDelimiter: ZWSP,

		linesClass: "text-reveal-content"
	});

	element.dataset.textRevealed = "true";
	return split;
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

	// 如果已經播放過動畫，直接顯示
	if (element.dataset.animPlayed === "true") {
		gsap.set(spans, { y: "0%", opacity: 1, skewY: 0 });
		element.dataset.animationInitialized = "true";
		return;
	}

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
			once: true,
			onEnter: () => {
				element.dataset.animPlayed = "true";
			}
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

	// 如果已經播放過動畫，直接顯示
	if (element.dataset.animPlayed === "true") {
		gsap.set(spans, { y: "0%", opacity: 1, skewY: 0 });
		element.dataset.animationInitialized = "true";
		return;
	}

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
			once: true,
			onEnter: () => {
				element.dataset.animPlayed = "true";
			}
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
	let previousWidth = window.innerWidth;

	window.addEventListener("resize", () => {
		// 忽略垂直方向的 resize（如手機瀏覽器網址列伸縮）
		if (window.innerWidth === previousWidth) return;
		previousWidth = window.innerWidth;

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
