import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  email: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  username: localStorage.getItem("username"),
  email: localStorage.getItem("email"),
  isLoggedIn: !!localStorage.getItem("username"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<{ username: string; email: string }>) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isLoggedIn = true;

      localStorage.setItem("username", state.username!);
      localStorage.setItem("email", state.email!);
    },
    logoutUser: (state) => {
      state.username = null;
      state.email = null;
      state.isLoggedIn = false;

      localStorage.removeItem("username");
      localStorage.removeItem("email");
    },
  },
});

export const { registerUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
