// src/api/cloudinaryApi.js
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dyv4nmtwl/image/upload';
const UPLOAD_PRESET = 'VietKoiExpo';
const FOLDER_NAME = 'VietKoiExpo';

// Hàm upload ảnh lên Cloudinary
export const uploadImageAPI = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', FOLDER_NAME); // Thư mục lưu ảnh trên Cloudinary

    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
