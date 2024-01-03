import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { TextField, IconButton, InputAdornment, Box, Container } from "@mui/material"

// import usersSlice from "../slices/usersSlice"

const UserDetails = () => {
  const { id } = useParams()
  const [user, setUser] = useState({
    _id: "",
    name: "",
    username: "",
    email: "",
    isAdmin: false,
    createdAt: "",
    updatedAt: "",
    avatar: "",
    address: "",
  })
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    setLoading(true)
    const token = sessionStorage.getItem("token")
    if (!token) {
      console.error("No token found")
      setLoading(false)
      return
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}users?_id=${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      if (!response.ok) throw new Error(`Error fetching user: ${response.status}`)

      const data = await response.json()
      if (data.length === 0) {
        throw new Error("User not found")
      }
      setUser(data[0])
    } catch (error) {
      console.error("Fetch user error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchUser()
  }, [id])

  if (loading) return <div>Loading...</div>
  // if (!user) return <div>No user found</div>

  return (
    <Container style={{ paddingTop: "3rem" }}>
      {id && (
        <>
          <img src={user.avatar} alt="user avatar" style={{ height: "30vh" }} />
          <h1>{user.name}</h1>
          <h1>{user.username}</h1>
          <p>{user.email}</p>
          <p>Is this an admin user? :{user.isAdmin}</p>
          <p>{user.address}</p>
        </>
      )}
    </Container>
  )
}

export default UserDetails
