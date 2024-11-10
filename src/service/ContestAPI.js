import axios from 'axios';

const BASE_URL = 'https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Competition';

export const createContest = (contestDetails) => {
    return axios({
        url: `${BASE_URL}`,
        method: 'POST',
        data: contestDetails,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const updateContest = (contestId, contestDetails) => {
    return axios({
        url: `${BASE_URL}/${contestId}`,
        method: 'PUT',
        data: contestDetails,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const removeContest = (contestId) => {
    return axios({
        url: `${BASE_URL}/${contestId}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const getContest = (contestId) => {
    return axios({
        url: `${BASE_URL}/${contestId}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const getCategoriesbyCompId = (contestId) => {
    return axios({
        url: `${BASE_URL}/CompetitonCategories/${contestId}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const getAllContest = () => {
    return axios({
        url: `${BASE_URL}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const assignKoiToContest = (compId, koiId, status = 0) => {
    return axios({
        url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Registration`,
        method: 'POST',
        data: {
            compId, // Competition ID
            koiId,  // Koi ID
            status, // Registration status (default: 0)
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const getKoiListbyCompId = (compId) => {
    return axios({
        url: `${BASE_URL}/KoiFish/${compId}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};