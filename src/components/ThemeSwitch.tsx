import React from "react"
import Switch from "@mui/material/Switch"
import { useTheme } from "@mui/material/styles"
import { IconButton } from "@mui/material"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"

interface ThemeSwitchProps {
  toggleTheme: () => void
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ toggleTheme }) => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === "dark"

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
    >
      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      <Switch checked={isDarkMode} />
    </IconButton>
  )
}

export default ThemeSwitch
