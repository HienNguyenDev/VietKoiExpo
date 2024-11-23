import axios from 'axios';
import {
    setAllCompetitionsAction,
    setAllResultByCompAction,
    setError,
    setLoading
} from '../reducers/resultReducer';

import { 
    reviewKoiEntryApi,
  getAllResultByCompApi,
  setTopPrizesApi
 } from '../../../service/resultApi';



// Thunk Action


//  fetchCheckin
export const fetchAllResultByCompCompId = (compId) => {
  return async (dispatch) => {
      try {
          dispatch(setLoading(true));
          const res = await getAllResultByCompApi(compId);
          dispatch(setAllResultByCompAction(res.data));
          console.log("getCheckInByCompIdApi result:", res.data); // Kiểm tra kiểu dữ liệu;
      } catch (error) {
          dispatch(setError(error.response ? error.response.data : error.message));
          console.error("Failed to fetchCheckinByCompId:", error.response ? error.response.data : error.message);
      } finally {
          dispatch(setLoading(false));
      }
  };
};

// Fetch all competitions
export const fetchAllCompetitions = () => {
    return async (dispatch) => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get('https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Competition');
        dispatch(setAllCompetitionsAction(res.data));
        console.log("fetchAllCompetitions result:", res.data); // Kiểm tra kiểu dữ liệu;
      } catch (error) {
        dispatch(setError(error.response ? error.response.data : error.message));
        console.error("Failed to fetch all competitions:", error.response ? error.response.data : error.message);
      } finally {
        dispatch(setLoading(false));
      }
    };
};
  

export const fetchAllResults = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const res = await axios.get('https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Result');
            dispatch(setAllResultByCompAction(res.data));
            console.log("fetchAllResults result:", res.data);
        } catch (error) {
            dispatch(setError(error.response ? error.response.data : error.message));
            console.error("Failed to fetch all results:", error.response ? error.response.data : error.message);
        } finally {
            dispatch(setLoading(false));
        }
    };
};
export const reviewKoiEntryAction = (koiId) => {
    return async () => {
        try {
            const res = await reviewKoiEntryApi(koiId);
            return res.data; // Trả về dữ liệu chi tiết
        } catch (error) {
            console.error('Error reviewing Koi entry:', error);
        }
    };
  };

  export const fetchCompetitionDetails = (compId) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Competition/${compId}`);
            return res.data;
        } catch (error) {
            console.error("Failed to fetch competition details:", error.response ? error.response.data : error.message);
        }
    };
};

  export const setTopPrizesAction = (compId) => {
    return async () => {
        try {
            const res = await setTopPrizesApi(compId);
            return res.data; // Trả về dữ liệu chi tiết
        } catch (error) {
            console.error('Error reviewing Koi entry:', error);
        }
    };
  };
