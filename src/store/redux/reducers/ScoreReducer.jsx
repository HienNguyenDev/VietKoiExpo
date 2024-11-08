import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    scores: [],
    listKoiandStatusScores: [],
    loading: false,
    error: null,
}

const ScoreReducer = createSlice({
  name: 'scoreReducer',
  initialState,
  reducers: {
    fetchScoresSuccess: (state, action) => {
      state.scores = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchScoresFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchListKoiandStatusScoresSuccess: (state, action) => {
      state.listKoiandStatusScores = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchListKoiandStatusScoresFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {fetchListKoiandStatusScoresFailure,fetchListKoiandStatusScoresSuccess,fetchScoresFailure,fetchScoresSuccess} = ScoreReducer.actions

export default ScoreReducer.reducer