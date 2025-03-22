import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="606266327098-nau3klmssgc6gh062mn51vamqs4pf78m.apps.googleusercontent.com">
    <App />
      </GoogleOAuthProvider>
  </StrictMode>,
)
