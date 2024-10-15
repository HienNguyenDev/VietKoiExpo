// actions/koiEntriesActions.js

import { KOI_ASSIGN, KOI_APPROVE, KOI_CHECKIN, KOI_REVIEW, KOI_CATEGORY } from '../../../util/config';
import { approveKoiEntries, assignKoiEntry, assignKoiCategory, reviewKoiEntry } from '../../../service/KoiEntriesAPI';

// Action Creators

// Approve Koi Entries
export const approveKoiEntriesAction = (koiEntry) => {
    return async (dispatch) => {
        try {
            const response = await approveKoiEntries(koiEntry);
            dispatch({
                type: KOI_APPROVE,
                payload: response.data
            });
        } catch (error) {
            console.error('Error approving Koi entries:', error);
        }
    };
};

// Assign Koi Entry
export const assignKoiEntryAction = (entryId, koiData) => {
    return async (dispatch) => {
        try {
            const response = await assignKoiEntry(entryId, koiData);
            dispatch({
                type: KOI_ASSIGN,
                payload: response.data
            });
        } catch (error) {
            console.error('Error assigning Koi entry:', error);
        }
    };
};

// Assign Koi Category
export const assignKoiCategoryAction = (entryId, categoryData) => {
    return async (dispatch) => {
        try {
            const response = await assignKoiCategory(entryId, categoryData);
            dispatch({
                type: KOI_CATEGORY,
                payload: response.data
            });
        } catch (error) {
            console.error('Error assigning Koi category:', error);
        }
    };
};

// Review Koi Entry
export const reviewKoiEntryAction = (entryId, reviewData) => {
    return async (dispatch) => {
        try {
            const response = await reviewKoiEntry(entryId, reviewData);
            dispatch({
                type: KOI_REVIEW,
                payload: response.data
            });
        } catch (error) {
            console.error('Error reviewing Koi entry:', error);
        }
    };
};