import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Preserve the original stylesheet cascade; keep motion overrides last.
import './index.css'
import './styles/base.css'
import './styles/navbar.css'
import './styles/projects.css'
import './styles/journey.css'
import './styles/hero.css'
import './styles/footer.css'
import './styles/skills.css'
import './styles/motion.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
