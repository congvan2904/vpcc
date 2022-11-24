import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Contracts from '../pages/Contracts'
import NotFound from '../pages/NotFound'
import Users from '../pages/Users'

const ConfigRoutes = () => {
    return (
        <Routes>
            <Route path='/users' element={<Users />} />
            <Route path='/contracts' element={<Contracts />} />
            <Route path='/about' element={<About />} />
            {/* <Route path='/*' element={<NotFound />} /> */}
        </Routes>
    )
}

export default ConfigRoutes