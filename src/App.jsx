import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"



import './App.css'
import Login from './components/login/login'
import Dashboard from './components/dashboard/dashboard';
import Home from './components/Home/Home';
import Employee from './components/employee/Employee';
import Profile from './components/profile/Profile';
import Create from './components/employee/create';
import UpdateEmployee from './components/employee/updateEmploye';
import Start from './components/start/Start';
import EmpLogin from './components/emp_login/EmpLogin';
import EmpDetail from './components/emp_login/empdetail';
import EmpUpdate from './components/emp_login/empupdate';

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/start' element={<Start></Start>}></Route>
          <Route path="/" element={<Dashboard />} >
            <Route path="/home" element={<Home />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create" element={<Create />} />
            <Route path="/updateemployee/:id" element={<UpdateEmployee />} />


          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/emplogin" element={<EmpLogin />} />
          <Route path="/empdetail" element={<EmpDetail />} />
          <Route path="/empupdate" element={<EmpUpdate />} />


        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
