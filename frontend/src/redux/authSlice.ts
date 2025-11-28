import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  username: string;
  token: string;
}

const initialState: AuthState = {
  username: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    logout(state) {
      state.username = "";
      state.token = "";
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
