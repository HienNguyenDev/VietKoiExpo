import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { ReactComponent as RefereeIcon } from '../../asset/icon/geisha-svgrepo-com.svg';
import { ReactComponent as JudgeIcon } from '../../asset/icon/sensu-fan-svgrepo-com.svg';
import AccountMenu from '../../component/shared/AccountMenu/AccountMenu'; 
import { dark } from '@mui/material/styles/createPalette';
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
  getItem('Chấm điểm', '1', <JudgeIcon />, undefined, 'manage-judging'),
  //getItem('Judging Reports', '2', <RefereeIcon />, undefined, 'manage-reports'),
];

const RefereePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    const item = items.find((item) => item.key === key);
    if (item && item.navigator) {
      navigate(item.navigator);
    } else {
      console.error(`No item found with key: ${key}`);
    }
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
          <h2 style={{ margin: 0, color: 'cyan' }}>VietKoiExpo Referee</h2>
        </div>
        <div>
          <AccountMenu />
        </div>
      </Header>
      <Layout>
        <Sider
          width={250}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ marginTop: '64px' }}
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
          <Content style={{ padding: 24, height: '100%', minHeight: 360 }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>KoiExpo {new Date().getFullYear()}</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default RefereePage;
