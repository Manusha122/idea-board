import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import IdeaBoard from './pages/IdeaBoard'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

export default function App(){
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/app' element={<IdeaBoard/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
