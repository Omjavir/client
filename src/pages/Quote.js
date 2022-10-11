import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import jwt from 'jsonwebtoken'

const Quote = () => {

  const [quote, setQuote] = useState('')
  const [tempQuote, setTempQuote] = useState('')
  let navigate = useNavigate();

  async function getQuote() {
    try {
      const req = await fetch('http://localhost:5000/quote/getquote', {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      })
      const data = await req.json()
      console.log("Data :", data);
      if (data.Success === true) {
        setQuote(data.quote)
      } else {
        alert(data.error)
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateQuote(e) {
    e.preventDefault()
    const req = await fetch('http://localhost:5000/quote/setquote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    })
    const data = await req.json()
    console.log(data);
    if (data.Success === true) {
      setQuote(tempQuote)
      setTempQuote('')
    } else {
      alert(data.error)
    }
  }

  useEffect(() => {
    getQuote()
  }, [])

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (

    <div>
      <h1>Your quote: {quote || 'No quote found'}</h1>
      <form onSubmit={updateQuote}>
        <input
          type="text"
          placeholder="Quote"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <input type="submit" value="Update quote" />
      </form>
      <br />
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Quote