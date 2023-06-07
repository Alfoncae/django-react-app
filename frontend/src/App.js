import axios from 'axios';
import React from 'react';
import LogIn from './components/Login';
import Heading from './components/Heading';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


// Capitalizes first letter
function capitalizeFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Heading />
      <Routes>
        <Route path="/login" element={<LogIn />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/home" element={<HomePage />}/>
      </Routes> 
      <footer>
        <Navbar />
      </footer>
    </BrowserRouter>
    </div>
  );
}

export default App;