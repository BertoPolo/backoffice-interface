import React, { FormEventHandler, useState } from "react"
import { Container, TextField, Button, Typography, Paper, Alert } from "@mui/material"
import { IFormData } from "@/types"

const Register = () => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    email: "",
    password: "",
  })
  // confirmPassword: "",

  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Handle form submit
  const registration: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (formData.password === confirmPassword)
      try {
        setSuccess("Registration successful!")
      } catch (error) {
        console.error("Registration error:", error)
        setError("Failed to register. Please try again.")
      }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} style={{ padding: 16 }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
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
          {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          /> */}
          <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 24 }}>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Register
