import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Router from './Routes.jsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { UserContextProvider } from './UserContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router={ Router } />
    </UserContextProvider>
  </StrictMode>,
)
