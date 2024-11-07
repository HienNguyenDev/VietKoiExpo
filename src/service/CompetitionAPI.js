import axios from 'axios';

const BASE_URL = 'https://localhost:7246/api'; // Replace with your actual base URL


// Fetch brackets for a competition
export const fetchBracketsAPI = async (compId) => {
  try {
    const response = await axios.get(`${BASE_URL}/Bracket/${compId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



// Update scores for a Koi entry
export const updateKoiScoreAPI = async (koiId, score) => {
  try {
    const response = await axios.put(`${BASE_URL}/Koi/${koiId}/Score`, { score });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Send notification to user
export const sendNotificationAPI = async (userId, message) => {
  try {
    const response = await axios.post(`${BASE_URL}/Notification`, { userId, message });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Check competition status
export const checkCompetitionStatusAPI= async (compId) => {
  try {
    const response = await axios.get(`${BASE_URL}/Competition/${compId}/Status`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// fetch koi entries on that competition for each cattegory

