import axios from 'axios';

const BASE_URL = 'https://localhost:7246/api/CheckIn'; // Replace with your actual base URL


export const checkInKoiEntryApi = (entryId,checkinData) => {
    console.log("checkInKoiEntry !!",checkinData);
    return axios({
        
        url: `${BASE_URL}/byRegistrationId/${entryId}`,
        method: 'PUT',
        data: checkinData,
    });
};

export const reviewKoiEntryApi = (koiId) => {
    return axios({
        url: `https://localhost:7246/api/Koifish/${koiId}`,
        method: 'GET',
    });
};


export const getCheckInByCompIdApi = (compId) => {
    return axios({
        url: `${BASE_URL}/competition/${compId}`,
        method: 'GET',
    });
};
export const getCheckInDataApi = () => {
    return axios({
        url: `${BASE_URL}`,
        method: 'GET',
    });
};


