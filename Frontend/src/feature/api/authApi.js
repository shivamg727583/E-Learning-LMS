// src/features/authAPi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from '../authSlice';

export const authApi = createApi({
  reducerPath: 'authApi', 
  baseQuery: fetchBaseQuery({
     baseUrl: 'http://localhost:3000/api/v1/user/' ,
     credentials:'include'
    }), 
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: 'register',
        method: 'POST',
        body: newUser, // Data to send in the body
      }),
    }),
    loginUser: builder.mutation({
        query: (User) => ({
          url: 'login',
          method: 'POST',
          body: User, // Data to send in the body
        }),
        async onQueryStarted(arg,{queryFulfilled,dispatch}){
            try {
                const response = await queryFulfilled;
                dispatch(userLoggedIn({user:response.data.user}))            
            } catch (error) {
                console.error(error);
                
            }
        }
            
        
      }),
  }),
});

export const { useRegisterUserMutation,useLoginUserMutation } = authApi;

export const middleware = authApi.middleware;
