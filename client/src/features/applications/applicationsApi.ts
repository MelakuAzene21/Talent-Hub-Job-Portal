import { api } from "../../app/api";

export const applicationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    apply: builder.mutation<any, FormData>({
      query: (form) => ({ url: "/applications", method: "POST", body: form }),
    }),
    createApplication: builder.mutation<any, FormData>({
      query: (formData) => ({ 
        url: "/applications/create", 
        method: "POST", 
        body: formData,
        // Don't set Content-Type header for FormData, let the browser set it with boundary
      }),
      invalidatesTags: ["Applications"],
    }),
    myApplications: builder.query<any[], string>({
      query: (userId) => ({ url: `/applications/${userId}` }),
      providesTags: ["Applications"],
    }),
    // Get applicants for a specific job (employer only)
    getApplicantsForJob: builder.query<any[], string>({
      query: (jobId) => `/applications/job/${jobId}`,
      providesTags: ["Applications"],
    }),
    // Get detailed application information
    getApplicationDetails: builder.query<any, string>({
      query: (applicationId) => `/applications/details/${applicationId}`,
      providesTags: ["Applications"],
    }),
    // Get employer's jobs with applicant counts
    getEmployerJobsWithApplicants: builder.query<any[], void>({
      query: () => "/applications/employer/jobs",
      providesTags: ["Applications"],
    }),
    // Update application status
    updateStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/applications/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Applications"],
    }),
    // Delete application
    deleteApplication: builder.mutation<any, string>({
      query: (applicationId) => ({
        url: `/applications/${applicationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Applications"],
    }),
    adminStats: builder.query<any, void>({
      query: () => ({ url: "/applications/admin/stats/all" }),
    }),
    getAdminDashboard: builder.query<any, void>({
      query: () => "/applications/admin/dashboard",
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
    // Check if user has already applied to a specific job
    checkIfApplied: builder.query<boolean, { jobId: string; applicantId: string }>({
      query: ({ jobId, applicantId }) => `/applications/check/${jobId}/${applicantId}`,
      providesTags: ["Applications"],
    }),
  }),
});

export const { 
  useApplyMutation, 
  useCreateApplicationMutation,
  useMyApplicationsQuery, 
  useGetApplicantsForJobQuery,
  useGetApplicationDetailsQuery,
  useGetEmployerJobsWithApplicantsQuery,
  useUpdateStatusMutation,
  useDeleteApplicationMutation,
  useAdminStatsQuery,
  useGetAdminDashboardQuery, 
  useSaveJobMutation,
  useUnsaveJobMutation,
  useGetSavedJobsQuery,
  useCheckIfAppliedQuery
} = applicationsApi;
