/** 單一歌曲曲目 */
export interface Track {
  title: string
  artist: string
  url: string
}

/** 播放清單 API 回應格式 */
export interface PlaylistResponse {
  tracks: Track[]
}
