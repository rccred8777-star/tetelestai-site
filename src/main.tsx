import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './contexts/AuthContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <AuthProvider>
      <App />
      <Toaster position="top-center" richColors closeButton />
    </AuthProvider>
  </HashRouter>,
)

// Registra o service worker (app instalável + offline). Só em produção.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((e) => {
      console.warn('Service worker não registrado:', e)
    })
  })
}
