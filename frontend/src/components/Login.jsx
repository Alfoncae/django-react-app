import React from 'react'
import axios from 'axios'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { LoginContext } from '../App'

function LogIn(props) {

    const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
    const navigate = useNavigate();
    const locatiion = useLocation();

    const [form, setForm] = React.useState({
        username: '',
        password: ''
    })

    // HANDLES THE INPUT CHANGES IN THE FORM
    function handleChange(event) {
        setForm(currentForm => {
            return {
                ...currentForm,
                [event.target.name]: event.target.value
            }
        })
    }

    // HANDLES FORM SUBMISSION
    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://127.0.0.1:8000/token/'

        fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password
            })
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)
            setLoggedIn(true)
            setForm(oldForm => ({
                ...oldForm,
                username: '',
                password: ''
            }))
            navigate(locatiion?.state?.previousUrl ? 
                locatiion.state.previousUrl : '/home');
        })
    }

    return (
        <form onSubmit={handleSubmit} className="auth--container">
                {/* USERNAME INPUT */}
            <div className="input--container">
                <label 
                    className="label--text"
                    htmlFor="auth--username"
                >
                Username
                </label>

                <input 
                    autoFocus
                    required
                    autoComplete="off"
                    onChange={handleChange}
                    id="auth--username" 
                    type="text" 
                    name="username"
                    value={form.username}
                ></input>
            </div>

                {/* PASSWORD INPUT */}
            <div className="input--container">
                <label 
                    className="label--text"
                    htmlFor="auth--password"
                >
                Password
                </label>
                <input 
                    required
                    autoComplete="currentPassword"
                    onChange={handleChange}
                    id="auth--password"
                    type="password"
                    name="password"
                    value={form.password}
                ></input>
            </div>

                {/* BUTTON SUBMISSION */}
            <div className="input--container">
                <button>Log in</button>
            </div>
            <NavLink 
                to="/signup" 
                className="nav--link">
                
                <h3>or signup</h3>
            </NavLink> 
        </form>
    )
}

export default LogIn