import React from 'react';
import { AppstoreOutlined, UserOutlined, TrophyOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    key: 'home',
    label: 'Trang chủ',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: 'info',
        label: 'Thông tin cuộc thi',
      },
      {
        key: 'rules',
        label: 'Luật thi đấu',
      },
      {
        key: 'criteria',
        label: 'Tiêu chí chấm điểm',
      },
      {
        key: 'news',
        label: 'Tin tức',
      },
    ],
  },
  {
    key: 'tournaments',
    label: 'Các cuộc thi',
    icon: <TrophyOutlined />,
    children: [
      {
        key: 'ongoing',
        label: 'Đang diễn ra',
      },
      {
        key: 'upcoming',
        label: 'Sắp diễn ra',
      },
      {
        key: 'past',
        label: 'Đã diễn ra',
      },
    ],
  },
  {
    key: 'register',
    label: 'Đăng ký tham gia',
    icon: <UserOutlined />,
    children: [
      {
        key: 'account',
        label: 'Tài khoản',
      },
      {
        key: 'koi-profile',
        label: 'Hồ sơ cá Koi',
      },
    ],
  },
  {
    key: 'management',
    label: 'Quản lý cuộc thi',
    icon: <SettingOutlined />,
    children: [
      {
        key: 'registration-review',
        label: 'Xét duyệt đơn đăng ký',
      },
      {
        key: 'category-assignment',
        label: 'Phân hạng thi đấu',
      },
      {
        key: 'checkin',
        label: 'Check-in cá Koi',
      },
      {
        key: 'results',
        label: 'Kết quả cuộc thi',
      },
    ],
  },
  {
    key: 'predictions',
    label: 'Dự đoán kết quả',
    icon: <TrophyOutlined />,
  },
  {
    key: 'statistics',
    label: 'Thống kê & Báo cáo',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: 'competition-stats',
        label: 'Bảng thống kê cuộc thi',
      },
      {
        key: 'koi-achievements',
        label: 'Thành tích cá Koi',
      },
      {
        key: 'reports',
        label: 'Dashboard & Report',
      },
    ],
  },
];

const Referee = () => {
  const onClick = (e) => {
    console.log('click ', e);
  };

  return (
    <div style={{ height: '100vh' }}>
      <Menu
        onClick={onClick}
        style={{ height: '100%' }}
        defaultSelectedKeys={['home']}
        defaultOpenKeys={['home']}
        mode="inline"
        items={items}
      />
    </div>
  );
};

export default Referee;
