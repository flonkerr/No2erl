import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loggedIn: boolean;
}

const savedUser = localStorage.getItem("user");

const initialState: AuthState = savedUser
  ? { user: JSON.parse(savedUser), loggedIn: true }
  : { user: null, loggedIn: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    login(state, action: PayloadAction<{ email: string }>) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        if (parsedUser.email === action.payload.email) {
          state.user = parsedUser;
          state.loggedIn = true;
        }
      }
    },
    logout(state) {
      state.user = null;
      state.loggedIn = false;
      localStorage.removeItem("user");
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
