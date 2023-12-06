import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import usersSlice from "../slices/usersSlice"

const UserDetails = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        // const response = await fetch(`https://reqres.in/api/users/${id}`)
        // if (!response.ok) throw new Error("User not found")
        // const data = await response.json()
        // setUser(data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchUser()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!user) return <div>No user found</div>

  return (
    <>
      <h1>{/* {user.avatar} {user.first_name} {user.last_name} */}</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, consectetur. Dignissimos aut eveniet veniam quaerat fugiat dolores labore
        exercitationem quisquam adipisci aspernatur quo nemo doloribus, assumenda molestias amet animi non.
      </p>
    </>
  )
}

export default UserDetails
