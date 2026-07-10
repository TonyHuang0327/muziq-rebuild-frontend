import { useState } from "react";
import { useCreateRoomMutation } from "../queries/useCreateRoomMutation";
import { useRoomQuery } from "../queries/useRoomQuery";
import type { CreateRoomFormValues } from "../types/room";

/** 房間創建與大廳流程狀態 */
export const useRoomFlow = () => {
  const [createRoomOpen, setCreateRoomOpen] = useState(false);
  const [pendingRoomId, setPendingRoomId] = useState<string | null>(null);
  const createRoomMutation = useCreateRoomMutation();
  const { data: roomDetail, isLoading: isLoadingRoom } =
    useRoomQuery(pendingRoomId);

  const isInLobby = Boolean(pendingRoomId);

  const openCreateRoom = () => {
    setCreateRoomOpen(true);
  };

  const closeCreateRoom = () => {
    setCreateRoomOpen(false);
    createRoomMutation.reset();
  };

  const handleCreateRoom = async (values: CreateRoomFormValues) => {
    const room = await createRoomMutation.mutateAsync(values);
    setPendingRoomId(room.roomId);
  };

  const handleLeaveRoom = () => {
    setPendingRoomId(null);
    createRoomMutation.reset();
  };

  const handleLeaveLobby = () => {
    setPendingRoomId(null);
    createRoomMutation.reset();
  };

  const clearSubmitError = () => {
    createRoomMutation.reset();
  };

  return {
    isInLobby,
    createRoomOpen,
    roomDetail,
    isLoadingRoom,
    isSubmitting: createRoomMutation.isPending,
    submitError: createRoomMutation.error?.message ?? null,
    openCreateRoom,
    closeCreateRoom,
    handleCreateRoom,
    handleLeaveRoom,
    handleLeaveLobby,
    clearSubmitError,
  };
};
