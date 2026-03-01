export { gameQueryKeys } from './queryKeys'
import { useQuery } from '@tanstack/react-query'
import { fetchPlaylist } from '../services/playlistService'
import { gameQueryKeys } from './queryKeys'


type UsePlaylistQueryOptions = {
    enabled?: boolean
  }
  
  export const usePlaylistQuery = (options: UsePlaylistQueryOptions = {}) => {
    const { enabled = false } = options
  
    return useQuery({
      queryKey: gameQueryKeys.playlist(),
      queryFn: fetchPlaylist,
      enabled,
      retry: 1,
    })
  }