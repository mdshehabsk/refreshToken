import './App.css'
import {Routes,Route} from 'react-router-dom'
import Page from './components/Page'
import Login from './pages/login/Login'
import Register from './pages/register/register'
import Home from './pages/home/Home'
import Navbar from './components/Navbar'
function App() {
  
  return (
    <>
    <Navbar></Navbar>
    <Routes>
      <Route path='/login' element={<Page><Login/></Page>}  />
      <Route path='/register' element={<Page><Register/></Page>} />
      <Route path='/'  element={<Home/>} />
    </Routes>
    </>
  )
}

export default App
