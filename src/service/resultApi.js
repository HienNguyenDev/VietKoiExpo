import axios from 'axios';

const BASE_URL = 'https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Result'; // Replace with your actual base URL


export const reviewKoiEntryApi = (koiId) => {
    return axios({
        url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Koifish/${koiId}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          },
    });
};


export const getAllResultByCompApi = (compId) => {
    return axios({
        url: `${BASE_URL}/byCompId/${compId}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          },
    });
};
export const getAllResultApi = () => {
    return axios({
        url: `${BASE_URL}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          },
    });
};

export const setTopPrizesApi = (compId) => {
    return axios({
        url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Score/assignTopPrizes/${compId}`,
        method: 'PUT',
    });
};


