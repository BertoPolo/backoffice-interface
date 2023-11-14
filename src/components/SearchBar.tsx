import React from "react"
import { TextField, IconButton, InputAdornment, Box } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  handleSearch: () => void
}
const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <TextField
        placeholder="Search Users"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearch} edge="start" onKeyDown={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearchTerm("")}>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch()
          }
        }}
        sx={(theme) => ({
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px", // Rounded corners
            backgroundColor: theme.palette.mode === "dark" ? "#21384a" : "#ededee",
            "& fieldset": {
              borderWidth: "0", // Removes border
            },
            "&:hover fieldset": {
              borderWidth: "0", // Removes border on hover
            },
            "&.Mui-focused fieldset": {
              borderWidth: "0", // Removes border on focus
            },
          },
          my: "2rem",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 3px 6px rgba(0, 0, 0, 0.16)" // Shadow for dark mode
              : "0px 3px 6px rgba(0, 0, 0, 0.1)", // Lighter shadow for light mode
        })}
      />
    </Box>
  )
}

export default SearchBar
