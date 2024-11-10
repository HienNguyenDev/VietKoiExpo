import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import navigate from react-router-dom
import { Layout, Input, Button, Form, Typography, Card, Row, Col, Avatar, Space, message } from 'antd';
import { fetchUserByIdActionApi, updateUserActionApi } from '../../../../src/store/redux/action/userAction'; // Import actions
import AccountMenu from '../../shared/AccountMenu/AccountMenu'; // Import AccountMenu

const { Header, Content } = Layout;
const { Title } = Typography;

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get navigate function from react-router-dom

  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const userLogin = useSelector(state => state.userReducer.userLogin);
  const userDetails = useSelector(state => state.userReducer.userDetails);

  // Handle editing user information
  const handleEdit = () => {
    form.setFieldsValue({
      fullName: userLogin?.fullName,
      email: userLogin?.email,
      phone: userLogin?.phone,
      address: userLogin?.address,
      password: userLogin?.password, // Ensure password is not changed
    });
    setIsEditing(true); // Enable editing mode
  };

  const handleCancel = () => {
    setIsEditing(false); // Disable editing mode
  };

  const handleSubmit = (values) => {
    const { password, ...otherValues } = values; // Separate password

    // If password is provided, include it in the user details
    const userDetails = {
      ...otherValues, 
      password:  userLogin?.password, // Keep the old password if not updated
      userId: userLogin?.userId, // Always include userId
    };

    // Dispatch API to update user information and redirect after successful update
    dispatch(updateUserActionApi(userDetails.userId, userDetails, navigate))
      .then(() => {
        message.success('Profile updated successfully!');
        setIsEditing(false); // Disable editing mode
      })
      .catch(() => {
        message.error('Profile update failed, please try again!');
      });
  };

  if (!userLogin) {
    return null; // Render nothing if userLogin is null
  }

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw' }}>
      <Header
        style={{
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'dark', // Change to a valid color value
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
        <div>
          <AccountMenu />
        </div>
      </Header>
      <Content style={{ padding: '80px 24px', marginTop: '64px' }}>
        
        <Card style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
          <Title level={3}>Personal Information</Title>
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
                  fullName: userLogin?.fullName,
                  email: userLogin?.email,
                  phone: userLogin?.phone,
                  address: userLogin?.address,
                  roleId: userLogin?.roleId, // Cannot edit
                  status: userLogin?.status, // Cannot edit
                  password: userLogin?.password, // Retain old password if not updated
                }}
                layout="vertical"
              >
                <Form.Item label="Full Name" name="fullName">
                  <Input disabled={!isEditing} />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input disabled={!isEditing} />
                </Form.Item>
                <Form.Item label="Phone Number" name="phone">
                  <Input disabled={!isEditing} />
                </Form.Item>
                <Form.Item label="Address" name="address">
                  <Input disabled={!isEditing} />
                </Form.Item>
                <Form.Item label="Role" name="roleId">
                  <Input value={userDetails?.roleId} disabled />
                </Form.Item>
                <Form.Item label="Status" name="status">
                  <Input value={userDetails?.status} disabled />
                </Form.Item>
                
                <Form.Item>
                  <Space>
                    {!isEditing ? (
                      <Button type="primary" onClick={handleEdit}>
                        Edit
                      </Button>
                    ) : (
                      <>
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                        <Button type="default" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </>
                    )}
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