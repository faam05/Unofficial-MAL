import { Route, Routes } from 'react-router-dom'
import routes from './routes/routes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/'>
          {/* <Route index element={<LazyHome />} /> */}
          {routes.map((route, index) => {
            return <Route key={index} path={route.path} element={<Suspense>{route.component}</Suspense>} />
          })}
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
