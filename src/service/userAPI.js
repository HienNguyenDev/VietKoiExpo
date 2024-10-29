import axios from 'axios';

export const loginUser = (userLogin) => {
    return axios({
        url:'https://localhost:7246/api/Auth/login',
        method:'POST',
        data: userLogin
    });
};

export const registerUser = (userRegister) => {
    return axios({
        url: 'http://103.90.227.68:8080/api/register',
        method: 'POST',
        data: userRegister,
    });
};

export const updateDetailUser = (userUpdate) => {
    return axios({
        url: 'http://',
        method: 'PUT',
        data: userUpdate,
    })
}
export const getUserProfile = async (userId) => {
    const baseUrl = 'https://localhost:7246/api/User/';
    const url = `${baseUrl}${userId}`;
    console.log('Fetching URL:', url); 

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const getAllUser = () => {
    return axios({
        url: 'https://localhost:7246/api/User',
        method: 'GET',
    })
}
