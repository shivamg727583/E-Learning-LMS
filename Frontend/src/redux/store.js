import { configureStore } from "@reduxjs/toolkit";
import authApi from '../feature/authSlice';
import rootReducer from "./rootReducer";
import { middleware } from "@/feature/api/authApi";
export const appStore = configureStore({
    reducer:rootReducer,   
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware), // Adding RTK Query middleware
});
// const initializeApp = async () => {
//     await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
// }
// initializeApp();