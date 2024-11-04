// actions/koiEntriesActions.js

import { KOI_ASSIGN, KOI_APPROVE, KOI_CHECKIN, KOI_REVIEW, KOI_CATEGORY } from '../../../util/config';
import { getAllScore, getKoiOwnerApi, getAllKoiEntriesBycompId, getAllKoiEntriesByCategoryAndCompId, approveKoiEntry, rejectKoiEntry, createKoiRegistration, classifyKoiEntry, reviewKoiEntry, submitKoiScoreApi } from '../../../service/KoiEntriesAPI';
import {
    createKoiEntryAction,
    approveKoiEntryAction,
    rejectKoiEntryAction,
    classifyKoiEntryAction,
    setKoiEntryDetailsAction,
    setListKoiByCategoryAndCompIdAction,
    setListKoiEntriesAction,
    submitKoiScoreAction,
    getKoiEntryOwnerAction,
    setScoreListAction
} from '../reducers/koiEntriesReducer';
// Action Creators
export const createKoiRegistrationApi = (registrationDetails) => {
    return async (dispatch) => {
        try {
            const res = await createKoiRegistration(registrationDetails);
            const action = createKoiEntryAction(res.data);
            dispatch(action);
        } catch (error) {
            console.error("Failed to create Koi registration:", error.response ? error.response.data : error.message);
        }
    };
};
// Approve Koi Entries
export const approveKoiEntryApi = (entryId) => {
    return async (dispatch) => {
        try {
            await approveKoiEntry(entryId);
            const action = approveKoiEntryAction(entryId);
            dispatch(action);
        } catch (error) {
            console.error("Failed to approve Koi entry:", error.response ? error.response.data : error.message);
        }
    };
};
export const rejectKoiEntryApi = (entryId) => {
    return async (dispatch) => {
        try {
            await rejectKoiEntry(entryId);
            const action = rejectKoiEntryAction(entryId);
            dispatch(action);
        } catch (error) {
            console.error("Failed to reject Koi entry:", error.response ? error.response.data : error.message);
        }
    };
};

// Action để phân loại tự động đơn đăng ký cá Koi
export const classifyKoiEntryApi = (registrationID) => {
    return async (dispatch) => {
        try {
            const res = await classifyKoiEntry(registrationID);
            dispatch(submitKoiScoreAction({ registrationID, data: res.data }));
            console.log("Classification successful:", res.data);
        } catch (error) {
            console.error("Failed to classify Koi entry:", error.response ? error.response.data : error.message);
        }
    };
};

export const submitScoreAction = (compId,userId,scoreData,status) => {
    return async (dispatch) => {
        try {
            // Extract scores from scoreData
            const { koiId, shapeScore, colorScore, patternScore } = scoreData;

            // Call the API with all parameters
            const res = await submitKoiScoreApi(
                compId,
                koiId,
                userId,
                shapeScore,
                colorScore,
                patternScore,
                status
            );

            // Dispatch the action with the response data
            dispatch(submitKoiScoreAction({ compId, userId, scoreData, data: res.data }));
            console.log("Submit score successful:", res.data);
        } catch (error) {
            console.error("Failed to submit Koi score entry:", error.response ? error.response.data : error.message);
        }
    };
};
export const fetchAllScore = () => {
    return async (dispatch) => {
        try {
            const res = await getAllScore();
            console.log("aaaaaaaaaa",res.data);
            dispatch(setScoreListAction(res.data)); // Assuming res.data is the array of contests
        } catch (error) {
            console.error("Failed to fetch contests:", error.response ? error.response.data : error.message);
        }
    };
};

export const fetchKoiOwner = (koiId) => {
    return async (dispatch) => {
        try {
            const res = await getKoiOwnerApi(koiId);
            dispatch(getKoiEntryOwnerAction(res.data));
            console.log("Get KoiOwne successful:", res.data);
        } catch (error) {
            console.error("Failed to submit Koi score entry:", error.response ? error.response.data : error.message);
        }
    };
};



// Review Koi Entry
export const reviewKoiEntryAction = (entryId) => {
    return async (dispatch) => {
        try {
            const res = await reviewKoiEntry(entryId);
            return res.data; // Trả về dữ liệu chi tiết
        } catch (error) {
            console.error('Error reviewing Koi entry:', error);
        }
    };
};


export const fetchAllKoiEntriesApi = (compId) => {
    return async (dispatch) => {
        try {
            const res = await getAllKoiEntriesBycompId(compId);
            const action = setListKoiEntriesAction(res.data);
            dispatch(action);
        } catch (error) {
            console.error("Failed to fetch list Koi entries:", error.response ? error.response.data : error.message);
        }
    };
};

export const fetchKoiEntriesByCategoryAndCompId = (compId,categoryId) => {
    return async (dispatch) => {
        try {
            const res = await getAllKoiEntriesByCategoryAndCompId(compId,categoryId);
            const action = setListKoiByCategoryAndCompIdAction(res.data);
            dispatch(action);
        } catch (error) {
            console.error("Failed to fetch list Koi entries:", error.response ? error.response.data : error.message);
        }
    };
};
