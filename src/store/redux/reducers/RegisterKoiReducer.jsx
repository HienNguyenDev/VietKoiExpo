import { createSlice } from '@reduxjs/toolkit';
import { getAllRegistrations } from '../action/koiRegisterAction';

const initialState = {
  koiList: [],
  registrationList: [], // New state property to store the list of registrations
  loading: false,
  ownerDetail: {},
  error: null,
  registrationListById: [],
};

const registerKoiReducer = createSlice({
  name: 'RegisterKoiReducer',
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
    setListAllKoi: (state, action) => {
      state.koiList = action.payload;
    },
    setOwnerDetailAction: (state, action) => {
      state.ownerDetail = action.payload;
    },
    getAllRegisteredKoiForCompetitionRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllRegisteredKoiForCompetitionSuccess: (state, action) => {
      state.loading = false;
      state.registrationList = action.payload; // Update the list of registrations
    },
    getAllRegisteredKoiForCompetitionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllRegistrationsByCompId: (state, action) => {
      state.registrationListById = action.payload;
    }
  },
});

export const {
  registerKoiRequest,
  registerKoiSuccess,
  registerKoiFailure,
  updateDetailOfRegisterKoi,
  setListAllKoi,
  setOwnerDetailAction,
  getAllRegisteredKoiForCompetitionRequest,
  getAllRegisteredKoiForCompetitionSuccess,
  getAllRegisteredKoiForCompetitionFailure,
  getAllRegistrationsByCompId
} = registerKoiReducer.actions;

export default registerKoiReducer.reducer;