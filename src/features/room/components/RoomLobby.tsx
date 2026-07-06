import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import type { RoomDetail } from "../types/room";
import { AppSnackbar } from "../../../components/AppSnackbar";

interface RoomLobbyProps {
  room: RoomDetail;
  isLoadingDetail?: boolean;
  onLeave: () => void;
  onStart: () => void;
}

/** 房間大廳：建立房間後的等待畫面 */
export const RoomLobby = ({
  room,
  isLoadingDetail = false,
  onLeave,
  onStart,
}: RoomLobbyProps) => {
  const [copiedSnackbar, setCopiedSnackbar] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(room.roomCode);
    setCopiedSnackbar(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 480,
        mx: "auto",
        px: 3,
        py: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: "primary.main", fontWeight: "bold", mb: 3 }}
      >
        {room.roomName}
      </Typography>

      <Stack spacing={1.5} sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
            房間代碼：
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "accent.main", fontWeight: "bold", letterSpacing: 2 }}
          >
            {room.roomCode}
          </Typography>
          <Tooltip title="複製代碼">
            <IconButton size="small" onClick={handleCopy} sx={{ color: "accent.main" }}>
              ⎘
            </IconButton>
          </Tooltip>
        </Stack>

        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
          人數上限：{room.maxPlayers} 人 /{" "}
          題目時間：{room.questionSeconds === 0 ? "不限" : `${room.questionSeconds} 秒`}
        </Typography>
      </Stack>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mb: 2 }} />

      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mb: 1 }}>
        玩家列表
      </Typography>

      {isLoadingDetail ? (
        <CircularProgress size={24} sx={{ color: "primary.main", mb: 2 }} />
      ) : (
        <List dense disablePadding sx={{ mb: 3 }}>
          {room.players.map((player) => (
            <ListItem key={player.id} disableGutters>
              <ListItemText
                primary={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2" sx={{ color: "white" }}>
                      {player.name}
                    </Typography>
                    {player.isHost && (
                      <Chip
                        label="房主"
                        size="small"
                        sx={{
                          bgcolor: "primary.main",
                          color: "white",
                          height: 18,
                          fontSize: "0.65rem",
                        }}
                      />
                    )}
                  </Stack>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      <Typography
        variant="body2"
        sx={{ color: "rgba(255,255,255,0.4)", mb: 3, textAlign: "center" }}
      >
        等待其他玩家加入…
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="outlined"
          onClick={onLeave}
          sx={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
        >
          離開房間
        </Button>
        <Button variant="contained" color="primary" onClick={onStart}>
          開始遊戲
        </Button>
      </Stack>

      <AppSnackbar
        message={copiedSnackbar ? "已複製代碼" : null}
        severity="success"
        onClose={() => setCopiedSnackbar(false)}
      />
    </Box>
  );
};
