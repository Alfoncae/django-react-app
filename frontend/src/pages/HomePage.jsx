import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { LoginContext } from "../App";

export default function HomePage() {

    const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
    const navigate = useNavigate();
    const location = useLocation();

    const [payments, setPayments] = React.useState([])

    React.useEffect(() => {
        
        fetch('http://127.0.0.1:8000/api/transactions/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            }
        })
        .then(response => {
            if (response.status === 401){
                setLoggedIn(false)
                navigate('/login', {
                    state: {
                        previousUrl: location.pathname
                    }
                })
            }
            return response.json()
        })
        .then(data => {
            setPayments(data.transactions)
        })
    }, [])

    // map over payments
    const elements = payments.map(payment => {
        return <h3 key={payment.id}>{payment.note}</h3> // or whatever the property is in your payment object
    })

    return (
        <ul>{elements}</ul>
    )
}
