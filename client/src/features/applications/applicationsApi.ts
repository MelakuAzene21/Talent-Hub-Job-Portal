import { api } from "../../app/api";

export const applicationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    apply: builder.mutation<any, FormData>({
      query: (form) => ({ url: "/applications", method: "POST", body: form }),
    }),
    createApplication: builder.mutation<any, any>({
      query: (data) => ({ url: "/applications/create", method: "POST", body: data }),
      invalidatesTags: ["Applications"],
    }),
    myApplications: builder.query<any[], string>({
      query: (userId) => ({ url: `/applications/${userId}` }),
      providesTags: ["Applications"],
    }),
    adminStats: builder.query<any, void>({
      query: () => ({ url: "/applications/admin/stats/all" }),
    }),
    getApplicantsForJob: builder.query<any[], string>({
      query: (jobId) => `/applications/job/${jobId}`,
    }),
    getAdminDashboard: builder.query<any, void>({
      query: () => "/applications/admin/dashboard",
    }),
    updateStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/applications/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Applications"],
    }),
    // Saved jobs functionality
    saveJob: builder.mutation<any, { jobId: string; applicantId: string }>({
      query: (data) => ({ url: "/saved-jobs", method: "POST", body: data }),
      invalidatesTags: ["SavedJobs"],
    }),
    unsaveJob: builder.mutation<any, { jobId: string; applicantId: string }>({
      query: ({ jobId, applicantId }) => ({ 
        url: `/saved-jobs/${jobId}/${applicantId}`, 
        method: "DELETE" 
      }),
      invalidatesTags: ["SavedJobs"],
    }),
    getSavedJobs: builder.query<any[], string>({
      query: (applicantId) => `/saved-jobs/${applicantId}`,
      providesTags: ["SavedJobs"],
    }),
  }),
});

export const { 
  useApplyMutation, 
  useCreateApplicationMutation,
  useMyApplicationsQuery, 
  useAdminStatsQuery,
  useGetAdminDashboardQuery, 
  useGetApplicantsForJobQuery, 
  useUpdateStatusMutation,
  useSaveJobMutation,
  useUnsaveJobMutation,
  useGetSavedJobsQuery
} = applicationsApi;
