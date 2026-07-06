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

/** 房間玩家 */
export interface RoomPlayer {
  id: string;
  name: string;
  isHost: boolean;
}

/** 房間詳情（含玩家列表） */
export interface RoomDetail extends CreateRoomResponse {
  players: RoomPlayer[];
}
