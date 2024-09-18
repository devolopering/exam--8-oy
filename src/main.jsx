import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CoinsProvider } from "./context/CoinsContext";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CoinsProvider>
        <App />
    </CoinsProvider>
  </React.StrictMode>,
)
