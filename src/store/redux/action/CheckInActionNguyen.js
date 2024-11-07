import axios from 'axios';

// Action Types
const FETCH_CHECKIN_DATA_REQUEST = 'FETCH_CHECKIN_DATA_REQUEST';
const FETCH_CHECKIN_DATA_SUCCESS = 'FETCH_CHECKIN_DATA_SUCCESS';
const FETCH_CHECKIN_DATA_FAILURE = 'FETCH_CHECKIN_DATA_FAILURE';

// Action Creators
const fetchCheckInDataRequest = () => ({
  type: FETCH_CHECKIN_DATA_REQUEST,
});

const fetchCheckInDataSuccess = (data) => ({
  type: FETCH_CHECKIN_DATA_SUCCESS,
  payload: data,
});

const fetchCheckInDataFailure = (error) => ({
  type: FETCH_CHECKIN_DATA_FAILURE,
  payload: error,
});

// Thunk Action
export const fetchCheckInData = () => async (dispatch) => {
  dispatch(fetchCheckInDataRequest());
  try {
    const response = await axios.get('https://localhost:7246/api/CheckIn');
    dispatch(fetchCheckInDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchCheckInDataFailure(error));
  }
};