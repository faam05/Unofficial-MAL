import React from 'react'

import About from '../pages/about'
import Detail from '../pages/details'
import Home from '../pages/home'
import Search from '../pages/search'
import NotFound from '../components/layouts/404'
import ComingSoon from '../pages/coming-soon'

const LazyHome = React.lazy(() => import('../pages/home'))
// const LazyDetail = React.lazy(() => import('../pages/details'))
// const LazyAbout = React.lazy(() => import('../pages/about'))
// const LazySearch = React.lazy(() => import('../pages/search'))

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
