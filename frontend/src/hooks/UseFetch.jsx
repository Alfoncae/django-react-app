import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function useFetch(url, { method, headers, body } = {}) {

    const [data, setData] = React.useState()
    const [errorStatus, setErrorStatus] = React.useState()

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
        console.log(newData)
        fetch(`http://127.0.0.1:8000/api/user/${localStorage.getItem('username')}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({
            savings: newData.savings,
            income: newData.income,
            first_name: newData.firstName,
            last_name: newData.lastName
        })
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

    return {request, updateData, data, errorStatus}
}