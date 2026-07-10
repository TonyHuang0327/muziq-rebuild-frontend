import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { GameHome } from "../features/game/components/GameHome";
import { usePlaylistStart } from "../features/game/hooks/usePlaylistStart";
import { RoomFlow } from "../features/room/components/RoomFlow";
import { useRoomFlow } from "../features/room/hooks/useRoomFlow";
import type { Track } from "../types/playlist";
import { AppSnackbar } from "./AppSnackbar";
import { GamePage } from "./GamePage";
import { GameShell } from "./GameShell";

export const Game = () => {
  const roomFlow = useRoomFlow();
  const playlist = usePlaylistStart();
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameTracks, setGameTracks] = useState<Track[]>([]);

  const handleStartPractice = async () => {
    const tracks = await playlist.fetchTracksForGame();
    if (tracks) {
      setGameTracks(tracks);
      setIsGameActive(true);
    }
  };

  const handleExitGame = () => {
    setIsGameActive(false);
    setGameTracks([]);
  };

  const handleStartFromLobby = async () => {
    roomFlow.handleLeaveLobby();
    await handleStartPractice();
  };

  const showHome =
    !isGameActive && !playlist.isLoading && !roomFlow.isInLobby;

  if (roomFlow.isInLobby) {
    return (
      <RoomFlow
        roomDetail={roomFlow.roomDetail}
        isLoadingRoom={roomFlow.isLoadingRoom}
        onLeave={roomFlow.handleLeaveRoom}
        onStart={handleStartFromLobby}
      />
    );
  }

  return (
    <GameShell>
      {showHome && (
        <GameHome
          onStartPractice={handleStartPractice}
          onOpenCreateRoom={roomFlow.openCreateRoom}
          createRoomOpen={roomFlow.createRoomOpen}
          onCloseCreateRoom={roomFlow.closeCreateRoom}
          onCreateRoom={roomFlow.handleCreateRoom}
          isSubmitting={roomFlow.isSubmitting}
          submitError={roomFlow.submitError}
          onClearSubmitError={roomFlow.clearSubmitError}
        />
      )}

      {playlist.isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress sx={{ color: "accent.main" }} />
        </Box>
      )}

      <AppSnackbar
        message={playlist.playlistErrorMessage}
        onClose={playlist.dismissPlaylistError}
      />

      {isGameActive && (
        <GamePage
          tracks={gameTracks}
          isPlaylistLoading={playlist.isLoading}
          onExit={handleExitGame}
        />
      )}
    </GameShell>
  );
};
