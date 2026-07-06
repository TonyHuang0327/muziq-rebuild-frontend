import { useQuery } from "@tanstack/react-query";
import { getRoom } from "../services/roomService";
import { roomQueryKeys } from "./queryKeys";

/** 取得房間詳情 query hook */
export const useRoomQuery = (roomId: string | null) => {
  return useQuery({
    queryKey: [...roomQueryKeys.all, "detail", roomId],
    queryFn: () => getRoom(roomId!),
    enabled: Boolean(roomId),
  });
};
