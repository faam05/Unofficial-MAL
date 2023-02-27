import { Container, MantineProvider } from '@mantine/core'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import Layout from './components/layouts'
import About from './pages/about'
import Detail from './pages/details'
import Home from './pages/home'
import Search from './pages/search'
import { routes } from './routes/routes'

function App() {
  return (
    <Layout>
      <Routes>
        {/* <Route path='/' element={<Home />} />
        <Route path='/search/:value' element={<Search />} />
        <Route path='/about' element={<About />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/detail/:id/characters' element={<Detail />} /> */}
        {routes.map((route, index) => {
          return <Route key={index} path={route.path} element={route.component} />
        })}
      </Routes>
    </Layout>
  )
}

export default App
