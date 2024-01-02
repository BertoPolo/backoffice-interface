import { useState, useEffect } from "react"

import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import LoginForm from "./LoginForm"

const LoginPage = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [navbarHeight, setNavbarHeight] = useState(0)

  useEffect(() => {
    // Assuming your navbar has a specific class or ID
    const navbar = document.getElementById("navbar")
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight)
    }
  }, [])

  const adjustedHeight = `calc(100vh - ${navbarHeight}px)`
  return (
    <Box
      className={isMobile ? "login-blank-container" : ""}
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        height: adjustedHeight,
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
        ...(isMobile ? {} : { overflow: "hidden" }), // Prevent scroll on larger screens
      }}
    >
      {isMobile ? (
        // Mobile view
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            p: 2,
            boxShadow: 3,
            bgcolor: "background.paper",
            color: "white",
          }}
        >
          <LoginForm />
        </Box>
      ) : (
        // Desktop and larger view
        <>
          <Box
            className="login-blank-container"
            sx={{
              width: "50%",
              height: "100%",
              backgroundSize: "cover",
            }}
          ></Box>
          <Box
            className="login-form-container"
            sx={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}
          >
            <LoginForm />
          </Box>
        </>
      )}
    </Box>
  )
}

export default LoginPage
