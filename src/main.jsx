import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <React.StrictMode>
      <BrowserRouter>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            // breakpoints: {
            //   xs: 500,
            //   sm: 800,
            //   md: 1000,
            //   lg: 1200,
            //   xl: 1400,
            // },
            components: {
              Container: {
                defaultProps: {
                  sizes: {
                    xs: 540,
                    sm: 720,
                    md: 960,
                    lg: 1140,
                    xl: 1320,
                  },
                },
              },
            },
          }}>
          <App />
        </MantineProvider>
      </BrowserRouter>
      {/* <App /> */}
    </React.StrictMode>
  </>
)
