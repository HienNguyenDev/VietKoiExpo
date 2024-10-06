import axios from 'axios';
import { CONTEST_CREATE, getStoreJson, setCookieJson, setStoreJson, removeStoreJson, removeCookieJson } from '../../../util/config';
import { createContestAction, updateContestAction, removeContestAction } from '../reducers/contestReducer';
import { createContest, updateContest, removeContest } from '../../../service/ContestAPI'; // replace with your actual API methods

//async actions
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

export const updateContestActionApi = (contestDetails, history) => {
    // existing update contest code
};

export const removeContestActionApi = (contestId, history) => {
    // existing remove contest code
};