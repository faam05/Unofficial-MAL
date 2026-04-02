import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy, Suspense, useEffect } from 'react'
import ReactGA from 'react-ga4'
import { Route, Routes, useLocation } from 'react-router-dom'

import { routes } from './routes/routes'
import { ENV, WEB_TITLE } from './configs'

import { Layout } from '@shared'

const LazyNotFound = lazy(() => import('@shared/components/404'))

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

  const CONFIG = {
    WEB_TITLE,
    ENV,
    REDIRECT_URL: import.meta.env.VITE_ANIME_URL,
  }

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
                  <Layout type={'stream'} CONFIG={CONFIG}>
                    {route.component}
                  </Layout>
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
