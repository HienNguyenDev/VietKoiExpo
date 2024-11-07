// actions/koiEntriesActions.js

import { KOI_ASSIGN, KOI_APPROVE, KOI_CHECKIN, KOI_REVIEW, KOI_CATEGORY } from '../../../util/config';
import {getAllKoiEntriesBycompId, getAllKoiEntriesByCategoryAndCompId, approveKoiEntry, rejectKoiEntry, createKoiRegistration, classifyKoiEntry, reviewKoiEntry } from '../../../service/KoiEntriesAPI';
import { registerKoiForCompetitionApi } from '../../../service/koiRegist';
import {
    createKoiEntryAction,
    approveKoiEntryAction,
    rejectKoiEntryAction,
    classifyKoiEntryAction,
    setKoiEntryDetailsAction,
    setListKoiByCategoryAndCompIdAction,
    setListKoiEntriesAction
} from '../reducers/koiEntriesReducer';
import {
    registerKoiForCompetitionRequest,
    registerKoiForCompetitionSuccess,
    registerKoiForCompetitionFailure,
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
            dispatch(classifyKoiEntryAction({ registrationID, data: res.data }));
            console.log("Classification successful:", res.data);
        } catch (error) {
            console.error("Failed to classify Koi entry:", error.response ? error.response.data : error.message);
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

//đăng kí cá koi của người dùng vào cuộc thi


export const registerKoiForCompetition = (koiIds, competitionId) => async (dispatch) => {
    console.log('registerKoiForCompetition action called with:', { koiIds, competitionId }); // Debug input parameters
    dispatch(registerKoiForCompetitionRequest());
    try {
      const response = await registerKoiForCompetitionApi(koiIds, competitionId);
      console.log('registerKoiForCompetition action response:', response); // Debug response
      dispatch(registerKoiForCompetitionSuccess(response));
      return response;
    } catch (error) {
      console.error('registerKoiForCompetition action error:', error); // Debug error
      dispatch(registerKoiForCompetitionFailure(error));
      throw error;
    }
  };