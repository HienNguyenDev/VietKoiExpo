  import React, { useState, useEffect } from 'react';
  import { useSelector, useDispatch } from 'react-redux';
  import { useNavigate } from 'react-router-dom';
  import { Layout, Input, Button, Form, Typography, Card, Row, Col, Avatar, Space, message, Spin } from 'antd';
  import { fetchUserByIdActionApi, updateUserActionApi } from '../../../../src/store/redux/action/userAction';
  import AccountMenu from '../../shared/AccountMenu/AccountMenu';
  import { updateUserLoginAction } from '../../../store/redux/reducers/userReducer';
  import UploadImageComponent from '../UploadImage/UploadImage';
  const { Header, Content } = Layout;
  const { Title } = Typography;

    const MyProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const userLogin = useSelector((state) => state.userReducer.userLogin);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/User/${userLogin.userId}`,
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          );
          const userData = await response.json();
          
          // Update form with fetched data
          form.setFieldsValue({
            roleId: userData.roleId,
            email: userData.email,
            fullName: userData.fullName,
            phone: userData.phone,
            address: userData.address,
            imageUrl: userData.imageUrl,
            experience: userData.experience,
            status: userData.status
          });
  
          // Update Redux store
          dispatch(updateUserLoginAction(userData));
        } catch (error) {
          message.error('Không thể tải thông tin người dùng: ' + error.message);
        } finally {
          setLoading(false);
        }
      };
  
      if (userLogin?.userId) {
        fetchUserData();
      }
    }, [userLogin?.userId, form, dispatch]);
  
    const handleSubmit = async (values) => {
      try {
        const userDetails = {
          roleId: userLogin?.roleId,
          password: values.password || userLogin?.password,
          email: values.email,
          fullName: values.fullName,
          phone: values.phone,
          address: values.address,
          imageUrl: values.imageUrl,
          experience: Number(values.experience) || 0,
          status: true
        };
  
        await dispatch(updateUserActionApi(userLogin.userId, userDetails));
        message.success('Cập nhật thông tin thành công!');
        
        // Refetch user data
        const response = await fetch(
          `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/User/${userLogin.userId}`
        );
        const updatedUserData = await response.json();
        dispatch(updateUserLoginAction(updatedUserData));
      } catch (error) {
        message.error('Cập nhật thất bại: ' + error.message);
      }
    };
  
    if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin size="large" />
        </div>
      );
    }
  
    // Rest of your component render code...
    

    if (!userLogin) {
      return null; // Render nothing if userLogin is null
    }

    return (
      <Layout style={{ minHeight: '100vh', width: '100vw' }}>
        <div>
          {/* back to home page */}
          <Button
            type="primary"
          
            onClick={() => navigate(-1)}
          >
            Quay lại neeeeeeeeeeeeeeeeeeeeeeeeeee
          </Button>
        </div>
        <Header
          style={{
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#333', // Adjust to a valid color
            position: 'fixed',
            width: '100%',
            zIndex: 1000,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://imgur.com/V1zXtZN.jpg"
              alt="VietKoiExpo Logo"
              style={{ height: '40px', marginRight: '12px' }}
            />
            <h2 style={{ margin: 0, color: 'cyan' }}>VietKoiExpo</h2>
          </div>
          <AccountMenu userAvatar={<Avatar src={userLogin?.imageUrl || 'https://via.placeholder.com/80'} size={40} />} />
        </Header>
        <Content style={{ padding: '80px 24px', marginTop: '64px' }}>
          <Card style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
            <Title level={3}>Thông Tin Cá Nhân</Title>
            <Row gutter={24} justify="center">
              <Col span={24} style={{ textAlign: 'center', marginBottom: 24 }}>
                <Avatar
                  size={80}
                  src={userLogin?.imageUrl || 'https://via.placeholder.com/80'}
                  style={{ marginBottom: 16 }}
                />
                <Title level={4}>{userLogin?.fullName}</Title>
              </Col>
              <Col span={12}>
                <Form
                  form={form}
                  onFinish={handleSubmit}
                  initialValues={{
                    roleId: userLogin?.roleId,
                    password: userLogin?.password,
                    email: userLogin?.email,
                    fullName: userLogin?.fullName,
                    phone: userLogin?.phone,
                    address: userLogin?.address,
                    imageUrl: userLogin?.imageUrl,
                    experience: userLogin?.experience,
                    status: userLogin?.status,
                  }}
                  layout="vertical"
                >
                  <Form.Item label="Họ và tên" name="fullName">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Số điện thoại" name="phone">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Địa chỉ" name="address">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Mật khẩu" name="password">
                    <Input.Password />
                  </Form.Item>
                  <Form.Item label="Ảnh Đại Diện" name="imageUrl">
                    <UploadImageComponent
                      onSuccess={(url) => form.setFieldsValue({ imageUrl: url })}
                      defaultUrl={userLogin?.imageUrl || 'https://via.placeholder.com/80'}
                    />
                  </Form.Item>
                  <Form.Item label="Kinh nghiệm" name="experience">
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item label="Vai trò" name="roleId">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item label="Trạng thái" name="status">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item>
                    <Space>
                      <Button type="default" onClick={() => navigate(-1)}>
                        Quay lại
                      </Button>
                      <Button type="primary" htmlType="submit">
                        Lưu
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
        </Content>
      </Layout>
    );
  };

  export default MyProfile;