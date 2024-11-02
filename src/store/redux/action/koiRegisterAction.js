// koiAction.js
import { registerKoiRequest, registerKoiSuccess, registerKoiFailure, updateDetailOfRegisterKoi, setListKoi } from '../reducers/RegisterKoiReducer';
import { getAllKoiApi, getKoiByIdApi, registerKoiApi, updateKoiDetailApi } from '../../../service/koiRegist';

export const registerKoi = (koiData) => async (dispatch) => {
  try {
    const response = registerKoiApi(koiData);
    // Dispatch success action or handle success state
    dispatch({ type: 'REGISTER_KOI_SUCCESS', payload: response.data });
    return response.data;
  } catch (error) {
    // Dispatch failure action or handle error state
    dispatch({ type: 'REGISTER_KOI_FAILURE', payload: error });
    throw error;
  }
};

export const updateKoiDetail = (id, newDetail) => {
  return async (dispatch) => {
    try {
      const data = await updateKoiDetailApi(id, newDetail);
      dispatch(updateDetailOfRegisterKoi({ id, ...data }));
    } catch (error) {
      console.error('Failed to update koi detail:', error);
    }
  };
};

export  const getAllKoi = async () => {
  return async (dispatch) => {
    try{
      const res=getAllKoiApi();
      dispatch(setListKoi(res.data));

    }catch(error){

    }
  }
} 

export const getKoiById = (id) => {
  return async (dispatch) => {
    try {
      const res = await getKoiByIdApi(id);
      dispatch(setListKoi(res.data));
    } catch (error) {
      console.error(
        "Fetching listKoi failed:",
        error.response ? error.response.data : error.message
      );
      // Optionally, dispatch an error action here
    }
  };
};
