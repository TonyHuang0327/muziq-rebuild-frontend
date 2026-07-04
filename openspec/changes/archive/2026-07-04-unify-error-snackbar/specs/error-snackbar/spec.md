## ADDED Requirements

### Requirement: Non-field errors use Snackbar

系統 MUST 以 MUI `Snackbar`（內嵌 `Alert severity="error"`）顯示非欄位驗證錯誤（API、mutation、資料載入失敗等），且 MUST NOT 以頁面或 Dialog 內嵌的獨立 `Alert` 區塊顯示此類錯誤。

#### Scenario: Create room mutation fails

- **WHEN** 使用者提交建立房間表單且 API／mutation 失敗
- **THEN** 系統以 `Snackbar` 顯示錯誤訊息
- **AND** Dialog 內容區不出現內嵌錯誤 `Alert`

#### Scenario: Playlist load fails

- **WHEN** 練習模式載入播放清單失敗
- **THEN** 系統以 `Snackbar` 顯示錯誤訊息
- **AND** 頁面主內容區不出現內嵌錯誤 `Alert`

### Requirement: Shared ErrorSnackbar component

系統 MUST 提供可重用的 `ErrorSnackbar` 元件，接受錯誤訊息與關閉回呼，供各 feature／頁面共用，以維持錯誤回饋外觀與行為一致。

#### Scenario: Error message is present

- **WHEN** `ErrorSnackbar` 收到非空錯誤訊息
- **THEN** `Snackbar` 為開啟狀態並顯示該訊息

#### Scenario: User dismisses error snackbar

- **WHEN** 使用者關閉 `Snackbar`（自動隱藏或手動關閉）
- **THEN** 系統呼叫關閉回呼，且 `Snackbar` 不再顯示該則訊息

### Requirement: Field validation remains inline

表單欄位驗證錯誤 MUST 繼續透過欄位的 `helperText`／`FormHelperText` 顯示，MUST NOT 改用 `ErrorSnackbar`。

#### Scenario: Create room form validation fails

- **WHEN** 使用者提交建立房間表單但欄位驗證失敗（例如未填房間名稱）
- **THEN** 對應欄位顯示 inline 驗證訊息
- **AND** 不因此觸發錯誤 `Snackbar`

### Requirement: Cursor rules document error snackbar convention

專案 `.cursorrules` MUST 規定非欄位錯誤一律使用共用 `ErrorSnackbar`（`Snackbar` + `Alert severity="error"`），且 MUST NOT 允許以 inline `Alert` 顯示 API／mutation／載入失敗。

#### Scenario: Rules reflect unified error handling

- **WHEN** 開發者閱讀 `.cursorrules` 的 UI/UX 錯誤處理條文
- **THEN** 條文明確要求使用 `ErrorSnackbar`／`Snackbar`，而非 inline `Alert`
