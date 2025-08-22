import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: "employer" | "applicant" | "admin";
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
      // Set cookie instead of localStorage
      document.cookie = `token=${payload.token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
      document.cookie = `user=${JSON.stringify(payload.user)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Remove cookies
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    },
    initializeAuth: (state) => {
      // Check for existing cookies on app initialization
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split('=');
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
      
      if (cookies.token && cookies.user) {
        try {
          state.token = cookies.token;
          state.user = JSON.parse(cookies.user);
          state.isAuthenticated = true;
        } catch (error) {
          // Invalid cookie data, clear them
          document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
      }
    },
  },
});

export const { setCredentials, logout, initializeAuth } = slice.actions;
export default slice.reducer;
