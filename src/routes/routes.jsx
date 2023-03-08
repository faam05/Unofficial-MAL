import About from '../pages/about'
import Detail from '../pages/details/index'
import Home from '../pages/home'
import Search from '../pages/search'

export const routes = [
  { path: '/', component: <Home /> },
  { path: '/about', component: <About /> },
  { path: '/search/:value', component: <Search /> },
  { path: '/detail/:id', component: <Detail /> },
]
