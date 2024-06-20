import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import ReactGA from 'react-ga4'
import App from './App'
import './styles/main.css'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'

ReactGA.initialize('G-XQ7VKK2LXR')
ReactGA.send({
  hitType: 'pageview',
  page: `${window.location.href}`,
  title: `View Page ${window.location.href}`,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
