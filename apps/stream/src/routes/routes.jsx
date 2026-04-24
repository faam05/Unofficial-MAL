import { lazy } from 'react'

const LazyHome = lazy(() => import('../pages'))
const LazyOnGoing = lazy(() => import('../pages/list'))
const LazyMovie = lazy(() => import('../pages/movie'))
const LazyInfo = lazy(() => import('../pages/info'))
const LazyEpisode = lazy(() => import('../pages/episode'))

const routes = [
  { path: '/', component: <LazyHome /> },
  { path: '/list-all', component: <LazyOnGoing /> },
  { path: '/movie', component: <LazyMovie /> },
  { path: '/anime/:slug', component: <LazyInfo /> },
  { path: '/episode/:slug', component: <LazyEpisode /> },
]

export { routes }
