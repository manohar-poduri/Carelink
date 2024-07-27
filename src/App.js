import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import About from './Components/About/About';
import Contactus from './Components/Contactus/Contactus';
import MyContext from './MyContext';
import Profile from './Components/Profile/Profile';
import Createservice from './Components/Createservice/Createservice';
import Services from './Components/Services/Services';
import Careservices from './Components/Careservices/Careservices';
import Findcareservices from './Components/Careservices/Findcareservices';
import Ourservices from './Components/Ourservices/Ourservices';
import ShowAcceptedServices from './Components/Createservice/ShowAcceptedServices';
import ShowCreateService from './Components/Createservice/ShowCreateService';

import Createcommunity from './Components/Community/Createcommunity';
import Viewcommunity from './Components/Community/Viewcommunity';
import Eachcommunity from './Components/Community/Eachcommunity';

function App() {
  const sharedvalue= useContext(MyContext);

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        {sharedvalue.isAuthed===false && <Route path='/login' element={<Login/>}/>}
        {sharedvalue.isAuthed===false && <Route path='/register' element={<Register/>}/>}
        {sharedvalue.isAuthed===true && <Route path='/profile' element={<Profile/>}/>}
        {sharedvalue.isAuthed===true && sharedvalue.role==='serviceprovider' && <Route path='/services' element={<Services/>}/>}
        <Route path='/createservice' element={<Createservice/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contactus/>}/>
        {sharedvalue.isAuthed===true && <Route path='/careservices' element={<Careservices/>}/>}
        {sharedvalue.isAuthed===true && <Route path='/findcareservices' element={<Findcareservices/>}/>}
        <Route path='/ourservices' element={<Ourservices/>}/>
        {sharedvalue.isAuthed===true && <Route path='/showacceptedservices' element={<ShowAcceptedServices/>}/>}
        {sharedvalue.isAuthed===true && <Route path='/showcreateservices' element={<ShowCreateService/>}/>}

        {sharedvalue.isAuthed===true && <Route path='/createcommunity' element={<Createcommunity/>}/>}
        {sharedvalue.isAuthed===true && <Route path='/viewcommunity' element={<Viewcommunity/>}/>}
        {sharedvalue.isAuthed===true && <Route path='/viewcommunity/:id' element={<Eachcommunity/>}/>}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
