import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Badge, Dropdown, Menu, Button } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined,ProfileOutlined,NotificationOutlined } from '@ant-design/icons';
import { fetchUserByIdActionApi, logoutActionApi } from '../../../../src/store/redux/action/userAction'; // Import action
import { useNavigate } from 'react-router-dom';

const MenuAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy dữ liệu người dùng từ Redux store
  const { userLogin, userProfile } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (userLogin) {
      // Gọi API để lấy thông tin người dùng dựa trên userId
      dispatch(fetchUserByIdActionApi(userLogin.id));
    }
  }, [dispatch, userLogin]);

  const handleSignOut = () => {
    // Gọi action logout và điều hướng tới trang đăng nhập
    dispatch(logoutActionApi(navigate));
  };

  // Tạo hàm để hiển thị role bên cạnh tên người dùng
  const renderRole = (role) => {
    if (role === 'admin') return '(Admin)';
    if (role === 'staff') return '(Staff)';
    if (role === 'referee') return '(Referee)';
    return '';
  };

  const menu = (
    <div style={{ width: 300, padding: '10px 15px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        <Avatar size={64} src={userProfile.avatarUrl} icon={<UserOutlined />} />
        <div style={{ marginLeft: 15 }}>
          <h3 style={{ margin: 0 }}>
            {userProfile.name} {renderRole(userProfile.roleId)}  {/* UserNam*/}
          </h3>
          <span style={{ color: '#888' }}>{userProfile.email}</span> {/* UserMail*/}
        </div>
      </div>
      <Menu>
      <Menu.Item key="1" icon={<ProfileOutlined />}>
        My Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<NotificationOutlined />}>
        Notifications
      </Menu.Item>
      <Menu.Item key="3" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" icon={<LogoutOutlined />}  onClick={handleSignOut}>
        Sign Out
      </Menu.Item>
    </Menu>
    </div>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      placement="bottomRight"
    >
      <div style={{ display: 'inline-block', position: 'relative', cursor: 'pointer' }}>
        <Badge count={userProfile.notifications || 0} offset={[-5, 5]}>
        <Avatar
            size="large"
            src={userProfile.avatarUrl} //Chú ý avatarUrl
            icon={<UserOutlined />}
            style={{
              borderRadius: '50%', 
              background: 'gray' 
            }}
          /> 
        </Badge>
      </div>
    </Dropdown>
  );
};

export default MenuAccount;
