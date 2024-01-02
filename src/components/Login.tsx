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
    <>
      {isMobile ? (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", height: adjustedHeight, width: "100vw" }}>
            <Box className="login-blank-container" sx={{ height: "100%" }}>
              <LoginForm />
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", height: adjustedHeight, width: "100vw" }}>
            {/* left part, blank container */}
            <Box className="login-blank-container" sx={{ width: "50%", height: adjustedHeight }}></Box>

            {/* Right part, login containter */}
            <Box
              className="login-form-container"
              sx={{ width: "50%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <LoginForm />
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default LoginPage
