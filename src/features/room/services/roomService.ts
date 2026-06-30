import type {
  CreateRoomFormValues,
  CreateRoomResponse,
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
