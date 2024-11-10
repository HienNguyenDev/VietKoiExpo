import axios from 'axios';
import { USER_LOGIN, USER_REGISTER, getStoreJson, setCookieJson, setStoreJson, removeStoreJson, removeCookieJson, deleteCookieJson } from '../../../util/config';
import { loginAction, registerAction, updateUserAction, removeUserAction, setUserAction, setUserDetailAction } from '../../redux/reducers/userReducer';
import { getAllUser, getUserProfile, loginUser, loginWithGoogle, registerUser, updateDetailUser, removeUser, createUser } from '../../../service/userAPI';

// async actions
export const loginActionApi = (userLogin, navigate) => {
    return async (dispatch) => {
        try {
            let res;
            if (userLogin.tokenId) {
                // Handle Google login
                res = await loginWithGoogle(userLogin.tokenId);
            } else {
                // Handle normal login
                res = await loginUser(userLogin);
            }

            console.log('API Response:', res);
            console.log('res.data:', res.data);
            console.log('API Response Content:', res.data.user);

            if (res && res.data && res.data.user) {
                const action = loginAction(res.data.user);
                dispatch(action);
                setStoreJson(USER_LOGIN, res.data.user);
                setCookieJson(USER_LOGIN, res.data.user, 30);

                // Navigate based on role
                if (res.data.user.roleId === 'manager') {
                    navigate('/admin');
                } else if (res.data.user.roleId === 'staff') {
                    navigate('/admin');
                } else if (res.data.user.roleId === 'judge') {
                    navigate('/referee');
                } else if (res.data.user.roleId === 'member') {
                    navigate('/home');
                }
            }
        } catch (error) {
            console.error('Error in loginActionApi:', error);
        }
    };
};

export const registerActionApi = (userRegister, navigate) => {
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
            if (res.data.content.roleId === 'manager') {
                navigate('/admin');
            } else if (res.data.content.roleId === 'user') {
                navigate('/user');
            } else {
                navigate('/');
            }
        } catch (error) {
            // Handle error: show message or dispatch an error action
            console.error("Registration failed:", error.response ? error.response.data : error.message);
            
            // Dispatch error action or show message to user
            dispatch({ type: 'USER_REGISTER_FAILURE', payload: error.response ? error.response.data : error.message });
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
            console.log('Fetched user profile:', res); 
            const action = setUserDetailAction(res.data);
            dispatch(action);
        } catch (error) {
            console.error("Failed to fetch user by ID:", error.response ? error.response.data : error.message);
        }
    };
};

export const updateUserActionApi = (userId, userDetails) => {
    return async (dispatch) => {
        try {
            const res = await updateDetailUser(userId, userDetails);
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