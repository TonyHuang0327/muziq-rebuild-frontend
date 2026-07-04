## Why

錯誤回饋已統一為 `Snackbar` + `Alert`，但成功訊息（房間已建立）仍使用頁面內嵌的獨立 `Alert`，回饋模式不一致。應規定 **所有** transient feedback 的 `Alert` 都必須包在 `Snackbar` 內，禁止單獨使用 `Alert`，並寫入 Cursor rules。

## What Changes

- 將 `Game` 中「房間已建立」的獨立 `Alert` 改為 `Snackbar` + `Alert severity="success"`
- 將共用 `ErrorSnackbar` 一般化為支援多種 `severity` 的 feedback snackbar（例如 `AppSnackbar`），錯誤與成功共用同一殼層
- **BREAKING（慣例）**：禁止在頁面／Dialog 內單獨渲染 `Alert`；`Alert` 僅能作為 `Snackbar` 的子內容（透過共用元件）
- 更新 `.cursorrules`：所有非欄位驗證的 feedback（error / success / warning / info）一律使用共用 snackbar 元件；欄位驗證維持 `helperText`
- 更新既有 `error-snackbar` main specs 以反映上述範圍擴大

## Capabilities

### New Capabilities

- （無）

### Modified Capabilities

- `error-snackbar`: 由「僅錯誤」擴大為「所有 severity 的 Alert 皆須包在 Snackbar」；共用元件支援 success 等；Cursor rules 禁止獨立 `Alert`

## Impact

- `src/components/ErrorSnackbar.tsx`：一般化（更名或擴充 props）
- `src/components/Game.tsx`：成功訊息改 snackbar；移除獨立 success `Alert`
- `src/features/room/components/CreateRoomDialog.tsx`：若元件更名則更新 import
- `.cursorrules` section 4
- `openspec/specs/error-snackbar/spec.md`（archive 時同步）
