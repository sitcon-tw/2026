# 貢獻指南 Contributing Guide

感謝你對 SITCON 2026 官網專案的興趣！我們歡迎各種形式的貢獻，包括但不限於程式碼、文件、設計等。

## 目錄

- [行為準則](#行為準則)
- [開始貢獻](#開始貢獻)
- [開發環境設置](#開發環境設置)
- [開發流程](#開發流程)
- [提交規範](#提交規範)
- [Pull Request 流程](#pull-request-流程)
- [程式碼風格](#程式碼風格)
- [專案結構](#專案結構)
- [常見問題](#常見問題)

## 行為準則

在參與本專案前，請先閱讀並遵守我們的 [行為準則](CODE_OF_CONDUCT.md)。

## 開始貢獻

### 我可以如何貢獻？

- 🐛 **回報問題**：發現 Bug 或有改進建議？請開啟一個 Issue
- 💻 **提交程式碼**：修復 Bug、實作新功能或改善現有功能
- 📝 **改善文件**：完善 README、註解或其他文件
- 🎨 **設計建議**：提供 UI/UX 改善建議
- 🌐 **翻譯內容**：協助翻譯或校對多語系內容

### 回報問題

在開啟 Issue 前，請：

1. 搜尋現有的 Issues，確認問題尚未被回報
2. 使用清楚的標題描述問題
3. 提供以下資訊：
   - 問題的詳細描述
   - 重現步驟
   - 預期行為 vs 實際行為
   - 截圖（如果適用）
   - 環境資訊（瀏覽器版本、作業系統等）

## 開發環境設置

### 系統需求

- Node.js 18.x 或更高版本
- pnpm 10.25.0 或更高版本

### 安裝步驟

1. **Fork 此專案**

   點擊右上角的 Fork 按鈕，將專案 Fork 到你的帳號下。

2. **Clone 專案**

   ```bash
   git clone https://github.com/你的使用者名稱/2026.git
   cd 2026
   ```

3. **安裝依賴**

   本專案使用 pnpm 作為套件管理工具：

   ```bash
   pnpm install
   ```

4. **啟動開發伺服器**

   ```bash
   pnpm dev
   ```

   開發伺服器會在 `http://localhost:4321` 啟動。

### 其他指令

- `pnpm build` - 建置專案
- `pnpm preview` - 預覽建置結果
- `pnpm test` - 執行 Astro 類型檢查
- `pnpm format` - 格式化程式碼

## 開發流程

1. **建立分支**

   從 `main` 分支建立你的功能分支：

   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

   分支命名建議：
   - `feature/` - 新功能
   - `fix/` - Bug 修復
   - `docs/` - 文件更新
   - `style/` - 樣式調整
   - `refactor/` - 程式碼重構

2. **進行開發**
   - 遵循專案的程式碼風格
   - 確保程式碼可以正常執行
   - 必要時更新相關文件

3. **測試你的變更**

   ```bash
   pnpm test
   pnpm build
   ```

4. **提交變更**

   ```bash
   git add .
   git commit -m "type: 簡短描述你的變更"
   ```

## 提交規範

我們使用語義化的 Commit Message 格式：

```
<type>: <description>

[optional body]

[optional footer]
```

### Type 類型

- `feat` - 新功能
- `fix` - Bug 修復
- `docs` - 文件變更
- `style` - 程式碼格式調整（不影響程式碼邏輯）
- `refactor` - 程式碼重構
- `perf` - 效能改善
- `test` - 測試相關
- `chore` - 建構流程或輔助工具變更

### 範例

```
feat: 新增議程頁面搜尋功能

- 實作搜尋輸入框
- 加入搜尋結果過濾邏輯
- 新增搜尋結果高亮顯示

Closes #123
```

## Pull Request 流程

1. **推送分支到 GitHub**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **建立 Pull Request**
   - 前往你 Fork 的專案頁面
   - 點擊 "New Pull Request"
   - 選擇你的分支並填寫 PR 描述

3. **PR 描述應包含**
   - 變更的摘要
   - 相關的 Issue 編號（使用 `Closes #123` 或 `Fixes #123`）
   - 測試方法
   - 截圖或 GIF（如果有 UI 變更）

4. **等待審核**
   - 維護者會審核你的 PR
   - 可能會要求修改或提供更多資訊
   - 請保持關注並及時回應

5. **合併**
   - PR 通過審核後，維護者會將其合併到 `main` 分支
   - 你的 PR 會自動觸發 CI/CD 流程，建置並部署到 build 分支

## 程式碼風格

### 自動格式化

本專案使用 Prettier 進行程式碼格式化，提交前請執行：

```bash
pnpm format
```

### 編碼規範

- 使用 TypeScript 進行類型標註
- 變數和函數使用駝峰式命名（camelCase）
- 組件檔案使用大寫開頭（PascalCase）
- 適當添加註解，特別是複雜邏輯
- 保持函數簡潔，單一職責
- 避免過深的嵌套

### Astro 組件規範

- 組件檔案放在 `src/components/` 目錄
- 頁面檔案放在 `src/pages/` 目錄
- 布局檔案放在 `src/layout/` 目錄
- 使用 `.astro` 副檔名

## 專案結構

```
/
├── public/              # 靜態資源
│   └── img/            # 圖片檔案
├── src/
│   ├── components/     # 可重用組件
│   ├── data/           # 資料檔案（JSON 等）
│   ├── i18n/           # 多語系翻譯檔
│   ├── layout/         # 頁面布局
│   ├── pages/          # 頁面路由
│   └── types/          # TypeScript 類型定義
├── astro.config.mjs    # Astro 設定檔
├── package.json        # 專案依賴
├── tsconfig.json       # TypeScript 設定
└── pnpm-workspace.yaml # pnpm workspace 設定
```

### 檔案說明

- **components/**: 放置可重用的 UI 組件（如 `Nav.astro`、`Footer.astro`）
- **pages/**: Astro 會根據此目錄結構自動生成路由
- **data/**: 存放結構化資料，如議程資訊
- **i18n/**: 多語系翻譯檔案，目前支援繁體中文（zh-Hant）和英文（en）

## 多語系

專案支援多語系功能，翻譯檔案位於 `src/i18n/` 目錄：

- `en.json` - 英文翻譯
- `zh-Hant.json` - 繁體中文翻譯

新增內容時，請同時更新所有語言的翻譯檔案。

## 常見問題

### Q: 為什麼必須使用 pnpm？

A: 本專案使用 pnpm workspace 功能，並在 `preinstall` 腳本中強制使用 pnpm，以確保依賴管理的一致性。

### Q: 開發伺服器無法啟動怎麼辦？

A: 請確認：

1. Node.js 版本符合要求（18.x 或更高）
2. 已正確執行 `pnpm install`
3. 埠號 4321 未被佔用

### Q: 我的 PR 什麼時候會被審核？

A: 維護者會盡快審核 PR，通常在幾天內。如果超過一週未獲回應，可以在 PR 中禮貌地提醒。

### Q: 如何更新我的 Fork？

A:

```bash
git remote add upstream https://github.com/sitcon-tw/2026.git
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## 獲得協助

如果你有任何問題：

- 開啟一個 Issue 詢問
- 查看現有的 Issues 和 Discussions
- 參考 [README.md](README.md) 獲取專案概覽

## 致謝

感謝所有為 SITCON 2026 官網做出貢獻的人！ 🎉

---

再次感謝你的貢獻！讓我們一起打造更好的 SITCON 2026 官網！ 💪
