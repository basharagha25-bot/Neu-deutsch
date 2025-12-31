import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { VocabularyProvider } from './context/VocabularyContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VocabularyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VocabularyProvider>
  </React.StrictMode>,
)
