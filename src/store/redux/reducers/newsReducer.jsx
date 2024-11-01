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
        },fetchNewsDetailsSuccess: (state, action) => {
            state.news = action.payload;
        },
        fetchNewsDetailsFailure: (state, action) => {
            state.error = action.payload;
        },
        setNewsListAction: (state, action) => {
            state.newsList = action.payload;
        },

    }
});

export const {
    createNewsAction,
    updateNewsAction,
    removeNewsAction,
    fetchNewsDetailsSuccess,
    fetchNewsDetailsFailure,
    setNewsListAction
} = newsReducer.actions;

export default newsReducer.reducer;