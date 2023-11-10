import React, { useState, useEffect } from "react"
import { Container, Card, CardContent, Typography, CardMedia, TextField, Button, Alert } from "@mui/material/"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
// import { addId, addEmail, addFirstName, addLastName, addAvatar } from "../slices/usersSlice"
import { IUser, tokenState } from "@/types"
import { removeToken } from "../slices/loginSlice"

const Home = () => {
  const token = useSelector((state: tokenState) => state.loginSlice.token)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [users, setUsers] = useState<IUser[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([])
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
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch users")
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [page])

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

  return (
    <>
      {/* {isError && <Alert severity="error">This is an error alert — check it out!</Alert>} */}

      {token ? (
        <Container maxWidth="md">
          <Button variant="contained" color="primary" onClick={() => dispatch(removeToken)}>
            log out
          </Button>

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

          {error && <Alert severity="error">{error}</Alert>}

          {/* Users list */}
          {filteredUsers.map((user: any) => (
            <Card key={user.id} style={{ margin: "10px 0" }}>
              <CardMedia component="img" height="140" image={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          ))}

          {/* Pagination buttons */}
          <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
            Previous
          </Button>
          <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
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
