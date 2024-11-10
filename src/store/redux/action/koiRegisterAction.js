// koiAction.js
import { setOwnerDetailAction, registerKoiRequest, registerKoiSuccess, registerKoiFailure, updateDetailOfRegisterKoi, setListAllKoi, getAllRegisteredKoiForCompetitionRequest, getAllRegisteredKoiForCompetitionSuccess, getAllRegisteredKoiForCompetitionFailure, getAllRegistrationsByCompId } from '../reducers/RegisterKoiReducer';
import { getOwnerDetailApi, getOwnerByKoiIdApi, getAllKoiApi, getAllRegisteredKoiForCompetitionApi, getAllRegistrationsApi, getKoiListOfUserID,getListRegisteredKoiByCompId,registerKoiApi,updateKoiDetailApi } from '../../../service/koiRegistAPI';

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

export const updateKoiDetail = (id,  updateKoiDetail) => {
  return async (dispatch) => {
    try { 
      const data = await updateKoiDetailApi(id,  updateKoiDetail);
      dispatch(updateDetailOfRegisterKoi({ id, ...data }));
    } catch (error) {
      console.error('Failed to update koi detail:', error);
    }
  };
};
export const fetchAllKoi = () => {
  return async (dispatch) => {
      try {
          const res = await getAllKoiApi();
          console.log("getAllKoiApi",res.data)
          dispatch(setListAllKoi(res.data)); // Assuming res.data is the array of contests
      } catch (error) {
          console.error("Failed to fetch contests:", error.response ? error.response.data : error.message);
      }
  };
};
//get user by koiId
export const fetchOwnerByKoiId = (koiId) => {
  return async (dispatch) => {
    try {
      const res = await getOwnerByKoiIdApi(koiId);
      console.log('getUserByKoiIdApi response:', res);
      dispatch(setOwnerDetailAction(res.data)); // Ensure res is the correct data format
    } catch (error) {
      console.error("getUserByKoiIdApi failed:",error.response ? error.response.data : error.message);
      // Optionally, dispatch an error action here
    }
  };
};
//get user by koiId
export const fetchOwnerByUserId = (koiId) => {
  return async (dispatch) => {
    try {
      const res = await getOwnerDetailApi(koiId);
      console.log('fetchOwnerByUserId response:', res);
      dispatch(setOwnerDetailAction(res.data));
      return res.data; // Ensure res is the correct data format
    } catch (error) {
      console.error("fetchOwnerByUserId failed:",error.response ? error.response.data : error.message);
      // Optionally, dispatch an error action here
    }
  };
};
//get List Koi by User Id 
export const getKoiById = (id) => {
  return async (dispatch) => {
    try {
      const res = await getKoiListOfUserID(id);
      console.log('getKoiById response:', res);
      dispatch(setListAllKoi(res)); // Ensure res is the correct data format
    } catch (error) {
      console.error(
        "Fetching listKoi failed:",
        error.response ? error.response.data : error.message
      );
      // Optionally, dispatch an error action here
    }
  };
};
export const getAllRegisteredKoiForCompetition = () => async (dispatch) => {
 
  try {
    dispatch(getAllRegisteredKoiForCompetitionRequest());
    const response = await getAllRegisteredKoiForCompetitionApi();
    dispatch(getAllRegisteredKoiForCompetitionSuccess(response.data));
  } catch (error) {
    console.error('Failed to get all registered Koi for competition:', error);
    dispatch(getAllRegisteredKoiForCompetitionFailure(error));
  }

}

export const getAllRegistrations = () => async (dispatch) => {
  dispatch(getAllRegisteredKoiForCompetitionRequest());
  try {
    const response = await getAllRegistrationsApi();
    dispatch(getAllRegisteredKoiForCompetitionSuccess(response));
  } catch (error) {
    console.error('Failed to get all registrations:', error);
    dispatch(getAllRegisteredKoiForCompetitionFailure(error));
  }
};

export const getRegistrationByRegisID = async(regisID) => {
  return async (dispatch) => {
    try {
      const response = await getListRegisteredKoiByCompId(regisID);
      dispatch(getAllRegistrationsByCompId(response.data));
    }catch(error){
      console.error('Failed to get registration by ID:', error);
      throw error;
    }
  }
}