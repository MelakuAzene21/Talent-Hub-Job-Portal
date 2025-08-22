import { api } from "../../app/api";

export const jobsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<any[], { q?: string; skills?: string } | void>({
      query: (params) => ({ url: "/jobs", params }),
      providesTags: ["Jobs"],
    }),
    createJob: builder.mutation<
      any,
      { title: string; description: string; skills?: string[] }
    >({
      query: (body) => ({ url: "/jobs", method: "POST", body }),
      invalidatesTags: ["Jobs"],
    }),
    updateJob: builder.mutation<
      any,
      { id: string; title: string; description: string; skills?: string[] }
    >({
      query: ({ id, ...body }) => ({ url: `/jobs/${id}`, method: "PUT", body }),
      invalidatesTags: ["Jobs"],
    }),
    deleteJob: builder.mutation<{ message: string }, string>({
      query: (id) => ({ url: `/jobs/${id}`, method: "DELETE" }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const { 
  useGetJobsQuery, 
  useCreateJobMutation, 
  useUpdateJobMutation,
  useDeleteJobMutation 
} = jobsApi;
