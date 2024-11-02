import axios from 'axios';

const BASE_URL = 'https://localhost:7246/api'; // Replace with your actual base URL

export const approveKoiEntry = (entryId) => {
    return axios({
        url: `${BASE_URL}/Registration/AcceptRegistration/${entryId}`,
        method: 'PUT',
    });
};
export const rejectKoiEntry = (entryId) => {    
    return axios({
        url: `${BASE_URL}/Registration/RejectRegistration/${entryId}`,
        method: 'PUT',
    });
};


export const createKoiRegistration = (entryDetails) => {
    return axios({
        url: `${BASE_URL}/Registration`,
        method: 'POST',
        data: entryDetails,
    });
};
// Phân loại tự động đơn đăng ký cá Koi
export const classifyKoiEntry = (registrationID) => {
    return axios({
        url: `${BASE_URL}/Registration/Classificate/${registrationID}`,
        method: 'POST',
    });
};

export const reviewKoiEntry = (koiId) => {
    return axios({
        url: `${BASE_URL}/Koifish/${koiId}`,
        method: 'GET',
    });
};
export const getAllKoiEntriesBycompId = (compId) => {
    return axios({
        url: `${BASE_URL}/Registration/GetAllRegistByCompId/${compId}`,
        method: 'GET',
    });
};

export const getAllKoiEntriesByCategoryAndCompId = (compId,categoryId) => {
    return axios({
        url: `${BASE_URL}/Competition/CompetitonCategoriesFish/${compId}?comID=${categoryId}`,
        method: 'GET',
    });
};