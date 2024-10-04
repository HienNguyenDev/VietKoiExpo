import axios from 'axios';
import { USER_LOGIN,USER_REGISTER, getStoreJson, setCookieJson, setStoreJson, removeStoreJson, removeCookieJson } from '../../../util/config';
import { loginAction, registerAction, updateUserAction, removeUserAction } from '../reducers/userReducer';
import { loginUser, registerUser } from '../../../service/userAPI';

//async actions
export const loginActionApi=(userLogin,history)=>{
    return async (dispatch) =>{
        try {
           const res=await loginUser(userLogin);
            const action=loginAction(res.data.content);
            dispatch(action)
            setStoreJson(USER_LOGIN,res.data.content);
            setCookieJson(USER_LOGIN,res.data.content,30);

            // Check user role and navigate to the correct page
            if (res.data.content.role === 'admin') {
                history.push('/admin');
            } else if (res.data.content.role === 'user') {
                history.push('/user');
            } else {
                // default route if role is not recognized
                history.push('/');
            }
        } catch (error) {
            console.error(error);   
        }
    }
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
            if (res.data.content.role === 'admin') {
                history.push('/admin');
            } else if (res.data.content.role === 'user') {
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

export const updateUserActionApi=(userDetails,history)=>{
    // existing update user code
};

export const removeUserActionApi=(history)=>{
    // existing remove user code
};