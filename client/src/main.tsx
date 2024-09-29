import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RedirectUrl from './components/RedirectUrl.tsx'
import NotFound from './components/NotFound.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/not-found',
        element: <NotFound />
    },
    {
        path: '/:urlCode',
        element: <RedirectUrl />
    }
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
