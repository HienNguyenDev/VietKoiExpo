import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Badge, Dropdown, Menu, Button } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined,ProfileOutlined,NotificationOutlined } from '@ant-design/icons';
import { fetchUserByIdActionApi, logoutActionApi } from '../../../../src/store/redux/action/userAction'; // Import action
import { useNavigate, Link } from 'react-router-dom';


const MenuAccount = ({ onShowNotifications }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Lấy dữ liệu người dùng từ Redux store
  const { userLogin, userProfile } = useSelector((state) => state.userReducer);
   // State để quản lý số lượng thông báo chưa đọc
   const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (userLogin) {
      // Gọi API để lấy thông tin người dùng dựa trên userId
      dispatch(fetchUserByIdActionApi(userLogin.id));
    }
  }, [dispatch, userLogin]);

  // Mock data cho notifications nếu chưa có
  const mockNotifications = [
    { id: 1, message: "Bạn có tin nhắn mới", isRead: true, date: "2024-10-25 08:00" },
    { id: 2, message: "Cập nhật quan trọng từ hệ thống", isRead: false, date: "2024-10-24 10:30" },
    { id: 3, message: "Sự kiện sắp tới vào tuần tới", isRead: false, date: "2024-10-23 12:45" },
    { id: 4, message: "Đăng ký thành công sự kiện", isRead: true, date: "2024-10-22 14:00" },
    { id: 5, message: "Bình luận mới về bài viết của bạn", isRead: false, date: "2024-10-21 16:15" }
  ];

  

  useEffect(() => {
    if (userProfile) {
      // Tạo bản sao của userProfile để thêm mock data mà không thay đổi đối tượng gốc
      const updatedUserProfile = {
        ...userProfile,
        notifications: userProfile.notifications || mockNotifications  // Sử dụng mock data nếu chưa có notifications
      };

      // Đếm số lượng thông báo chưa đọc
      const unread = updatedUserProfile.notifications.filter(notif => !notif.isRead).length;
      setUnreadCount(unread);
    }
  }, [userProfile]);

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
      <Menu.Item key="2" icon={<NotificationOutlined />} onClick={onShowNotifications} > 
      Notifications{/* <Link to="/notifications">Notifications</Link> */}
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
        <Badge count={unreadCount}  offset={[-5, 5]}>
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
