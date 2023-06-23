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
            <h3>
                Lorem ipsum dolor sit amet consectet
                ur adipisicing elit. Eius pariatur velit
                eaque quisquam, laudantium ex hic ab aspernatur,
                placeat omnis exercitationem nobis illum perferendis dolorum
                illo in facere porro quidem.
                Lorem ipsum dolor sit amet consectet
                ur adipisicing elit. Eius pariatur velit
                eaque quis
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