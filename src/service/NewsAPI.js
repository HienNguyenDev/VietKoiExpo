import axios from 'axios';

const BASE_URL = 'https://vietkoiexpo-backend.hiennguyendev.id.vn/api/'; // Replace with your actual base URL

export const createNews = (newsData) => {
    return axios({
        url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/News`,
        method: 'POST',
        data: newsData,
        headers: {
            'Content-Type': 'application/json',
          },
    });
};

export const updateNews = (newsId, newsData) => {
    return axios({
        url: `${BASE_URL}/News/${newsId}`,
        method: 'PUT',
        data: newsData,
        headers: {
            'Content-Type': 'application/json',
          },
    });
};

export const getNews = (newsId) => {
    return axios({
        url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/News/${newsId}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          },
    });
};

export const getAllNews = () => {
    return axios({
        url: `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/News`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          },
    });
};

export const deleteNews = (newsId) => {
    return axios({
        url: `${BASE_URL}/News/${newsId}`,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
          },
    });
};