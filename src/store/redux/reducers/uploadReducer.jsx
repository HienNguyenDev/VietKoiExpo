import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imageUrl: null,
  loading: false,
  error: null,
};

const uploadReducer = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setImageUrl, setLoading, setError } = uploadReducer.actions;

export default uploadReducer.reducer;