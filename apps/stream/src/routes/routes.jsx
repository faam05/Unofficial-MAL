import { lazy } from 'react'

const LazyStream = lazy(() => import('../pages'))
const LazyInfo = lazy(() => import('../pages/info'))
const LazyEpisode = lazy(() => import('../pages/episode'))

const routes = [
  { path: '/', component: <LazyStream /> },
  { path: '/anime/:slug', component: <LazyInfo /> },
  { path: '/episode/:slug', component: <LazyEpisode /> },
]

export { routes }
