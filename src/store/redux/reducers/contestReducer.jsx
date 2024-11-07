import { createSlice } from '@reduxjs/toolkit';
import { CONTEST_CREATE, getStoreJson } from '../../../util/config';

const initialState = {
    contestCreate: getStoreJson(CONTEST_CREATE),
    contestDetails: {},
    contestList: [],
    koiList: [],
    categoriesList: [],
    loading: false,
    error: null,
};

const contestReducer = createSlice({
    name: 'contestReducer',
    initialState,
    reducers: {
        createContestAction: (state, action) => {
            state.contestCreate = action.payload;
        },
        setContestDetailsAction: (state, action) => {
            state.contestDetails = action.payload;
        },
        setContestListAction: (state, action) => {
            state.contestList = action.payload;
        },
        setCategoriesListByContestAction: (state, action) => {
            state.categoriesList = action.payload;
        },
        setKoiListByContestAction: (state, action) => {
            state.koiList = action.payload;
        },
        updateContestAction: (state, action) => {
            console.log('updateContestAction payload:', action.payload); // Debugging log
            if (!action.payload || !action.payload.compId) {
                console.error('Error: Missing compId or payload:', action.payload);
                return state;
            }
            const index = state.contestList.findIndex(contest => contest.compId === action.payload.compId);
            if (index === -1) {
                console.error(`No contest found with compId: ${action.payload.compId}`);
                return state;
            }
            state.contestList[index] = action.payload;
        },
        removeContestAction: (state, action) => {
            
            state.contestList = state.contestList.filter(contest => contest.compId !== action.payload);
        },
        fetchContestDetailsSuccess: (state, action) => {
            state.contestDetails = action.payload;
        },
        fetchContestDetailsFailure: (state, action) => {
            state.contestDetails = {};
        }
    }
});

export const {
    createContestAction,
    setContestDetailsAction,
    setContestListAction,
    setCategoriesListByContestAction,
    setKoiListByContestAction,
    updateContestAction,
    removeContestAction,
    fetchContestDetailsSuccess,
    fetchContestDetailsFailure
} = contestReducer.actions;

export default contestReducer.reducer;