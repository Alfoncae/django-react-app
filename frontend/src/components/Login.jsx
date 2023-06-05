import React from 'react'
import axios from 'axios'

function LogIn(props) {

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
    const handleSubmit = async event => {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', { username: form.username, password: form.password });
            console.log(response.data);
                {/* RESET INPUT VALUES AFTER SUCCESS */}
            setForm(prevForm => ({
                ...prevForm,
                username: '',
                password: '',
            }))
          } catch (error) {
            if (error.response) {
                console.log(error.response.data)
            }
          }
    };

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
                    autoComplete="currentUserName"
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
            <h3 onClick={props.changeForm}>or signup</h3>
        </form>
    )
}

export default LogIn