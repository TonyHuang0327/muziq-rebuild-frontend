## Context

MUZIQ 為純前端 Vite + React 19 + MUI v7 應用，無後端，以 MSW 模擬 API。目前建立房間成功後停留首頁並顯示 success Snackbar，使用者期待直接進入「房間大廳」畫面。

專案架構採 feature-based，`src/features/room/` 已有 `components/`、`services/`、`queries/`、`types/`。`App.tsx` 直接渲染 `<Game />`，無 router（目前頁面狀態靠 component state 管理）。

## Goals / Non-Goals

**Goals:**

- 建立房間成功後 UI 切換至房間大廳
- 大廳顯示房間資訊、房間代碼（可複製）、玩家列表（mock：僅房主）
- 「開始遊戲」（房主）與「離開房間」按鈕
- 新增 MSW `GET /api/rooms/:roomId` mock

**Non-Goals:**

- 不引入 react-router（維持現有以 state 驅動畫面切換的模式）
- 不實作多人即時同步（WebSocket/SSE）；玩家列表為靜態 mock
- 不實作「加入房間」流程（另一個 feature）
- 不實作「開始遊戲」後的實際遊戲邏輯（該功能已由練習模式涵蓋）

## Decisions

### 1. 以 state 切換畫面（不用 router）

- **選擇**：`Game.tsx` 加入 `activeRoom: CreateRoomResponse | null` state；有值時渲染 `<RoomLobby room={activeRoom} />`
- **理由**：專案目前無 router；維持現有架構，不擴大範圍；之後若要路由化可整體遷移
- **替代方案**：加入 `react-router-dom` — 為此功能單獨引入成本過高

### 2. `RoomLobby` 為 `features/room/components/` 下獨立元件

- **選擇**：`src/features/room/components/RoomLobby.tsx`，接受 `room: CreateRoomResponse`、`onLeave: () => void`、`onStart: () => void` props
- **理由**：feature-based 結構；props 驅動，無內部副作用，易測易刪

### 3. 玩家列表 mock（靜態）

- **選擇**：`GET /api/rooms/:roomId` MSW handler 回傳 `room` 資訊 + `players: [{ id, name, isHost }]`（僅房主一人）
- **理由**：後端尚未實作；以 React Query `useRoomQuery` 拉資料，結構對齊未來真實 API
- **新增 type**：`RoomPlayer`、`RoomDetail`（含 players）

### 4. 移除建立成功的 Snackbar

- **選擇**：大廳畫面本身顯示代碼，success Snackbar 改為可選（可保留也可移除）；本次移除，避免 UI 重複
- **理由**：大廳已有更完整的房間資訊，Snackbar 冗餘

### 5. 房間代碼複製

- **選擇**：以 `navigator.clipboard.writeText` 複製；成功顯示短暫 success Snackbar（「已複製代碼」）
- **理由**：標準 Web API；無需新依賴

## Risks / Trade-offs

- [畫面狀態管理複雜度上升] → `Game.tsx` 增加 `activeRoom` state，其餘邏輯不動；邏輯清晰可分離
- [GET /api/rooms/:roomId 尚未有真實 API] → MSW mock 已足夠開發；merge 時需確認後端介面
- [開始遊戲觸發邏輯] → `onStart` 僅呼叫 `onLeave`（離開大廳）+ 觸發練習模式；本次不做多人同步

## Migration Plan

1. 新增 types（`RoomPlayer`、`RoomDetail`）
2. 新增 `getRoom` service 與 `useRoomQuery` hook
3. 新增 MSW handler
4. 新增 `RoomLobby` 元件
5. 更新 `Game.tsx`：加 `activeRoom` state、切換大廳畫面、移除 success Snackbar

Rollback：還原上述檔案即可。

## Open Questions

- 「開始遊戲」後是否直接套練習模式流程，或另起新流程？本次實作：點「開始遊戲」→ 離開大廳 → 觸發 `handleStart`（現有練習模式）
