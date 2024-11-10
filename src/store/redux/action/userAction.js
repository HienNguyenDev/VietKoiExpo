// src/store/redux/action/userAction.js

import axios from 'axios';
import { USER_LOGIN, USER_REGISTER, getStoreJson, setCookieJson, setStoreJson, removeStoreJson, removeCookieJson, deleteCookieJson } from '../../../util/config';
import { logoutAction, loginAction, registerAction, updateUserAction, removeUserAction, setUserAction, setUserDetailAction, setProfileAction } from '../../redux/reducers/userReducer';
import { getAllUser, getUserProfile, loginUser, loginWithGoogle, registerUser, updateDetailUser, removeUser, createUser } from '../../../service/userAPI';

export const loginActionApi = (credentials, navigate) => {
    return async (dispatch, getState) => {
      try {
        // Fetch the list of users
        await dispatch(fetchUsersActionApi());
        const { userReducer } = getState();
        const user = userReducer.listUser.find(
          (user) => user.email === credentials.email && user.password === credentials.password
        );
  
        if (user) {
          // Dispatch login action
          dispatch(loginAction(user));
          setStoreJson(USER_LOGIN, user);
          setCookieJson(USER_LOGIN, user, 30);
  
          // Navigate based on role
          if (user.roleId === 'manager') {
            navigate('/admin');
          } else if (user.roleId === 'staff') {
            navigate('/admin');
          } else if (user.roleId === 'judge') {
            navigate('/referee');
          } else if (user.roleId === 'member') {
            navigate('/home');
          }
        } else {
          throw new Error('Invalid email or password');
        }
      } catch (error) {
        console.error('Error in loginActionApi:', error);
        throw error;
      }
    };
  };

export const registerActionApi = (userRegister, navigate, onSuccess, onFailure) => {
    return async (dispatch) => {
        try {
            const res = await registerUser(userRegister);

            // After successful registration, dispatch action to update state
            const action = registerAction(res.data.content);
            dispatch(action);

            // Save user info to localStorage and cookie if needed
            setStoreJson(USER_REGISTER, res.data.content);
            setCookieJson(USER_REGISTER, res.data.content, 30);

            // Navigate user to the appropriate page after registration
            navigate('/login');

            // Call success callback
            onSuccess('Registration successful!');
        } catch (error) {
            // Handle error: show message or dispatch an error action
            console.error("Registration failed:", error.response ? error.response.data : error.message);
            
            // Dispatch error action or show message to user
            dispatch({ type: 'USER_REGISTER_FAILURE', payload: error.response ? error.response.data : error.message });

            // Call failure callback
            onFailure('Registration failed. Please try again. Maybe the email is already in use.');
        }
    };
};

export const fetchUsersActionApi = () => {
    return async (dispatch) => {
        try {
            const res = await getAllUser();
            const action = setUserAction(res.data);
            dispatch(action);
        } catch (error) {
            console.error("Failed to fetch users:", error.response ? error.response.data : error.message);
        }
    };
};

export const fetchUserByIdActionApi = (userId) => {
    console.log('Fetching userId:', userId);
    return async (dispatch) => {
        try {
            const res = await getUserProfile(userId);  
            console.log('Fetched user profile:',res); 
            const action = setUserDetailAction(res.data);
            dispatch(action);
        } catch (error) {
            console.error("Failed to fetch user by ID:", error.response ? error.response.data : error.message);
        }
    };
};
export const fetchUserByIdAction = (userId) => {
    console.log('Fetching userId:', userId);
    return async (dispatch) => {
        try {
            const res = await getUserProfile(userId); 
            const action = setProfileAction(res.data);
            dispatch(action);
            return res.data;
        } catch (error) {
            console.error("Failed to fetch user by ID:", error.response ? error.response.data : error.message);
        }
    };
};

export const updateUserActionApi = (userId, userDetails) => {
    return async (dispatch) => {
        try {
            console.log('Updating user:', userDetails);
            const res = await updateDetailUser(userId, userDetails);
            console.log('Updated user:', res.data);
            const action = updateUserAction(res.data);
            dispatch(action);   
        } catch (error) {
            console.error("Failed to update user:", error.response ? error.response.data : error.message);
        }
    };
};

export const removeUserActionApi = (userId, navigate) => {
    return async (dispatch) => {
        try {
            await removeUser(userId, navigate);
            const action = removeUserAction(userId);
             dispatch(action);
            
        } catch (error) {
            console.error("Failed to remove user:", error.response ? error.response.data : error.message);
        }
    };
};

export const logoutActionApi = (navigate) => {
    return (dispatch) => {
        // Xóa dữ liệu người dùng khỏi localStorage và cookie
        deleteCookieJson(USER_LOGIN);
        localStorage.removeItem(USER_LOGIN);
        
        // Dispatch hành động để xóa thông tin người dùng khỏi Redux store
        dispatch(logoutAction());

        // Điều hướng tới trang đăng nhập
        navigate('/login');
    };
};

export const createUsersActionApi = (userRegister) => {
    return async (dispatch) => {
        try {
            const res = await createUser(userRegister);
            const action = registerAction(res.data);
            dispatch(action);

        } catch (error) {
            console.error("Failed to create user:", error.response ? error.response.data : error.message);
        }

}
}