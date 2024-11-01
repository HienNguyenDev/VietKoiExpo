import { createSlice } from '@reduxjs/toolkit';
import { CONTEST_CREATE, getStoreJson } from '../../../util/config';

const initialState = {
    contestCreate: getStoreJson(CONTEST_CREATE),
    contestDetails: {},
    contestList: [],
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
        updateContestAction: (state, action) => {
            const { compId } = action.payload;
            if (!compId) {
                console.error('Error: compId is missing in the action payload:', action.payload);
                return;
            }
            
            const index = state.contestList.findIndex(contest => contest.compId === compId);
            if (index !== -1) {
                state.contestList[index] = action.payload;
            } else {
                console.error(`Error: No contest found with compId: ${compId}`);
            }
        },
        removeContestAction: (state, action) => {
            // Remove the contest from the list
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
    updateContestAction,
    removeContestAction,
    fetchContestDetailsSuccess,
    fetchContestDetailsFailure
} = contestReducer.actions;

export default contestReducer.reducer;