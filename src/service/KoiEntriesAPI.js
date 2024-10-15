import axios from 'axios';

const BASE_URL = 'http://103.90.227.68:8080/api'; // Replace with your actual base URL

export const approveKoiEntries = (koiEntry) => {
    return axios({
        url: `${BASE_URL}/koiEntries/approve`,
        method: 'POST',
        data: koiEntry,
    });
};

export const assignKoiEntry = (entryId, koiData) => {
    return axios({
        url: `${BASE_URL}/koiEntries/${entryId}/assign`,
        method: 'PUT',
        data: koiData,
    });
};

export const assignKoiCategory = (entryId, categoryData) => {
    return axios({
        url: `${BASE_URL}/koiEntries/${entryId}/category`,
        method: 'PUT',
        data: categoryData,
    });
};

export const reviewKoiEntry = (entryId, reviewData) => {
    return axios({
        url: `${BASE_URL}/koiEntries/${entryId}/review`,
        method: 'POST',
        data: reviewData,
    });
};