## 1. Shared ErrorSnackbar

- [x] 1.1 新增 `src/components/ErrorSnackbar.tsx`：受控 `message` / `onClose`，使用 MUI `Snackbar` + `Alert severity="error"`，預設底部置中、`autoHideDuration={6000}`，z-index 高於 Dialog modal
- [x] 1.2 確認元件為 arrow function、嚴格 TypeScript，無 `any`

## 2. Migrate existing error Alerts

- [x] 2.1 更新 `CreateRoomDialog`：移除 Dialog 內嵌錯誤 `Alert` 與 `Alert` import；改渲染 `ErrorSnackbar`（`message={submitError}`）；必要時新增 `onClearSubmitError` prop 供關閉時清除錯誤
- [x] 2.2 更新 `Game`：播放清單載入失敗改用 `ErrorSnackbar`；移除對應 inline 錯誤 `Alert`；關閉時以本地 dismissed state 或 clear 隱藏 snackbar
- [x] 2.3 確認 `Game` 成功訊息「房間已建立」的 `Alert` 維持不變

## 3. Cursor rules

- [x] 3.1 更新 `.cursorrules` section 4 Error Handling：規定非欄位錯誤一律使用共用 `ErrorSnackbar`，禁止以 inline `Alert` 顯示 API／mutation／載入失敗；欄位驗證維持 `helperText`

## 4. Verification

- [x] 4.1 手動驗證：建立房間失敗時底部出現 Snackbar，Dialog 內無錯誤 Alert，關閉後不再顯示
- [x] 4.2 手動驗證：播放清單載入失敗時底部出現 Snackbar，頁面無 inline 錯誤 Alert
- [x] 4.3 手動驗證：表單欄位驗證失敗仍顯示 helperText，不觸發 Snackbar
- [x] 4.4 執行 `npm run lint` 與 `npm run build` 確認通過
