import React from 'react'
import Note from './pages/Note'
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import { Navigate } from "react-router-dom";
import Signup from './pages/Signup';
import Images from './pages/Images';



function App() {
  const ProtectedRoute = ({ children }) => {
    const authToken = localStorage.getItem("authToken");
    
    return authToken ? children : <Navigate to="/" />;
  };
  return (
    <div>
      <Routes>
         <Route path='/' element={<Login/>} />
         <Route path='/signup' element={<Signup/>} />
         <Route path='/note' element={<ProtectedRoute><Note/></ProtectedRoute>} />
         <Route path='/images' element={<Images/>} />
       </Routes>
    </div>
  )
}

export default App
