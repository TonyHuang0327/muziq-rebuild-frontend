import { http, HttpResponse } from 'msw'
import { mockPlaylist } from './data/playlist'
import type { CreateRoomFormValues } from '../features/room/types/room'

const generateRoomCode = () =>
  Math.random().toString(36).slice(2, 8).toUpperCase()

/** MSW 請求攔截器：攔截 /api/playlist 並回傳模擬播放清單 */
export const handlers = [
  http.get('/api/playlist', () => {
    return HttpResponse.json({ tracks: mockPlaylist })
  }),
  http.post('/api/rooms', async ({ request }) => {
    const body = (await request.json()) as CreateRoomFormValues

    return HttpResponse.json({
      roomId: crypto.randomUUID(),
      roomCode: generateRoomCode(),
      ...body,
    })
  }),
  http.get('/api/rooms/:roomId', ({ params }) => {
    return HttpResponse.json({
      roomId: params.roomId,
      roomCode: 'MOCK01',
      roomName: '模擬房間',
      maxPlayers: 4,
      questionSeconds: 10,
      isPrivate: false,
      players: [{ id: '1', name: '你', isHost: true }],
    })
  }),
]
