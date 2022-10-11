import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Quote from './pages/Quote'
import Register from './pages/Register'

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        Hello World
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/quote" element={<Quote />} />
        </Routes>
      </div>
    </BrowserRouter >
  )
}

export default App