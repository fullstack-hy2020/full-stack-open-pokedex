import React from 'react'
import App from './App'
import './styles.css'
import { createRoot } from 'react-dom/client'

// eslint-disable-next-line no-undef
const domNode = document.getElementById('app')
const root = createRoot(domNode)

root.render(<App />)
