import axios from 'axios';

const API_URL = 'https://localhost:7246/api/Koifish';

export const registerKoiApi = async (koiData) => {
  return await axios.post(API_URL, koiData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getKoiListOfUserID = async (userId) => {
  try {
    const response = await axios({
      url: `https://localhost:7246/api/Koifish/user/${userId}`,
      method: 'GET',
    });// Chuyển đổi dữ liệu trả về thành JSON
  } catch (error) {
    throw error;
  }
};

export const getKoiVarietiesApi = async () => {
  try {
    const response = await axios({
      url: `https://localhost:7246/api/Variety`,
      method: 'GET',
    });
    return response.data; // Chuyển đổi dữ liệu trả về thành JSON
  } catch (error) {
    throw error;
  }
};

export const updateKoiDetailApi = async (id, newDetail) => {
  try {
    const response = await axios({
      url: `https://localhost:7246/api/Koifish/${id}`,
      method: 'PUT',
      data: newDetail,
    });
    
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const getAllKoiApi = () => {
  return axios({
      url: `https://localhost:7246/api/Koifish`,
      method: 'GET',
  });
};

export const getOwnerByKoiIdApi = (koiId) => {
  return axios({
      url: `https://localhost:7246/api/Koifish/${koiId}/user`,
      method: 'GET',
  });
};

export const getOwnerDetailApi = async (userId) => {
  return axios({
    url: `https://localhost:7246/api/User/${userId}`,
    method: 'GET',
  });
};

export const getKoiByIdApi = async (id) => {
  try {
    const response = await axios({
      url: `https://localhost:7246/api/Koifish/user/${id}`,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getRegistrationByRegisID = async(regisID) => {
  try {
    const response = await axios({
      url: `https://localhost:7246/api/Registration/${regisID}`,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}



export const registerKoiForCompetitionApi = async (koiId, compId,status) => {
  console.log('registerKoiForCompetitionApi called with:', { koiId, compId }); // Debug input parameters
  try {
    const response = await axios({
      url: `https://localhost:7246/api/Registration`,
      method: 'POST',
      data: { koiId, compId,status },
    });
    console.log('registerKoiForCompetitionApi response:', response.data); // Debug response
    return response.data;
  } catch (error) {
    console.error('registerKoiForCompetitionApi error:', error); // Debug error
    throw error;
  }
};

export const getAllRegisteredKoiForCompetitionApi = async()=>{
  try {
    const response = await axios({
      url: `https://localhost:7246/api/Registration`,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
} 

export const getAllRegistrationsApi = async () => {
  const response = await axios.get('https://localhost:7246/api/Registration');
  return response.data;
};

export const getListRegisteredKoiByCompId = async (compId) => {
  try {
    const response = await axios({
      url: `https://localhost:7246/api/Registration/competition/${compId}`,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}