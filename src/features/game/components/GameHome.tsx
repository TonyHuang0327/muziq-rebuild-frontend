import { HomePageMenuButton } from "../../../components/HomePageMenuButton";
import { CreateRoomDialog } from "../../room/components/CreateRoomDialog";
import type { CreateRoomFormValues } from "../../room/types/room";

type GameHomeProps = {
  onStartPractice: () => void;
  onOpenCreateRoom: () => void;
  createRoomOpen: boolean;
  onCloseCreateRoom: () => void;
  onCreateRoom: (values: CreateRoomFormValues) => Promise<void>;
  isSubmitting: boolean;
  submitError: string | null;
  onClearSubmitError: () => void;
};

/** 首頁選單與創建房間對話框 */
export const GameHome = ({
  onStartPractice,
  onOpenCreateRoom,
  createRoomOpen,
  onCloseCreateRoom,
  onCreateRoom,
  isSubmitting,
  submitError,
  onClearSubmitError,
}: GameHomeProps) => {
  return (
    <>
      <HomePageMenuButton onClick={onOpenCreateRoom} text="創建房間" />
      <HomePageMenuButton onClick={onStartPractice} text="練習模式" />
      <CreateRoomDialog
        open={createRoomOpen}
        onClose={onCloseCreateRoom}
        onSubmit={onCreateRoom}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onClearSubmitError={onClearSubmitError}
      />
    </>
  );
};
