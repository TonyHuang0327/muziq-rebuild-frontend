import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

/** MSW 瀏覽器端 Service Worker 實例 */
export const worker = setupWorker(...handlers)
