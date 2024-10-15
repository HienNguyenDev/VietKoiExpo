// reducers/newsReducer.js

import { NEWS_CREATE, NEWS_UPDATE, NEWS_REMOVE, NEWS_LIST } from '../../../util/config';

const initialState = {
    news: {}
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case NEWS_CREATE:
        case NEWS_UPDATE:
            return {
                ...state,
                news: {
                    ...state.news,
                    [action.payload.id]: action.payload
                }
            };
        case NEWS_REMOVE:
            const { [action.payload]: removed, ...rest } = state.news;
            return {
                ...state,
                news: rest
            };
        case NEWS_LIST:
            return {
                ...state,
                news: {
                    ...state.news,
                    [action.payload.id]: action.payload
                }
            };
        default:
            return state;
    }
};

export default newsReducer;