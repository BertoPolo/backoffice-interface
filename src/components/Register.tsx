import React, { FormEventHandler, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, TextField, Button, Typography, Paper, Alert, Box } from "@mui/material"
import { IFormData } from "@/types"
import { useDispatch } from "react-redux"
import { addToken } from "../slices/loginSlice"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState<IFormData>({
    name: "",
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
        const response = await fetch(`${process.env.REACT_APP_SERVER}users/createbackofficeuser`, {
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
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        paddingTop: "5rem",
      }}
    >
      <Paper elevation={6} style={{ padding: 16, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "70vw" }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={registration}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            label="Name"
            name="Name"
            value={formData.name}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-input": {
                padding: "10px 14px",
              },
              "& .MuiInputLabel-root": {
                transform: "translate(14px, 10px) scale(1)",
              },
              "& .MuiInputLabel-shrink": {
                transform: "translate(14px, -6px) scale(0.75)",
              },
              width: "100%",
              mx: "auto",
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-input": {
                padding: "10px 14px",
              },
              "& .MuiInputLabel-root": {
                transform: "translate(14px, 10px) scale(1)",
              },
              "& .MuiInputLabel-shrink": {
                transform: "translate(14px, -6px) scale(0.75)",
              },
              width: "100%",
              mx: "auto",
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-input": {
                padding: "10px 14px",
              },
              "& .MuiInputLabel-root": {
                transform: "translate(14px, 10px) scale(1)",
              },
              "& .MuiInputLabel-shrink": {
                transform: "translate(14px, -6px) scale(0.75)",
              },
              width: "100%",
              mx: "auto",
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-input": {
                padding: "10px 14px",
              },
              "& .MuiInputLabel-root": {
                transform: "translate(14px, 10px) scale(1)",
              },
              "& .MuiInputLabel-shrink": {
                transform: "translate(14px, -6px) scale(0.75)",
              },
              width: "100%",
              mx: "auto",
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-input": {
                padding: "10px 14px",
              },
              "& .MuiInputLabel-root": {
                transform: "translate(14px, 10px) scale(1)",
              },
              "& .MuiInputLabel-shrink": {
                transform: "translate(14px, -6px) scale(0.75)",
              },
              width: "100%",
              mx: "auto",
            }}
          />
          <Box textAlign="center" sx={{ width: "100%" }}>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: 24, width: "40%" }}>
              Register
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default Register
