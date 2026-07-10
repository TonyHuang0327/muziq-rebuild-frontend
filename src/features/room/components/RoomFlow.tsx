import { Box, CircularProgress, Stack } from "@mui/material";
import { RoomLobby } from "./RoomLobby";
import type { RoomDetail } from "../types/room";

type RoomFlowProps = {
  roomDetail: RoomDetail | undefined;
  isLoadingRoom: boolean;
  onLeave: () => void;
  onStart: () => void | Promise<void>;
};

/** 房間大廳畫面：載入中或顯示 RoomLobby */
export const RoomFlow = ({
  roomDetail,
  isLoadingRoom,
  onLeave,
  onStart,
}: RoomFlowProps) => {
  if (isLoadingRoom || !roomDetail) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "primary.main" }} />
      </Box>
    );
  }

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <RoomLobby room={roomDetail} onLeave={onLeave} onStart={onStart} />
    </Stack>
  );
};
