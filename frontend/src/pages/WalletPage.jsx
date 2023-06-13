import React from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import { LoginContext } from "../App"
import LogIn from "../components/Login"



export default function AccountPage(props) {

    const navigate = useNavigate()
    const location = useLocation()

    const [loggedIn, setLoggedIn] = React.useContext(LoginContext)

    return (
        <div className="account--container">
            <h3>This is the wallet page</h3>
        </div>
    )
}