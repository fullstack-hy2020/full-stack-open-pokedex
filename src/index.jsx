import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Routes } from 'react-router-dom'
import App from './App'
import './styles.css'

// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.getElementById('app')).render(
  <Routes>
    <App />
  </Routes>
)
