import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ModalProvider } from './components/modals/ModalProvider.jsx'
import ModalHandler from './components/modals/modalHandler.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModalProvider>
      <ModalHandler />
      <App />
    </ModalProvider>
  </StrictMode>,
)
