import axios from 'axios';

const BASE_URL = 'https://localhost:7246/api'; // Replace with your actual base URL

// Send notification to user
export const sendNotificationAPI = async (userId, message) => {
  try {
    const response = await axios.post(`${BASE_URL}/Notification`, { userId, message });
    return response.data;
  } catch (error) {
    throw error;
  }
};