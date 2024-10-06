import { configureStore } from "@reduxjs/toolkit";// đã tự thêm thunk
import userReducer from "./redux/reducers/userReducer";
import contestReducer from "./redux/reducers/contestReducer";
export const store=configureStore({
    reducer:{
        userReducer,
        contestReducer
    }
})