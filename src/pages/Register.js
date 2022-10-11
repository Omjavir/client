import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();
    async function registerUser(e) {
        e.preventDefault()

        const response = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })

        const data = await response.json()
        console.log("Data", data);
        if (data.Success === true) {
            localStorage.setItem('token', JSON.stringify(data.token))
            // window.location.pathname = "/quote"
            navigate('/quote')
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                />
                <br />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <br />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <br />
                <input type="submit" value="Register" />
                <br />
                Already a user ?
                <br />
                <Link to={'/login'}>
                    <button>Login</button>
                </Link>
            </form>
        </div >
    )
}

export default Register