import { useState, SyntheticEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Button, TextField, Container, Box, Snackbar } from "@mui/material/"
import MuiAlert from "@mui/material/Alert"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please enter both username and password")
      return
    }

    try {
      const body = {
        username: username.toLocaleLowerCase(),
        password: password,
      }

      const response = await fetch(`${process.env.REACT_APP_SERVER}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        setError("Your credentials are not okay")
        setOpenSnackbar(true)
        throw new Error("Login failed")
      }
      const data = await response.json()
      sessionStorage.setItem("token", data.accessToken)
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
      <Container maxWidth="xs">
        <Box textAlign="center" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth={!isMobile}
            margin="normal"
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth={!isMobile}
            margin="normal"
            // onSubmit={handleLogin}
          />
        </Box>

        <Box textAlign="center" sx={{ width: "100%", mt: "3.5rem", mb: "0.6rem" }}>
          <Button variant="contained" color="primary" onClick={handleLogin} sx={{ width: "45%" }} disabled={!password || !username}>
            Login
          </Button>
        </Box>

        <Box textAlign="center" sx={{ width: "100%" }}>
          <small className="pointer" style={{ color: "#a148ef" }} onClick={() => navigate("/register")}>
            First time here?
          </small>
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
    </>
  )
}

export default LoginForm
