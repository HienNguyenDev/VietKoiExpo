import { createSlice } from '@reduxjs/toolkit';
import { NEWS_CREATE, NEWS_UPDATE, NEWS_REMOVE, NEWS_LIST } from '../../../util/config';

const initialState = {
    news: {}
};

const newsReducer = createSlice({
    name: 'newsReducer',
    initialState,
    reducers: {
        createNewsAction: (state, action) => {
            state.news[action.payload.id] = action.payload;
        },
        updateNewsAction: (state, action) => {
            state.news[action.payload.id] = action.payload;
        },
        removeNewsAction: (state, action) => {
            const { [action.payload]: removed, ...rest } = state.news;
            state.news = rest;
        },
        listNewsAction: (state, action) => {
            state.news[action.payload.id] = action.payload;
        }
    }
});

export const {
    createNewsAction,
    updateNewsAction,
    removeNewsAction,
    listNewsAction
} = newsReducer.actions;

export default newsReducer.reducer;