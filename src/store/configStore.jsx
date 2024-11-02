import { configureStore } from "@reduxjs/toolkit";// đã tự thêm thunk
import userReducer from "./redux/reducers/userReducer";
import contestReducer from "./redux/reducers/contestReducer";
import newsReducer from "./redux/reducers/newsReducer";
import koiEntriesReducer from "./redux/reducers/koiEntriesReducer";
import RegisterKoiReducer from "./redux/reducers/RegisterKoiReducer";
export const store=configureStore({
    reducer:{
        userReducer,
        contestReducer,
        newsReducer,
        koiEntriesReducer,
        registerKoi:RegisterKoiReducer
    },
})