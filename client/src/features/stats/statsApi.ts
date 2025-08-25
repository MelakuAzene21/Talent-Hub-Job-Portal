import { api } from "../../app/api";

export const statsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPublicStats: builder.query<{ jobsCount: number; usersCount: number }, void>({
      query: () => "/stats/public",
      // Cache for 5 minutes since this data doesn't change frequently
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetPublicStatsQuery } = statsApi;
