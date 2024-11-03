// reducers/koiEntriesReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { KOI_ASSIGN, KOI_APPROVE, KOI_CHECKIN, KOI_REVIEW, KOI_CATEGORY, getStoreJson } from '../../../util/config';

const initialState = {
    koiEntryCreate: getStoreJson(KOI_ASSIGN), // Lấy dữ liệu từ localStorage
    koiEntryDetails: {}, // Chi tiết một đơn đăng ký cá Koi cụ thể
    koiEntries: [], // Danh sách các đơn đăng ký cá Koi
    KoiList: [],
    loading: false, // Trạng thái tải
    error: null, // Lỗi nếu có
};

const koiEntriesReducer = createSlice({
    name: 'koiEntriesReducer',
    initialState,
    reducers: {
        // Xử lý khi tạo một đơn đăng ký Koi
        createKoiEntryAction: (state, action) => {
            state.koiEntryCreate = action.payload;
            state.koiEntries.push(action.payload); // Thêm đơn đăng ký mới vào danh sách
        },
        // Cập nhật chi tiết một đơn đăng ký Koi
        setKoiEntryDetailsAction: (state, action) => {
            state.koiEntryDetails = action.payload;
        },
        // Cập nhật trạng thái khi đơn được phê duyệt
        approveKoiEntryAction: (state, action) => {
            const registrationId = action.payload;
            const entry = state.koiEntries.find(entry => entry.registrationId === registrationId);
            if (entry) {
                entry.status = 1; // Cập nhật trạng thái từ 0 thành 1
            }
            
        },
        // Cập nhật trạng thái khi đơn bị từ chối
        rejectKoiEntryAction: (state, action) => {
            const registrationId = action.payload;
            const entry = state.koiEntries.find(entry => entry.registrationId === registrationId);
            if (entry) {
                entry.status = 2; // Cập nhật trạng thái thành 2
            }
            
        },
        // Xử lý khi phân loại tự động đơn đăng ký Koi
        classifyKoiEntryAction: (state, action) => {
            const { registrationId, data } = action.payload;
            const entry = state.koiEntries.find(entry => entry.registrationId === registrationId);
            if (entry) {
                entry.classificationData = data; // Cập nhật dữ liệu phân loại
            }
        },
        // Thiết lập danh sách các đơn đăng ký Koi
        setKoiEntriesAction: (state, action) => {
            state.koiEntryDetails = action.payload;
        },
        // Thiết lập danh sách đầy đủ các đơn đăng ký Koi
        setListKoiEntriesAction: (state, action) => {
            state.koiEntries = action.payload;
        },
        // Thiết lập danh thông tin đầy đủ của cá Koi trong đơn đăng ký
        setListKoiByCategoryAndCompIdAction: (state, action) => {
            state.KoiList = action.payload;
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
    createKoiEntryAction,
    approveKoiEntryAction,
    rejectKoiEntryAction,
    classifyKoiEntryAction,
    setKoiEntryDetailsAction,
    setListKoiEntriesAction,
    setListKoiByCategoryAndCompIdAction,
    setError,
    setLoading
} = koiEntriesReducer.actions;


export default koiEntriesReducer.reducer;