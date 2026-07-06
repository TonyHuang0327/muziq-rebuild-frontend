import type {
  CreateRoomFormValues,
  CreateRoomResponse,
  RoomDetail,
} from "../types/room";

/** 建立房間 */
export const createRoom = async (
  payload: CreateRoomFormValues,
): Promise<CreateRoomResponse> => {
  const res = await fetch("/api/rooms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("創建房間失敗，請稍後再試");
  }

  return res.json();
};

/** 取得房間詳情（含玩家列表） */
export const getRoom = async (roomId: string): Promise<RoomDetail> => {
  const res = await fetch(`/api/rooms/${roomId}`);

  if (!res.ok) {
    throw new Error("取得房間資訊失敗");
  }

  return res.json();
};
