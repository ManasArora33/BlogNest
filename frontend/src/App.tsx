import { Route, Routes } from 'react-router'
import './App.css'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Blogs from './components/Blogs'
import BlogPage from './components/BlogPage'
import CreateBlog from './components/CreateBlog'
import Landing from './components/Landing'

function App() {

  return <div>
    
      <Routes>  
        <Route path='/signup' element={<Signup/> } />
        <Route path='/signin' element={<Signin/> } />
        <Route path='/dashboard' element={<Dashboard/> } />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/blogs' element={<Blogs/>} />
        <Route path='/blog/:id' element={<BlogPage/>} />
        <Route path='/createBlog' element={<CreateBlog/>} />
        <Route path='/' element={<Landing/>}/>
        
      </Routes>
    
  </div>
}

export default App
