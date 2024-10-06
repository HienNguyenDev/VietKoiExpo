import { createSlice } from '@reduxjs/toolkit'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { USER_LOGIN, getStoreJson, setCookieJson, setStoreJson } from '../../../util/config';

const initialState = {
    userLogin:getStoreJson(USER_LOGIN),
    userProfile:{},
    userRegister:{},
    listUser:[]
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    loginAction:(state,action)=>{
        state.userLogin=action.payload;
    },
    setProfileAction:(state,action)=>{
        state.userProfile=action.payload
    },registerAction:(state,action)=>{
        state.userRegister=action.payload;
    },setUserAction:(state,action)=>{
        state.listUser=action.payload
    }
  }
});

export const {loginAction,setProfileAction,registerAction,setUserAction} = userReducer.actions

export default userReducer.reducer
