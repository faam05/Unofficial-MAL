import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <React.StrictMode>
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <App />
        </MantineProvider>
      </BrowserRouter>
      {/* <App /> */}
    </React.StrictMode>
  </>
)
