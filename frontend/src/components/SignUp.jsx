import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LoginContext } from '../App';

function SignUp() {

    const [loggedIn, setLoggedIn] = React.useContext(LoginContext)
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        localStorage.clear()
        setLoggedIn(false)

    }, [])

    const [form, setForm] = React.useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',

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
    const handleSubmit = async event => {
        event.preventDefault();
        if (form.password === form.confirmPassword) {
            fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: form.username,        
                    email: form.email,
                    password: form.password
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setLoggedIn(true)
                localStorage.setItem('access', data.access);
                localStorage.setItem('refresh', data.refresh);
                navigate(location?.state?.previousUrl ? 
                    location.state.previousUrl : '/home');
            })
        } else {
            alert('Passwords Do not match!')
        }
    };

    return (
        <form  onSubmit={handleSubmit} className="auth--container">
                {/* EMAIL INPUT */}
            <div className="input--container">
                <label 
                    className="label--text"
                    htmlFor="auth--email"
                >
                Email
                </label>

                <input 
                    autoFocus
                    required
                    onChange={handleChange}
                    id="auth--email" 
                    type="email" 
                    name="email"
                    value={form.email}
                ></input>
            </div>

                {/* USERNAME INPUT */}
            <div className="input--container">
                <label 
                    className="label--text"
                    htmlFor="auth--username"
                >
                Username    
                </label>
                <input
                    required
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
                    autoComplete="newPassword"
                    required
                    onChange={handleChange}
                    id="auth--password"
                    type="password"
                    name="password"
                    value={form.password}
                ></input>
            </div>

            {/* CONFIRM PASSWORD INPUT */}
            <div className="input--container">
                <label 
                    className="label--text"
                    htmlFor="auth--confirm"
                >
                Confirm Password
                </label>
                <input
                    autoComplete="newPassword" 
                    required
                    onChange={handleChange}
                    id="auth--confirm"
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                ></input>
            </div>

                {/* BUTTON SUBMISSION */}
            <div className="input--container">
                <button>Sign up</button>
            </div>
            <NavLink 
                to="/login" 
                className="nav--link">
                 
                <h3>or login</h3>
            </NavLink>
        </form>
    )
}

export default SignUp