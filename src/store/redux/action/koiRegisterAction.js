// koiAction.js
import { registerKoiRequest, registerKoiSuccess, registerKoiFailure, updateDetailOfRegisterKoi, setListKoi, getAllRegisteredKoiForCompetitionRequest, getAllRegisteredKoiForCompetitionSuccess, getAllRegisteredKoiForCompetitionFailure, getAllRegistrationsByCompId } from '../reducers/RegisterKoiReducer';
import { getAllKoiApi, getAllRegisteredKoiForCompetitionApi, getAllRegistrationsApi, getKoiByIdApi,getListRegisteredKoiByCompId,registerKoiApi,updateKoiDetailApi } from '../../../service/koiRegist';

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

//get List Koi by User Id 
export const getKoiById = (id) => {
  return async (dispatch) => {
    try {
      const res = await getKoiByIdApi(id);
      console.log('getKoiById response:', res);
      dispatch(setListKoi(res)); // Ensure res is the correct data format
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