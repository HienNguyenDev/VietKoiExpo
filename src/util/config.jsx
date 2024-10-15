// config.jsx

// Constants
export const USER_REGISTER = 'userRegister';
export const USER_UPDATE = 'userUpdate';
export const USER_REMOVE = 'userRemove';
export const USER_LOGIN = 'userLogin';
const SET_USERS = 'SetUsers';

export const NEWS_CREATE = 'newsCreate';
export const NEWS_UPDATE = 'newsUpdate';
export const NEWS_REMOVE = 'newsRemove';
export const NEWS_LIST = 'newsList';

export const KOI_ASSIGN = 'koiAssign';
export const KOI_APPROVE = 'koiApprove';
export const KOI_CHECKIN = 'koiCheckIn';
export const KOI_REVIEW = 'koiReview';
export const KOI_CATEGORY = 'koiCategory';

export const CONTEST_CREATE = 'contestCreate';
export const TOKEN = 'accessToken';
export const DOMAIN = 'https://localhost:5001';

const configClient = {
    setStoreJson: (name, data) => {
        let sData = JSON.stringify(data);
        localStorage.setItem(name, sData);
    },
    getStoreJson: (name) => {
        if (localStorage.getItem(name)) {
            let sData = localStorage.getItem(name);
            let data = JSON.parse(sData);
            return data;
        }
        return undefined;
    },
    setStore: (name, data) => {
        localStorage.setItem(name, data);
    },
    getStore: (name) => {
        if (localStorage.getItem(name)) {
            return localStorage.getItem(name);
        }
        return undefined;
    },
    setCookieJson: (name, value, days) => {
        value = JSON.stringify(value);
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookieJson: (name) => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                return JSON.parse(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    },
    deleteCookieJson: (name) => {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
};

export const { setStoreJson, getStoreJson, setStore, getStore, getCookieJson, setCookieJson, deleteCookieJson } = configClient;