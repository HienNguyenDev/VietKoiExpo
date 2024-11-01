import axios from 'axios';

const BASE_URL = 'https://localhost:7246/api/User';

export const loginUser = (userLogin) => {
    return axios({
        url: 'https://localhost:7246/api/Auth/login',
        method: 'POST',
        data: userLogin
    });
};

export const loginWithGoogle = async (tokenId) => {
    // Function to handle Google login
    return axios.post('https://localhost:7246/api/Auth/google-login', { tokenId });
};

export const registerUser = (userRegister) => {
    return axios({
        url: 'https://localhost:7246/api/Auth/register',
        method: 'POST',
        data: userRegister,
    });
};

export const updateDetailUser = (userId, userUpdate) => {
    return axios({
        url: `${BASE_URL}/${userId}`,
        method: 'PUT',
        data: userUpdate,
    });
};

export const getUserProfile = async (userId) => {
    const url = `${BASE_URL}/${userId}`;
    console.log('Fetching URL:', url); 

    return axios({
        url,
        method: 'GET',
    });
};

export const getAllUser = () => {
    return axios({
        url: BASE_URL,
        method: 'GET',
    });
};