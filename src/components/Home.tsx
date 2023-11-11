import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Grid,
  IconButton,
  TextField,
  Dialog,
  Button,
  Alert,
  InputAdornment,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material/"
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
  const [currentPage, setCurrentPage] = useState(1)
  const [errorMessage, setErrorMessage] = useState("")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [selectedUserId, setSelectedUserId] = useState(0)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  const resetModalStates = () => {
    setFirstName("")
    setLastName("")
    setEmail("")
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${currentPage}&per_page=6`, {
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
      setErrorMessage(error instanceof Error ? error.message : "Failed to fetch users")
    }
  }

  const handleWindowClose = (event: BeforeUnloadEvent) => {
    dispatch(removeToken(""))
    dispatch(logOut(false))
  }

  useEffect(() => {
    fetchUsers()
  }, [currentPage])

  useEffect(() => {
    window.addEventListener("beforeunload", handleWindowClose)

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose)
    }
  }, [])

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users)
      setErrorMessage("")
      return
    }

    const matchedUsers = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (matchedUsers.length === 0) {
      setErrorMessage("No users found")
    } else {
      setErrorMessage("")
    }
    setFilteredUsers(matchedUsers)
  }

  const editUser = async () => {
    try {
      // console.log("Edit user with ID:", selectedUserId)
      const response = await fetch(`https://reqres.in/api/users/${selectedUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email: email }),
      })

      if (response.ok) {
        // const data = await response.json()
        // console.log(data)
        fetchUsers()
        setIsEditModalOpen(false)
        resetModalStates()
      }
    } catch (error) {
      console.error("Error editing user:", error)
    }
  }

  const handleDeleteUser = async (userId: number) => {
    try {
      console.log("Delete user with ID:", userId)
      const response = await fetch(`https://reqres.in/api/users/${userId}`, {
        method: "DELETE",
      })
      if (response.ok) {
        console.log("User deleted successfully")
        fetchUsers()
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
                    <IconButton
                      onClick={() => {
                        setSelectedUserId(user.id)
                        setFirstName(user.first_name)
                        setLastName(user.last_name)
                        setEmail(user.email)
                        setIsEditModalOpen(true)
                      }}
                    >
                      <EditIcon color="secondary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </div>
                </Card>
              </Grid>
            ))}
            {filteredUsers.length === 0 && <Alert severity="error">No users found</Alert>}
          </Grid>

          {/* Pagination buttons */}
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage >= totalPages}>
            Next
          </Button>

          {/* move this modal to a separate component and manage it with redux */}
          <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
              {/* Text Fields for User Data */}
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                margin="dense"
                id="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {/* Add more fields as needed */}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsEditModalOpen(false)} color="error">
                Cancel
              </Button>
              <Button onClick={editUser}>Save</Button>
            </DialogActions>
          </Dialog>
        </Container>
      ) : (
        // if you you dont have an access token. this should never happen
        <>
          <Alert severity="error">you need to be logged</Alert> <Button onClick={() => navigate("/login")}>Back</Button>
        </>
      )}
    </>
  )
}

export default Home
