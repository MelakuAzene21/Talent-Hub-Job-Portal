import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: { 
    [api.reducerPath]: api.reducer, 
    auth: authReducer 
  },
  middleware: (gDM) => gDM().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store instance
export default store;
