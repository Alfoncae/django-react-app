import { NavLink } from "react-router-dom"

export default function IntroPage() {
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
                eaque quisquam, laudantium ex hic ab aspernatur,
                placeat omnis exercitationem nobis illum perferendis dolorum
                illo in facere porro quidem.
                illo in facere porro quidem.
                illo in facere porro quidem.
                Lorem ipsum dolor sit amet consectet
                ur adipisicing elit. Eius pariatur velit
                eaque quisquam, laudantium ex hic ab aspernatur,
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