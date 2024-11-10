import axios from 'axios';

const BASE_URL = 'https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Auth/login';

export const loginUser = (userLogin) => {
    return axios({
        url: 'https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Auth/login',
        method: 'POST',
        data: userLogin,
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

export const loginWithGoogle = async (tokenId) => {
    // Function to handle Google login
    return axios.post('https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Auth/Google-Validation', { tokenId });
};  

export const registerUser = (userRegister) => {
    return axios({
        url: 'https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Auth/Register',
        method: 'POST',
        data: userRegister,
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

export const updateDetailUser = (userId, userUpdate) => {
    return axios({
        url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/User/${userId}`,
        method: 'PUT',
        data: userUpdate,
        headers: {
            'Content-Type': 'application/json',
        }
    });
};
export const removeUser = (userId, userDelete   ) => {
    return axios({
        url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/User/${userId}`,
        method: 'Delete',
        data: userDelete,
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

export const createUser = (userCreate) => {
    return axios({
        url: 'https://vietkoiexpo-backend.hiennguyendev.id.vn/api/User/',
        method: 'POST',
        data: userCreate,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}


export const getUserProfile = async (userId) => {
    const url = `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/User/${userId}`;
    console.log('Fetching URL:', url); 

    return axios({
        url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

export const getAllUser = () => {
    return axios({
        url: 'https://vietkoiexpo-backend.hiennguyendev.id.vn/api/User/',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
};