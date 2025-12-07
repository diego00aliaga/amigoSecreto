import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/index.tsx'
import { AuthProvider } from './context/AuthContext'; // <--- Importas tu Provider
import {

  RouterProvider,
} from "react-router";
createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <script src="https://accounts.google.com/gsi/client" async></script>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>

  </StrictMode>,
)
