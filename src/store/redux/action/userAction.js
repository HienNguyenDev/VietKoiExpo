import axios from 'axios';
import { USER_LOGIN,USER_REGISTER, getStoreJson, setCookieJson, setStoreJson, removeStoreJson, removeCookieJson } from '../../../util/config';
import { loginAction, registerAction, updateUserAction, removeUserAction, setUserAction } from '../reducers/userReducer';
import { loginUser, registerUser } from '../../../service/userAPI';

//async actions
export const loginActionApi = (userLogin) => {
    return async (dispatch) => {
        try {
            const res = await loginUser(userLogin);
            console.log('API Response:', res);
            console.log('res.data:', res.data);
            console.log('API Response Content:', res.data.user);

            if (res && res.data && res.data.user) {
                const action = loginAction(res.data.user);
                dispatch(action);
                setStoreJson(USER_LOGIN, res.data.user);
                setCookieJson(USER_LOGIN, res.data.user, 30);

                // Ví dụ điều hướng dựa trên vai trò
                 if (res.data.user.roleId === 'R001') {
                     history.push('/admin');
                 } else {
                     history.push('/user');
                }

            } 
        } catch (error) {
            console.error('Error in loginActionApi:', error);
            // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi cho người dùng
        }
    };
};
export const registerActionApi = (userRegister, history) => {
    return async (dispatch) => {
        try {
           const res=await registerUser(userRegister);

            // Sau khi đăng ký thành công, dispatch action để cập nhật state
            const action = registerAction(res.data.content);
            dispatch(action);

            // Lưu thông tin người dùng vào localStorage và cookie nếu cần
            setStoreJson(USER_REGISTER, res.data.content);
            setCookieJson(USER_REGISTER, res.data.content, 30);

            // Điều hướng người dùng đến trang tương ứng sau khi đăng ký
            if (res.data.content.roleId === 'admin') {
                history.push('/admin');
            } else if (res.data.content.roleId === 'user') {
                history.push('/user');
            } else {
                history.push('/');
            }

        } catch (error) {
            // Xử lý lỗi: hiển thị thông báo hoặc dispatch một action báo lỗi
            console.error("Đăng ký thất bại:", error.response ? error.response.data : error.message);
            
            // Dispatch action báo lỗi hoặc hiển thị thông báo cho người dùng
            dispatch({ type: 'USER_REGISTER_FAILURE', payload: error.response ? error.response.data : error.message });
        }
    };
};

export const fetchUsersActionApi = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/users'); 
            const action = setUserAction(res.data);
            dispatch(action);
        } catch (error) {
            console.error("Failed to fetch users:", error.response ? error.response.data : error.message);
        }
    };
};

export const updateUserActionApi=(userDetails,history)=>{
    // existing update user code
};

export const removeUserActionApi=(history)=>{
    // existing remove user code
};

