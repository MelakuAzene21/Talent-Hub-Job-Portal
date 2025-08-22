import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "auth",
  initialState: { user: null as any, token: localStorage.getItem("token") },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      localStorage.setItem("token", payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null as any;
      localStorage.removeItem("token");
    },
  },
});
export const { setCredentials, logout } = slice.actions;
export default slice.reducer;
