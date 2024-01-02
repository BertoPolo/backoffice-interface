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
    <Container style={{ paddingTop: "80px" }}>
      {id && (
        <h1>
          {user.avatar} {user.name}
        </h1>
      )}
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, consectetur. Dignissimos aut eveniet veniam quaerat fugiat dolores labore
        exercitationem quisquam adipisci aspernatur quo nemo doloribus, assumenda molestias amet animi non.
      </p>
    </Container>
  )
}

export default UserDetails
