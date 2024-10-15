import axios from 'axios';
import { CONTEST_CREATE, getStoreJson, setCookieJson, setStoreJson, removeStoreJson, removeCookieJson } from '../../../util/config';
import {
    createContestAction,
    updateContestAction,
    removeContestAction,
    setContestDetailsAction,
    fetchContestDetailsSuccess,
    fetchContestDetailsFailure,
    setContestListAction
} from '../reducers/contestReducer';
import { createContest, updateContest, getContest, getAllContest, removeContest } from '../../../service/ContestAPI'; // replace with your actual API methods

// async actions
export const createContestActionApi = (contestDetails, history) => {
    return async (dispatch) => {
        try {
            const res = await createContest(contestDetails);
            const action = createContestAction(res.data.content);
            dispatch(action);
            setStoreJson(CONTEST_CREATE, res.data.content);
            setCookieJson(CONTEST_CREATE, res.data.content, 30);
            history.push('/contests'); // navigate to contests page after creating
        } catch (error) {
            console.error("Contest creation failed:", error.response ? error.response.data : error.message);
            dispatch({ type: 'CONTEST_CREATE_FAILURE', payload: error.response ? error.response.data : error.message });
        }
    };
};

export const updateContestActionApi = (contestId, contestDetails, history) => {
    return async (dispatch) => {
        try {
            const res = await updateContest(contestId, contestDetails);
            const action = updateContestAction(res.data.content);
            dispatch(action);
            history.push('/contests'); // navigate to contests page after updating
        } catch (error) {
            console.error("Contest update failed:", error.response ? error.response.data : error.message);
            dispatch({ type: 'CONTEST_UPDATE_FAILURE', payload: error.response ? error.response.data : error.message });
        }
    };
};

export const removeContestActionApi = (contestId, history) => {
    return async (dispatch) => {
        try {
            await removeContest(contestId);
            const action = removeContestAction(contestId);
            dispatch(action);
            history.push('/contests'); // navigate to contests page after removing
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
            dispatch(setContestListAction(res.data.content));
        } catch (error) {
            console.error("Fetching all contests failed:", error.response ? error.response.data : error.message);
        }
    };
};