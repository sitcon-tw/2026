---
name: 💼 待辦事項
about: 該處理的問題或功能
title: "[Task] "
type: task
project: "SITCON 2026"
assignees: ""
body:
  - type: markdown
    attributes:
      value: |
        感謝你花時間填寫這個問題回報！
        Thanks for taking the time to fill out this bug report!
  - type: textarea
    id: task
    attributes:
      label: 任務描述 Task Description
      placeholder:
    validations:
      required: true
  - type: dropdown
    id: page
    attributes:
      label: 頁面 Page
      multiple: true
      options:
        - 首頁
        - 活動資訊
        - 議程表
        - 會場地圖
        - 團隊成員
        - 其他
  - type: checkboxes
    id: pullrequest
    attributes:
      label: 你願意提交 PR 來解決這個問題嗎？ Do you want to submit a PR to fix this task?
      options:
        - label: "Yes"
---
