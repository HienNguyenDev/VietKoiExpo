import { createSlice } from '@reduxjs/toolkit'
import { CONTEST_CREATE, getStoreJson } from '../../../util/config';

const initialState = {
        contestCreate: getStoreJson(CONTEST_CREATE),
        contestDetails: {},
        contestList: []
}

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
        }
    }
});

export const { createContestAction, setContestDetailsAction, setContestListAction } = contestReducer.actions;

export default contestReducer.reducer;