import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000"|| "https://talent-hub-job-portal-4.onrender.com",
    prepareHeaders: (headers, { getState }: any) => {
      const token = (getState() as any).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Jobs", "Applications", "Me", "SavedJobs", "Notifications"],
  endpoints: () => ({}),
});
