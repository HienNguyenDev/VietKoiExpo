import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Card, Image, Spin, Button, Modal, Input, Form, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateKoiDetail } from '../../store/redux/action/koiRegisterAction';
import axios from 'axios';
import UploadImageComponent from '../../component/shared/UploadImage/UploadImage';
import AccountMenu from '../../component/shared/AccountMenu/AccountMenu';

const { Header, Content } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

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

  const currentTheme = {
    palette: {
      background: { default: '#f0f2f5' },
      primary: { main: '#1890ff' },
      text: { primary: '#333' }
    }
  };

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
        message.error('Error fetching Koi entries');
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
      status: false
    }));
    setLocalKoi((prev) => prev.filter((a) => a.koiId !== koi.koiId));
    message.success('Koi entry deleted successfully');
  };

  const handleModalOk = (values) => {
    const { koiName, size, age, varietyId, imageUrl } = values;
    const updatedData = { koiName, size, age, varietyId, imageUrl, userId, status: true };
    dispatch(updateKoiDetail(currentKoi.koiId, updatedData));
    setLocalKoi((prev) => 
      prev.map((koi) => 
        koi.koiId === currentKoi.koiId ? { ...koi, ...updatedData } : koi
      )
    );
    setIsModalVisible(false);
    message.success('Koi entry updated successfully');
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw', backgroundColor: currentTheme.palette.background.default }}>
      <Header
        style={{
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: currentTheme.palette.background.default,
          position: 'fixed',
          width: '100%',
          zIndex: 1000,
          color: currentTheme.palette.text.primary,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="https://imgur.com/V1zXtZN.jpg"
            alt="VietKoiExpo Logo"
            style={{ height: '40px', marginRight: '12px' }}
          />
          <Typography.Title level={3} style={{ fontWeight: 'bold', color: currentTheme.palette.primary.main, margin: 0 }}>
            VietKoiExpo
          </Typography.Title>
        </div>
      </Header>

      <Content style={{ padding: '80px 24px', marginTop: '64px', maxWidth: '1200px', margin: 'auto' }}> {/* Account for fixed header height */}
        <Button style={{ marginBottom: '20px' }} onClick={() => navigate('/home')} type="primary">
          Back to Homepage
        </Button>
        <Title level={2}>View Koi Entries</Title>
        
        <Row gutter={[24, 24]} justify="center">
          {localKoi.map(koi => (
            <Col key={koi.koiId} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ borderRadius: '10px', overflow: 'hidden' }}
                cover={
                  <Image
                    alt={koi.koiName}
                    src={koi.imageUrl || 'https://via.placeholder.com/150'}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                }
                actions={[
                  <Button type="link" onClick={() => handleUpdate(koi)}>Edit</Button>,
                  <Button type="link" danger onClick={() => handleDelete(koi)}>Delete</Button>
                ]}
              >
                <Card.Meta 
                  title={<Title level={4} style={{ margin: 0 }}>{koi.koiName}</Title>} 
                  description={
                    <>
                      <Text strong>Variety:</Text> {koi.varietyId}<br />
                      <Text strong>Owner:</Text> {fullName}<br />
                      <Text strong>Size:</Text> {koi.size} cm<br />
                      <Text strong>Age:</Text> {koi.age} years<br />
                      <Text strong>Status:</Text> {koi.status ? 'Active' : 'Inactive'}
                    </>
                  } 
                />
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
            <Form.Item label="Koi Name" name="koiName" rules={[{ required: true, message: 'Please enter a koi name' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Size (cm)" name="size" rules={[{ required: true, message: 'Please enter the size' }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Age (years)" name="age" rules={[{ required: true, message: 'Please enter the age' }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Variety" name="varietyId" rules={[{ required: true, message: 'Please select a variety' }]}>
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
              <Button type="primary" htmlType="submit" block>Update</Button>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ViewKoiEntries;
