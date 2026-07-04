## Context

`unify-error-snackbar` 已將錯誤回饋統一為 `ErrorSnackbar`（`Snackbar` + `Alert severity="error"`）。`Game` 仍以頁面內嵌 `Alert severity="success"` 顯示「房間已建立，代碼：…」，與錯誤回饋模式不一致。使用者要求：**Alert 一律包在 Snackbar 內，不允許單獨 Alert**，並寫入 `.cursorrules`。

## Goals / Non-Goals

**Goals:**

- 成功訊息改為 snackbar 呈現
- 共用元件支援多種 `severity`（至少 `error`、`success`）
- 專案內無獨立渲染的 `Alert`（僅存在於共用 snackbar 元件內部）
- `.cursorrules` 明確禁止 standalone `Alert`

**Non-Goals:**

- 不引入 notistack / 全域 toast queue
- 不改動欄位驗證（`helperText`）
- 不一次處理多則 snackbar 堆疊

## Decisions

### 1. 將 `ErrorSnackbar` 一般化為 `AppSnackbar`

- **選擇**：`src/components/AppSnackbar.tsx`，props：`message: string | null`、`onClose: () => void`、`severity?: AlertColor`（預設 `"error"`）
- **理由**：錯誤與成功共用殼層，避免 `SuccessSnackbar` / `ErrorSnackbar` 重複；易刪易搬
- **遷移**：刪除或改名 `ErrorSnackbar.tsx`；所有呼叫點改 import `AppSnackbar`，錯誤處可省略 `severity` 或顯式傳 `"error"`
- **替代方案**：保留 `ErrorSnackbar` 另加 `SuccessSnackbar` — 兩份幾乎相同程式碼，不採用

### 2. 成功訊息內容

- **選擇**：`message` 為完整字串，例如 `房間已建立，代碼：${createdRoomCode}`；`open` 綁定 `Boolean(createdRoomCode)` 等價於 `message` 非空
- **關閉**：`onClose` → `setCreatedRoomCode(null)`（與現有行為相同）
- **位置／時長**：沿用現有 snackbar 預設（底部置中、`autoHideDuration={6000}`、z-index > modal）

### 3. Cursor rules 文案

將 section 4 Error Handling 擴寫為 feedback 規則，例如：

> **Feedback (Snackbar)**: Display all transient feedback (error / success / warning / info) exclusively via the shared `AppSnackbar` (MUI `Snackbar` wrapping `Alert`). Standalone `Alert` is forbidden. Field validation stays on `helperText` / `FormHelperText`.

### 4. Spec capability 名稱維持 `error-snackbar`

- **選擇**：在既有 capability 上做 delta（MODIFIED / ADDED），不另開 capability 資料夾
- **理由**：行為延續同一 feedback 慣例；避免 main specs 分裂。Purpose 在 archive sync 時一併更新為涵蓋所有 severity

## Risks / Trade-offs

- [錯誤與成功同時觸發] → 目前無 queue，後寫入的 message 會覆蓋；可接受，之後再加 queue
- [更名造成 import 遺漏] → 全專案 grep `ErrorSnackbar` / standalone `Alert` 確認
- [capability 名稱仍叫 error-snackbar] → 文件上略窄，以 Purpose / requirements 文案補足

## Migration Plan

1. 新增 `AppSnackbar`，遷移 `ErrorSnackbar` 呼叫點後刪除舊檔
2. `Game` 成功訊息改 `AppSnackbar severity="success"`
3. 更新 `.cursorrules`
4. 手動驗證：建立房間成功、建立失敗、播放清單失敗皆為底部 snackbar；頁面無獨立 `Alert`

Rollback：還原上述檔案即可。

## Open Questions

- （無）
