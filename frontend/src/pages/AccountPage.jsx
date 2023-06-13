import React from "react"
import { useNavigate, useLocation, NavLink } from "react-router-dom"
import { LoginContext } from "../App"



export default function AccountPage(props) {

    const [loggedIn, setLoggedIn] = React.useContext(LoginContext)

    return (
        <div className="account--container">
            <NavLink 
                to='/login'
                onClick={() => setLoggedIn(false)}
                className="input--container"
            >
               <button>Log out</button>
            </NavLink>
        </div>
    )
}