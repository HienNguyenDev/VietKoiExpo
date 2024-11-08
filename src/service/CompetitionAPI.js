import axios from 'axios';

export const getCompetitionDataApi = async (compId) => {
  try {
    const response = await axios.get(`https://localhost:7246/api/Competition/${compId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoriesByCompIdApi = async (compId) => {
  try {
    const response = await axios.get(`https://localhost:7246/api/Competition/CompetitonCategories/${compId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getKoiEntriesByCompIdApi = async (compId, categoryId) => {
  try {
    const response = await axios.get(`https://localhost:7246/api/Competition/CompetitonCategoriesFish/${compId}?comID=${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkCompetitionStatusApi = async (compId) => {
  try {
    const response = await axios.get(`hhttps://localhost:7246/api/CheckIn/competition/${compId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getCheckedInKoiForCompetition = async (compId) => {
  try {
    // Fetch check-in data
    console.log('getCheckedInKoiForCompetition called with:', compId); // Debug input parameters
    const checkInResponse = await axios.get(`https://localhost:7246/api/CheckIn`);
    const checkInData = checkInResponse.data;

    // Fetch registration data
    const registrationResponse = await axios.get(`https://localhost:7246/api/Registration/GetAllRegistByCompId/${compId}`);
    console.log('getCheckedInKoiForCompetition registrationResponse:', registrationResponse.data); // Debug registration data
    const registrationData = registrationResponse.data;

    // Filter registrations to include only those with a check-in status of 1
    const checkedInRegistrations = checkInData.filter(checkIn => checkIn.status === 1);
    const checkedInKoi = registrationData.filter(registration => 
      checkedInRegistrations.some(checkIn => checkIn.registrationId === registration.registrationId)
    );

    return checkedInKoi;
  } catch (error) {
    throw error;
  }
};
export const getAllCheckInData = async () => {
  try {
    const response = await axios.get(`https://localhost:7246/api/CheckIn`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getFishFromRegistrationApi = async (regisID) => {
  try {
    const response = await axios.get(`https://localhost:7246/api/Registration/${regisID}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getKoiFishByIdApi = async (koiId) => {
  try {
    const response = await axios.get(`https://localhost:7246/api/Koifish/${koiId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllRegisteredKoiForCompetitionAPIbyCompId = async (compId) => {
  try {
    const response = await axios.get(`https://localhost:7246/api/Registration/GetAllRegistByCompId/${compId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBracketsAPI = async (compId) => {
  try {
    const response = await axios.get(`https://api.example.com/competitions/${compId}/brackets`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateKoiScoreAPI = async (compId, koiId, score) => {
  try {
    const response = await axios.post(`https://api.example.com/competitions/${compId}/koi/${koiId}/score`, { score });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendNotificationAPI = async (compId, message) => {
  try {
    const response = await axios.post(`https://api.example.com/competitions/${compId}/notifications`, { message });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const filterKoiEntriesByCompIdAPI = async (compId) => {
  try{
    const response = await axios.get(`https://localhost:7246/api/Competition/KoiFish/${compId}`);
    return response.data;
  }
  catch(error){
    throw error;
  }
}