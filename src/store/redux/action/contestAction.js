import axios from 'axios';
import { CONTEST_CREATE, setCookieJson, setStoreJson } from '../../../util/config';
import {
    createContestAction,
    updateContestAction,
    removeContestAction,
    fetchContestDetailsSuccess,
    fetchContestDetailsFailure,
    setContestListAction,
    setCategoriesListByContestAction
} from '../reducers/contestReducer';
import { createContest, updateContest, getContest, getAllContest, removeContest, assignKoiToContest, getCategoriesbyCompId } from '../../../service/ContestAPI'; // replace with your actual API methods

// async actions
export const createContestActionApi = (contestDetails) => {
    return async (dispatch) => {
        try {
            const res = await createContest(contestDetails);
            const action = createContestAction(res.data.content);
            dispatch(action);
            dispatch(fetchAllContests()); // Refetch contests after creating

            // Save contest details to local storage
            const existingContests = JSON.parse(localStorage.getItem('contests')) || [];
            existingContests.push(res.data.content);
            localStorage.setItem('contests', JSON.stringify(existingContests));
        } catch (error) {
            console.error("Contest creation failed:", error.response ? error.response.data : error.message);
            dispatch({ type: 'CONTEST_CREATE_FAILURE', payload: error.response ? error.response.data : error.message });
        }
    };
};

export const updateContestActionApi = (contestId, contestDetails, navigate) => {
    return async (dispatch) => {
        try {
            const res = await updateContest(contestId, contestDetails);
            console.log('API Response:', res.data); // Debugging log
            const action = updateContestAction(res.data.content);
            console.log('Dispatching action:', action); // Debugging log
            dispatch(action);
            dispatch(fetchAllContests()).then(() => {
                navigate('/admin/manage-contests'); // Navigate to the desired URL after state update
            });
        } catch (error) {
            console.error("Contest update failed:", error.response ? error.response.data : error.message);
            dispatch({ type: 'CONTEST_UPDATE_FAILURE', payload: error.response ? error.response.data : error.message });
        }
    };
};

export const removeContestActionApi = (contestId) => {
    return async (dispatch) => {
        try {
            await removeContest(contestId);
            const action = removeContestAction(contestId);
            dispatch(action);
            dispatch(fetchAllContests()); 
        } catch (error) {
            console.error("Contest removal failed:", error.response ? error.response.data : error.message);
            dispatch({ type: 'CONTEST_REMOVE_FAILURE', payload: error.response ? error.response.data : error.message });
        }
    };
};

export const fetchContestDetails = (contestId) => {
    return async (dispatch) => {
        try {
            const res = await getContest(contestId);
            dispatch(fetchContestDetailsSuccess(res.data.content));
        } catch (error) {
            console.error("Fetching contest details failed:", error.response ? error.response.data : error.message);
            dispatch(fetchContestDetailsFailure(error.response ? error.response.data : error.message));
        }
    };
};

export const fetchAllContests = () => {
    return async (dispatch) => {
        try {
            const res = await getAllContest();
            dispatch(setContestListAction(res.data)); // Assuming res.data is the array of contests
        } catch (error) {
            console.error("Failed to fetch contests:", error.response ? error.response.data : error.message);
        }
    };
};

export const fetchCategoriesByCompId = (contestId) => {
    return async (dispatch) => {
      try {
        const res = await getCategoriesbyCompId(contestId);
        if (res && res.data) {
          dispatch(setCategoriesListByContestAction(res.data));
          return res; // Return the response for use in your component
        } else {
          throw new Error('No data returned from API');
        }
      } catch (error) {
        console.error("Failed to fetch Categories:", error.message);
        return null; // Return null to indicate failure
      }
    };
};

export const assignKoiToContestActionApi = (competitionId, koiId) => {
    return async (dispatch) => {
        try {
            await assignKoiToContest(competitionId, koiId);
            dispatch(fetchAllContests()); // Refetch contests after assigning Koi
        } catch (error) {
            console.error("Failed to assign Koi to contest:", error.response ? error.response.data : error.message);
            dispatch({ type: 'ASSIGN_KOI_TO_CONTEST_FAILURE', payload: error.response ? error.response.data : error.message });
        }
    };
};