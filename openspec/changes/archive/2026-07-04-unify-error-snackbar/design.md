## Context

MUZIQ 為 Vite + React 19 + MUI v7 純前端應用。目前錯誤回饋有兩處使用 inline `Alert`：

1. `CreateRoomDialog`：建立房間 mutation 失敗時，在 Dialog 內容區頂部顯示 `submitError`
2. `Game`：播放清單載入失敗時，在頁面中顯示 `error.message`

專案尚無 `Snackbar` 實作，也無 notistack 等第三方套件。`.cursorrules` 目前允許 `Alert` 或 `Snackbar`，需收斂為僅 `Snackbar`。

## Goals / Non-Goals

**Goals:**

- 以單一可重用元件統一錯誤回饋 UI
- 遷移既有兩處錯誤 `Alert` 至 `Snackbar`
- 更新 `.cursorrules`，讓後續實作遵循同一慣例

**Non-Goals:**

- 不引入 notistack / react-hot-toast 等新依賴
- 不做全域 toast queue / 多則訊息堆疊（目前最多同時一則錯誤即可）
- 不改動表單欄位驗證（`helperText`）
- 不改動成功訊息（房間建立成功的 `Alert`）
- 不在 React Query hooks 內直接觸發 UI（維持 service / query 與 UI 解耦）

## Decisions

### 1. 共用 `ErrorSnackbar` 元件，而非 Context Provider

- **選擇**：`src/components/ErrorSnackbar.tsx`，受控 props：`message: string | null`、`onClose: () => void`
- **理由**：目前僅兩處呼叫點，Provider + queue 過度設計；元件易刪易搬，符合專案哲學
- **替代方案**：全域 `SnackbarProvider` — 延後到真的需要跨層級、非父子傳遞時再加

### 2. MUI `Snackbar` + 內嵌 `Alert severity="error"`

- **選擇**：`Snackbar` 負責定位與自動關閉；`Alert` 僅作為 snackbar 內容（severity樣式與關閉按鈕），不單獨作為頁面／Dialog 內嵌錯誤區塊
- **理由**：MUI 官方常見模式；視覺與可關閉行為一致
- **預設行為**：`anchorOrigin={{ vertical: "bottom", horizontal: "center" }}`、`autoHideDuration={6000}`、可手動關閉

### 3. 錯誤狀態仍由呼叫端持有

- **CreateRoomDialog**：繼續接收 `submitError` prop；有值時開啟 `ErrorSnackbar`，關閉時呼叫可選的 `onClearSubmitError`（或由父層在 dialog close / 重試時清掉 mutation error）
- **Game**：playlist `error` 有值時顯示 `ErrorSnackbar`；`onClose` 可僅關閉 UI（若 query error 無法輕易 clear，以本地 `dismissed` state 隱藏即可）
- **理由**：不把錯誤狀態塞進共用元件內部，元件保持 dumb / 易測

### 4. Dialog 內不再渲染錯誤區塊

- 移除 `CreateRoomDialog` 內的 `{submitError && <Alert>...}`，避免表單被錯誤訊息撐高
- `Snackbar` 透過 portal 疊在 Dialog 之上，不影響表單 layout

### 5. Cursor rules 文案

將 section 4 改為：

> **Error Handling**: Display non-field errors exclusively via the shared `ErrorSnackbar` (MUI `Snackbar` + `Alert severity="error"`). Do not use inline `Alert` for API / mutation / load failures. Field validation stays on `helperText` / `FormHelperText`.

## Risks / Trade-offs

- [Dialog 開啟時 Snackbar z-index] → 使用 MUI 預設 portal；若被 Dialog 遮住，於 `ErrorSnackbar` 設定較高 `sx.zIndex`（例如 `theme.zIndex.modal + 1`）
- [mutation error 關閉後再次失敗同一訊息] → `Snackbar` 的 `open` 綁定 `Boolean(message)`；父層在關閉時 clear error，或依賴新錯誤觸發重新顯示
- [成功與錯誤回饋風格不一致] → 接受；成功訊息本次不動，之後若要統一可另開 change

## Migration Plan

1. 新增 `ErrorSnackbar`
2. 遷移 `CreateRoomDialog` 與 `Game`
3. 更新 `.cursorrules`
4. 手動驗證：建立房間失敗、播放清單載入失敗皆出現底部 Snackbar，且可關閉

Rollback：還原上述檔案即可，無資料遷移。

## Open Questions

- （無）成功訊息是否一併改 Snackbar：本次明確排除，維持 `Alert`
