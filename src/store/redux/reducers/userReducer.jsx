import { createSlice } from '@reduxjs/toolkit';
import { USER_LOGIN, getStoreJson, setCookieJson, setStoreJson, removeStoreJson, removeCookieJson } from '../../../util/config';

const initialState = {
    userLogin: getStoreJson(USER_LOGIN),
    userProfile: {},
    userRegister: {},
    listUser: [],
    userDetail: {}
};

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        loginAction: (state, action) => {
            state.userLogin = action.payload;
        },
        setProfileAction: (state, action) => {
            state.userProfile = action.payload;
        },
        registerAction: (state, action) => {
            state.userRegister = action.payload;
        },
        setUserAction: (state, action) => {
            state.listUser = Array.isArray(action.payload) ? action.payload : [action.payload];
        },
        setUserDetailAction: (state, action) => {
            state.userDetail = action.payload;
        }
        ,
        updateUserAction: (state, action) => {
            const index = state.listUser.findIndex(user => user.userId === action.payload.userId);
            if (index !== -1) {
                state.listUser[index] = action.payload;
            }
        },
        removeUserAction: (state, action) => {
            state.listUser = state.listUser.filter(user => user.userId !== action.payload);
        },
        logoutAction: (state) => {
            state.userDetail= {}
            state.userLogin = null;
            state.userProfile = {};
            state.userRegister = {};
            state.listUser = [];
        }
    }
});

export const {
    loginAction,
    setProfileAction,
    registerAction,
    setUserAction,
    updateUserAction,
    removeUserAction,
    setUserDetailAction,
    logoutAction
} = userReducer.actions;

export default userReducer.reducer;