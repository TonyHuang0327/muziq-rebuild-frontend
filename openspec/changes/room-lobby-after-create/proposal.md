## Why

目前建立房間成功後僅顯示一則 success Snackbar，接著停留在首頁。使用者期待建立後能直接進入「房間大廳」等待其他玩家加入並開始遊戲，而非回到首頁自己複製代碼去邀請別人。

## What Changes

- 建立房間成功後，UI 切換至「房間大廳」畫面（取代首頁主選單）
- 大廳顯示：房間名稱、房間代碼（含複製按鈕）、已加入玩家列表（初始只有房主）、最大人數、題目秒數設定
- 顯示「等待其他玩家加入…」狀態與「開始遊戲」按鈕（房主才能按）
- 提供「離開房間」按鈕，回到首頁並清除房間狀態
- 移除現有的 success Snackbar「房間已建立，代碼：…」（大廳畫面本身即呈現代碼）
- 新增 MSW mock：`GET /api/rooms/:roomId`（取得房間資訊）

## Capabilities

### New Capabilities

- `room-lobby`: 房間大廳畫面，建立房間後進入，顯示房間資訊與等待狀態

### Modified Capabilities

- （無，現有規格行為不改變）

## Impact

- `src/components/Game.tsx`：建立房間成功後切換至 `RoomLobby` 元件（以 `createdRoom` state 控制）；移除 success Snackbar
- 新增 `src/features/room/components/RoomLobby.tsx`
- 新增 `src/features/room/services/roomService.ts` 中的 `getRoom` 函式（或新 service 檔）
- 新增 MSW handler：`GET /api/rooms/:roomId`
- `CreateRoomResponse` type 已完整，無需新增 type
- 無新 npm 依賴
