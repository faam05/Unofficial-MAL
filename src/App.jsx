import { Container, MantineProvider } from '@mantine/core'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import Layout from './components/layouts'
import About from './pages/about'
import Home from './pages/home'
import Search from './pages/search'

function App() {
  return (
    <MantineProvider
      theme={{
        components: {
          Container: {
            defaultProps: {
              sizes: {
                xs: 540,
                sm: 720,
                md: 1060,
                lg: 1140,
                xl: 1320,
              },
            },
          },
        },
      }}>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/search/:value' element={<Search />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Layout>
    </MantineProvider>
  )
}

export default App
