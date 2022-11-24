import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import About from '../pages/About'
import Contracts from '../pages/Contracts'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Users from '../pages/Users'
import ConfigRoutes from '../routes/ConfigRoutes'
import Footer from './Footer'
import Header from './Header'
// import configRoutes from '../routes/ConfigRoutes'

const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      <div>
        {/* <Header/> */}
          <div className="container">
            <div className="main">
              <ConfigRoutes/>
            </div>
          </div>
        {/* <Footer/> */}
      </div>
    </BrowserRouter>
  )
}

export default Layout