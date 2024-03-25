import React from 'react'

import About from '../pages/about'
import Detail from '../pages/details'
import Home from '../pages/home'
import Search from '../pages/search'
import NotFound from '../components/layouts/404'
import ComingSoon from '../pages/coming-soon'

// const LazySearch = React.lazy(() => import('../pages/search'))
// const LazyHome = () => import('../pages/home')
// const LazyDetail = () => import('../pages/details')
// const LazyAbout = () => import('../pages/about')
// const LazySearch = () => import('../pages/search')
// const LazyComingSoon = () => import('../pages/coming-soon')
// const LazyNotFound = () => import('../components/layouts/404')

export const routes = [
  {
    path: '/',
    component: <Home />,
  },
  { path: '/coming-soon', component: <ComingSoon /> },
  { path: '/about', component: <About /> },
  { path: '/search/:value', component: <Search /> },
  { path: '/detail/:id', component: <Detail /> },
  { path: '*', component: <NotFound /> },
]

// function wait(time) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, time)
//   })
// }
