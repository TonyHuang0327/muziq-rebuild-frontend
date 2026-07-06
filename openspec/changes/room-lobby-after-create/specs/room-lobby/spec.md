## ADDED Requirements

### Requirement: Navigate to room lobby after create

建立房間成功後，系統 MUST 立即切換至房間大廳畫面，且 MUST NOT 停留在首頁主選單。

#### Scenario: Room created successfully

- **WHEN** 使用者完成建立房間表單且 API 回應成功
- **THEN** 系統隱藏首頁主選單並顯示房間大廳畫面
- **AND** 大廳顯示所建立房間的名稱與房間代碼

### Requirement: Room lobby displays room info

房間大廳畫面 MUST 顯示：房間名稱、房間代碼、最大人數、題目秒數。

#### Scenario: Lobby shows room details

- **WHEN** 使用者進入房間大廳
- **THEN** 畫面顯示房間名稱、房間代碼、最大人數、題目秒數

### Requirement: Room lobby displays player list

房間大廳 MUST 顯示目前已加入的玩家列表，並標示房主。

#### Scenario: Host is shown in player list

- **WHEN** 建立房間後進入大廳
- **THEN** 玩家列表包含房主，且房主有「房主」標示

### Requirement: Room code can be copied

大廳 MUST 提供複製房間代碼的操作，成功複製後 MUST 顯示 feedback。

#### Scenario: User copies room code

- **WHEN** 使用者點擊複製代碼按鈕
- **THEN** 房間代碼被寫入剪貼簿
- **AND** 系統以 success Snackbar 提示「已複製代碼」

### Requirement: Host can start game from lobby

大廳 MUST 提供「開始遊戲」按鈕供房主點擊，觸發後離開大廳進入遊戲流程。

#### Scenario: Host starts game

- **WHEN** 房主點擊「開始遊戲」
- **THEN** 系統離開大廳並進入遊戲（練習模式流程）

### Requirement: User can leave room lobby

大廳 MUST 提供「離開房間」按鈕，點擊後回到首頁主選單並清除房間狀態。

#### Scenario: User leaves lobby

- **WHEN** 使用者點擊「離開房間」
- **THEN** 系統清除 activeRoom 狀態並顯示首頁主選單
