
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './pages/Layout'
import Pages from './pages/Pages'
import Login from './pages/Login'
import Register from './pages/Register'
import ProblemSet from './pages/ProblemSet'
import Blogs from './pages/Blogs'
import Profile from './pages/Profile'
import Contests from './pages/Contests'
import ProblemPage from './pages/Workspace/ProblemPage'
import CreateBlog from './pages/CreateBlog'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route path='' element={<Blogs />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='blogs' element={<Blogs />} />
      <Route path='problemset' element={<ProblemSet />}></Route>
      <Route path='profile' element={<Profile />} />
      <Route path='Contests' element={<Contests />} />
      <Route path='problemset/:id' element={<ProblemPage />} />
      <Route path='/createblog' element={<CreateBlog />} />
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
