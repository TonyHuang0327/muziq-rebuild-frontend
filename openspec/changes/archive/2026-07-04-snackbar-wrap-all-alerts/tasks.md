## 1. Generalize shared snackbar

- [x] 1.1 新增 `src/components/AppSnackbar.tsx`：props 為 `message`、`onClose`、`severity`（`AlertColor`，預設 `"error"`）；行為與現有 `ErrorSnackbar` 相同（底部置中、`autoHideDuration={6000}`、z-index > modal）
- [x] 1.2 將 `Game`、`CreateRoomDialog` 的 `ErrorSnackbar` 改為 `AppSnackbar`；刪除 `ErrorSnackbar.tsx`
- [x] 1.3 全專案 grep 確認無殘留 `ErrorSnackbar` import

## 2. Migrate success Alert

- [x] 2.1 更新 `Game`：移除「房間已建立」獨立 `Alert`；改以 `AppSnackbar severity="success"`，`message` 含房間代碼，`onClose` 清除 `createdRoomCode`
- [x] 2.2 確認 `Game` 不再 import 未使用的 `Alert`（`Alert` 僅存在於 `AppSnackbar` 內部）

## 3. Cursor rules

- [x] 3.1 更新 `.cursorrules` section 4：所有 transient feedback（error／success／warning／info）一律使用 `AppSnackbar`；禁止 standalone `Alert`；欄位驗證維持 `helperText`

## 4. Verification

- [x] 4.1 手動驗證：建立房間成功時底部出現 success Snackbar，頁面無獨立 Alert
- [x] 4.2 手動驗證：建立房間失敗、播放清單失敗仍為 error Snackbar
- [x] 4.3 手動驗證：表單欄位驗證仍為 helperText，不觸發 Snackbar
- [x] 4.4 執行 `npm run lint` 與 `npm run build` 確認通過
