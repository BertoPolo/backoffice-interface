import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  IconButton,
  TextField,
  Dialog,
  Button,
  Alert,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material/"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

import { IUser, loginState } from "@/types"
import { removeToken } from "../slices/loginSlice"
import SearchBar from "./SearchBar"

const Home = () => {
  const token = useSelector((state: loginState) => state.loginSlice.token)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [users, setUsers] = useState<IUser[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([])
  const [totalPages, setTotalPages] = useState(0) // Total number pages you can retrieve from API in this search
  const [currentPage, setCurrentPage] = useState(1)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [selectedUserId, setSelectedUserId] = useState(0)

  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  const [isActive, setIsActive] = useState(false)

  const resetModalStates = () => {
    setName("")
    setLastName("")
    setEmail("")
  }

  const fetchUsers = async () => {
    try {
      // const response = await fetch(`https://reqres.in/api/users?page=${currentPage}&per_page=6`, {
      const response = await fetch(`${process.env.REACT_APP_SERVER}users`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      setUsers(data)
      setFilteredUsers(data)
      // setTotalPages(data.total_pages)
    } catch (error) {
      console.error("Error fetching users: ", error)
    }
  }

  const handleWindowClose = (event: BeforeUnloadEvent) => {
    dispatch(removeToken(""))
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users)
      return
    }

    // search users and set'em to FilteredUsers
    const matchedUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(matchedUsers)
  }

  const editUser = async () => {
    try {
      console.log("Edit user with ID:", selectedUserId)
      const response = await fetch(`${process.env.REACT_APP_SERVER}users/${selectedUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ name: name, lastname: lastName, email: email }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data)
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
      const response = await fetch(`${process.env.REACT_APP_SERVER}users/${userId}`, {
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

  function triggerFadeInAnimation() {
    const elements = document.querySelectorAll(".fade-in")
    elements.forEach((element) => {
      const htmlElement = element as HTMLElement
      htmlElement.classList.remove("active")

      void htmlElement.offsetWidth

      htmlElement.classList.add("active")
    })
  }

  useEffect(() => {
    fetchUsers()
    triggerFadeInAnimation()
  }, [currentPage])

  useEffect(() => {
    // window.addEventListener("beforeunload", handleWindowClose)
    setIsActive(true)

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose)
    }
  }, [])

  return (
    <>
      {token ? (
        <Container maxWidth="md">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />

          {/* move this grid to a separate component */}
          <Grid container spacing={4} className="fade-in">
            {filteredUsers &&
              filteredUsers.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <Card
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minHeight: "300px",
                      maxHeight: "300px",
                      justifyContent: "space-between",
                    }}
                    elevation={5}
                    className={`fade-in ${isActive ? "active" : ""}`}
                    sx={(theme) => ({
                      bgcolor: theme.palette.mode === "dark" ? "#0a0c1e" : "#c4c5df",
                    })}
                  >
                    {/* <CardMedia component="img" height="140" image={user.avatar} alt={`${user.name} ${user.lastname}`} /> */}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {user.name}
                        {/* {user.lastname} */}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <span className="mail"> {user.email}</span>
                      </Typography>
                    </CardContent>
                    <div>
                      <IconButton
                        onClick={() => {
                          setSelectedUserId(user.id)
                          setName(user.name)
                          // setLastName(user.lastname)
                          setEmail(user.email)
                          setIsEditModalOpen(true)
                        }}
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this user? ")) handleDeleteUser(user.id)
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </div>
                  </Card>
                </Grid>
              ))}
            {filteredUsers && <Alert severity="error">No users found</Alert>}
            {/* && filteredUsers.length === 0 */}
          </Grid>

          {/* Pagination buttons */}
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} sx={{ mt: "1.2rem", mb: "1.5rem" }}>
            Previous
          </Button>
          <Button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage >= totalPages} sx={{ mt: "1.2rem", mb: "1.5rem" }}>
            Next
          </Button>

          {/* move this modal to a separate component*/}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
