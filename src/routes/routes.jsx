import React, { lazy } from 'react'

const LazySearch = lazy(() => import('../pages/Search'))
const LazyHome = lazy(() => import('../pages/Home'))
const LazyDetail = lazy(() => import('../pages/Detail'))
const LazyWatch = lazy(() => import('../pages/Watch'))
const LazyAbout = lazy(() => import('../pages/About'))
const LazyComingSoon = lazy(() => import('../pages/ComingSoon'))

const LazyStream = lazy(() => import('../pages/Stream'))
const LazyInfo = lazy(() => import('../pages/Stream/info'))
const LazyEpisode = lazy(() => import('../pages/Stream/episode'))

const routes = [
  {
    path: '/',
    component: <LazyHome />,
  },
  { path: '/coming-soon', component: <LazyComingSoon /> },
  { path: '/about', component: <LazyAbout /> },
  { path: '/search/:value', component: <LazySearch /> },
  { path: '/detail/:id', component: <LazyDetail /> },
  { path: '/watch/:id', component: <LazyWatch /> },
  // { path: '*', component: <LazyNotFound /> },
]

const routesStream = [
  { path: '/', component: <LazyStream /> },
  { path: '/anime/:slug', component: <LazyInfo /> },
  { path: '/episode/:slug', component: <LazyEpisode /> },
]

export { routes, routesStream }
