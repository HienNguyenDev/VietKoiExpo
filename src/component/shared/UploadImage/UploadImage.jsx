// UploadImageComponent.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, Button, Input, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadImageAction } from '../../../store/redux/action/uploadAction';

const UploadImageComponent = ({ onSuccess, defaultUrl }) => {
  const dispatch = useDispatch();
  const [uploadedUrl, setUploadedUrl] = useState(defaultUrl || '');
  const [inputUrl, setInputUrl] = useState(''); // Trạng thái cho URL nhập vào
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

  const handleInputUrlChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleInputUrlSubmit = () => {
    setUploadedUrl(inputUrl); // Sử dụng URL nhập vào thay cho URL upload
    onSuccess(inputUrl); // Gọi callback với URL nhập vào
    message.success("URL ảnh đã được cập nhật!");
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
      <Input
        placeholder="Hoặc nhập URL ảnh"
        value={inputUrl}
        onChange={handleInputUrlChange}
        onPressEnter={handleInputUrlSubmit}
        style={{ marginTop: '10px', marginBottom: '10px' }}
      />
      <Button onClick={handleInputUrlSubmit} type="primary" disabled={!inputUrl}>
        Cập nhật URL
      </Button>
      {uploadedUrl && (
        <img src={uploadedUrl} alt="Uploaded" style={{ width: '100px', marginTop: '10px' }} />
      )}
    </div>
  );
};

export default UploadImageComponent;
