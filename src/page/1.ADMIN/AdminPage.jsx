import React, { useState } from 'react';
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
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
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
  // Gộp tất cả các mục con vào một getItem chính
  // getItem('Home', '1', <PieChartOutlined />, undefined, '/admin'),
 // getItem('Task Management', '2', <DesktopOutlined />, undefined, 'manage-task'),
  getItem('Manage Contests', 'sub1', <DarumaIcon />, undefined, 'manage-contests'),
  // Nhóm 2: Manage Users
  getItem('Manage Users', 'sub2', <MountIcon />, undefined, 'manage-users'),
  getItem('Manage Koi Entries', 'sub3', <KoiIcon />, undefined, 'manage-koi-entries'),
  getItem('Check In Koi', 'sub4', <KoiIcon />, undefined, 'manage-koi-checkin'),
  getItem('Manage All Koi', 'sub5', <MountIcon />, undefined, 'manage-all-koi'),
  // //// Nhóm 3: Manage Judging Process
  // getItem('Manage Judging Process', 'sub4', <TorriJapanIcon />, [
  //   getItem('Assign Judges to Contests', '61', undefined, undefined, 'assign-judges-to-contest'),
  //   getItem('Manage Scoring Process', '62', undefined, undefined, 'manage-scoring-process'),
  //   getItem('Finalize Contest Results', '63', undefined, undefined, 'finalize-contest-results'),
  // ]),
  //  // Nhóm 4: Manage Predictions
  // getItem('Manage Predictions', 'sub5', <GeishaIcon />, undefined, 'manage-predict'),
  // // Nhóm 5: Manage News and Updates
  getItem('Manage News and Updates', 'sub6', <SensuFanIcon />, undefined, 'manage-news'),
  // Nhóm 6: Reports and Analytics
  getItem('Reports and Analytics', 'sub7', <StonesSpaIcon />, [
    getItem('View Contest Reports', '91', undefined, undefined, 'view-contest-reports'),
    getItem('View User Reports', '92', undefined, undefined, '/view-user-reports'),
    getItem('View Prediction Reports', '93', undefined, undefined, '/view-prediction-reports'),
  ]),
  // Nhóm 7: System Settings
  getItem('System Settings', 'sub8', <PaperLanternIcon />, [
    getItem('Manage Contest Categories', '101', undefined, undefined, '/manage-contest-categories'),
    getItem('Manage Judging Criteria', '102', undefined, undefined, 'manage-judging-criteria'),
  ]),
   // Nhóm 8: Task allocation
  getItem('Task allocation', 'sub9', <PaperLanternIcon />, [
    getItem('Assign Task', '111', undefined, undefined, 'manage-task-allocation'),
  ]),
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

  const [collapsed, setCollapsed] = useState(false);
  // State để quản lý hiển thị thông báo
  const [showNotifications, setShowNotifications] = useState(false); 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    const item = flattenedItems.find((item) => item.key === key);
    if (item && item.navigator) {
      navigate(item.navigator);
    } else {
      console.error(`No item found with key: ${key} or navigator property is not set`);
    }
  };

  // Hàm xử lý khi người dùng nhấp vào mục Notifications trong AccountMenu
  const handleShowNotifications = () => {
    setShowNotifications(true); // Hiển thị thông báo khi người dùng chọn Notifications
  };
  const userLogin = useSelector(state => state.userReducer.userLogin);
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
        <AccountMenu  /> {/* Truyền hàm vào AccountMenu */}
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
