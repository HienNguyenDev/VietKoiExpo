import { configureStore } from "@reduxjs/toolkit";// đã tự thêm thunk
import userReducer from "./reducers/userReducer";
export const store=configureStore({
    reducer:{
        userReducer
    }
})