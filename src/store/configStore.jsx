import { configureStore } from "@reduxjs/toolkit";// đã tự thêm thunk
import userReducer from "./redux/reducers/userReducer";
export const store=configureStore({
    reducer:{
        userReducer
    }
})