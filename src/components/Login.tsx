import React, { useState, SyntheticEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Button, TextField, Container, Box, Snackbar } from "@mui/material/"
import MuiAlert from "@mui/material/Alert"
import { addToken } from "../slices/loginSlice"
import { useSelector, useDispatch } from "react-redux"
import { loginState } from "@/types"

const LoginPage = () => {
  const token = useSelector((state: loginState) => state.loginSlice.token)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
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
      <Box sx={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw" }}>
        {/* left part, blank container */}
        <Box className="login-blank-container" sx={{ width: "50%", height: "100%" }}></Box>

        {/* Right part, login containter */}
        <Box className="login-form-container" sx={{ width: "50%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Container maxWidth="xs">
            <TextField label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth margin="normal" />
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
              <Button variant="contained" color="primary" onClick={handleLogin} sx={{ width: "45%" }} disabled={!password || !username}>
                Login
              </Button>
            </Box>

            <Box textAlign="center" sx={{ width: "100%" }}>
              <Button variant="contained" color="warning" onClick={() => navigate("/register")} sx={{ width: "45%" }}>
                First time here?
              </Button>
            </Box>
          </Container>

          {/* in case of error  */}
          <Box display="flex" justifyContent="center" alignItems="center">
            <Container maxWidth="xs">
              <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
                  Your credentials are not okay
                </MuiAlert>
              </Snackbar>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default LoginPage
