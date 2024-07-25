
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout'
import Pages from './pages/Pages'
import Login from './pages/Login'
import Register from './pages/Register'
import ProblemSet from './pages/ProblemSet'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route path='' element={<Pages />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='problemset' element={<ProblemSet />}></Route>

    </Route>

  )
)


function App() {

  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
