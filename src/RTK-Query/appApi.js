import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../config";
import { getToken } from "../utils";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("x-access-token", token);
      // headers.set('content-type', 'multipart/form-data');
      // headers.set("Content-type", "application/json");
    }
    return headers;
  },
});

export const appAPi = createApi({
  reducerPath: "appApi",
  baseQuery,
  tagTypes: [
    "Birthdays",
    "Holidays",
    "Leaves",
    "Login",
    "Users",
    "User",
    "Document",
  ],
  endpoints: (builder) => ({
    // Server Time
    getServerTime: builder.query({
      query: () => "/dateTime",
    }),
    // birthdays
    getBirthdays: builder.query({
      query: () => `/dashboard/birthdays`,
      providesTags: ["Birthdays"],
    }),

    // holidays
    getHolidays: builder.query({
      query: () => `/holiday/get`,
      providesTags: ["Holidays"],
    }),

    geUpcomingtHolidays: builder.query({
      query: () => `/holiday/upcoming`,
      providesTags: ["Holidays"],
    }),

    addHoliday: builder.mutation({
      query: (body) => ({
        url: "/holiday/add",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Holidays"],
    }),

    updateHoliday: builder.mutation({
      query: ({ holiday_id, ...body }) => ({
        url: `/holiday/edit/${holiday_id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Holidays"],
    }),

    deleteHoliday: builder.mutation({
      query: (id) => ({
        url: `/holiday/delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Holidays"],
    }),

    //leave
    getLeaves: builder.query({
      query: (id) => `/dashboard/leaves/${id}`,
      providesTags: ["Leaves"],
    }),

    getCurrentLastLeaves: builder.query({
      query: () => `/leave/next-days-leave`,
      providesTags: ["Leaves"],
    }),
    getUsers: builder.query({
      query: () => "user/all",
      providesTags: ["Users"],
    }),
    deleteLeave: builder.mutation({
      query: (id) => ({
        url: `/leave/delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Leaves"],
    }),

    updateLeave: builder.mutation({
      query: ({ leave_id, ...body }) => ({
        url: `/leave/edit/${leave_id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Leaves"],
    }),
    adminFilterLeaves: builder.mutation({
      query: (body) => {
        return {
          url: "/leave/filterAdmin",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Leaves"],
    }),

    // Login Authentication
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Login"],
    }),

    // Logout User
    logoutUser: builder.mutation({
      query: (userId) => ({
        url: "/user/logout",
        method: "POST",
        body: userId,
      }),
    }),

    // UserList Or Search
    getUsersList: builder.query({
      query: (searchKeyword) => {
        const { search_by_name, search_by_role } = searchKeyword;
        return {
          url: `/user/all`,
          method: "GET",
          params: { search_by_name, search_by_role },
        };
      },
      providesTags: ["Users"],
    }),

    // Delete User
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
    addLeave: builder.mutation({
      query: (body) => ({
        url: "/leave/add",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Leaves"],
    }),

    //user-profile
    getSingleUser: builder.query({
      query: (id) => `/user/get/${id}`,
      providesTags: ["User"],
    }),
    updateSingleUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/user/update/${id}`,
        method: "PATCH",
        body: body.values,
      }),
      invalidatesTags: ["User"],
    }),
    uploadProfilePic: builder.mutation({
      query: ({ ...body }) => ({
        url: `/user/profile`,
        method: "POST",
        body: body.formData,
      }),
      invalidatesTags: ["User"],
    }),
    uploadDocument: builder.mutation({
      query: ({ ...body }) => ({
        url: `/document/upload`,
        method: "POST",
        body: body.formData,
      }),
      invalidatesTags: ["Document"],
    }),
    deleteDocument: builder.mutation({
      query: ({ ...body }) => ({
        url: `/document/delete`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Document"],
    }),
    getDocument: builder.query({
      query: (id) => `/document/get/${id}`,
      providesTags: ["Document"],
    }),
  }),
});
export const {
  useGetBirthdaysQuery,
  useLoginUserMutation,
  useGetLeavesQuery,
  useAddLeaveMutation,
  useGetCurrentLastLeavesQuery,
  useDeleteLeaveMutation,
  useUpdateLeaveMutation,
  useGetUsersListQuery,
  useDeleteUserMutation,
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
  useUploadProfilePicMutation,
  useGetHolidaysQuery,
  useGeUpcomingtHolidaysQuery,
  useAddHolidayMutation,
  useUpdateHolidayMutation,
  useDeleteHolidayMutation,
  useLogoutUserMutation,
  useAdminFilterLeavesMutation,
  useUploadDocumentMutation,
  useGetDocumentQuery,
  useDeleteDocumentMutation,
  useGetUsersQuery,
  useGetServerTimeQuery,
} = appAPi;
