import axios from 'axios';

export const createContest = (contestDetails) => {
    return axios.post('/api/contests', contestDetails);
};

export const updateContest = (contestId, contestDetails) => {
    return axios.put(`/api/contests/${contestId}`, contestDetails);
};

export const removeContest = (contestId) => {
    return axios.delete(`/api/contests/${contestId}`);
};

export const getContest = (contestId) => {
    return axios.get(`/api/contests/${contestId}`);
};

export const getAllContest = () => {
    return axios.get('/api/contests');
};