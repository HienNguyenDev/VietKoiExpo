import axios from 'axios';

export const loginUser = (userLogin) => {
    return axios({
        url:'http://103.90.227.68:8080/api/login',
        method:'POST',
        data:userLogin
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
export const getUserProfile = (userId) => {
    return axios({
        url: 'http://',
        method: 'GET',
        data: userId,
    })
}

export const getAllUser = () => {
    return axios({
        url: 'http://',
        method: 'GET',
    })
}

/* get referee */
