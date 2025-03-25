import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NavBar from './components/NavBar'
import AmazonCart from './components/AmazonCart'
import WishList from './components/WishList'
import { Router,BrowserRouter, Routes, Route } from 'react-router-dom'
import {RecoilRoot} from "recoil"
// import './App.css'

function App() {
  
  

  return (
    <BrowserRouter>
    <RecoilRoot>
    <NavBar/>

    <Routes>
        <Route path="/" element={<WishList/>} />
        <Route path="/cart" element={<AmazonCart/>} />
      </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
