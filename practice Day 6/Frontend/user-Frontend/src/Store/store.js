import userReducer from "./Slice/userSlice";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        users: userReducer,
    },
})
