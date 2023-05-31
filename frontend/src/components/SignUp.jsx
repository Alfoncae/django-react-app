import React from 'react'

function SignUp() {

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
    function handleSubmit() {
        
    }

    return (
        <form onSubmit={handleSubmit} className="login--container">
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
                    onChange={e => handleChange(e)}
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
                    onChange={e => handleChange(e)}
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
                    onChange={e => handleChange(e)}
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
                    onChange={e => handleChange(e)}
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
            
        </form>
    )
}

export default SignUp