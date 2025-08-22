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
  }),
});
export const { useApplyMutation, useMyApplicationsQuery, useAdminStatsQuery } =
  applicationsApi;
