import axios from 'axios';
import {
    setAllResultByCompAction
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
          const res = await getAllResultByCompApi(compId);
          dispatch(setAllResultByCompAction(res.data));
          console.log("getCheckInByCompIdApi result:", res.data); // Kiểm tra kiểu dữ liệu;
      } catch (error) {
          console.error("Failed to fetchCheckinByCompId:", error.response ? error.response.data : error.message);
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
