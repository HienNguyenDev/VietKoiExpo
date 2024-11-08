// src/actions/imageUploadActions.js
import { uploadImageAPI } from '../../../service/u';
import { setImageUrl, setLoading, setError } from '../reducers/uploadReducer';

// Async thunk để upload ảnh lên Cloudinary
export const uploadImageAction = (imageFile) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    const response = await uploadImageAPI(imageFile);// Cập nhật URL của ảnh đã upload
    dispatch(setImageUrl(response.secure_url));
    return response.secure_url; // Trả về URL ảnh
  } catch (error) {
    dispatch(setError(error.message)); // Cập nhật lỗi nếu có
  } finally {
    dispatch(setLoading(false)); // Kết thúc trạng thái tải
  }
};
