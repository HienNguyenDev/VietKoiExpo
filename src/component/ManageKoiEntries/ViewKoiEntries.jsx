import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Image, Spin, Button, Modal, Input, Form, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateKoiDetail } from '../../store/redux/action/koiRegisterAction';
import axios from 'axios';
import styles from './ViewKoiEntries.module.scss';
import UploadImageComponent from '../../component/shared/UploadImage/UploadImage';

const { Option } = Select;

const ViewKoiEntries = () => {
  const [localKoi, setLocalKoi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentKoi, setCurrentKoi] = useState(null);
  const [form] = Form.useForm();
  
  const userId = useSelector(state => state.userReducer.userLogin.userId);
  const fullName = useSelector(state => state.userReducer.userLogin.fullName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKoiEntries = async () => {
      try {
        const response = await axios.get(`https://localhost:7246/api/Koifish/user/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        setLocalKoi(response.data);
      } catch (error) {
        console.error('Error fetching Koi entries:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchKoiEntries();
    }
  }, [userId]);

  const handleUpdate = (koi) => {
    setCurrentKoi(koi);
    setIsModalVisible(true);
    form.setFieldsValue({
      koiName: koi.koiName,
      size: koi.size,
      age: koi.age,
      varietyId: koi.varietyId,
      imageUrl: koi.imageUrl,
      userId: userId,
      status: koi.status
    });
  };

  const handleDelete = (koi) => {
    
    dispatch(updateKoiDetail(koi.koiId, { 
      koiName: koi.koiName,
      size: koi.size,
      age: koi.age,
      varietyId: koi.varietyId,
      imageUrl: koi.imageUrl,
      userId,
      status: false })); // Update koi status to false instead of deleting
    setLocalKoi((prev) => prev.filter((a) => a.koiId !== koi.koiId));
  };

  const handleModalOk = (values) => {
    const { koiName, size, age, varietyId, imageUrl, status } = values;
    const updatedData = { koiName, size, age, varietyId, imageUrl, userId, status:true };
    dispatch(updateKoiDetail(currentKoi.koiId, updatedData));
    setLocalKoi((prev) => 
      prev.map((koi) => 
        koi.koiId === currentKoi.koiId ? { ...koi, ...updatedData } : koi
      )
    );
    setIsModalVisible(false);
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className={styles.viewKoiEntries}>
      <Button className={styles.backButton} onClick={() => navigate('/home')}>Back to Homepage</Button>
      <Typography.Title level={2} className={styles.title}>View Koi Entries</Typography.Title>
      <Row gutter={[16, 16]}>
        {localKoi.map(koi => (
          <Col key={koi.koiId} span={8}>
            <Card
              hoverable
              cover={<Image alt={koi.koiName} src={koi.imageUrl || 'https://via.placeholder.com/150'} />}
              className={styles.koiCard}
            >
              <Card.Meta title={koi.koiName} description={<p style={{color:'#ffffff'}}><strong>Variety:</strong>{koi.varietyId}</p>} />
              <div className={styles.koiDetails}>
                <p><strong>Owner:</strong> {fullName}</p>
                <p><strong>Size:</strong> {koi.size} cm</p>
                <p><strong>Age:</strong> {koi.age} years</p>
                <p><strong>Status:</strong> {koi.status ? 'Active' : 'Inactive'}</p>
                <Button onClick={() => handleUpdate(koi)}>Edit</Button>
                <Button danger onClick={() => handleDelete(koi)}>Delete</Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Update Koi Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleModalOk}
        >
          <Form.Item label="Koi Name" name="koiName">
            <Input />
          </Form.Item>
          <Form.Item label="Size (cm)" name="size">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Age (years)" name="age">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Variety" name="varietyId">
            <Select>
              <Option value="kohaku">Kohaku</Option>
              <Option value="sanke">Sanke (Taisho Sanke)</Option>
              <Option value="showa">Showa (Showa Sanshoku)</Option>
              <Option value="utsuri">Utsuri</Option>
              <Option value="tancho">Tancho</Option>
              <Option value="bekko">Bekko</Option>
              <Option value="asagi">Asagi</Option>
              <Option value="koromo">Koromo</Option>
              <Option value="goromo">Goromo</Option>
              <Option value="shiroUtsuri">Shiro Utsuri</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Upload Image" name="imageUrl">
            <UploadImageComponent 
              onSuccess={(url) => form.setFieldsValue({ imageUrl: url })}
              defaultUrl={form.getFieldValue('imageUrl')}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Update</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewKoiEntries;
