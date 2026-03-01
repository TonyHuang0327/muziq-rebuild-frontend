/**  centralized query key factory for game feature */
export const gameQueryKeys = {
  all: ['game'] as const,
  playlist: () => [...gameQueryKeys.all, 'playlist'] as const,
}
