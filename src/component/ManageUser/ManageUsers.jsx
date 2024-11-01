import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Col, Divider, Drawer, List, Row, Typography, Modal, Form, Input, Card, Table } from 'antd';
import { EditOutlined, DeleteOutlined, UserSwitchOutlined, ExclamationCircleOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import styles from '../../asset/scss/ManageUsersPage.module.scss';
import { fetchUserByIdActionApi, fetchUsersActionApi, removeUserActionApi, updateUserActionApi } from '../../store/redux/action/userAction';

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
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const usersData = useSelector(state => state.userReducer.listUser);
  const userDetailData = useSelector(state => state.userReducer.userDetail);

  useEffect(() => {
    dispatch(fetchUsersActionApi());
  }, [dispatch]);

  // Ensure usersData is an array
  useEffect(() => {
    if (!Array.isArray(usersData)) {
      console.error('usersData is not an array:', usersData);
    }
  }, [usersData]);

  const showDrawer = (title, user = null) => {
    setDrawerTitle(title);
    setSelectedUser(user);
    setOpen(true); // Show the drawer first

    if (user) {
      form.setFieldsValue({
        fullName: userDetailData.fullName || '',
        email: userDetailData.email || '',
        role: userDetailData.role || '',
        address: userDetailData.address || '',
        phone: userDetailData.phone || '',
      });
    } else {
      form.resetFields();
    }
  };

  const closeDrawer = () => {
    setOpen(false);
    setSelectedUser(null);
    form.resetFields();
  };

  const handleCreate = () => {
    showDrawer('Create User');
  };

  const handleUpdate = (id) => {
    const user = usersData.find(user => user.userId === id);
    if (user) {
      showDrawer('Update User', user);
    }
  };

  const handleView = async (id) => {
    try {
      dispatch(fetchUserByIdActionApi(id));
      showDrawer('View User', { userId: id });
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      onOk() {
        dispatch(removeUserActionApi(id));
      },
    });
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const formattedValues = {
        ...values,
        status: true, // Assuming status is always true for simplicity
      };
      console.log('Submitting values:', formattedValues); // Debugging log
     if (drawerTitle === 'Update User' && selectedUser) {
        dispatch(updateUserActionApi(selectedUser.userId, formattedValues));
      }
      closeDrawer();
    }).catch(errorInfo => {
      console.error('Validation Failed:', errorInfo);
    });
  };

  const columns = [
    { title: 'Name', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => (status ? 'Active' : 'Inactive') },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.userId)}>View</Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleUpdate(record.userId)}>Update</Button>
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.userId)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.manageUsersPage}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} style={{ marginBottom: 16 }}>
        Create User
      </Button>
      <Table dataSource={Array.isArray(usersData) ? usersData : []} columns={columns} rowKey="userId" />
      <Drawer
        title={drawerTitle}
        width={640}
        onClose={closeDrawer}
        visible={open}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true, message: 'Please enter the full name' }]}>
            <Input placeholder="Please enter the full name" disabled={drawerTitle === 'View User'} />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter the email' }]}>
            <Input placeholder="Please enter the email" disabled={drawerTitle === 'View User'} />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please enter the role' }]}>
            <Input placeholder="Please enter the role" disabled={drawerTitle === 'View User'} />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter the address' }]}>
            <Input placeholder="Please enter the address" disabled={drawerTitle === 'View User'} />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter the phone number' }]}>
            <Input placeholder="Please enter the phone number" disabled={drawerTitle === 'View User'} />
          </Form.Item>
          {drawerTitle !== 'View User' && (
            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          )}
        </Form>
      </Drawer>
    </div>
  );
};

export default ManageUsersPage;