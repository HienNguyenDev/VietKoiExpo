import React, { useState } from 'react';
import { Avatar, Button, Col, Divider, Drawer, List, Row, Typography, Modal, Form, Input, Card } from 'antd';
import { EditOutlined, DeleteOutlined, UserSwitchOutlined, PlusOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons';
import styles from '../../asset/scss/ManageUsersPage.module.scss';

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

  const usersData = [
    { id: 1, name: 'Nguyen Van A', email: 'nguyenvana@gmail.com', role: 'Admin', city: 'Hanoi', country: 'Vietnam', phone: '+84 912 345 678' },
    { id: 2, name: 'Le Thi B', email: 'lethib@gmail.com', role: 'User', city: 'Ho Chi Minh City', country: 'Vietnam', phone: '+84 913 456 789' },
    { id: 3, name: 'Tran Van C', email: 'tranvanc@gmail.com', role: 'User', city: 'Da Nang', country: 'Vietnam', phone: '+84 914 567 890' },
    { id: 4, name: 'Pham Thi D', email: 'phamthid@gmail.com', role: 'Admin', city: 'Hai Phong', country: 'Vietnam', phone: '+84 915 678 901' },
    { id: 5, name: 'Vo Van E', email: 'vovane@gmail.com', role: 'User', city: 'Can Tho', country: 'Vietnam', phone: '+84 916 789 012' },
    { id: 6, name: 'Dang Thi F', email: 'dangthif@gmail.com', role: 'Admin', city: 'Nha Trang', country: 'Vietnam', phone: '+84 917 890 123' },
    { id: 7, name: 'Hoang Van G', email: 'hoangvang@gmail.com', role: 'User', city: 'Hue', country: 'Vietnam', phone: '+84 918 901 234' },
    { id: 8, name: 'Ngo Thi H', email: 'ngothih@gmail.com', role: 'Admin', city: 'Da Lat', country: 'Vietnam', phone: '+84 919 012 345' },
    { id: 9, name: 'Bui Van I', email: 'buivani@gmail.com', role: 'User', city: 'Vung Tau', country: 'Vietnam', phone: '+84 920 123 456' },
    { id: 10, name: 'Nguyen Thi J', email: 'nguyenthij@gmail.com', role: 'Admin', city: 'Quy Nhon', country: 'Vietnam', phone: '+84 921 234 567' },
    { id: 11, name: 'Pham Van K', email: 'phamvank@gmail.com', role: 'User', city: 'Bien Hoa', country: 'Vietnam', phone: '+84 922 345 678' },
    { id: 12, name: 'Tran Thi L', email: 'tranthil@gmail.com', role: 'User', city: 'Buon Ma Thuot', country: 'Vietnam', phone: '+84 923 456 789' },
    { id: 13, name: 'Vo Thi M', email: 'vothim@gmail.com', role: 'Admin', city: 'Phu Quoc', country: 'Vietnam', phone: '+84 924 567 890' },
    { id: 14, name: 'Le Van N', email: 'levann@gmail.com', role: 'User', city: 'Long Xuyen', country: 'Vietnam', phone: '+84 925 678 901' },
    { id: 15, name: 'Hoang Thi O', email: 'hoangthio@gmail.com', role: 'Admin', city: 'Rach Gia', country: 'Vietnam', phone: '+84 926 789 012' },
    { id: 16, name: 'Dang Van P', email: 'dangvanp@gmail.com', role: 'User', city: 'Thanh Hoa', country: 'Vietnam', phone: '+84 927 890 123' },
    { id: 17, name: 'Ngo Van Q', email: 'ngovaneq@gmail.com', role: 'User', city: 'Vinh', country: 'Vietnam', phone: '+84 928 901 234' },
    { id: 18, name: 'Bui Thi R', email: 'buithir@gmail.com', role: 'Admin', city: 'Cam Ranh', country: 'Vietnam', phone: '+84 929 012 345' },
    { id: 19, name: 'Nguyen Van S', email: 'nguyenvans@gmail.com', role: 'User', city: 'Dong Hoi', country: 'Vietnam', phone: '+84 930 123 456' },
    { id: 20, name: 'Pham Thi T', email: 'phamthit@gmail.com', role: 'Admin', city: 'Soc Trang', country: 'Vietnam', phone: '+84 931 234 567' }
  ];

  const showDrawer = (title, user = null, viewMode = false) => {
    setDrawerTitle(title);
    setSelectedUser(user);
    setIsViewMode(viewMode);
    if (user) {
      form.setFieldsValue(user);
    } else {
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
        console.log('Deleted user with id:', id);
        // Add your delete logic here
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
                        description={item.email}
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
                  <DescriptionItem title="Name" content={selectedUser.name} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Email" content={selectedUser.email} />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Role" content={selectedUser.role} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="City" content={selectedUser.city} />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <DescriptionItem title="Country" content={selectedUser.country} />
                </Col>
                <Col span={12}>
                  <DescriptionItem title="Phone" content={selectedUser.phone} />
                </Col>
              </Row>
              <Divider />
              <Button type="primary" onClick={onClose}>Close</Button>
            </div>
          )
        ) : (
          <Form layout="vertical" form={form}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
              <Input placeholder="Please enter the name" />
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