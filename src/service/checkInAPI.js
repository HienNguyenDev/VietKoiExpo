import axios from 'axios';

const BASE_URL = 'https://vietkoiexpo-backend.hiennguyendev.id.vn/api/CheckIn'; // Replace with your actual base URL


export const checkInKoiEntryApi = (entryId,checkinData) => {
    console.log("checkInKoiEntry !!",checkinData);
    return axios({
        
        url: `${BASE_URL}/byRegistrationId/${entryId}`,
        method: 'PUT',
        data: checkinData,
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

export const reviewKoiEntryApi = (koiId) => {
    return axios({
        url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Koifish/${koiId}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
};


export const getCheckInByCompIdApi = (compId) => {
    return axios({
        url: `${BASE_URL}/competition/${compId}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
};
export const getCheckInDataApi = () => {
    return axios({
        url: `${BASE_URL}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
};


