import { createSlice } from '@reduxjs/toolkit';
import { CONTEST_CREATE, getStoreJson } from '../../../util/config';

const initialState = {
    contestCreate: getStoreJson(CONTEST_CREATE),
    contestDetails: {},
    contestList: []
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
        updateContestAction: (state, action) => {
            // Update the contest in the list
            const index = state.contestList.findIndex(contest => contest.id === action.payload.id);
            if (index !== -1) {
                state.contestList[index] = action.payload;
            }
        },
        removeContestAction: (state, action) => {
            // Remove the contest from the list
            state.contestList = state.contestList.filter(contest => contest.id !== action.payload);
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
    updateContestAction,
    removeContestAction,
    fetchContestDetailsSuccess,
    fetchContestDetailsFailure
} = contestReducer.actions;

export default contestReducer.reducer;