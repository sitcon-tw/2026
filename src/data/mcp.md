## ChatGPT

> MCP 目前在 ChatGPT 仍為測試階段，請先開啟「開發者模式」來使用。

### 1. 開啟 ChatGPT，點選左下角頭像，並進入「設定」

### 2. 從設定選單中找到「應用程式」，並點選「進階設定」

![](/2026/img/mcp/C1.webp)

### 3. 啟用「開發者模式」，並點選「建立應用程式」

![](/2026/img/mcp/C2.webp)

### 4. 填入 MCP Server 的資訊並建立應用程式

![](/2026/img/mcp/C3.webp)

- 名稱：SITCON MCP（隨便填）

- 描述：SITCON MCP（隨便填）

- MCP URL：<span class="copy-mcp-url" data-lang="zh" style="cursor: pointer; text-decoration: underline;">https://mcp.sitcon.org/mcp</span>

- 圖示：<a href="https://sitcon.org/branding/assets/logos/logo.svg" target="_blank" rel="noopener noreferrer">使用 SITCON 的Logo</a>（隨便放）

- 驗證：無驗證

- 勾選我了解並想繼續（此 MCP 為開源，沒有搜集任何資訊，SITCON 也不會知道你使用過）

## VS Code

### 1. 開啟 VS Code，按「Ctrl+Shift+P」開啟指令面板，輸入「MCP」，選擇「MCP: Add server」

![](/2026/img/mcp/V1.webp)

### 2. 選擇「HTTP」

![](/2026/img/mcp/V2.webp)

### 3. 輸入 MCP Server URL

<span class="copy-mcp-url" data-lang="zh" style="cursor: pointer; text-decoration: underline;">https://mcp.sitcon.org/mcp</span>

![](/2026/img/mcp/V3.webp)

### 4. 輸入 Server ID （隨便填）

![](/2026/img/mcp/V4.webp)

### 5. 看到建立的 mcp.json 檔案，並顯示Running，就代表成功了！

![](/2026/img/mcp/V5.webp)

### 6. 從視窗右上角打開聊天視窗，開始使用吧！

![](/2026/img/mcp/V6.webp)

## OpenCode

### 1. 在專案目錄中建立或編輯 `opencode.json` 設定檔

在你的專案根目錄（或 `~/.config/opencode/opencode.json` 作為全域設定）中加入以下內容：

```json
{
	"$schema": "https://opencode.ai/config.json",
	"mcp": {
		"sitcon": {
			"type": "remote",
			"url": "https://mcp.sitcon.org/mcp",
			"enabled": true
		}
	}
}
```

### 2. 啟動 OpenCode，即可開始使用！

```
opencode
```

OpenCode 會自動載入設定並連線至 SITCON MCP Server，你可以在對話中直接使用相關工具。

![](/2026/img/mcp/opencode.png)
