import { configureStore } from "@reduxjs/toolkit";// đã tự thêm thunk
import userReducer from "./redux/reducers/userReducer";
import contestReducer from "./redux/reducers/contestReducer";
import newsReducer from "./redux/reducers/newsReducer";
import koiEntriesReducer from "./redux/reducers/koiEntriesReducer";
import RegisterKoiReducer from "./redux/reducers/RegisterKoiReducer";
import checkInReducer from "./redux/reducers/checkInReducer";
import uploadReducer from "./redux/reducers/uploadReducer";
import resultReducer from "./redux/reducers/resultReducer";
export const store=configureStore({
    reducer:{
        userReducer,
        checkInReducer,
        contestReducer,
        newsReducer,
        koiEntriesReducer,
        uploadReducer,
        resultReducer,
        registerKoi:RegisterKoiReducer
    },
})