# SITCON 2026 官網

## 架構說明

2026 年有許多奇奇怪怪的網頁，如 /landing、/cfp、/cfs 等等。他們各自在自己的 Repo。

- Push 時會 Build，並推到[這個 Repo 的 build 分支](https://github.com/sitcon-tw/2026/tree/build)。
- Push 完之後，會手動觸發 GitHub Actions（因為 GitHub Actions 的 Push 不會觸發另一個 GitHub Actions），將 build 分支的內容部署到 GitHub Pages。

## 開發指南

從 main checkout/fork 出來，開發完成後 PR 到 main 即可。

> 目前官網還沒上線，因此並無 Actions 會部署 main Branch，不用擔心。
