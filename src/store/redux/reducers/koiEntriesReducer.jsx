// reducers/koiEntriesReducer.js
import { createSlice } from '@reduxjs/toolkit';
import { KOI_ASSIGN, KOI_APPROVE, KOI_CHECKIN, KOI_REVIEW, KOI_CATEGORY, getStoreJson } from '../../../util/config';

const initialState = {
    koiEntryCreate: getStoreJson(KOI_ASSIGN), // Lấy dữ liệu từ localStorage
    koiEntryDetails: {}, // Chi tiết một đơn đăng ký cá Koi cụ thể
    koiEntries: [], // Danh sách các đơn đăng ký cá Koi
    KoiList: [],
    scoretList: [],
    checkinList: [],
    owner: null,
    submissionResponse: null,
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
                entry.status = 2; // Cập nhật trạng thái thành 2 aka hủy
            }
            
        },
        checkInKoiEntryAction: (state, action) => {
            const registrationId = action.payload;
            const entry = state.checkinList.find(entry => entry.registrationId === registrationId);
            if (entry) {
                entry.status = 1; // Cập nhật trạng thái từ 0 thành 1
            }
            
        },
        rejectcheckInKoiEntryAction: (state, action) => {
            const registrationId = action.payload;
            const entry = state.checkinList.find(entry => entry.registrationId === registrationId);
            if (entry) {
                entry.status = 2; // Cập nhật trạng thái thành 2 aka hủy
            }
            
        },
        // Xử lý khi phân loại tự động đơn đăng ký Koi
        classifyKoiEntryAction: (state, action) => {
            const { registrationId, data } = action.payload;
            const entry = state.koiEntries.find(entry => entry.registrationId === registrationId);
            if (entry) {
                entry.koiEntries = action.payload; // Cập nhật dữ liệu phân loại
            }
        },
        // xử lý khi gửi điểm  
        submitKoiScoreAction: (state, action) => {
            const { compId, userId, scoreData, data } = action.payload;
      
            // Optionally, update koiEntries with the new scoreData if necessary
            const updatedKoiList = state.KoiList.map((entry) => {
              if (entry.compId === compId && entry.userId === userId) {
                return {
                  ...entry,
                  scoreData, // Update score data
                };
              }
              return entry;
            });
      
            // Update the state with the response and updated entries
            state.KoiList = updatedKoiList;
            state.submissionResponse = data;
            state.error = null; // Clear any previous errors
        },
        // Lấy thông tin user
        getKoiEntryOwnerAction: (state, action) => {
            state.owner = action.payload;
        },
        setCheckinByCompIdAction: (state, action) => {
            state.checkinList = action.payload;
        },
        setScoreListAction: (state, action) => {
            state.scoretList = action.payload;
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
    checkInKoiEntryAction,
    rejectCheckInKoiEntryAction,
    classifyKoiEntryAction,
    submitKoiScoreAction,
    getKoiEntryOwnerAction,
    setCheckinByCompIdAction,
    setScoreListAction,
    setKoiEntryDetailsAction,
    setListKoiEntriesAction,
    setListKoiByCategoryAndCompIdAction,
    setError,
    setLoading
} = koiEntriesReducer.actions;


export default koiEntriesReducer.reducer;