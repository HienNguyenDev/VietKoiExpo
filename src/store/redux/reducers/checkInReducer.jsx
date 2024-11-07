// reducers/checkInReducer.js
import { createSlice } from '@reduxjs/toolkit';
//import { KOI_ASSIGN, KOI_APPROVE, KOI_CHECKIN, KOI_REVIEW, KOI_CATEGORY, getStoreJson } from '../../../util/config';

const initialState = {
    checkinByCompList: [],
    checkinList: [],
    loading: false, // Trạng thái tải
    error: null, // Lỗi nếu có
};

const checkInReducer = createSlice({
    name: 'checkInReducer',
    initialState,
    reducers: {
        checkInKoiEntryAction: (state, action) => {
            state.checkinByCompList = action.payload;
        },
        setCheckInByCompIdAction: (state, action) => {
            state.checkinByCompList = action.payload;
        },
        setCheckInDataAction: (state, action) => {
            state.checkinList = action.payload;
        },
        // Xử lý khi có lỗi
        setError: (state, action) => {
            state.error = action.payload;
        },
        // Xử lý trạng thái tải
        setLoading: (state, action) => {
            state.loading = action.payload;
        },    
    },
});
export const {

    checkInKoiEntryAction,
    setCheckInByCompIdAction,
    setCheckInDataAction,
    setError,
    setLoading,
} = checkInReducer.actions;


export default checkInReducer.reducer;