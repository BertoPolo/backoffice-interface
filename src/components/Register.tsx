import React, { FormEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, TextField, Button, Typography, Paper, Alert } from "@mui/material"
import { IFormData, loginState } from "@/types"
import { useSelector, useDispatch } from "react-redux"
import { addToken } from "../slices/loginSlice"

const Register = () => {
  const navigate = useNavigate()
  const token = useSelector((state: loginState) => state.loginSlice.token)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState<IFormData>({
    username: "",
    email: "",
    password: "",
  })
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")

  // modify input before being sent to the server
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // form submit
  const registration: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (formData.password === confirmPassword) {
      try {
        const response = await fetch("https://reqres.in/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        } else {
          const data = await response.json()
          dispatch(addToken(data.token))
          navigate("/users")
        }
      } catch (error) {
        console.error("Registration error:", error)
        setErrorMessage("Failed to register. Please try again.")
      }
    } else setErrorMessage("Check your password, seems it doesn't match with the confirmation one")
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ padding: 16 }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={registration}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 24 }}>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Register
