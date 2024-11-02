import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  koiList: [],
  loading: false,
  error: null,
};

const registerKoiReducer = createSlice({
  name: 'registerKoi',
  initialState,
  reducers: {
    registerKoiRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerKoiSuccess: (state, action) => {
      state.loading = false;
      state.koiList.push(action.payload);
    },
    registerKoiFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateDetailOfRegisterKoi: (state, action) => {
        const { id, ...newDetail } = action.payload;
        const koiIndex = state.koiList.findIndex((koi) => koi.id === id);
        if (koiIndex !== -1) {
            state.koiList[koiIndex] = { ...state.koiList[koiIndex], ...newDetail };
        }
    },
    setListKoi: (state, action) => {
      state.koiList = action.payload;
    }
  },
});

export const { registerKoiRequest, registerKoiSuccess, registerKoiFailure,updateDetailOfRegisterKoi,setListKoi } = registerKoiReducer.actions;

export default registerKoiReducer.reducer;