// actions/koiEntriesActions.js

import { KOI_ASSIGN, KOI_APPROVE, KOI_CHECKIN, KOI_REVIEW, KOI_CATEGORY } from '../../../util/config';
import { getCheckinByCompIdApi, rejectCheckInKoiEntry, checkInKoiEntry, getAllScore, getKoiOwnerApi, getAllKoiEntriesBycompId, getAllKoiEntriesByCategoryAndCompId, approveKoiEntry, rejectKoiEntry, createKoiRegistration, classifyKoiEntry, reviewKoiEntry, submitKoiScoreApi } from '../../../service/KoiEntriesAPI';
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
    setScoreListAction,
    checkInKoiEntryAction,
    rejectCheckInKoiEntryAction,
    setCheckinByCompIdAction
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
export const approveKoiEntryApi = (entryId, compId, compName, navigate) => {
    return async (dispatch) => {
        try {
            await approveKoiEntry(entryId);
            const action = approveKoiEntryAction(entryId);
            dispatch(action);
            dispatch(fetchAllKoiEntriesApi(compId)).then(() => {
                navigate(`/admin/manage-koi-entries/review-koi-entries/${compName}`, { state: { compId, compName } });
                dispatch(classifyKoiEntryApi(entryId));// Gọi action để phân vô hạng mục // Navigate to the desired URL after state update
            });
        } catch (error) {
            console.error("Failed to approve Koi entry:", error.response ? error.response.data : error.message);
        }
    };
};

export const rejectKoiEntryApi = (entryId, compId, compName, navigate) => {
    return async (dispatch) => {
        try {
            await rejectKoiEntry(entryId);
            const action = rejectKoiEntryAction(entryId);
            dispatch(action);
            dispatch(fetchAllKoiEntriesApi(compId)).then(() => {
                
                navigate(`/admin/manage-koi-entries/review-koi-entries/${compName}`, { state: { compId, compName } });
                 // Navigate to the desired URL after state update
            });
        } catch (error) {
            console.error("Failed to reject Koi entry:", error.response ? error.response.data : error.message);
        }
    };
};

// Approve Koi check in
export const checkInKoiEntryApi = (entryId,checkinData, compId, compName, navigate) => {
    return async (dispatch) => {
        try {
            await checkInKoiEntry(entryId,checkinData);
            const action = checkInKoiEntryAction(entryId,checkinData);
            dispatch(action);
            console.log("checkInKoiEntry successful!!");
            dispatch(fetchAllKoiEntriesApi(compId)).then(() => {
                
                navigate(`/admin/manage-koi-checkin/review-koi-checkin/${compName}`, { state: { compId, compName } });
                 // Navigate to the desired URL after state update
            });
        } catch (error) {
            console.error("Failed checkInKoiEntry:", error.response ? error.response.data : error.message);
        }
    };
};
// reject Koi check in
export const rejectCheckInKoiEntryApi = (entryId,imageUrl,description) => {
    return async (dispatch) => {
        try {
            await rejectCheckInKoiEntry(entryId,imageUrl,description);
            const action = rejectCheckInKoiEntryAction(entryId,imageUrl,description);
            dispatch(action);
        } catch (error) {
            console.error("Failed to rejectCheckInKoiEntry:", error.response ? error.response.data : error.message);
        }
    };
};


// Action để phân loại tự động đơn đăng ký cá Koi
export const classifyKoiEntryApi = (registrationID) => {
    return async (dispatch) => {
        try {

            const res = await classifyKoiEntry(registrationID);

            dispatch(submitKoiScoreAction({ registrationID, data: res.data }));
            console.log("Classification successful!!");
        } catch (error) {
            console.error("Failed to classify Koi entry:", error.response ? error.response.data : error.message);
             // Check for the specific error message
            //  if (error.message === "Your Fish specified category does not exist for this competition.") {
            //     try {
            //         await rejectKoiEntry(registrationID); // Perform the rejection
            //         const action = rejectKoiEntryAction(registrationID); // Create the action for rejection
            //         dispatch(action); // Dispatch the rejection action
            //     } catch (rejectError) {
            //         console.error("Failed to reject Koi entry:", rejectError.message);
            //     }
            // }
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
            console.error("Failed to getAllScore", error.response ? error.response.data : error.message);
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
            console.error("Failed to getKoiOwnerApi", error.response ? error.response.data : error.message);
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

export const fetchCheckinByCompId = (compId) => {
    return async (dispatch) => {
        try {
            const res = await getCheckinByCompIdApi(compId);
            dispatch(setCheckinByCompIdAction(res.data));
            console.log("Get KoiOwne successful:", res.data);
        } catch (error) {
            console.error("Failed to fetchCheckinByCompId:", error.response ? error.response.data : error.message);
        }
    };
};

export const fetchAllKoiEntriesApi = (compId) => {
    return async (dispatch) => {
        try {
            const res = await getAllKoiEntriesBycompId(compId);
            console.log('API fetchAllKoiEntriesApi Response:', res.data);
            const action = setListKoiEntriesAction(res.data);
            dispatch(action);
        } catch (error) {
            console.error("Failed to getAllKoiEntriesBycompId", error.response ? error.response.data : error.message);
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
