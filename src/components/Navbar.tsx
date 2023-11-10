import React from "react"
import { AppBar, Box, Toolbar, Button, Typography, IconButton } from "@mui/material/"

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64">
              <path fill="#9450e0" d="M41 4H23L2 20.1L32 60l30-39.9z" />
              <path fill="#c28fef" d="m32 60l12.5-39.9H18.8zM9.5 9.5L2 20.1h16.8L23 4zm45 0L41 4l3.5 16.1H62z" />
            </svg>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Log Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
