import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ReactComponent as KoiIcon } from '../../asset/icon/koi-svgrepo-com.svg';
import { ReactComponent as DarumaIcon } from '../../asset/icon/daruma-svgrepo-com.svg';
import { ReactComponent as MountIcon } from '../../asset/icon/mount-fuji-japan-svgrepo-com.svg';
import { ReactComponent as GeishaIcon } from '../../asset/icon/geisha-svgrepo-com.svg';
import { ReactComponent as TorriJapanIcon } from '../../asset/icon/torii-japan-svgrepo-com.svg';
import { ReactComponent as SensuFanIcon } from '../../asset/icon/sensu-fan-svgrepo-com.svg';
import { ReactComponent as StonesSpaIcon } from '../../asset/icon/stones-spa-svgrepo-com.svg';
import { ReactComponent as PaperLanternIcon } from '../../asset/icon/paper-lantern-japanese-svgrepo-com.svg';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  NotificationOutlined,
  SettingOutlined,
  AuditOutlined,
  BarChartOutlined,
  TrophyOutlined,
  FlagOutlined,
  SmileOutlined,
  SolutionOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, message } from 'antd';
import ContentAdminHomePage from './content/ContentAdminHomePage';
import ControlledOpenSpeedDialCustom from '../../component/shared/speed dial/SpeedDial';
import AccountMenu from '../../component/shared/AccountMenu/AccountMenu'; // Your existing AccountMenu component
import { dark, light } from '@mui/material/styles/createPalette';
import NotificationPage from '../../component/shared/notification/NotificationPage';
import { useSelector } from 'react-redux';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, navigator) {
  return {
    key,
    icon,
    children,
    label,
    navigator,
  };
}

const items = [
  getItem('Quản lý Cuộc thi', 'sub1', <TrophyOutlined />, undefined, 'manage-contests'),
  getItem('Quản lý Người dùng', 'sub2', <UserOutlined />, undefined, 'manage-users'),
  getItem('Quản lý Nhập koi', 'sub3', <KoiIcon />, undefined, 'manage-koi-entries'),
  getItem('Check In Koi', 'sub4', <FlagOutlined />, undefined, 'manage-koi-checkin'),
  getItem('Quản lý Tất cả Koi', 'sub5', <MountIcon />, undefined, 'manage-all-koi'),
  getItem('Quản lý Tin tức và Cập nhật', 'sub6', <PaperLanternIcon />, undefined, 'manage-news'),
  getItem('Báo cáo và Phân tích', 'sub7', <BarChartOutlined />, [
    getItem('Xem Báo cáo Cuộc thi', '91', <FileOutlined />, undefined, 'view-contest-reports'),
  ]),
  getItem('Quản lý Tiêu chí Chấm thi', '102', <SettingOutlined />, undefined, 'manage-judging-criteria'),
  // getItem('Phân công nhiệm vụ', 'sub9', <DarumaIcon />, [
  // getItem('Phân công Nhiệm vụ', '111', <SensuFanIcon />, undefined, 'manage-task-allocation'),
  // ]),
];

// Function to flatten the nested menu items for easier access
function flattenItems(items) {
  return items.reduce((flattenedItems, item) => {
    if (item.children) {
      return [...flattenedItems, item, ...flattenItems(item.children)];
    } else {
      return [...flattenedItems, item];
    }
  }, []);
}

const flattenedItems = flattenItems(items);

// Breadcrumbs for navigation (optional, can be used for showing paths)
const breadcrumbItems = flattenedItems.map((item) => (
  <Breadcrumb.Item key={item.key}>
    {item.icon}
    {item.label}
  </Breadcrumb.Item>
));

const AdminPage = () => {
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userReducer.userLogin);

  useEffect(() => {
    console.log('User login:', userLogin);
    if (!userLogin || !['staff', 'manager'].includes(userLogin.roleId)) {
      message.error('Bạn không có quyền truy cập trang này.');
      navigate('/home'); // Điều hướng về trang chủ nếu không phải staff hoặc admin
    }
  }, [userLogin, navigate]);

  const [collapsed, setCollapsed] = useState(false);
  // State để quản lý hiển thị thông báo
  const [showNotifications, setShowNotifications] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key) => {
    const item = flattenedItems.find((item) => item.key === key);
    if (item && item.navigator) {
      navigate(item.navigator);
    } else {
      console.error(`Không tìm thấy mục có khóa: ${key} hoặc thuộc tính định hướng chưa được thiết lập`);
    }
  };

  // Hàm xử lý khi người dùng nhấp vào mục Thông báo trong AccountMenu
  const handleShowNotifications = () => {
    setShowNotifications(true); // Hiển thị thông báo khi người dùng chọn Thông báo
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
          backgroundColor: dark,
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
          <AccountMenu /> {/* Truyền hàm vào AccountMenu */}
        </div>
      </Header>
      <Layout>
        <Sider
          width={250}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ marginTop: '64px' }} // Align Sider with the Header
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            onClick={({ key }) => handleMenuClick(key)}
          />
        </Sider>
        <Layout style={{ marginTop: '64px' }}>
          <Content style={{ padding: 24, height: '100%', minHeight: 360, background: colorBgContainer }}>
            <Outlet />
            <ControlledOpenSpeedDialCustom />
            <ControlledOpenSpeedDialCustom />
          </Content>
          <Footer style={{ textAlign: 'center' }}>KoiExpo {new Date().getFullYear()}</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminPage;