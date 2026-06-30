/** 創建房間表單欄位 */
export interface CreateRoomFormValues {
  roomName: string;
  maxPlayers: number;
  questionSeconds: number;
  isPrivate: boolean;
}

/** 創建房間 API 回應 */
export interface CreateRoomResponse {
  roomId: string;
  roomCode: string;
  roomName: string;
  maxPlayers: number;
  questionSeconds: number;
  isPrivate: boolean;
}
