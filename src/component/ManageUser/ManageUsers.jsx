import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Col, Radio, Drawer, List, Row, Typography, Modal, Form, Input, Card, Table, Select, notification } from 'antd';
import { EditOutlined, DeleteOutlined, UserSwitchOutlined, ExclamationCircleOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import styles from '../../asset/scss/ManageUsersPage.module.scss';
import { fetchUserByIdActionApi, fetchUsersActionApi, removeUserActionApi, updateUserActionApi, createUsersActionApi } from '../../store/redux/action/userAction';
import UploadImageComponent from '../shared/UploadImage/UploadImage';

const { Title, Paragraph } = Typography;
const { confirm } = Modal;
const { Option } = Select;

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
  const [filterRole, setFilterRole] = useState('all');
  const [searchValue, setSearchValue] = useState(''); // State for search value
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

  // Add interval to periodically refresh the users data
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchUsersActionApi());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [dispatch]);

  const roleMapping = {
    manager: 'Quản lý',
    staff: 'Nhân viên',
    judge: 'Giám khảo',
    member: 'Thành viên',
  };
  const fileter = Array.isArray(usersData) ? usersData.filter(user => user.status === true) : [];
  const handleSearch = (value) => {
    setSearchValue(value.toLowerCase());
  };
  const filteredusersData = Array.isArray(usersData) ? usersData.filter(user =>{
    const matchesStatus = filterRole === 'all' || 
                          (filterRole === 'manager' && user.roleId === 'manager') ||
                          (filterRole === 'member' && user.roleId === 'member') ||
                          (filterRole === 'staff' && user.roleId === 'staff') ||
                          (filterRole === 'judge' && user.roleId === 'judge');
    
    const matchesSearch =!searchValue ||
                          (user.fullName && user.fullName.toLowerCase().includes(searchValue)) ||
                          (user.email && user.email.toLowerCase().includes(searchValue)) ||
                          (user.address && user.address.toLowerCase().includes(searchValue)) 
    return matchesStatus && matchesSearch;
  }): [];

  const showDrawer = (title, user = null) => {
    setDrawerTitle(title);
    setSelectedUser(user);
    setOpen(true); // Show the drawer first

    if (user) {
      dispatch(fetchUserByIdActionApi(user.userId));
    } else {
      form.resetFields();
    }
  };

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        fullName: userDetailData.fullName || '',
        email: userDetailData.email || '',
        roleId: userDetailData.roleId || '',
        address: userDetailData.address || '',
        phone: userDetailData.phone || '',
        password: userDetailData.password || '',
        imageUrl: userDetailData.imageUrl || '',
        experience: userDetailData.experience || 0,
      });
    }
  }, [userDetailData, selectedUser, form]);

  const closeDrawer = () => {
    setOpen(false);
    setSelectedUser(null);
    form.resetFields();
  };

  const handleCreate = () => {
    showDrawer('Thêm người dùng');
  };

  const handleUpdate = (id) => {
    const user = usersData.find(user => user.userId === id);
    if (user) {
      dispatch(fetchUserByIdActionApi(user.userId));
      showDrawer('Cập nhật người dùng', user);
    }
  };

  const handleView = async (id) => {
    try {
      dispatch(fetchUserByIdActionApi(id));
      showDrawer('Xem thông tin người dùng', { userId: id });
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa người dùng này không?',
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
      if (drawerTitle === 'Thêm người dùng') {
        dispatch(createUsersActionApi(formattedValues))
          .then(() => {
            notification.success({
              message: 'Thành công',
              description: 'Thêm người dùng thành công',
            });
            dispatch(fetchUsersActionApi()); // Fetch updated list of users
          })
          .catch(() => {
            notification.error({
              message: 'Lỗi',
              description: 'Thêm người dùng thất bại',
            });
          });
      } else if (drawerTitle === 'Cập nhật người dùng' && selectedUser) {
        dispatch(updateUserActionApi(selectedUser.userId, formattedValues))
          .then(() => {
            notification.success({
              message: 'Thành công',
              description: 'Cập nhật người dùng thành công',
            });
            dispatch(fetchUsersActionApi()); // Fetch updated list of users
          })
          .catch(() => {
            notification.error({
              message: 'Lỗi',
              description: 'Cập nhật người dùng thất bại',
            });
          });
      }
      closeDrawer();
    }).catch(errorInfo => {
      console.error('Validation Failed:', errorInfo);
    });
  };

  const columns = [
    { title: 'Họ và tên', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Vai trò', dataIndex: 'roleId', key: 'roleId', render: roleId => roleMapping[roleId] },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', render: status => (status ? 'Hoạt động' : 'Không hoạt động') },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.userId)}>Xem</Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleUpdate(record.userId)}>Cập nhật</Button>
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.userId)}>Xóa</Button>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.manageUsersPage}>
      
      <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} style={{ marginBottom: 16 }}>
        Thêm người dùng
      </Button>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="Tìm kiếm"
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 300 }}
          />
        </Col>
      </Row>
      {/* Radio buttons để chọn lọc trạng thái */}
      <Radio.Group 
        onChange={(e) => setFilterRole(e.target.value)} 
        value={filterRole}
        style={{ marginBottom: 16 }}>
        <Radio.Button value="all">Tất cả</Radio.Button>
        <Radio.Button value="manager">Quản lý</Radio.Button>
        <Radio.Button value="member">Thành viên</Radio.Button>
        <Radio.Button value="staff">Nhân viên</Radio.Button>
        <Radio.Button value="judge">Giám khảo</Radio.Button>
      </Radio.Group>
      <Table 
        dataSource={filteredusersData} 
        columns={columns} 
        rowKey="userId" 
      />
      <Drawer
        title={drawerTitle}
        width={640}
        onClose={closeDrawer}
        visible={open}
        afterVisibleChange={(visible) => {
          if (!visible) {
            form.resetFields();
          }
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
            <Input placeholder="Vui lòng nhập họ và tên" disabled={drawerTitle === 'Xem thông tin người dùng'} />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
            <Input placeholder="Vui lòng nhập email" disabled={drawerTitle === 'Xem thông tin người dùng'} />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
            <Input.Password placeholder="Vui lòng nhập mật khẩu" disabled={drawerTitle === 'Xem thông tin người dùng'} />
          </Form.Item>
          <Form.Item name="roleId" label="Vai trò" rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}>
            <Select placeholder="Vui lòng chọn vai trò" disabled={drawerTitle === 'Xem thông tin người dùng'}>
              <Option value="manager">Quản lý</Option>
              <Option value="staff">Nhân viên</Option>
              <Option value="judge">Giám khảo</Option>
              <Option value="member">Thành viên</Option>
            </Select>
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}>
            <Input placeholder="Vui lòng nhập địa chỉ" disabled={drawerTitle === 'Xem thông tin người dùng'} />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
            <Input placeholder="Vui lòng nhập số điện thoại" disabled={drawerTitle === 'Xem thông tin người dùng'} />
          </Form.Item>
          <Form.Item name="imageUrl" label="Hình ảnh" rules={[{ required: true, message: 'Vui lòng tải lên hình ảnh' }]}>
          <UploadImageComponent 
              onSuccess={(url) => form.setFieldsValue({ imageUrl: url })} 
              defaultUrl={userDetailData.imageUrl} 
            />
          </Form.Item>
          <Form.Item name="experience" label="Kinh nghiệm" rules={[{ required: true, message: 'Vui lòng nhập kinh nghiệm' }]}>
            <Input type="number" placeholder="Vui lòng nhập kinh nghiệm" disabled={drawerTitle === 'Xem thông tin người dùng'} />
          </Form.Item>
          {drawerTitle !== 'Xem thông tin người dùng' && (
            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Gửi
              </Button>
            </Form.Item>
          )}
        </Form>
      </Drawer>
    </div>
  );
};

export default ManageUsersPage;
