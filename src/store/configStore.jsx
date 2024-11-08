import { configureStore } from "@reduxjs/toolkit";// đã tự thêm thunk
import userReducer from "./redux/reducers/userReducer";
import contestReducer from "./redux/reducers/contestReducer";
import newsReducer from "./redux/reducers/newsReducer";
import koiEntriesReducer from "./redux/reducers/koiEntriesReducer";
import RegisterKoiReducer from "./redux/reducers/RegisterKoiReducer";
import checkInReducer from "./redux/reducers/CheckInReducer";
import competitionReducer from "./redux/reducers/CompetitionReducer";
import scoreReducer from "./redux/reducers/ScoreReducer";
import resultReducer from "./redux/reducers/resultReducer";
import uploadReducer from "./redux/reducers/uploadReducer";
export const store=configureStore({
    reducer:{
        userReducer,
        checkInReducer,
        contestReducer,
        newsReducer,
        uploadReducer,
        koiEntriesReducer,
        registerKoi:RegisterKoiReducer,
        checkInReducer,
        competitionReducer,
        scoreReducer,
        resultReducer
    },
})