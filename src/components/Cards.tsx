import { Card, CardContent, Typography, CardMedia, Grid, IconButton, Button, Alert } from "@mui/material/"

// const Cards = ({ filteredUsers }) => {
const Cards = () => {
  //   function triggerFadeInAnimation() {
  //     const elements = document.querySelectorAll(".fade-in")
  //     elements.forEach((element) => {
  //       element.classList.remove("active")

  //       void element.offsetWidth

  //       element.classList.add("active")
  //     })
  //   }
  //   useEffect(() => {
  //     triggerFadeInAnimation()
  //   }, [selectedProjectName])

  return (
    <>
      {/* <Grid container spacing={4}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              elevation={5}
              sx={(theme) => ({
                bgcolor: theme.palette.mode === "dark" ? "#0a0c1e" : "#c4c5df",
              })}
            >
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
        {filteredUsers.length === 0 && <Alert severity="error">No users found</Alert>}
      </Grid> */}

      {/* Pagination buttons */}
      {/* <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} sx={{ mt: "1.2rem", mb: "1.5rem" }}>
        Previous
      </Button>
      <Button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage >= totalPages} sx={{ mt: "1.2rem", mb: "1.5rem" }}>
        Next
      </Button> */}
    </>
  )
}

export default Cards
