import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { LoginContext } from "../App"



export default function AccountPage(props) {

    const loggedIn = React.useContext(LoginContext)

    return (
        <div className="account--container">
            <div className="input--container">
                <button>Log out</button>
            </div>
        </div>
    )
}