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
  PieChartOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

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
  getItem('Home', '1', <PieChartOutlined />, undefined),
  getItem('Manage Koi Entries', 'manage-koi', <KoiIcon />, [
    getItem('Review Koi Entries', '51', undefined, undefined, '/review-koi-entries'),
    getItem('Approve Koi Entries', '52', undefined, undefined, '/approve-koi-entries'),
    getItem('Assign Koi to Category', '53', undefined, undefined, '/assign-koi-to-category'),
    getItem('Manage Check-in Process', '54', undefined, undefined, '/manage-check-in-process'),
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

const ManageKoiEntriesPage = () => {
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
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({ key }) => handleMenuClick(key)} />
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
          <div className='containerHeader' style={{ right: '0' }}>
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
            {breadcrumbItems}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              height: '100%',
              minHeight: 360,
              background: 'url(https://i.pinimg.com/enabled_lo/564x/79/67/b8/7967b8ac814569018076263bdf3bc2f3.jpg) ',
              borderRadius: borderRadiusLG,
            }}
          >
           <div style={{background:'#ffffff',width:'50vh',}}>
            <Outlet />
           </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          VN Design ©{new Date().getFullYear()} Created by vinny
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ManageKoiEntriesPage;