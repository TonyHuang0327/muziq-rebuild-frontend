## Purpose

以共用 `AppSnackbar`（MUI `Snackbar` 包住 `Alert`）統一呈現所有 transient feedback（error／success／warning／info），禁止 standalone `Alert`，並將此慣例寫入專案 Cursor rules。

## Requirements

### Requirement: Non-field errors use Snackbar

系統 MUST 以 MUI `Snackbar`（內嵌 `Alert`）顯示所有非欄位驗證的 transient feedback（含 error、success、warning、info），且 MUST NOT 以頁面或 Dialog 內嵌的獨立 `Alert` 區塊顯示此類訊息。

#### Scenario: Create room mutation fails

- **WHEN** 使用者提交建立房間表單且 API／mutation 失敗
- **THEN** 系統以 `Snackbar` 顯示錯誤訊息
- **AND** Dialog 內容區不出現內嵌錯誤 `Alert`

#### Scenario: Playlist load fails

- **WHEN** 練習模式載入播放清單失敗
- **THEN** 系統以 `Snackbar` 顯示錯誤訊息
- **AND** 頁面主內容區不出現內嵌錯誤 `Alert`

#### Scenario: Room created successfully

- **WHEN** 使用者成功建立房間並取得房間代碼
- **THEN** 系統以 `Snackbar` 顯示成功訊息
- **AND** 頁面主內容區不出現內嵌成功 `Alert`

### Requirement: Shared ErrorSnackbar component

系統 MUST 提供可重用的 `AppSnackbar` 元件，接受錯誤／成功等訊息、關閉回呼與 `severity`（預設 `"error"`），供各 feature／頁面共用，以維持 feedback 外觀與行為一致。既有錯誤呼叫點 MUST 改用 `AppSnackbar`。

#### Scenario: Error message is present

- **WHEN** `AppSnackbar` 收到非空錯誤訊息（`severity` 為 `"error"` 或預設）
- **THEN** `Snackbar` 為開啟狀態並以 error 樣式顯示該訊息

#### Scenario: Success message is present

- **WHEN** `AppSnackbar` 收到非空成功訊息且 `severity` 為 `"success"`
- **THEN** `Snackbar` 為開啟狀態並以 success 樣式顯示該訊息

#### Scenario: User dismisses snackbar

- **WHEN** 使用者關閉 `Snackbar`（自動隱藏或手動關閉）
- **THEN** 系統呼叫關閉回呼，且 `Snackbar` 不再顯示該則訊息

### Requirement: Field validation remains inline

表單欄位驗證錯誤 MUST 繼續透過欄位的 `helperText`／`FormHelperText` 顯示，MUST NOT 改用 `AppSnackbar` 或 `Alert`。

#### Scenario: Create room form validation fails

- **WHEN** 使用者提交建立房間表單但欄位驗證失敗（例如未填房間名稱）
- **THEN** 對應欄位顯示 inline 驗證訊息
- **AND** 不因此觸發 feedback `Snackbar`

### Requirement: Cursor rules document error snackbar convention

專案 `.cursorrules` MUST 規定所有 transient feedback（error／success／warning／info）一律使用共用 `AppSnackbar`（`Snackbar` 包住 `Alert`），且 MUST NOT 允許單獨使用 `Alert`。欄位驗證 MUST 維持 `helperText`／`FormHelperText`。

#### Scenario: Rules reflect unified feedback handling

- **WHEN** 開發者閱讀 `.cursorrules` 的 UI/UX feedback 條文
- **THEN** 條文明確要求使用 `AppSnackbar`／`Snackbar` 包 `Alert`
- **AND** 條文禁止 standalone `Alert`

### Requirement: Success feedback uses Snackbar

系統 MUST 以共用 snackbar 元件（`Snackbar` + `Alert severity="success"`）顯示成功類 transient feedback，且 MUST NOT 以頁面或 Dialog 內嵌的獨立 `Alert` 顯示成功訊息。

#### Scenario: Room created successfully

- **WHEN** 使用者成功建立房間並取得房間代碼
- **THEN** 系統以 `Snackbar` 顯示成功訊息（含房間代碼）
- **AND** 頁面主內容區不出現內嵌成功 `Alert`

### Requirement: Standalone Alert is forbidden

系統 MUST NOT 在頁面、Dialog 或其他 feature UI 中單獨渲染 MUI `Alert`。`Alert` MUST 僅作為共用 snackbar 元件內部、包在 `Snackbar` 內的子內容。欄位驗證除外（使用 `helperText`／`FormHelperText`，不使用 `Alert`）。

#### Scenario: No standalone Alert in app UI

- **WHEN** 檢視應用程式中所有 feedback UI（錯誤、成功等）
- **THEN** 每一則 `Alert` 皆位於 `Snackbar` 內
- **AND** 不存在獨立於 `Snackbar` 之外的 `Alert` 區塊
