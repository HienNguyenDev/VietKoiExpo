import axios from 'axios';

const BASE_URL = 'https://localhost:7246/api/Competition';

export const createContest = (contestDetails) => {
    return axios({
        url: `${BASE_URL}`,
        method: 'POST',
        data: contestDetails,
    });
};

export const updateContest = (contestId, contestDetails) => {
    return axios({
        url: `${BASE_URL}/${contestId}`,
        method: 'PUT',
        data: contestDetails,
    });
};

export const removeContest = (contestId) => {
    return axios({
        url: `${BASE_URL}/${contestId}`,
        method: 'DELETE',
    });
};

export const getContest = (contestId) => {
    return axios({
        url: `${BASE_URL}/${contestId}`,
        method: 'GET',
    });
};

export const getCategoriesbyCompId = (contestId) => {
    return axios({
        url: `${BASE_URL}/CompetitonCategories/${contestId}`,
        method: 'GET',
    });
};

export const getAllContest = () => {
    return axios({
        url: `${BASE_URL}`,
        method: 'GET',
    });
};
export const assignKoiToContest = (compId, koiId, status = 0) => {
    return axios({
        url: `https://localhost:7246/api/Registration`,
        method: 'POST',
        data: {
            compId, // Competition ID
            koiId,  // Koi ID
            status, // Registration status (default: 0)
        },
    });
};