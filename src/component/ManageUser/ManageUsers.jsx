import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Col, Divider, Drawer, List, Row, Typography, Modal, Form, Input, Card } from 'antd';
import { EditOutlined, DeleteOutlined, UserSwitchOutlined, PlusOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons';
import styles from '../../asset/scss/ManageUsersPage.module.scss';
import { fetchUserByIdActionApi, fetchUsersActionApi, removeUserActionApi } from '../../store/redux/action/userAction';

const { Title, Paragraph } = Typography;
const { confirm } = Modal;

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const ManageUsersPage = () => {
  const [open, setOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('User Profile');
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [isViewMode, setIsViewMode] = useState(false);

  const dispatch = useDispatch();
  const usersData = useSelector(state => state.userReducer.listUser);

  useEffect(() => {
    dispatch(fetchUsersActionApi());
  }, [dispatch]);

  const showDrawer = async (title, user = null, viewMode = false) => {
    setDrawerTitle(title);
    setIsViewMode(viewMode);
    if (user) {
      await dispatch(fetchUserByIdActionApi(user.id));
      setSelectedUser(user);
      form.setFieldsValue(user);
    } else {
      setSelectedUser(null);
      form.resetFields();
    }
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      onOk() {
        dispatch(removeUserActionApi(id));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div className={styles.manageUsersPage}>
      <div className={styles.containerUsers}>
        <Row gutter={16}>
          <Col span={24}>
            <div className={styles.viewComponent}>
              <Card title="Manage Users" className={styles.viewAllCard}>
                <Button type="link" className={styles.createUserButton} onClick={() => showDrawer('Create User')}>
                  <PlusOutlined /> Create User
                </Button>
                <List
                  itemLayout="horizontal"
                  dataSource={usersData}
                  renderItem={item => (
                    <List.Item
                      key={item.id}
                      actions={[
                        <Button type="link" icon={<EyeOutlined />} onClick={() => showDrawer('View User', item, true)}>View</Button>,
                        <Button type="link" icon={<EditOutlined />} onClick={() => showDrawer('Update User', item)}>Update</Button>,
                        <Button type="link" icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(item.id)}>Delete</Button>,
                        <Button type="link" icon={<UserSwitchOutlined />} onClick={() => console.log('Change role for user id:', item.id)}>Change Role</Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src="https://via.placeholder.com/40" />}
                        title={<a href="https://ant.design/index-cn">{item.name}</a>}
                        description={`${item.email} - ${item.role}`}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
      <Drawer
        title={drawerTitle}
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        {isViewMode ? (
          selectedUser && (
            <div>
              <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>User Profile</p>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="User ID" content={selectedUser.userId} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Role ID" content={selectedUser.roleId} />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Full Name" content={selectedUser.fullName} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Email" content={selectedUser.email} />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Phone" content={selectedUser.phone} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Role" content={selectedUser.role} />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="City" content={selectedUser.city} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Country" content={selectedUser.country} />
                </Col>
              </Row>
              <Divider />
              <Button type="primary" onClick={onClose}>Close</Button>
            </div>
          )
        ) : (
          <Form layout="vertical" form={form}>
            <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please enter the full name' }]}>
              <Input placeholder="Please enter the full name" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter the email' }]}>
              <Input placeholder="Please enter the email" />
            </Form.Item>
            <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please enter the role' }]}>
              <Input placeholder="Please enter the role" />
            </Form.Item>
            <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please enter the city' }]}>
              <Input placeholder="Please enter the city" />
            </Form.Item>
            <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Please enter the country' }]}>
              <Input placeholder="Please enter the country" />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter the phone number' }]}>
              <Input placeholder="Please enter the phone number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={onClose}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default ManageUsersPage;