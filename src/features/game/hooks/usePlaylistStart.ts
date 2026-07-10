import { useState } from "react";
import { usePlaylistQuery } from "../../../queries";
import type { Track } from "../../../types/playlist";

/** 播放清單取得與錯誤處理，供練習模式與房間開始遊戲共用 */
export const usePlaylistStart = () => {
  const [dismissedPlaylistError, setDismissedPlaylistError] = useState<
    string | null
  >(null);
  const { data, isLoading, error, refetch } = usePlaylistQuery({
    enabled: false,
  });
  const tracks = data?.tracks ?? [];
  const playlistErrorMessage =
    error?.message && error.message !== dismissedPlaylistError
      ? error.message
      : null;

  const fetchTracksForGame = async (): Promise<Track[] | null> => {
    setDismissedPlaylistError(null);
    if (data?.tracks?.length) {
      return tracks;
    }
    const result = await refetch();
    return result.data?.tracks?.length ? result.data.tracks : null;
  };

  const dismissPlaylistError = () => {
    setDismissedPlaylistError(error?.message ?? null);
  };

  return {
    tracks,
    isLoading,
    playlistErrorMessage,
    fetchTracksForGame,
    dismissPlaylistError,
  };
};
