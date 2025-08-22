import { api } from "../../app/api";
export const applicationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    apply: builder.mutation<any, FormData>({
      query: (form) => ({ url: "/applications", method: "POST", body: form }),
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
  }),
});

export const { useApplyMutation, useMyApplicationsQuery, useAdminStatsQuery ,useGetAdminDashboardQuery ,useGetApplicantsForJobQuery ,useUpdateStatusMutation} =
  applicationsApi;
