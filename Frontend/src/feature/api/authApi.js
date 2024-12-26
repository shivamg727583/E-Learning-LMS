// authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from '../authSlice';


const URL_API = 'http://localhost:8000/api/v1/user/';



export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL_API,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('token', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: 'register',
        method: 'POST',
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(userLoggedIn({ 
            user: response.data.user,
            token: response.data.token // Store token in Redux
          }));
        } catch (error) {
          console.error('Login error:', error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => ({
url: 'profile',
        method: 'GET',

      }),
//       async onQueryStarted(_, {queryFulfilled, dispatch}) {
//         try {
//             const result = await queryFulfilled;
//             console.log("result : ",result);
//             dispatch(userLoggedIn({user:result.data.user}));
//         } catch (error) {
//             console.log(error);
//         }
//     }
}),

updateUser: builder.mutation({
  query: (formData) => ({
    url: 'profile/update',
    method: 'PUT',
    body: formData,
    credentials:'include'
  }),
})

      
    }),
    
  })

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLoadUserQuery,
  useUpdateUserMutation
} = authApi;

export const middleware = authApi.middleware;