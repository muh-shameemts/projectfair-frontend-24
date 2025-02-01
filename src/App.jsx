
import './App.css'
import Header from './Components/Header'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import { Route, Routes } from 'react-router-dom'
import Projects from './Pages/Projects'
import Auth from './Pages/Auth'
import PageNotFound from './Pages/PageNotFound'
import Dashboard from './Pages/Dashboard'
function App() {
 
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path='/register' element={<Auth register={true}/>}/>
      <Route path='/login' element={<Auth/>} ></Route>
      <Route path='/dashboard' element={<Dashboard/>} ></Route>
      <Route path='/projects' element={<Projects/>} ></Route>
      <Route path='*' element={<PageNotFound/>} ></Route>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
