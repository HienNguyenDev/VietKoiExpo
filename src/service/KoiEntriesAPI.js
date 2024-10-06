import axios from "axios";

export const approveKoiEntries = (koiEntry) => {
    return axios({
        url: 'http://',
        method: 'POST',
        data: koiEntry,
    });
}

export const AssignKoiEntry = (koiEntry) => {
    return axios({
        url: 'http://',
        method: 'PUT',
        data: koiEntry,
    });
}

export const AssignKoiCategorie = (koiEntry) => {
    return axios({
        url: 'http://',
        method: 'PUT',
        data: koiEntry,
    });
}

export const ReviewKoiEntry = (koiEntry) => {
    return axios({
        url: 'http://',
        method: 'POST',
        data: koiEntry,
    });
}
