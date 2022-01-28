import apiService from "./api";

export const dashboardApi = () =>{
    const getDashboardHolidays = async() =>{
        try {
            const apiResponse = await apiService.get('/dashboard/holidays');
            return apiResponse.data;
        } catch (error) {
            return error.response.data;
        }
    }
    const getDashboardLeaves = async(id) =>{
        try {
            const apiResponse = await apiService.get(`/dashboard/leaves/${id}`)
            return apiResponse.data;
        } catch (error) {
            return error.response.data;
        }
    }
    const getDashboardBirthdays = async() =>{
        try {
            const apiResponse = await apiService.get('/dashboard/birthdays');
            return apiResponse.data;
        } catch (error) {
            return error.response.data;
        }
    }
    return{
        getDashboardHolidays,
        getDashboardLeaves,
        getDashboardBirthdays,
    }
}


// //===========================  RTK ===============================
// import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../config";
// import { getToken } from "../utils";

// const baseQuery = fetchBaseQuery({
//     baseUrl: BASE_URL,
//     prepareHeaders: (headers) => {
//       const token = getToken();
//       if (token) {
//         headers.set("x-access-token", token);
//         headers.set("Content-type", "application/json");
//       }
//       return headers;
//     },
//   });

// export const dashboardApi = createApi({
//     baseQuery,
//     reducerPath: "dashboardApi",
//     endpoints : (builder) => ({
//         getDashboardLeaves: builder.query({
//             query: (id) => `/dashboard/leaves/${id}`
//         }),
//         getDashboardBirthdays: builder.query({
//             query: (id) => `/dashboard/birthdays`
//         }),
//         getDashboardHolidays: builder.query({
//             query: (id) => `/dashboard/holidays`
//         }),
//     })
// })

// export const { useGetDashboardLeavesQuery , useGetDashboardBirthdaysQuery , useGetDashboardHolidaysQuery } = dashboardApi;
