// import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppBar, Box, Toolbar, Button, Typography, IconButton } from "@mui/material/"
import { NavbarProps } from "@/types"

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const token: any = sessionStorage.getItem("token")

  // const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }} id="navbar">
      <AppBar position="static" sx={{ bgcolor: "background.paper" }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="secondary" aria-label="menu" sx={{ mr: 2 }} onClick={() => navigate("/users")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64">
              <path fill="#9450e0" d="M41 4H23L2 20.1L32 60l30-39.9z" />
              <path fill="#c28fef" d="m32 60l12.5-39.9H18.8zM9.5 9.5L2 20.1h16.8L23 4zm45 0L41 4l3.5 16.1H62z" />
            </svg>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AlbertoPolo
          </Typography>

          {children}

          {token ? (
            <Button
              color="error"
              size="small"
              variant="outlined"
              sx={{ fontSize: "0.7rem" }}
              onClick={() => {
                sessionStorage.removeItem("token")
                navigate("/")
              }}
            >
              Log Out
            </Button>
          ) : (
            <Button color="success" size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} onClick={() => navigate("/")}>
              log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
