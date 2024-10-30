import ReactDOM from 'react-dom/client';
import './index.css';
import React from 'react';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'


import Projectview from './Projectview';
import Signin from './Signin';
import Navbar from './Navbar';
import Signup from './Signup';
import Project from './Project';
import AddProject from './Addproject';
import Addtask from './Addtask'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <BrowserRouter>
   <Routes> 

   <Route path='/' element={<Navbar/>} >
   <Route index element={<Signin />} />     
   <Route path="register" element={<Signup />} />
   <Route path="project" element={<Project/>} />
   <Route path="/project/:id" element={<Projectview/>} />
   <Route path="add" element={<AddProject/>} />
   <Route path="addtask" element={<Addtask/>} />

</Route>

   </Routes>
   </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// <Route path='/Addbook' element={<AddBook/>}></Route>
// <Route path='/login' element={<Login/>}></Route>
// <Route path='/signin' element={<Sign/>}></Route>
