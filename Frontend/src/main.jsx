import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './Context/UserContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
)
