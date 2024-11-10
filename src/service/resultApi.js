import axios from 'axios';

const BASE_URL = 'https://localhost:7246/api/Result'; // Replace with your actual base URL


export const reviewKoiEntryApi = (koiId) => {
    return axios({
        url: `https://localhost:7246/api/Koifish/${koiId}`,
        method: 'GET',
    });
};


export const getAllResultByCompApi = (compId) => {
    return axios({
        url: `${BASE_URL}/byCompId/${compId}`,
        method: 'GET',
    });
};
export const getAllResultApi = () => {
    return axios({
        url: `${BASE_URL}`,
        method: 'GET',
    });
};

export const setTopPrizesApi = (compId) => {
    return axios({
        url: `https://localhost:7246/api/Score/assignTopPrizes/${compId}`,
        method: 'PUT',
    });
};


