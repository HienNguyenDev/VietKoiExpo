// reducers/koiEntriesReducer.js

import { KOI_ASSIGN, KOI_APPROVE, KOI_CHECKIN, KOI_REVIEW, KOI_CATEGORY } from '../../../util/config';

const initialState = {
    koiEntries: {}
};

const koiEntriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case KOI_ASSIGN:
        case KOI_APPROVE:
        case KOI_CHECKIN:
        case KOI_REVIEW:
        case KOI_CATEGORY:
            return {
                ...state,
                koiEntries: {
                    ...state.koiEntries,
                    [action.payload.id]: action.payload
                }
            };
        default:
            return state;
    }
};

export default koiEntriesReducer;