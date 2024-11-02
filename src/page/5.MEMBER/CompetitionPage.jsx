import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography } from '@mui/material';
import styles from './CompetitionPage.module.scss';

const { Header, Content, Footer } = Layout;

// Define the neon dark theme
const neonDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffcc', // Neon cyan for primary elements
    },
    background: {
      default: '#141414', // Darker background for neon contrast
      paper: '#1c1c1c', // Dark card background
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#ff00ff', // Neon magenta for secondary text
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          textShadow: '0 0 8px #00ffcc', // Neon glow for text
        },
      },
    },
  },
});

const CompetitionPage = () => {
  return (
    <ThemeProvider theme={neonDarkTheme}>
      <CssBaseline />
      <Layout style={{padding:'10px',width:'100vw', backgroundColor: neonDarkTheme.palette.background.default }}>
        <Header className={styles.header} style={{ backgroundColor: neonDarkTheme.palette.background.paper }}>
          <div className={styles.logo} style={{ color: neonDarkTheme.palette.primary.main, textShadow: '0 0 8px #00ffcc' }}>
            Koi Fish Competition
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/competition/landing" style={{ color: '#00ffcc' }}>Landing Page</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/competition/competition" style={{ color: '#00ffcc' }}>Competition Bracket</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/competition/leaderboard" style={{ color: '#00ffcc' }}>Leaderboard</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/competition/announcement" style={{ color: '#00ffcc' }}>Announcement</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className={styles.content}>
          <div className={styles.siteLayoutContent}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', backgroundColor:  neonDarkTheme.palette.background.default, color:  neonDarkTheme.palette.text.primary, }}>
          VietKoiExpo ©2024 - All Rights Reserved
        </Footer>
      </Layout>
    </ThemeProvider>
  );
};

export default CompetitionPage;
