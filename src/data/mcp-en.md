## ChatGPT

> MCP is currently in testing on ChatGPT. Please enable "Developer mode" first before using.

### 1. Open ChatGPT, click on your profile icon at the bottom left, and select "Settings"

### 2. Go to "Apps" from the settings menu, and click on "Advanced settings"

![](/2026/img/mcp/C1.webp)

### 3. Enable "Developer mode", then click "Create application"

![](/2026/img/mcp/C2.webp)

### 4. Fill in the MCP Server information and create the application

![](/2026/img/mcp/C3.webp)

- Name: SITCON MCP (or any name you prefer)

- Description: SITCON MCP (or any description)

- MCP URL: <span class="copy-mcp-url" data-lang="en" style="cursor: pointer; text-decoration: underline;">https://mcp.sitcon.org/mcp</span>

- Icon: <a href="https://sitcon.org/branding/assets/logos/logo.svg" target="_blank" rel="noopener noreferrer">Use SITCON Logo</a> (or any icon)

- Authentication: None

- Check "I understand and wish to continue" (This MCP is open source, does not collect any data, and SITCON will not know you used it)

## VS Code

### 1. Open VS Code, press "Ctrl+Shift+P" to open the Command Palette, type "MCP", and select "MCP: Add server"

![](/2026/img/mcp/V1.webp)

### 2. Select "HTTP"

![](/2026/img/mcp/V2.webp)

### 3. Enter the MCP Server URL

<span class="copy-mcp-url" data-lang="en" style="cursor: pointer; text-decoration: underline;">https://mcp.sitcon.org/mcp</span>

![](/2026/img/mcp/V3.webp)

### 4. Enter the Server ID (or any ID)

![](/2026/img/mcp/V4.webp)

### 5. Once you see the created mcp.json file showing "Running", it means success!

![](/2026/img/mcp/V5.webp)

### 6. Open the chat window from the top right corner and start using it!

![](/2026/img/mcp/V6.webp)

## OpenCode

### 1. Create or edit `opencode.json` in your project directory

Add the following to your project root (or `~/.config/opencode/opencode.json` for global config):

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

### 2. Start OpenCode and you're ready to go!

```
opencode
```

OpenCode will automatically load the config and connect to the SITCON MCP Server. You can use the tools directly in your conversation.
