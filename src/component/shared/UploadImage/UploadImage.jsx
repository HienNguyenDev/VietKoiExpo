// UploadImageComponent.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadImageAction } from '../../../store/redux/action/uploadAction';

const UploadImageComponent = ({ onSuccess, defaultUrl }) => {
  const dispatch = useDispatch();
  const [uploadedUrl, setUploadedUrl] = useState(defaultUrl || ''); 
  const loading = useSelector(state => state.uploadReducer.loading);

  const handleImageUpload = async (file) => {
    try {
      const response = await dispatch(uploadImageAction(file));
      if (response) {
        setUploadedUrl(response); // Cập nhật URL từ ảnh upload
        onSuccess(response); // Gọi callback khi upload thành công
        message.success("Ảnh đã được tải lên thành công!");
      }
    } catch (error) {
      message.error("Tải lên thất bại, vui lòng thử lại.");
    }
    return false; // Ngăn upload tự động của antd
  };

  return (
    <div>
      <Upload
        customRequest={({ file }) => handleImageUpload(file)}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />} loading={loading} style={{ marginBottom: '10px' }}>
          {uploadedUrl ? "Thay đổi ảnh" : "Upload Ảnh"}
        </Button>
      </Upload>
      {uploadedUrl && (
        <img src={uploadedUrl} alt="Uploaded" style={{ width: '100px', marginTop: '10px' }} />
      )}
    </div>
  );
};

export default UploadImageComponent;
