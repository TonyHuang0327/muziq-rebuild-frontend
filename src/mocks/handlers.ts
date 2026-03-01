import { http, HttpResponse } from 'msw'
import { mockPlaylist } from './data/playlist'

/** MSW 請求攔截器：攔截 /api/playlist 並回傳模擬播放清單 */
export const handlers = [
  http.get('/api/playlist', () => {
    return HttpResponse.json({ tracks: mockPlaylist })
  }),
]
