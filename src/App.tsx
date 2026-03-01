import { Box } from '@mui/material'
import { Game } from './features/game/components/Game'
import './App.css'

const App = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
    }}
  >
    <Game />
  </Box>
)

export default App
