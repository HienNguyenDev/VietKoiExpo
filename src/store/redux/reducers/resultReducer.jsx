    // reducers/checkInReducer.js
    import { createSlice } from '@reduxjs/toolkit';

    const initialState = {
        compResultList: [],
        //checkinList: [],
        loading: false, // Trạng thái tải
        error: null, // Lỗi nếu có
    };

    const checkInReducer = createSlice({
        name: 'checkInReducer',
        initialState,
        reducers: {
            
            setAllResultByCompAction: (state, action) => {
                state.compResultList = action.payload;
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


        setAllResultByCompAction,

        setError,
        setLoading,
    } = checkInReducer.actions;


    export default checkInReducer.reducer;