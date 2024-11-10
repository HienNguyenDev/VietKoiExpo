import axios from 'axios';

const API_URL = 'https://vietkoiexpo-backend.hiennguyendev.id.vn/api';

export const registerKoiApi = async (koiData) => {
  return await axios.post('https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Koifish', koiData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getKoiListOfUserID = async (userId) => {
  try {
    const response = await axios({
      url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Koifish/user/${userId}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });// Chuyển đổi dữ liệu trả về thành JSON
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getKoiVarietiesApi = async () => {
  try {
    const response = await axios({
      url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Variety`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Chuyển đổi dữ liệu trả về thành JSON
  } catch (error) {
    throw error;
  }
};

export const updateKoiDetailApi = async (id, newDetail) => {
  try {
    const response = await axios.put(`${API_URL}/koi/${id}`, newDetail,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllKoiApi = () => {
  return axios({
      url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Koifish`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
  });
};

export const getOwnerByKoiIdApi = (koiId) => {
  return axios({
      url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Koifish/${koiId}/user`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
  });
};

export const getOwnerDetailApi = async (userId) => {
  return axios({
    url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/User/${userId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getKoiByIdApi = async (id) => {
  try {
    const response = await axios({
      url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Koifish/user/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getRegistrationByRegisID = async(regisID) => {
  try {
    const response = await axios({
      url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Registration/${regisID}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
      url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Registration`,
      method: 'POST',
      data: { koiId, compId,status },
      headers: {
        'Content-Type': 'application/json',
      },
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
      url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Registration`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
} 

export const getAllRegistrationsApi = async () => {
  const response = await axios.get('https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Registration',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  return response.data;
};

export const getListRegisteredKoiByCompId = async (compId) => {
  try {
    const response = await axios({
      url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Registration/competition/${compId}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}