import { useNavigate } from "react-router-dom"
import React from "react"

export default function HomePage() {

    const navigate = useNavigate()

    const [payments, setPayments] = React.useState([])  // Initialize as an empty array

    React.useEffect(() => {
        
        fetch('http://127.0.0.1:8000/api/transactions/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            }
        })
        .then(response => {
            if (response.status === 401){
                navigate('/login')
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
