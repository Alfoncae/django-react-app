import React from 'react';
import LogIn from './components/Login';
import Heading from './components/Heading';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import HomePage from './pages/HomePage';
import WalletPage from './pages/WalletPage';
import AccountPage from './pages/AccountPage';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import IntroPage from './pages/IntroPage';


// Capitalizes first letter
// function capitalizeFirstLetter(name) {
//   return name.charAt(0).toUpperCase() + name.slice(1);
// }

export const LoginContext = React.createContext()

export default function App() {

  const [loggedIn, setLoggedIn] = React.useState(localStorage.access ? true : false)

  function changeLoggedIn(value) {
    setLoggedIn(value)
    if (value === false){
      localStorage.clear()
    }
  }

  return (
    <div className="App">
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Heading />
        <Routes>
          <Route path="/" element={<IntroPage />}/>
          <Route path="/login" element={<LogIn />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/wallet" element={loggedIn ? <WalletPage /> : <LogIn />}/>
          <Route path="/home" element={loggedIn ? <HomePage /> : <LogIn />}/>
          <Route path="/account" element={loggedIn ? <AccountPage /> : <LogIn />}/>
        </Routes> 
        <footer>
          <Navbar />
        </footer>
      </BrowserRouter>
    </LoginContext.Provider>
    </div>
  );
}