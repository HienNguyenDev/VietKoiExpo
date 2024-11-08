import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  competition: {},
  categories: [],
  koiEntries: [],
  loading: false,
  error: null,
  competitionStatus: '',
};

const competitionSlice = createSlice({
  name: 'competition',
  initialState,
  reducers: {
    fetchCompetitionDataSuccess: (state, action) => {
      state.competition = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCompetitionDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCategoriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchKoiEntriesSuccess: (state, action) => {
      state.koiEntries = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchKoiEntriesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    checkCompetitionStatusSuccess: (state, action) => {
      state.competitionStatus = action.payload;
      state.loading = false;
      state.error = null;
    },
    checkCompetitionStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchBracketsSuccess: (state, action) => {
      state.brackets = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchBracketsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateKoiScoreSuccess: (state, action) => {
      state.koiEntries = state.koiEntries.map(koi =>
        koi.koiId === action.payload.koiId ? { ...koi, score: action.payload.score } : koi
      );
      state.loading = false;
      state.error = null;
    },
    updateKoiScoreFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    sendNotificationSuccess: (state, action) => {
      state.notifications = [...state.notifications, action.payload];
      state.loading = false;
      state.error = null;
    },
    sendNotificationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCompetitionDataSuccess,
  fetchCompetitionDataFailure,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchKoiEntriesSuccess,
  fetchKoiEntriesFailure,
  checkCompetitionStatusSuccess,
  checkCompetitionStatusFailure,
  fetchBracketsSuccess,
  fetchBracketsFailure,
  updateKoiScoreSuccess,
  updateKoiScoreFailure,
  sendNotificationSuccess,
  sendNotificationFailure,
} = competitionSlice.actions;

export default competitionSlice.reducer;