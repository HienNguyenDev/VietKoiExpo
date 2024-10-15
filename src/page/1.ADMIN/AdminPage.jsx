import React, { useState } from 'react';
import {Outlet, useLocation,useNavigate} from 'react-router-dom';
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
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children, navigator) {
  return {
    key,
    icon,
    children,
    label,
    navigator
  };
}
const items = [
        // Gộp tất cả các mục con vào một getItem chính
        getItem('Home', '1', <PieChartOutlined />,undefined,'/admin'),
        getItem('Task Management', '2', <DesktopOutlined />,undefined,'manange-task'),
  
  getItem(
    'Manage', 'manage',
    <DesktopOutlined />,
    [
      getItem('Manage Contests', 'sub1', <DarumaIcon />, [
        getItem('Create Contest', '31', undefined, undefined,'/admin/manage-contests/create-contest'),
        getItem('Update Contest', '32', undefined, undefined, '/admin/manage-contests/update-contest'),
        getItem('View Contests', '33', undefined, undefined, '/admin/manage-contests/view-contests'),
        getItem('Delete Contest', '34', undefined, undefined, '/admin/manage-contests/delete-contest'),
      ],'/manage-contests'),
      
      // Nhóm 2: Manage Users
      getItem('Manage Users', 'sub2', <MountIcon />, [
        getItem('Create User', '41', undefined, undefined, '/admin/manage-users/create-user'),
        getItem('View Users', '42', undefined, undefined, '/admin/manage-users/view-users'),
        getItem('Update User Details', '43', undefined, undefined, '/admin/manage-users/update-user'),
        getItem('Manage User Roles and Permissions', '44', undefined, undefined, '/admin/manage-users/manage-user-roles'),
      ],'/manage-users'),

      // Nhóm 3: Manage Koi Entries
      getItem('Manage Koi Entries', 'sub3', <KoiIcon />, [
        getItem('Review Koi Entries', '51', undefined, undefined, '/review-koi-entries'),
        getItem('Approve Koi Entries', '52', undefined, undefined, '/approve-koi-entries'),
        getItem('Assign Koi to Category', '53', undefined, undefined, '/assign-koi-to-category'),
        getItem('Manage Check-in Process', '54', undefined, undefined, '/manage-check-in-process'),
      ]),

      // Nhóm 4: Manage Judging Process
      getItem('Manage Judging Process', 'sub4', <TorriJapanIcon />, [
        getItem('Assign Judges to Contests', '61', undefined, undefined, '/assign-judges-to-contest'),
        getItem('Manage Scoring Process', '62', undefined, undefined, '/manage-scoring-process'),
        getItem('Finalize Contest Results', '63', undefined, undefined, '/finalize-contest-results'),
      ]),

      // Nhóm 5: Manage Predictions
      getItem('Manage Predictions', 'sub5', <GeishaIcon />, [
        getItem('View All Predictions', '71', undefined, undefined, '/view-all-predictions'),
        getItem('Manage Prediction Results', '72', undefined, undefined, '/manage-prediction-results'),
      ]),

      // Nhóm 6: Manage News and Updates
      getItem('Manage News and Updates', 'sub6', <SensuFanIcon />, [
        getItem('Create News/Update', '81', undefined, undefined, '/create-news-update'),
        getItem('View All News/Updates', '82', undefined, undefined, '/view-all-news-updates'),
        getItem('Update News/Update Details', '83', undefined, undefined, '/update-news-update'),
        getItem('Delete News/Update', '84', undefined, undefined, '/delete-news-update'),
      ]),

      
    ],'manage'
  ),// Nhóm 7: Reports and Analytics
    getItem('Reports and Analytics', 'sub7', <StonesSpaIcon />, [
      getItem('View Contest Reports', '91', undefined, undefined, '/view-contest-reports'),
      getItem('View User Reports', '92', undefined, undefined, '/view-user-reports'),
      getItem('View Prediction Reports', '93', undefined, undefined, '/view-prediction-reports'),
      getItem('View Koi Entry Reports', '94', undefined, undefined, '/view-koi-entry-reports'),
    ]),

    // Nhóm 8: System Settings
    getItem('System Settings', 'sub8', <PaperLanternIcon />, [
      getItem('Manage Contest Categories', '101', undefined, undefined, '/manage-contest-categories'),
      getItem('Manage Judging Criteria', '102', undefined, undefined, '/manage-judging-criteria'),
    ]),
];

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

const breadcrumbItems = flattenedItems.map(item => (
  <Breadcrumb.Item key={item.key}>
    {item.icon}
    {item.label}
  </Breadcrumb.Item>
));
const HomePage = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    const item = flattenedItems.find((item) => item.key === key);
    if (item && item.navigator) {
      navigate(item.navigator);
      console.log(item.navigator);
    } else {
      console.error(`No item found with key: ${key} or navigator property is not set`);
    }
  };
  

  return (
    <Layout
      style={{
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu  theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}  onClick={({ key }) => handleMenuClick(key)}/>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: 'ffffff',
            textAlign: 'end',
            alignItems: 'right',
          }}
        >
          <div className='containerHeader' style={{right:'0'}}>
          {/* <NotificationBlock/> */}
          
          </div>
        </Header>
        <Content
          style={{

            background: '#ffffff',
          }}
        >
          <div
            style={{
              padding: 24,
              height:'100%',
              minHeight: 360,
              background: '#ffffff',
              borderRadius: borderRadiusLG,
            }}
          >
            {/* <ContentAdminHomePage/> */}
            <Outlet/>
            <ControlledOpenSpeedDialCustom/>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          KoiExpo {new Date().getFullYear()} 
        </Footer>
      </Layout>
    </Layout>
  );
};
export default HomePage;