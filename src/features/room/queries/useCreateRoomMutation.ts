import { useMutation } from "@tanstack/react-query";
import { createRoom } from "../services/roomService";
import { roomQueryKeys } from "./queryKeys";

/** 創建房間 mutation hook */
export const useCreateRoomMutation = () => {
  return useMutation({
    mutationKey: [...roomQueryKeys.all, "create"],
    mutationFn: createRoom,
  });
};
