import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function useFetch(url, { method, headers, body } = {}) {

    const [data, setData] = React.useState()
    const [errorStatus, setErrorStatus] = React.useState()
    const username = localStorage.getItem('username')

    const navigate = useNavigate();
    const location = useLocation();

    function request() {
        fetch(url, {
            method: method,
            headers: headers,
            body: body
        })
        .then(response => {

            if (response.status === 401){
                navigate('/login', {
                    state: {
                        previousUrl: location.pathname,
                    },
                });
            }

            if (!response.ok){
                throw response.status;
            }
            return response.json()
        })
        .then(data => {
            setData(data)
        })
        .catch(error => {
            setErrorStatus(error)
        })
    }

    function updateData(newData){
        fetch(url, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({
            first_name: newData.firstName,
            last_name: newData.lastName,
            email: newData.email,
        }),
        })
        .then(response => {
            if (response.status === 401){
                navigate('/login', {
                    state: {
                        previousUrl: location.pathname,
                    },
                });
            }

            if (!response.ok){
                throw response.status;
            }

            return response.json()
        })
        .then(updated => {
            console.log(updated)
        })
        .catch(e => {
            setErrorStatus(e)
        })
    }
    
    function updateBalance(amount, expense){
    
        if (data && data.user) {

            console.log(data)

            let cat
            if (expense === 'EX'){
                cat = 'withdraw'
            } else if (expense === 'IN'){
                cat = 'deposit'
            } else if (expense === 'SA'){
                cat = 'savings'
            }

            // Then update the user data with the new balance
            fetch(`http://127.0.0.1:8000/api/transactions/${username}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    transaction_type: expense,
                    amount: amount,
                    category: cat,
                    user: data.user.id
                }),
            })
            .then(response => {
                if (response.status === 401){
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname,
                        },
                    });
                }
    
                if (!response.ok){
                    throw response.status;
                }
    
                return response.json()
            })
            .then(updated => {
                console.log(updated)
            })
            .catch(e => {
                setErrorStatus(e)
            })
        } else {
            console.error("Data is not yet loaded. Cannot update balance.");
        }
    }
    
    

    return {request, updateData, updateBalance, data, errorStatus}
}