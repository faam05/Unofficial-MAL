/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'

const LazyHome = lazy(() => import('../pages'))
const LazyOnGoing = lazy(() => import('../pages/list'))
const LazyMovie = lazy(() => import('../pages/movie'))
const LazyInfo = lazy(() => import('../pages/info'))
const LazyEpisode = lazy(() => import('../pages/episode'))
const LazyBatch = lazy(() => import('../pages/batch'))

const routes = [
  { path: '/', component: <LazyHome /> },
  { path: '/list-all', component: <LazyOnGoing /> },
  { path: '/movie', component: <LazyMovie /> },
  { path: '/anime/:slug', component: <LazyInfo /> },
  { path: '/episode/:slug', component: <LazyEpisode /> },
  { path: '/batch/:slug', component: <LazyBatch /> },
]

export { routes }
