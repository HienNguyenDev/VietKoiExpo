import { fetchScoresSuccess, fetchScoresFailure, fetchListKoiandStatusScoresSuccess, fetchListKoiandStatusScoresFailure } from '../reducers/ScoreReducer';

export const fetchScores = (compId) => async (dispatch) => {
  try {
    const response = await fetch(`https://localhost:7246/api/Competition/KoiFish/${compId}`);
    const data = await response.json();
    dispatch(fetchScoresSuccess(data));
  } catch (error) {
    dispatch(fetchScoresFailure(error.message));
  }
};

