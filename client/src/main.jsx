import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/poppins.css'
import './index.css'
import App from './App.jsx'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <div className="bg-[#F5F5F5] min-h-screen poppins-regular text-tertiary">
  <ToastContainer/>
 <App />
 </div>
  </StrictMode>,
)
