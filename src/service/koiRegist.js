// koiApi.js
import axios from 'axios';

const API_URL = 'https://localhost:7246/api/Koifish';

export const registerKoiApi = async (koiData) => {
  return await axios.post(API_URL, koiData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
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
    const response = await axios.put(`${API_URL}/koi/${id}`, newDetail);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllKoiApi = async () => {
  try {
    const response = await axios({
      url: 'https://localhost:7246/api/Koifish',
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getKoiByIdApi = async (id) => {
  try {
    const response = await axios({
      url: `${API_URL}/${id}`,
      method: 'GET',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}