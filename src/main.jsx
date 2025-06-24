import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ModalProvider } from './components/modals/ModalProvider.jsx'
import ModalHandler from './components/modals/modalHandler.jsx'
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    Component: App,
  },
]);

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
