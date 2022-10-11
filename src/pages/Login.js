import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate();

  async function loginUser(e) {
    e.preventDefault()

    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await response.json()
    console.log(data);

    if (data.Success === true) {
      localStorage.setItem('token', JSON.stringify(data.token))
      alert('Login successful')
      navigate('/quote')
      // window.location.href = '/quote'
    } else {
      alert('Invalid credentials')
    }
  }

  function register(){
    navigate('/')
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
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
        <input type="submit" value="Login" />
        <br />
        New user ?
        <br />
        <input type="submit" value="Register" onClick={register} />
      </form>
    </div>
  )
}

export default Login