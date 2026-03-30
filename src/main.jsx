import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './styles/main.css'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'

const isStream = window.location.hostname.startsWith('stream')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={isStream ? '/stream' : '/'}>
      <MantineProvider>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
