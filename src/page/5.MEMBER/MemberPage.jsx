import React, { useState } from 'react';
import { Layout, Row, Col, Carousel, Card, List, Switch } from 'antd';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography } from '@mui/material';
import AccountMenu from '../../component/shared/AccountMenu/AccountMenu';
const { Header, Footer, Content } = Layout;

const MemberPage = () => {
  const [themeMode, setThemeMode] = useState('light'); // State để lưu trạng thái theme

  // Tạo theme light và dark với MUI
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  // Hàm chuyển đổi theme
  const handleThemeChange = (checked) => {
    setThemeMode(checked ? 'dark' : 'light');
  };

  const rankingData = [
    { title: 'Rank 1', description: 'Description 1' },
    { title: 'Rank 2', description: 'Description 2' },
    { title: 'Rank 3', description: 'Description 3' },
  ];

  const sponsorsData = [
    { name: 'Sponsor 1', logo: '' },
    { name: 'Sponsor 2', logo: '' },
    { name: 'Sponsor 3', logo: '' },
  ];

  // Chọn theme dựa trên chế độ light hoặc dark
  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline /> {/* Để áp dụng màu nền và các thuộc tính mặc định của theme */}
      <Layout style={{ width: '100vw', backgroundColor: currentTheme.palette.background.default }}>
        {/* Fixed Header */}
        <Header
          style={{
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: currentTheme.palette.background.default,
            position: 'fixed',
            width: '100%',
            zIndex: 1000,
            color: currentTheme.palette.text.primary,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://imgur.com/V1zXtZN.jpg" 
              alt="VietKoiExpo Logo"
              style={{ height: '40px', marginRight: '12px' }}
            />
            <Typography variant="h6" style={{ color: currentTheme.palette.primary.main }}>
              VietKoiExpo
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Switch để chuyển đổi theme */}
            <Switch
              checked={themeMode === 'dark'}
              onChange={handleThemeChange}
              checkedChildren="Dark"
              unCheckedChildren="Light"
              style={{ marginRight: '20px' }}
            />
            <AccountMenu /> {/* Custom AccountMenu component */}
          </div>
        </Header>

        {/* Scrollable Content */}
        <Content style={{ padding: '20px', marginTop: '64px', backgroundColor: currentTheme.palette.background.default }}>
          {/* Carousel */}
          <Carousel autoplay autoplaySpeed={5000} style={{ height: '5rem' }}>
            <div>
              <h3 style={{ color: currentTheme.palette.text.primary }}>Slide 1</h3>
            </div>
            <div>
              <h3 style={{ color: currentTheme.palette.text.primary }}>Slide 2</h3>
            </div>
            <div>
              <h3 style={{ color: currentTheme.palette.text.primary }}>Slide 3</h3>
            </div>
          </Carousel>

          {/* Introduction */}
          <Row>
            <Col span={24}>
              <Card title="Introduction" style={{ backgroundColor: currentTheme.palette.background.paper, color: currentTheme.palette.text.primary }}>
                <p style={{ color: currentTheme.palette.text.primary }}>This is the introduction section.</p>
              </Card>
            </Col>
          </Row>

          {/* Contest */}
          <Row gutter={16} style={{ marginTop: '20px' }}>
            <Col span={8}>
              <Card title="Miscellaneous 1" style={{ backgroundColor: currentTheme.palette.background.paper, color: currentTheme.palette.text.primary }}>
                <p style={{ color: currentTheme.palette.text.primary }}>Content 2</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Miscellaneous 2" style={{ backgroundColor: currentTheme.palette.background.paper, color: currentTheme.palette.text.primary }}>
                <p style={{ color: currentTheme.palette.text.primary }}>Content 2</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Miscellaneous 3" style={{ backgroundColor: currentTheme.palette.background.paper, color: currentTheme.palette.text.primary }}>
                <p style={{ color: currentTheme.palette.text.primary }}>Content 3</p>
              </Card>
            </Col>
          </Row>

          {/* Koi competition */}
          <Row style={{ marginTop: '20px' }}>
            <Col span={16}>
              <Card title="" style={{ backgroundColor: currentTheme.palette.background.paper, color: currentTheme.palette.text.primary }}>
                <img alt="Competition" />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Koi Competition" style={{ backgroundColor: currentTheme.palette.background.paper, color: currentTheme.palette.text.primary }}>
                <p>Content</p>
              </Card>
            </Col>
          </Row>

          {/* Ranking and News */}
          <Row style={{ marginTop: '20px' }}>
            <Col span={12}>
              <Card title="Ranking" style={{ backgroundColor: currentTheme.palette.background.paper, color: currentTheme.palette.text.primary }}>
                <List
                  itemLayout="horizontal"
                  dataSource={rankingData}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={<span style={{ color: currentTheme.palette.text.primary }}>{item.title}</span>}
                        description={<span style={{ color: currentTheme.palette.text.secondary }}>{item.description}</span>}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="News" style={{ backgroundColor: currentTheme.palette.background.paper, color: currentTheme.palette.text.primary }}>
                <p>News</p>
              </Card>
            </Col>
          </Row>

          {/* Sponsors */}
          <Row gutter={16} style={{ marginTop: '20px' }}>
            {sponsorsData.map((sponsor, index) => (
              <Col span={8} key={index}>
                <Card cover={<img alt={sponsor.name} src={sponsor.logo} />} style={{ backgroundColor: currentTheme.palette.background.paper }}>
                  <Card.Meta title={<span style={{ color: currentTheme.palette.text.primary }}>{sponsor.name}</span>} />
                </Card>
              </Col>
            ))}
          </Row>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: 'center', backgroundColor: currentTheme.palette.background.default, color: currentTheme.palette.text.primary }}>
          KoiExpo
        </Footer>

        {/* <ControlledOpenSpeedDialCustom /> */}
      </Layout>
    </ThemeProvider>
  );
};

export default MemberPage;
