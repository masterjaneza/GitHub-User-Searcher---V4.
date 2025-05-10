import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import MainCard from './MainCard.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainCard />
  </StrictMode>,
)
