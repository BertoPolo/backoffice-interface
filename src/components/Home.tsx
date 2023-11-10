import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Container, Card, CardContent, Typography, CardMedia, Grid, IconButton, TextField, Button, Alert } from "@mui/material/"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
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
  const [totalUsers, setTotalUsers] = useState(0) // Total number of users retrieved from API
  const [page, setPage] = useState(1)
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
      setTotalUsers(data.total)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch users")
    }
  }

  const isLastPage = page * 6 >= totalUsers

  const handleWindowClose = (event: any) => {
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

  const handleEditUser = (userId: number) => {
    console.log("Edit user with ID:", userId)
    //  edit
  }

  const handleDeleteUser = (userId: number) => {
    console.log("Delete user with ID:", userId)
    //  delete
  }

  return (
    <>
      {token ? (
        <Container maxWidth="md">
          <TextField
            label="Search Users"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>

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
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination buttons */}
          <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
            Previous
          </Button>
          <Button onClick={() => setPage((prev) => prev + 1)} disabled={isLastPage}>
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
