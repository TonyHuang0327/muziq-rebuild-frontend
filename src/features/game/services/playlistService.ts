import type { PlaylistResponse } from '../../../types/playlist'

/** 取得播放清單 */
export const fetchPlaylist = async (): Promise<PlaylistResponse> => {
  const res = await fetch('/api/playlist')
  if (!res.ok) throw new Error(`取得播放清單失敗: ${res.status}`)
  return res.json()
}
