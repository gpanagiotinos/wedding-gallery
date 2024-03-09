import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import privateRoutes from './routes/privateRoutes'
import publicRoutes from './routes/publicRoutes'
import './App.css'

function App() {
  const router = createBrowserRouter([privateRoutes(), publicRoutes()])
    return (
        <div className="App">
            <main>
                <RouterProvider router={router} />
            </main>
        </div>
    )
}

export default App
