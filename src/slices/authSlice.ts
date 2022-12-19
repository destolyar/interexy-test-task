import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../types/User";

const sessionStorageUser = sessionStorage.getItem("user")

export interface AuthState {
  authorizedUser: UserInterface | null
}

const initialState: AuthState = {
  authorizedUser: sessionStorageUser ? JSON.parse(sessionStorageUser) : null
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.authorizedUser = action.payload
      sessionStorage.setItem("user", JSON.stringify(action.payload))
    },
    rememberUserLogIn: (state, action) => {
      sessionStorage.setItem("user", JSON.stringify(action.payload))
      state.authorizedUser = action.payload
    },
    logIn: (state, action) => {
      state.authorizedUser = action.payload
    },
    logOut: state => {
      sessionStorage.removeItem("user")
      state.authorizedUser = null
    }
  }
})

export const { updateUser, rememberUserLogIn, logIn, logOut } = authSlice.actions

export default authSlice.reducer