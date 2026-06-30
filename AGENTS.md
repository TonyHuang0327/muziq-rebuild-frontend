# AGENTS.md

## Cursor Cloud specific instructions

本專案為 **MUZIQ**：一個猜歌遊戲的純前端應用程式，技術堆疊為 Vite + React 19 + TypeScript + MUI v7，使用 `@tanstack/react-query` 處理資料請求，並以 **MSW**（Mock Service Worker）攔截 API。沒有後端服務，是單一前端服務。

### 服務與常用指令

只有一個服務（Vite 開發伺服器）。指令定義於 `package.json`：

- 開發伺服器：`npm run dev`（預設 http://localhost:5173/）
- Lint：`npm run lint`
- 建置：`npm run build`（會先跑 `tsc -b` 型別檢查再 `vite build`）
- 預覽建置產物：`npm run preview`

### 非顯而易見的注意事項

- **MSW 只在開發模式啟用**：`src/main.tsx` 中的 `prepare()` 僅在 `import.meta.env.DEV` 為 true 時啟動 MSW worker。因此 `npm run dev` 才會攔截 `/api/playlist` 並回傳模擬播放清單；用 `npm run preview` 跑正式建置產物時 **不會** 有 mock 資料，遊戲將取不到歌單。要測試遊戲流程請一律用 `npm run dev`。
- **歌曲試聽音檔需要對外網路**：歌單中的 `previewUrl` 指向 Apple iTunes 的音檔 CDN，遊戲邏輯（出題、計分）不依賴音檔播放，但若要實際聽到聲音需要外網連線。
- **Lint 既有警告**：`npm run lint` 會對自動產生的 `public/mockServiceWorker.js` 回報一個 unused eslint-disable 的 warning，屬已知狀況、非錯誤。
- **遊戲核心流程**（hello-world 驗證）：開啟首頁 → 點「練習模式」→ 出現題目與 4 個選項 → 選對答案分數 +10 並以青色高亮 → 點「下一題」，共 10 題後結束。
