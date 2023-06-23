import React, { useEffect, useState, useContext } from "react"
import { useNavigate, useLocation, NavLink } from "react-router-dom"
import { LoginContext } from "../App"
import useFetch from "../hooks/UseFetch"

export default function AccountPage() {

    const username = localStorage.getItem('username')
    const [loggedIn, setLoggedIn] = useContext(LoginContext)
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
    })
    
    const {request, updateData, data: {user} = {}, errorStatus} = useFetch(`http://127.0.0.1:8000/api/user/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access')
        },
    })

    React.useEffect(() => {
        request();
    }, [])


    // set user data to state when it changes
    useEffect(() => {
        if (user) {
            setForm({
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
            });
        }
    }, [user]);

    function handleChange(event) {
        setForm(currentForm => {
            return {
                ...currentForm,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        updateData(form)
    }

    return (
        <>
        <div className="mobile--container">
            <div className="page--title">Account</div>
            <h4>Username: {username}</h4>
                <div className="input--container">
                    <label 
                        className="label--text"
                        htmlFor="firstName"
                    >
                    First Name
                    </label>

                    <input 
                        required
                        autoComplete="off"
                        onChange={handleChange}
                        id="firstName" 
                        type="text" 
                        name="firstName"
                        value={form.firstName}
                    ></input>
                </div>

                <div className="input--container">
                    <label 
                        className="label--text"
                        htmlFor="lastName"
                    >
                    Last Name
                    </label>

                    <input 
                        required
                        autoComplete="off"
                        onChange={handleChange}
                        id="lastName" 
                        type="text" 
                        name="lastName"
                        value={form.lastName}
                    ></input>
                </div>

                <div className="input--container">
                    <label 
                        className="label--text"
                        htmlFor="email"
                    >
                    Email
                    </label>

                    <input 
                        required
                        autoComplete="off"
                        onChange={handleChange}
                        id="email" 
                        type="email" 
                        name="email"
                        value={form.email}
                    ></input>
                </div>
                <form onSubmit={handleSubmit} className="input--container">
                    <button>Update</button>
                </form>
            <NavLink 
                to='/login'
                onClick={() => setLoggedIn(false)}
                className="input--container"
            >
               <button>Log out</button>
            </NavLink>
        </div>
        </>
    )
}
