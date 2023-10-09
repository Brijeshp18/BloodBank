import React from 'react'
import {  BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ProtectedPage from './components/ProtectedPage'
import { SetLoading } from './Redux/loadersSlice'
import { useSelector } from "react-redux";
import Spinner from './components/Spinner'

function App() {
  //const { loading } = useSelector((state) => state.loaders);
  return (
    <div>

     {/* {loading && <Spinner />} */}
     <BrowserRouter>
      <Routes>
       <Route path='/' element={ <ProtectedPage> <Home/> </ProtectedPage>}/>
       <Route path='/login' element={<Login/>}/>
       {/* <Route path='/' element={<Home/>}/> */}
       <Route path='/register' element={<Register/>}/>




      </Routes>
     </BrowserRouter>
   
    </div>
  )
}

export default App





