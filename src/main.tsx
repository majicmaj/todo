import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Providers from './providers/provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers />
  </StrictMode>,
)
