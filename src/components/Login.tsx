import React, { useState, SyntheticEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Button, TextField, Container, Box, Snackbar } from "@mui/material/"
import MuiAlert from "@mui/material/Alert"
import { addToken } from "../slices/loginSlice"
import { useSelector, useDispatch } from "react-redux"
import { loginState } from "@/types"

const LoginPage = () => {
  const token = useSelector((state: loginState) => state.loginSlice.token)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false)

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
        setError("Your credentials are not okay")
        setOpenSnackbar(true)
        throw new Error("Login failed")
      }
      const data = await response.json()
      dispatch(addToken(data.token))
      navigate("/users")
    } catch (error: any) {
      setError("Login failed: " + error.message)
    }
  }
  const handleCloseSnackbar = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
        <Container maxWidth="xs" className="login-container">
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

          <Box textAlign="center" sx={{ width: "100%", mt: "3.5rem", mb: "0.6rem" }}>
            <Button variant="contained" color="primary" onClick={handleLogin} sx={{ width: "40%" }}>
              Login
            </Button>
          </Box>

          <Box textAlign="center" sx={{ width: "100%" }}>
            <Button variant="contained" color="warning" onClick={() => navigate("/register")} sx={{ width: "40%" }}>
              First time here?
            </Button>
          </Box>
        </Container>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Container maxWidth="xs">
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
              Your credentials are not okay
            </MuiAlert>
          </Snackbar>
        </Container>
      </Box>
    </>
  )
}

export default LoginPage
