import axios from 'axios';

const BASE_URL = 'https://vietkoiexpo-backend.hiennguyendev.id.vn/api';

export const getCompetitionDataApi = async (compId) => {
  try {
    const response = await axios.get(`${BASE_URL}/Competition/${compId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoriesByCompIdApi = async (compId) => {
  try {
    const response = await axios.get(`${BASE_URL}/Competition/CompetitonCategories/${compId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getKoiEntriesByCompIdApi = async (compId, categoryId) => {
  try {
    const response = await axios.get(`${BASE_URL}/Competition/CompetitonCategoriesFish/${compId}?comID=${categoryId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkCompetitionStatusApi = async (compId) => {
  try {
    const response = await axios.get(`${BASE_URL}/CheckIn/competition/${compId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCheckedInKoiForCompetition = async (compId) => {
  try {
    // Fetch check-in data
    console.log('getCheckedInKoiForCompetition called with:', compId); // Debug input parameters
    const checkInResponse = await axios.get(`${BASE_URL}/CheckIn`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const checkInData = checkInResponse.data;

    // Fetch registration data
    const registrationResponse = await axios.get(`${BASE_URL}/Registration/GetAllRegistByCompId/${compId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
    const response = await axios.get(`${BASE_URL}/CheckIn`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFishFromRegistrationApi = async (regisID) => {
  try {
    const response = await axios.get(`${BASE_URL}/Registration/${regisID}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getKoiFishByIdApi = async (koiId) => {
  try {
    const response = await axios.get(`${BASE_URL}/Koifish/${koiId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllRegisteredKoiForCompetitionAPIbyCompId = async (compId) => {
  try {
    const response = await axios.get(`${BASE_URL}/Registration/GetAllRegistByCompId/${compId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const filterKoiEntriesByCompIdAPI = async (compId) => {
  try {
    const response = await axios.get(`${BASE_URL}/Competition/KoiFish/${compId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchKoiStatusAPI = async (compId) => {
  try {
    const response = await axios.get(`${BASE_URL}/Competition/KoiFish/${compId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};