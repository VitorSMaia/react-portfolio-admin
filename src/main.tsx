import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { initGa } from '@/analytics/ga'

initGa()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <SpeedInsights />
    </AuthProvider>
  </StrictMode>,
)
