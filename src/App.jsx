import { Route, Routes } from 'react-router-dom'
import Layout from './components/layouts'
import { routes } from './routes/routes'

function App() {
  return (
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
  )
}

export default App
