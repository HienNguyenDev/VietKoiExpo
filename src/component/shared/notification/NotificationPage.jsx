import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  Layout, List, Button, Typography, Badge, Card } from 'antd';
import { fetchUserByIdActionApi } from '../../../../src/store/redux/action/userAction'; // Import action
import AccountMenu from '../../shared/AccountMenu/AccountMenu';
const { Header, Content } = Layout;
const { Title } = Typography;

const NotificationPage = () => {
  const dispatch = useDispatch();
  
  // Lấy dữ liệu từ Redux store
  const { userLogin, userProfile } = useSelector((state) => state.userReducer);

  useEffect(() => {
    // Nếu chưa có userProfile, gọi API lấy thông tin người dùng
    if (userLogin && !userProfile) {
      dispatch(fetchUserByIdActionApi(userLogin.userId));
    }
  }, [dispatch, userLogin, userProfile]);

  // Sử dụng mock notifications nếu không có dữ liệu thực tế
  const initialNotifications = userProfile?.notifications || [
    { id: 1, message: "Bạn có tin nhắn mới", isRead: true, date: "2024-10-25 08:00" },
    { id: 2, message: "Cập nhật quan trọng từ hệ thống", isRead: false, date: "2024-10-24 10:30" },
    { id: 3, message: "Sự kiện sắp tới vào tuần tới", isRead: false, date: "2024-10-23 12:45" },
    { id: 4, message: "Đăng ký thành công sự kiện", isRead: true, date: "2024-10-22 14:00" },
    { id: 5, message: "Bình luận mới về bài viết của bạn", isRead: false, date: "2024-10-21 16:15" }
  ];
  // State lưu trữ danh sách thông báo
  const [notifications, setNotifications] = useState(initialNotifications);
  // Hàm đánh dấu thông báo đã đọc
  const markAsRead = (notificationId) => {
    console.log(`Notification ${notificationId} marked as read`);
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

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
          <Title level={3}>Thông Báo</Title>
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item
                actions={[
                  !item.isRead && (
                    <Button type="primary" onClick={() => markAsRead(item.id)}>
                      Đánh dấu đã đọc
                    </Button>
                  ),
                ]}
              >
                <List.Item.Meta
                  title={
                    <Badge dot={!item.isRead}>
                      {item.message}
                    </Badge>
                  }
                  description={item.date}
                />
              </List.Item>
            )}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default NotificationPage;
