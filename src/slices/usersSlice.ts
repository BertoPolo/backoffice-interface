import { createSlice } from "@reduxjs/toolkit"

const usersSlice = createSlice({
  name: "users",
  initialState: {
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  },
  reducers: {
    addId: (state, action) => {
      return {
        ...state,
        id: action.payload,
      }
    },

    addEmail: (state, action) => {
      return {
        ...state,
        email: action.payload,
      }
    },

    addFirstName: (state, action) => {
      return {
        ...state,
        first_name: action.payload,
      }
    },

    addLastName: (state, action) => {
      return {
        ...state,
        last_name: action.payload,
      }
    },

    addAvatar: (state, action) => {
      return {
        ...state,
        avatar: action.payload,
      }
    },
  },
})

export default usersSlice.reducer
export const { addId, addEmail, addFirstName, addLastName, addAvatar } = usersSlice.actions
