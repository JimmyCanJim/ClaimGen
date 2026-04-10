import React from 'react'
import {Route, Routes, useLocation} from "react-router"
import Dashboard from './pages/Dashboard'
import ManageClaims from './pages/ManageClaims'
import AuthPage from './pages/AuthPage'
import { Toaster } from 'react-hot-toast'
import CreateClaim from './pages/CreateClaim'
import AnimatedBackground from './components/AnimatedBackground'
import { AnimatePresence } from 'framer-motion'

const App = () => {
  const location = useLocation();

  return (
    <div data-theme = "claimgen" className='min-h-screen relative'>
      <Toaster/>
      <AnimatedBackground/>

      <main className='relative z-10'>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path = "/" element = {<AuthPage/>}></Route>
            <Route path = "/dashboard/manageclaims" element = {<ManageClaims/>}></Route>
            <Route path = "/dashboard" element={<Dashboard/>}></Route>
            <Route path = "/dashboard/createclaim" element={<CreateClaim/>}></Route>
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )

}

export default App

