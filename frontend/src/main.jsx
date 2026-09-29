import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextApi from './component/ContextApi.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextApi>
    <BrowserRouter>
    <App />
    <ToastContainer/>
    </BrowserRouter>
    </ContextApi>
  </StrictMode>,
)
