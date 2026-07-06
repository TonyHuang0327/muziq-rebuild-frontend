## 1. Types

- [x] 1.1 新增 `src/features/room/types/room.ts` 中的 `RoomPlayer`（`id`, `name`, `isHost`）與 `RoomDetail`（`CreateRoomResponse` 欄位 + `players: RoomPlayer[]`）

## 2. Service & Query

- [x] 2.1 在 `src/features/room/services/roomService.ts` 新增 `getRoom(roomId: string): Promise<RoomDetail>`（`GET /api/rooms/:roomId`）
- [x] 2.2 新增 `src/features/room/queries/useRoomQuery.ts`：以 `useQuery` 包裝 `getRoom`，queryKey 使用 `roomQueryKeys`

## 3. MSW Mock

- [x] 3.1 在 `src/mocks/handlers.ts` 新增 `GET /api/rooms/:roomId`：回傳 room 基本資訊 + `players: [{ id: '1', name: '你', isHost: true }]`

## 4. RoomLobby 元件

- [x] 4.1 新增 `src/features/room/components/RoomLobby.tsx`：props 為 `room: RoomDetail`、`onLeave: () => void`、`onStart: () => void`
- [x] 4.2 顯示房間名稱、代碼、最大人數、題目秒數
- [x] 4.3 顯示玩家列表（`RoomPlayer[]`），房主標示「房主」
- [x] 4.4 複製代碼按鈕：`navigator.clipboard.writeText(room.roomCode)`，成功後以 `AppSnackbar severity="success"` 顯示「已複製代碼」
- [x] 4.5 「開始遊戲」按鈕（呼叫 `onStart`）與「離開房間」按鈕（呼叫 `onLeave`）
- [x] 4.6 元件為 arrow function、嚴格 TypeScript，不超過 150 行（如超過則拆子元件）

## 5. Game 整合

- [x] 5.1 `Game.tsx` 新增 `activeRoom: RoomDetail | null` state（初始 `null`）
- [x] 5.2 `handleCreateRoom` 成功後以回應取得 `roomId`，呼叫 `useRoomQuery` 或直接組出 `RoomDetail`（含 mock players）後 `setActiveRoom`
- [x] 5.3 `activeRoom` 非 null 時渲染 `<RoomLobby>`，否則渲染現有首頁內容
- [x] 5.4 `onLeave`：`setActiveRoom(null)`；`onStart`：`setActiveRoom(null)` 後呼叫 `handleStart`
- [x] 5.5 移除「房間已建立，代碼：…」success Snackbar（大廳已呈現代碼）

## 6. Verification

- [x] 6.1 手動驗證：建立房間後直接進入大廳，顯示房間名稱、代碼、玩家列表
- [x] 6.2 手動驗證：複製代碼出現 success Snackbar「已複製代碼」
- [x] 6.3 手動驗證：點「開始遊戲」離開大廳並啟動遊戲
- [x] 6.4 手動驗證：點「離開房間」回到首頁主選單
- [x] 6.5 執行 `npm run lint` 與 `npm run build` 確認通過
