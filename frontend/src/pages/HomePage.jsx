import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { LoginContext } from "../App";
import useFetch from "../hooks/UseFetch";

export default function HomePage() {

    const [loggedIn, setLoggedIn] = React.useContext(LoginContext)

    const {request, data: {transactions} = {}, errorStatus} = useFetch(`http://127.0.0.1:8000/api/transactions/${localStorage.getItem('username')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access')
        },
    });

    React.useEffect(() => {
        request();
    }, [])

    return (
        <>
            
        </>
    )
}
