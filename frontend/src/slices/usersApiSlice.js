import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";
const ADMIN_URL ="/api/admin";
console.log("UUUU", USERS_URL);

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
        body: data,
      }),
    }),
    resgisterUserFromAdmin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/resgisterUserFromAdmin`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useResgisterUserFromAdminMutation
} = userApiSlice;
