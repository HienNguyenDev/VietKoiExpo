import {
  getCompetitionDataApi,
  getCategoriesByCompIdApi,
  getKoiEntriesByCompIdApi,
  checkCompetitionStatusApi,
  fetchBracketsAPI,
  updateKoiScoreAPI,
  sendNotificationAPI,
  getCheckedInKoiForCompetition,
  getAllCheckInData,
  getFishFromRegistrationApi,
  getKoiFishByIdApi,
  filterKoiEntriesByCompIdAPI
} from '../../../service/CompetitionAPI';
import {
  fetchCompetitionDataSuccess,
  fetchCompetitionDataFailure,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchKoiEntriesSuccess,
  fetchKoiEntriesFailure,
  checkCompetitionStatusSuccess,
  checkCompetitionStatusFailure,
  fetchBracketsFailure,
  fetchBracketsSuccess,
  updateKoiScoreSuccess,
  updateKoiScoreFailure,
  sendNotificationSuccess,
  sendNotificationFailure
} from '../reducers/CompetitionReducer';

export const fetchCompetitionData = (compId) => async (dispatch) => {
  try {
    const data = await getCompetitionDataApi(compId);
    dispatch(fetchCompetitionDataSuccess(data));
    console.log("getCompetitionDataApi successful:", data);
  } catch (error) {
    dispatch(fetchCompetitionDataFailure(error.message));
  }
};

export const fetchCategoriesByCompId = (compId) => async (dispatch) => {
  try {
    const data = await getCategoriesByCompIdApi(compId);
    dispatch(fetchCategoriesSuccess(data));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
  }
};

//trả về danh sách cá theo cuộc thi đó dựa trên từng cattegory
export const fetchKoiEntries = (compId, categoryId) => async (dispatch) => {
  try {
    const data = await getKoiEntriesByCompIdApi(compId, categoryId);
    dispatch(fetchKoiEntriesSuccess(data));
  } catch (error) {
    dispatch(fetchKoiEntriesFailure(error.message));
  }
};

// export const checkCompetitionStatus = (compId) => async (dispatch) => {
//   try {
//     const koiEntries = await getCheckedInKoiForCompetition(compId);
//     dispatch(checkCompetitionStatusSuccess(koiEntries));
//   } catch (error) {
//     dispatch(checkCompetitionStatusFailure(error.message));
//   }
// };

export const fetchCheckedInKoiForCompetition = (compId) => async (dispatch) => {
  try {
    // Fetch check-in data
    const checkInData = await getAllCheckInData();
    const passedCheckIn = checkInData.filter(checkIn => checkIn.status === 1);
    const registrationIds = passedCheckIn.map(checkIn => checkIn.registrationId);

    // Fetch registration and Koi fish data
    const koiEntries = await Promise.all(
      registrationIds.map(async (regisID) => {
        const registrationData = await getFishFromRegistrationApi(regisID);
        const koiData = await getKoiFishByIdApi(registrationData.koiId);
        return { ...koiData, registration: registrationData };
      })
    );

    dispatch(checkCompetitionStatusSuccess(koiEntries));
  } catch (error) {
    dispatch(checkCompetitionStatusFailure(error.message));
  }
};


export const fetchBrackets = (compId) => async (dispatch) => {
  try {
    const data = await fetchBracketsAPI(compId);
    dispatch(fetchBracketsSuccess(data));
  } catch (error) {
    dispatch(fetchBracketsFailure(error.message));
  }
};

export const updateKoiScore = (compId, koiId, score) => async (dispatch) => {
  try {
    const data = await updateKoiScoreAPI(compId, koiId, score);
    dispatch(updateKoiScoreSuccess(data));
  } catch (error) {
    dispatch(updateKoiScoreFailure(error.message));
  }
};

export const sendNotification = (compId, message) => async (dispatch) => {
  try {
    const data = await sendNotificationAPI(compId, message);
    dispatch(sendNotificationSuccess(data));
  } catch (error) {
    dispatch(sendNotificationFailure(error.message));
  }
};

export const filterKoiEntriesByCompId = (compId) => async (dispatch) => {

  const listKoiEntriesByCompId = await filterKoiEntriesByCompIdAPI(compId);

  console.log("listKoiEntriesByCompId: ", listKoiEntriesByCompId);
  dispatch(fetchKoiEntriesSuccess(listKoiEntriesByCompId));

}

