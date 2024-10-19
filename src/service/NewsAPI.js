import axios from 'axios';

const BASE_URL = 'https://localhost:7246/api'; // Replace with your actual base URL

export const createNews = (newsData) => {
    return axios({
        url: `${BASE_URL}/News`,
        method: 'POST',
        data: newsData,
    });
};

export const updateNews = (newsId, newsData) => {
    return axios({
        url: `${BASE_URL}/news/${newsId}`,
        method: 'PUT',
        data: newsData,
    });
};

export const getNews = (newsId) => {
    return axios({
        url: `${BASE_URL}/news/${newsId}`,
        method: 'GET',
    });
};

export const getAllNews = () => {
    return axios({
        url: `${BASE_URL}/news/`,
        method: 'GET',
    });
};



export const deleteNews = (newsId) => {
    return axios({
        url: `${BASE_URL}/news/${newsId}`,
        method: 'DELETE',
    });
};