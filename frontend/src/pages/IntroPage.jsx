import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { LoginContext } from "../App"

export default function IntroPage() {

    const navigate = useNavigate()

    const [loggedIn, setLoggedIn] = React.useContext(LoginContext)

    React.useEffect(() => {
        if (loggedIn === true){
            navigate('/home')
        }
    }, [])

    return (
        <div className="intro--container">
            <h2>
                Welcome to MoneyManager, Your Personal Finance Partner
            </h2>
            <h3>
                MoneyMaster is a comprehensive, intuitive, and user-friendly platform 
                designed to help you take control of your financial future. We understand
                the complexities of managing money in today's fast-paced world, and our goal 
                is to make personal finance management simple, accessible, and enjoyable for
                everyone.
            </h3>

            <NavLink 
                to='/login'
                className="input--container">
                <button>Log in</button>
            </NavLink>      
            <br />
            or
            <NavLink 
                to='/signup'
                className="input--container">
                <button>Sign Up</button>
            </NavLink>   
        </div>
    )
}