import { api } from "../../app/api";

export const statsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPublicStats: builder.query<{ jobsCount: number; usersCount: number }, void>({
      query: () => "/stats/public",
      // Cache for 5 minutes since this data doesn't change frequently
      keepUnusedDataFor: 300,
      // Add error handling
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          console.log('✅ Stats fetched successfully:', result.data);
        } catch (error) {
          console.error('❌ Failed to fetch stats:', error);
        }
      },
    }),
  }),
});

export const { useGetPublicStatsQuery } = statsApi;
