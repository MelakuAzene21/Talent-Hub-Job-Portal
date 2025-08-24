import { api } from "../../app/api";

export const notificationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get user notifications
    getUserNotifications: builder.query<any, { page?: number; limit?: number; unreadOnly?: boolean }>({
      query: (params) => ({
        url: "/notifications",
        params,
      }),
      providesTags: ["Notifications"],
    }),

    // Get notification count
    getNotificationCount: builder.query<any, void>({
      query: () => "/notifications/count",
      providesTags: ["Notifications"],
    }),

    // Mark notification as read
    markNotificationAsRead: builder.mutation<any, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),

    // Mark all notifications as read
    markAllNotificationsAsRead: builder.mutation<any, void>({
      query: () => ({
        url: "/notifications/read-all",
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),

    // Delete notification
    deleteNotification: builder.mutation<any, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetUserNotificationsQuery,
  useGetNotificationCountQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteNotificationMutation,
} = notificationsApi;
