import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'  
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <BrowserRouter basename={BASENAME}>
          <div className="container">
             <Header /> 
             <Routes> 
                <Route path='/' element={<Dashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
             </Routes>
          </div>
        </BrowserRouter>
         <ToastContainer />
    </>
  );
}

export default App;
