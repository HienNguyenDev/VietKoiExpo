import {
  fetchCompetitionDetailsAPI,
  fetchBracketsAPI,
  fetchKoiEntriesAPI,
  updateKoiScoreAPI,
  sendNotificationAPI,
  checkCompetitionStatusAPI,
} from '../../../service/CompetitionAPI';
import { fetchContestDetails } from './contestAction';
import { fetchKoiEntriesByCategoryAndCompId } from './koiEntriesAction';

// Action Types
const FETCH_COMPETITION_DATA_REQUEST = 'FETCH_COMPETITION_DATA_REQUEST';
const FETCH_COMPETITION_DATA_SUCCESS = 'FETCH_COMPETITION_DATA_SUCCESS';
const FETCH_COMPETITION_DATA_FAILURE = 'FETCH_COMPETITION_DATA_FAILURE';

const FETCH_CATEGORY_DATA_REQUEST = 'FETCH_CATEGORY_DATA_REQUEST';
const FETCH_CATEGORY_DATA_SUCCESS = 'FETCH_CATEGORY_DATA_SUCCESS';
const FETCH_CATEGORY_DATA_FAILURE = 'FETCH_CATEGORY_DATA_FAILURE';

const FETCH_KOI_ENTRIES_REQUEST = 'FETCH_KOI_ENTRIES_REQUEST';
const FETCH_KOI_ENTRIES_SUCCESS = 'FETCH_KOI_ENTRIES_SUCCESS';
const FETCH_KOI_ENTRIES_FAILURE = 'FETCH_KOI_ENTRIES_FAILURE';

const UPDATE_KOI_SCORE_REQUEST = 'UPDATE_KOI_SCORE_REQUEST';
const UPDATE_KOI_SCORE_SUCCESS = 'UPDATE_KOI_SCORE_SUCCESS';
const UPDATE_KOI_SCORE_FAILURE = 'UPDATE_KOI_SCORE_FAILURE';

const CHECK_COMPETITION_STATUS_REQUEST = 'CHECK_COMPETITION_STATUS_REQUEST';
const CHECK_COMPETITION_STATUS_SUCCESS = 'CHECK_COMPETITION_STATUS_SUCCESS';
const CHECK_COMPETITION_STATUS_FAILURE = 'CHECK_COMPETITION_STATUS_FAILURE';

// Action Creators
const fetchCompetitionDataRequest = () => ({
  type: FETCH_COMPETITION_DATA_REQUEST,
});

const fetchCompetitionDataSuccess = (data) => ({
  type: FETCH_COMPETITION_DATA_SUCCESS,
  payload: data,
});

const fetchCompetitionDataFailure = (error) => ({
  type: FETCH_COMPETITION_DATA_FAILURE,
  payload: error,
});

const fetchCategoryDataRequest = () => ({
  type: FETCH_CATEGORY_DATA_REQUEST,
});

const fetchCategoryDataSuccess = (data) => ({
  type: FETCH_CATEGORY_DATA_SUCCESS,
  payload: data,
});

const fetchCategoryDataFailure = (error) => ({
  type: FETCH_CATEGORY_DATA_FAILURE,
  payload: error,
});

const fetchKoiEntriesRequest = () => ({
  type: FETCH_KOI_ENTRIES_REQUEST,
});

const fetchKoiEntriesSuccess = (data) => ({
  type: FETCH_KOI_ENTRIES_SUCCESS,
  payload: data,
});

const fetchKoiEntriesFailure = (error) => ({
  type: FETCH_KOI_ENTRIES_FAILURE,
  payload: error,
});

const updateKoiScoreRequest = () => ({
  type: UPDATE_KOI_SCORE_REQUEST,
});

const updateKoiScoreSuccess = (data) => ({
  type: UPDATE_KOI_SCORE_SUCCESS,
  payload: data,
});

const updateKoiScoreFailure = (error) => ({
  type: UPDATE_KOI_SCORE_FAILURE,
  payload: error,
});

const checkCompetitionStatusRequest = () => ({
  type: CHECK_COMPETITION_STATUS_REQUEST,
});

const checkCompetitionStatusSuccess = (data) => ({
  type: CHECK_COMPETITION_STATUS_SUCCESS,
  payload: data,
});

const checkCompetitionStatusFailure = (error) => ({
  type: CHECK_COMPETITION_STATUS_FAILURE,
  payload: error,
});

// Thunk Actions
export const fetchCompetitionData = (compId) => async (dispatch) => {
  dispatch(fetchCompetitionDataRequest());
  try {
    const data = await fetchContestDetails(compId);
    dispatch(fetchCompetitionDataSuccess(data));
  } catch (error) {
    dispatch(fetchCompetitionDataFailure(error));
  }
};

export const fetchCategoryData = (compId) => async (dispatch) => {
  dispatch(fetchCategoryDataRequest());
  try {
    const data = await fetchBracketsAPI(compId);
    dispatch(fetchCategoryDataSuccess(data));
  } catch (error) {
    dispatch(fetchCategoryDataFailure(error));
  }
};

export const fetchKoiEntries = (compId, categoryId) => async (dispatch) => {
  dispatch(fetchKoiEntriesRequest());
  try {
    const data = await fetchKoiEntriesByCategoryAndCompId(compId, categoryId);
    dispatch(fetchKoiEntriesSuccess(data));
  } catch (error) {
    dispatch(fetchKoiEntriesFailure(error));
  }
};

export const updateKoiScoreAction = (koiId, score, userId) => async (dispatch) => {
  dispatch(updateKoiScoreRequest());
  try {
    const data = await updateKoiScoreAPI(koiId, score);
    dispatch(updateKoiScoreSuccess(data));
    await sendNotificationAPI(userId, `Your Koi fish has been scored: ${score}`);
  } catch (error) {
    dispatch(updateKoiScoreFailure(error));
  }
};

export const checkCompetitionStatus = (compId) => async (dispatch) => {
  dispatch(checkCompetitionStatusRequest());
  try {
    const data = await checkCompetitionStatusAPI(compId);
    dispatch(checkCompetitionStatusSuccess(data));
  } catch (error) {
    dispatch(checkCompetitionStatusFailure(error));
  }
};