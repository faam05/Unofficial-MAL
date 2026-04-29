import { lazy, Suspense, useEffect } from 'react'
import ReactGA from 'react-ga4'

import { Route, Routes, useLocation } from 'react-router'
import { routes } from './routes/routes'

import { Layout } from './components/layouts/Layout'

const LazyNotFound = lazy(() => import('@shared/components/404'))

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
    <Layout>
        <Routes>
          {routes.map((route, index) => {
            return <Route key={index} path={route.path} element={<Suspense>{route.component}</Suspense>} />;
          })}
          <Route path="*" element={<LazyNotFound />} />
        </Routes>
    </Layout>
  )
}
