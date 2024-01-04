// import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AppBar, Box, Toolbar, Button, Typography, IconButton } from "@mui/material/"
import { NavbarProps } from "@/types"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const token: any = sessionStorage.getItem("token")

  // const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleScroll = () => {
    const currentScrollY = window.scrollY

    if (currentScrollY <= 0) {
      // At the top of the page
      setShowNavbar(true)
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up
      setShowNavbar(true)
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down
      setShowNavbar(false)
    }

    setLastScrollY(currentScrollY) // Update the last scroll position
  }

  useEffect(() => {
    if (isMobile) {
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    } else {
      // Ensure navbar is shown on non-mobile screens
      setShowNavbar(true)
    }
  }, [isMobile, lastScrollY])

  return (
    <Box sx={{ flexGrow: 1 }} id="navbar">
      <AppBar sx={{ bgcolor: "background.paper" }} position="fixed" style={{ display: showNavbar ? "flex" : "none", top: 0 }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="secondary" aria-label="menu" sx={{ mr: 2 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64">
              <path fill="#9450e0" d="M41 4H23L2 20.1L32 60l30-39.9z" />
              <path fill="#c28fef" d="m32 60l12.5-39.9H18.8zM9.5 9.5L2 20.1h16.8L23 4zm45 0L41 4l3.5 16.1H62z" />
            </svg>
          </IconButton>
          {/* do not display when you are at /login */}
          <Typography className="pointer" variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate("/users")}>
            Home
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
