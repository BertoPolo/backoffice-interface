import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, TextField, Container } from "@mui/material/"
import { addToken } from "../slices/loginSlice"
import { useSelector, useDispatch } from "react-redux"
import { IUser, tokenState } from "@/types"

const LoginPage = () => {
  const token = useSelector((state: tokenState) => state.loginSlice.token)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }
      const data = await response.json()
      dispatch(addToken(data.token))

      navigate("/users")
    } catch (error: any) {
      setError("Login failed: " + error.message)
    }
  }

  return (
    <Container maxWidth="xs">
      <TextField label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
        Login
      </Button>
      {error && <div>{error}</div>}
    </Container>
  )
}

export default LoginPage
