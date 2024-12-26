import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuth: boolean;
  isAdmin: boolean;
  username: string;
}

const initialState: AuthState = {
  isAuth: false,
  isAdmin: false,
  username: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isAuthenticated: (state, action: PayloadAction<string>) => {
      state.isAuth = true;
      state.username = action.payload;
    },
    isNotAuthenticated: (state) => {
      state.isAuth = false;
      state.username = "";
    },
    isAdmin: (state) => {
      state.isAdmin = true;
    },
    notAdmin: (state) => {
      state.isAdmin = false;
    },
  },
});

export const { isAuthenticated, isNotAuthenticated, isAdmin, notAdmin } =
  authSlice.actions;

export default authSlice.reducer;
