import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './components/layouts/new'
import { routes, routesStream } from './routes/routes'
import ReactGA from 'react-ga4'

const LazyNotFound = lazy(() => import('./components/layouts/404'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      // staleTime: 'Infinity', // default: 0
      staleTime: 60 * 1000, // default: 0
      gcTime: 60 * 1000 * 5,
    },
  },
})

export default function App() {
  const { pathname } = useLocation()
  ReactGA.initialize('G-XQ7VKK2LXR')
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: pathname,
      title: `View Page ${pathname}`,
    })
  }, [pathname])

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Suspense>
                  <Layout>{route.component}</Layout>
                </Suspense>
              }
            />
          )
        })}
        {routesStream.map((route, index) => {
          return (
            <Route
              key={index}
              path={`/stream${route.path}`}
              element={
                <Suspense>
                  <Layout type='stream'>{route.component}</Layout>
                </Suspense>
              }
            />
          )
        })}
        <Route
          path='*'
          element={
            <Suspense>
              <LazyNotFound />
            </Suspense>
          }
        />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
