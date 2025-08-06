import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './fontawesome/library.js'
import { ModalProvider } from './components/modals/ModalProvider.jsx'
import ModalHandler from './components/modals/ModalHandler.jsx'
import { RouterProvider } from "react-router";
import { Provider } from 'react-redux'
import store from './stores/store.js'
import { router } from './routes/routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <ModalHandler />
        <RouterProvider router={router} />
      </ModalProvider>
    </Provider>
  </StrictMode>,
)
