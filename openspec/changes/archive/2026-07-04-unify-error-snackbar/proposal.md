## Why

目前錯誤回饋混用 Dialog 內嵌 `Alert`（`CreateRoomDialog`）與頁面內嵌 `Alert`（`Game` 載入失敗），體驗不一致且會擠壓表單版面。專案應統一以 `Snackbar` 呈現錯誤，並把此慣例寫入 Cursor rules，避免後續功能再引入不同模式。

## What Changes

- 將 `CreateRoomDialog` 的 `submitError` 從 Dialog 內嵌 `Alert` 改為 `Snackbar` 顯示
- 將 `Game` 播放清單載入失敗的錯誤 `Alert` 改為 `Snackbar`
- 新增可重用的錯誤 `Snackbar` 元件（或同等薄封裝），供全專案錯誤回饋共用
- 更新 `.cursorrules`：錯誤處理一律使用 `Snackbar`，不再允許以 inline `Alert` 顯示 API／提交錯誤
- 表單欄位驗證錯誤（`helperText` / `FormHelperText`）維持現狀，不在本次範圍
- 成功訊息（例如「房間已建立」）維持現有 `Alert`，本次僅統一**錯誤**回饋

## Capabilities

### New Capabilities

- `error-snackbar`: 以 MUI `Snackbar` 統一呈現非欄位驗證的錯誤訊息（API／mutation／載入失敗等）

### Modified Capabilities

- （無既有 main specs）

## Impact

- `src/features/room/components/CreateRoomDialog.tsx`：移除錯誤 `Alert`，改用共用 `Snackbar`
- `src/components/Game.tsx`：載入錯誤改用共用 `Snackbar`
- 新增共用 UI（建議 `src/components/ErrorSnackbar.tsx`）
- `.cursorrules` section 4「Error Handling」文案更新
- 無新 npm 依賴；沿用 MUI `Snackbar` + `Alert`（severity severity）組合
