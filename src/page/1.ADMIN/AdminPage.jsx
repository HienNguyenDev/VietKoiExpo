import React, { useState } from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
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
import NotificationBlock from '../../component/notification/NotificationBlock';
import AccountMenu from '../../component/AccountMenu/AccountMenu';
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
  getItem('Home', '1', <PieChartOutlined />,undefined),

  getItem('..', '2', <DesktopOutlined />),

  getItem('Manage Contests', 'sub1', <DarumaIcon />, [
    getItem('Create Contest', '31',undefined,undefined, '/create-contest'),
    getItem('View All Users', '32',undefined,undefined, '/view-all-contests'),
    getItem('View All Contests', '33',undefined,undefined, '/view-all-contests'),
    getItem('Delete Contest', '34',undefined,undefined, '/delete-contest'),
  ]),
  getItem('Manage Users', 'sub2', <MountIcon/>, [
    getItem('CreateUser', '41',undefined,undefined, '/create-user'),
    getItem('View All Users', '42',undefined,undefined, '/view-all-users'),
    getItem('Update User Details', '43',undefined,undefined, '/update-user'),
    getItem('Manage User Roles and Permissions', '44',undefined,undefined, '/manage-user-roles'),
]),
  getItem('Manage Koi Entries', 'sub3', <KoiIcon/>, [
    getItem('Review Koi Entries', '51',undefined,undefined, '/review-koi-entries'),
    getItem('Approve Koi Entriess', '52',undefined,undefined, '/approve-koi-entries'),
    getItem('Assign Koi to Categorie', '5',undefined,undefined, '/assign-koi-to-category'),
    getItem('Manage Check-in Process', '54',undefined,undefined, '/manage-check-in-process'),
  ]),
  getItem('Manage Judging Process', 'sub4', <TorriJapanIcon/>, [
    getItem('Assign Judges to Contests', '61',undefined,undefined, '/assign-judges-to-contest'),
    getItem('Manage Scoring Processs', '62',undefined,undefined, '/manage-scoring-process'),
    getItem('Finalize Contest Results', '63',undefined,undefined, '/finalize-contest-results'),
  ]),
  getItem('Manage Predictions', 'sub5', <GeishaIcon/>, [
    getItem('View All Predictions', '71',undefined,undefined, '/view-all-predictions'),
    getItem('Manage Prediction Results', '72',undefined,undefined, '/manage-prediction-results'),
  ]),
  getItem('Manage News and Updates', 'sub6',<SensuFanIcon/>, [
    getItem('Create News/Update', '81',undefined,undefined, '/create-news-update'),
    getItem('View All News/Updates', '82',undefined,undefined, '/view-all-news-updates'),
    getItem('Update News/Update Details', '83',undefined,undefined, '/update-news-update'),
    getItem('Delete News/Update', '84',undefined,undefined, '/delete-news-update'),
  ]),
  getItem('Reports and Analytics', 'sub7', <StonesSpaIcon />, [
    getItem('View Contest Reports', '91',undefined,undefined, '/view-contest-reports'),
    getItem('View User Reports', '92',undefined,undefined, '/view-user-reports'),
    getItem('View Prediction Reports', '93',undefined,undefined, '/view-prediction-reports'),
    getItem('View Koi Entry Reports', '94',undefined,undefined, '/view-koi-entry-reports'),
  ]),
  getItem('System Settings', 'sub8', <PaperLanternIcon />, [
    getItem('Manage Contest Categories', '101',undefined,undefined, '/manage-contest-categories'),
    getItem('Manage Judging Criteria', '102',undefined,undefined, '/manage-judging-criteria'),
  ]),

];

//set up history for breadcrumb

const flattenedItems = items.flatMap(item => 
  item.children ? [item, ...item.children] : item
);

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
  return (
    <Layout
      style={{
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <Sider width={350} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
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
          {/* <AccountMenu/> */}
          </div>
        </Header>
        <Content
          style={{
            margin: '0 16px',
            background: 'ffffff',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
              background: '#ffffff',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: '#000000',
              borderRadius: borderRadiusLG,
            }}
          >
            <ContentAdminHomePage/>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default HomePage;