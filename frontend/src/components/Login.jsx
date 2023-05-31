import React from 'react'

function LogIn() {

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
    function handleSubmit() {

    }

    return (
        <form className="login--container">
                {/* EMAIL INPUT */}
            <div className="input--container">
                <label 
                    className="label--text"
                    htmlFor="auth--email"
                >
                Email
                </label>

                <input 
                    required
                    autoComplete="currentUserName"
                    onChange={e => handleChange(e)}
                    id="auth--email" 
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
                    onChange={e => handleChange(e)}
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
            
        </form>
    )
}

export default LogIn