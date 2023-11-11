import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Container, Card, CardContent, Typography, CardMedia, Box, Grid, IconButton, TextField, Button, Alert, InputAdornment } from "@mui/material/"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import SearchIcon from "@mui/icons-material/Search"
// import { addId, addEmail, addFirstName, addLastName, addAvatar } from "../slices/usersSlice"
import { IUser, loginState } from "@/types"
import { removeToken, logOut } from "../slices/loginSlice"

const Home = () => {
  const token = useSelector((state: loginState) => state.loginSlice.token)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [users, setUsers] = useState<IUser[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([])
  const [totalPages, setTotalPages] = useState(0) // Total number pages you can retrieve from API in this search
  const [page, setPage] = useState(1) //current page
  const [error, setError] = useState("")

  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}&per_page=6`, {
        headers: { token: token },
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      setUsers(data.data)
      setFilteredUsers(data.data)
      setTotalPages(data.total_pages)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch users")
    }
  }

  const handleWindowClose = (event: BeforeUnloadEvent) => {
    // change ANY type
    dispatch(removeToken(""))
    dispatch(logOut(false))
  }

  useEffect(() => {
    fetchUsers()
  }, [page])

  useEffect(() => {
    window.addEventListener("beforeunload", handleWindowClose)

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose)
    }
  }, [])

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users)
      setError("")
      return
    }

    const matchedUsers = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (matchedUsers.length === 0) {
      setError("No users found")
    } else {
      setError("")
    }
    setFilteredUsers(matchedUsers)
  }

  const handleEditUser = async (userId: number) => {
    try {
      console.log("Edit user with ID:", userId)
      const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify("updatedUserData"), // change this for the new input.
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error("Error editing user:", error)
    }
  }

  //check
  const handleDeleteUser = async (userId: number) => {
    try {
      console.log("Delete user with ID:", userId)
      const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: "DELETE",
      })
      if (response.ok) {
        console.log("User deleted successfully")
      } else {
        console.error("Failed to delete user")
      }
    } catch (error) {
      console.error("Error deleting user:", error)
    }
  }

  return (
    <>
      {token ? (
        <Container maxWidth="md" sx={{ bgcolor: "background.default" }}>
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
                style: {
                  borderRadius: "20px", // Rounded corners
                },
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
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
              }}
            />
          </Box>

          <Grid container spacing={2}>
            {filteredUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <CardMedia component="img" height="140" image={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </CardContent>
                  <div>
                    <IconButton onClick={() => handleEditUser(user.id)}>
                      <EditIcon color="secondary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </div>
                </Card>
              </Grid>
            ))}
            {filteredUsers.length === 0 && <Alert severity="error">no users found</Alert>}
          </Grid>

          {/* Pagination buttons */}
          <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
            Previous
          </Button>
          <Button onClick={() => setPage((prev) => prev + 1)} disabled={page >= totalPages}>
            Next
          </Button>
        </Container>
      ) : (
        // if you you dont have an access token
        <>
          <Alert severity="error">you need to be logged</Alert> <Button onClick={() => navigate("/login")}>Back</Button>
        </>
      )}
    </>
  )
}

export default Home
