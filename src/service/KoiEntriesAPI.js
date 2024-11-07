import axios from 'axios';

const BASE_URL = 'https://localhost:7246/api'; // Replace with your actual base URL

export const approveKoiEntry = (entryId) => {
    return axios({
        url: `${BASE_URL}/Registration/AcceptRegistration/${entryId}`,
        method: 'PUT',
    });
};
export const checkInKoiEntry = (entryId,checkinData) => {
    return axios({
        url: `${BASE_URL}/CheckIn/byRegistrationId/${entryId}`,
        method: 'PUT',
        data: checkinData,
    });
};
export const rejectKoiEntry = (entryId) => {    
    return axios({
        url: `${BASE_URL}/Registration/RejectRegistration/${entryId}`,
        method: 'PUT',
    });
};
export const rejectCheckInKoiEntry = (entryId) => {
    return axios({
        url: `${BASE_URL}/CheckIn/byRegistrationId/${entryId}`,
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
export const classifyKoiEntry = (RegistrationId) => {
    return axios({
        url: `${BASE_URL}/Registration/Classificate/${RegistrationId}`,
        method: 'POST',
        data: {},
    });
};

export const submitKoiScoreApi = (compId, koiId, userId, scoreShape, scoreColor, scorePattern, totalScore, status ) => {
    return axios({
        url: `${BASE_URL}/Score`,
        method: 'POST',
        data: {
            koiId,        // Koi ID
            compId,       // Competition ID
            userId,       // User ID
            scoreShape,   // Shape score
            scoreColor,   // Color score
            scorePattern, // Pattern score
            status 
        },
    });
};

export const getKoiOwnerApi = (koiId) => {
    return axios({
        url: `${BASE_URL}/Koifish/${koiId}/user`,
        method: 'GET',
    });
};

export const reviewKoiEntry = (koiId) => {
    return axios({
        url: `${BASE_URL}/Koifish/${koiId}`,
        method: 'GET',
    });
};

export const getCheckinByCompIdApi = (compId) => {
    return axios({
        url: `${BASE_URL}/CheckIn/competition/${compId}`,
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

export const getAllScore = () => {
    return axios({
        url: `${BASE_URL}/Score`,
        method: 'GET',
    });
};


/*đăng kí những con cá của user đăng nhập vào cuộc thi với url https://localhost:7246/api/Registration, form nhập là {
  "koiId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "compId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": 0

}*/
export const registerKoiForCompetition = (entryDetails) => {
    return axios({
        url: `${BASE_URL}/Registration`,
        method: 'POST',
        data: entryDetails,
    });
};