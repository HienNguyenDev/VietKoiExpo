import axios from "axios";

export const createContest = (contest) => {
    return axios({
        url: 'http://',
        method: 'POST',
        data: contest,
    });
}

export const updateContest = (contest) => {
    return axios({
        url: 'http://',
        method: 'PUT',
        data: contest,
    });
}

export const getContest = (contestId) => {
    return axios({
        url: 'http://',
        method: 'GET',
        data: contestId,
    });
}

export const getAllContest = () => {
    return axios({
        url: 'http://',
        method: 'GET',
    });
}