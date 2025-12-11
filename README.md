# SITCON 2026 官網

## 架構說明

2026 年有許多奇奇怪怪的網頁，如 /landing、/cfp、/cfs 等等。他們各自在自己的 Repo。

- Push 時會 Build，並推到[這個 Repo 的 build 分支](https://github.com/sitcon-tw/2026/tree/build)。
- Push 完之後，會手動觸發 GitHub Actions（因為 GitHub Actions 的 Push 不會觸發另一個 GitHub Actions），將 build 分支的內容部署到 GitHub Pages。

## 開發指南

從 main checkout/fork 出來，開發完成後 PR 到 main 即可。

> 目前官網還沒上線，因此並無 Actions 會部署 main Branch，不用擔心。

## 技術線

- Astro - 框架
- Three.js - 3D
- Cannon.js - 物理引擎（分享議程、走進中研院）
- GSAP.js - 特效
- Lucide - icon
- marked - Markdown 解析

## 提醒事項

- 照片都先不要放！先設定 background-color 就好！

  ```css
  img {
  	width: 300px; /* 正常排版 */
  	background-color: #ccc; /* 設定適合的顏色 */
  }
  ```

- 如果是 SVG、照片都可以直接放到 `public/img/` 裡面，不用再放 assets 處理
- 不是按鈕不要做 hover 效果（小心你的 GPT），是按鈕請都要做
- 之後會弄成 SPA 網頁，但現在先不用管
- 之後會弄成 i18n，但現在先不用管
- 記得多用 GSAP
- Branch 名稱要是 `feat/abc`, `fix/abc`
- 用 rem！
- 現在顏色還有點亂，可以先用 HEX 沒關係
- 字體分別是使用 `GenKiMinTW`（標題）、`GenKiGothicTW`（內文）、`Playfair Display`（標題）、`JetBrainsMono`（程式碼區塊）。都 import 好了，請照這樣設定。
  - h1-h6 已經先設定好了
- Deadline: 2025/12/31

## 各頁說明與功能

### Nav

- [ ] 往下滾會往上移動和 fadeout，一往上滾動會 fadein 並掉回來
- [ ] 漢堡選單之後會再畫，可以參考 CFP 先簡單做

### 首頁

#### Hero

- [ ] 背景波浪
  - [ ] 持續移動，以畫面為圓心繞著螺旋旋轉向上
  - [ ] 隨機生成，若隱若現，像是流星雨，或是跑步時的光影效果
  - [ ] 可以跟滑鼠有互動，移動經過有播玄的效果
- [ ] 元素（可以先用 Cube 或 Sphere 暫時代替）
  - [ ] 跟著海浪公轉
  - [ ] 自轉
- [ ] 元素滑鼠可以拖曳，參考 [Spline](https://spline.design/) 背景
- [ ] 我要報名按鈕
  - [ ] 可以拖曳往右放開，也可以直接點擊文字，會直接前往 https://tickets.sitcon.org/SITCON2026
  - [ ] 右邊背景會有光線滑過效果，自己會定時出現，hover 也會

#### 描述

- [ ] 文字淡入
- [ ] 每張照片都是從最右邊開始往左滑，Animate on Scroll，用 GSAP。效果請參考：https://palermo.ddd.live/

#### 邀請講者

- [ ] 那根線像是進度條從左到右變長
- [ ] Hover 講者姓名出現照片和介紹
- [ ] 介紹照片大約在畫面位置，會跟隨滑鼠左右移動
- [ ] 手機版沒有互動，講者照片跑馬燈

#### Demo 展

- [ ] 自己輪播 hightlight，然後滑鼠 hover highlight
- [ ] 記得下面疊一個 linear gradient 背景黑色放描述

#### 索票方式

- [ ] 參考 https://2025.springio.net/ 動畫效果
- [ ] 背後跑馬燈隨機跑

#### 贊助商

- [ ] Hover Logo 變彩色且稍微放大
- [ ] 點擊顯示 popup，參考 Prototype

#### 參與討論

- [ ] 參考 iMessage 氣泡動畫，不段傳，不要太快
- [ ] 菱形旋轉

#### 行為準則

- [ ] 箭頭動畫參考 CFP

### Footer

- [ ] Hover 文字變色
- [ ] 底下 SITCON Logo 怎麼玩再想想

### 活動資訊

- [ ] 文字會是 Markdown
- [ ] 點擊進入中研院，上面黃色區域會放大到全螢幕。這時會出現小石，可以用第三人稱視角操控他。左下角提示可以用 WASD，手機版用虛擬搖桿操控。操控小石可以在中研院裡面走動。
- [ ] 活動圖片 background position fixed 之類的 locomotive 效果

### 議程表

- [ ] 先自己寫假資料不用 Fetch
- [ ] 滑鼠上下滾動正常滾動頁面，左右滾動議程表
- [ ] 議程表可以使用滑鼠左右拖曳
- [ ] 也可以使用方向鍵左右移動議程表
- [ ] 點擊出現 popup
- [ ] 可以在 popup 和議程表中收藏議程
- [ ] 點開 popup URL 會變成 /schedule/:scheduleId
- [ ] 可以用 URL 直接連到某個議程
- [ ] 收藏的議程會存在 localStorage
- [ ] 右上角按鈕篩選只顯示收藏的議程
- [ ] 點選分享我得精選議程跳出 popup，可以複製連結，連結會是 /schedule?q=id1,id2,id3&n=NAME
- [ ] 分享收藏議程 popup 會把講者頭像弄成圓形物理掉下來。如果是橫的就切成圓的 cover。雖然是 2D 但直接使用 Cannon.js 做物理模擬
- [ ] 透過連結進來會顯示 XXX 嚴選議程

#### Demo 展

- [ ] 先自己寫假資料不用 Fetch
- [ ] 點箭頭像子彈一樣旋轉輪播
- [ ] 底下顯示描述。描述會是 Markdown，要轉 HTML，可能會有 YouTube 影片，記得 CSS global 設定。

### 會場地圖

- [ ] 先自己寫假資料不用 Fetch
- [ ] 請選擇地圖按鈕緩慢閃爍呼吸
- [ ] hover 樓層或是文字都會地圖 highlight，其他樓層上下偏移
- [ ] 點選攤位一樣有簡介和連結，效果是團隊成員那樣，然後右邊還是能看到地圖，會放大到攤位的位置，這時地圖的其他攤位也可以點擊
- [ ] 地圖可以自由移動縮放，用 Three.js Example 的功能即可
- [ ] 會場地圖沒有 Footer，因為滾動會被攔截
- [ ] 雖然可以自由移動但是如果點樓層或是攤位會自動移動到預設位置

### 團隊成員

- [ ] 先自己寫假資料不用 Fetch
- [ ] 預設是 Grid View，點左下角可以切換成 Explore View
- [ ] Explore View 可以用滑鼠拖曳移動，滾輪縮放
- [ ] Explore View 到邊界要停
- [ ] Expore View 每次排序隨機
- [ ] 點擊成員會出現介紹 popup，左邊 Slide In
- [ ] Grid View 底下選單是 Anchor（像是現在 CFP 那樣），Explore View 底下選單是點下去會篩選

### MISC

- [ ] 文字 Animate on Scroll，效果參考 https://revealanimationhandler.pages.dev/