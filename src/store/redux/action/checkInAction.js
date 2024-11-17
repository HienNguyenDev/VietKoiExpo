import axios from 'axios';
import {
  setCheckInByCompIdAction,
  setCheckInDataAction,
  checkInKoiEntryAction,
  setError
} from '../reducers/checkInReducer';

import { 
  getCheckInByCompIdApi,
  getCheckInDataApi,
  reviewKoiEntryApi,
  checkInKoiEntryApi  
 } from '../../../service/CheckInAPI';



// Thunk Action
export const fetchCheckInData = () => async (dispatch) => {
  try {
    const res = await getCheckInDataApi();
    dispatch(setCheckInDataAction(res.data));
    console.log("getCheckInDataApi successful:", res.data);
  } catch (error) {
    console.error("Failed to fetchCheckinByCompId:", error.response ? error.response.data : error.message);
    dispatch(setError(error));
  }
};
//  fetchCheckin
export const fetchCheckInByCompId = (compId) => {
  return async (dispatch) => {
      try {
          const res = await getCheckInByCompIdApi(compId);
          dispatch(setCheckInByCompIdAction(res.data));
          console.log("getCheckInByCompIdApi result:", res.data); // Kiểm tra kiểu dữ liệu;
      } catch (error) {
          console.error("Failed to fetchCheckinByCompId:", error.response ? error.response.data : error.message);
      }
  };
};

// Review Koi Entry
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

// Approve Koi check in
export const checkInKoiEntry = (entryId,checkinData) => {
  return async (dispatch) => {
      try {
          console.log("BBBBBBBBB",checkinData)
          await checkInKoiEntryApi(entryId,checkinData);
          console.log("checkInKoiEntry !!",checkinData);
          const action = checkInKoiEntryAction(entryId,checkinData);
          console.log("checkInKoiEntryAction CCCCCCCCCCCc!!");
          dispatch(action);
          console.log("checkInKoiEntry successful!!");
      } catch (error) {
          console.error("Failed checkInKoiEntry:", error.response ? error.response.data : error.message);
      }
  };
};
