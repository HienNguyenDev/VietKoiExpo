import React, { useState } from 'react';
import { Layout, Row, Col, Carousel, Card, List, Switch, Button as AntButton } from 'antd';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography, Button as MuiButton } from '@mui/material';
import AccountMenu from '../../component/shared/AccountMenu/AccountMenu';
import styles from '../../asset/scss/MemberPage.module.scss';
import banner1 from '../../asset/banner/banner1.webp';
import banner2 from '../../asset/banner/banner2.webp';
import banner3 from '../../asset/banner/banner3.webp';
import bgthemelight from '../../asset/photo/bgthemelight.jpg';
import bgthemedark from '../../asset/photo/bgthemedark.jpg';
import listfish from '../../asset/photo/listfish.jpg';
import bgred from '../../asset/photo/bgred.png';
import qc from '../../asset/photo/qc.jpg';
import RankingComponent from './RankingComponent';
import NewsComp from '../../component/shared/news/NewsComp';

const { Header, Footer, Content } = Layout;

const MemberPage = () => {
  const [themeMode, setThemeMode] = useState('light'); // State to store theme mode

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#ff6f61', // Pastel Coral
      },
      background: {
        default: '#f7f9fc', // Light pastel blue background
        paper: '#ffffff', // White card background
        image: `url(${bgthemelight})`, // Background image
      },
      text: {
        primary: '#333333', // Dark gray text for better readability
        secondary: '#555555', // Slightly lighter gray for secondary text
      },
      textTittle: {
        primary: '#ff6f61', // Pastel Coral text for title
        secondary: '#555555',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '10px', // Rounded edges for a more modern look
            border: '2px solid #ff6f61', // Pastel Coral border
            boxShadow: '0 0 10px #ff6f61', // Pastel Coral glow effect
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            textShadow: '0 0 8px #ff6af61', // Pastel Coral glow for text
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            border: '1px solid #ff6f61', // Pastel Coral border
            color: '#ff6f61', // Pastel Coral text
            boxShadow: '0 0 8px #ff6f61', // Pastel Coral glow on buttons
            '&:hover': {
              backgroundColor: '#ff6f61',
              color: '#ffffff', // White text on hover
              boxShadow: '0 0 12px #ff6f61', // Intense glow on hover
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            border: '1px solid #ff6f61', // Pastel Coral border
            boxShadow: '0 0 8px #ff6f61', // Pastel Coral glow effect
            borderRadius: '5px', // Rounded edges
            marginBottom: '10px', // Space between items
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            border: '2px solid #ff6f61', // Pastel Coral border
            boxShadow: '0 0 8px #ff6f61', // Pastel Coral glow effect
          },
        },
      },
    },
  });

  // Neon dark theme
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#00ffcc', // Neon cyan for primary elements
      },
      background: {
        default: '#141414', // Darker background for neon contrast
        paper: '#1c1c1c', // Dark card background
        image: `url(${bgthemedark})`, // Background image
      },
      text: {
        primary: '#ffffff', // White text
        secondary: '#ff00ff', // Neon magenta for secondary text
      },
      textTittle: {
        primary: '#00ffcc', // Neon cyan text
        secondary: '#ff00ff', // Neon magenta for secondary text
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '10px', // Rounded edges for a more modern look
            border: '2px solid #00ffcc', // Neon cyan border
            boxShadow: '0 0 10px #00ffcc', // Neon glow effect
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            textShadow: '0 0 8px #00ffcc', // Neon glow for text
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            border: '1px solid #ff00ff', // Neon magenta border
            color: '#ff00ff', // Neon magenta text
            boxShadow: '0 0 8px #ff00ff', // Neon glow on buttons
            '&:hover': {
              backgroundColor: '#ff00ff',
              color: '#141414', // Dark background on hover
              boxShadow: '0 0 12px #ff00ff', // Intense glow on hover
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            border: '1px solid #00ffcc', // Neon cyan border
            boxShadow: '0 0 8px #00ffcc', // Neon glow effect
            borderRadius: '5px', // Rounded edges
            marginBottom: '10px', // Space between items
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            border: '2px solid #ff00ff', // Neon magenta border
            boxShadow: '0 0 8px #ff00ff', // Neon glow effect
          },
        },
      },
    },
  });

  // Function to toggle theme
  const handleThemeChange = (checked) => {
    setThemeMode(checked ? 'dark' : 'light');
  };

  const rankingData = [
    {
      rank: 1,
      fishName: 'Koi Fish 1',
      owner: 'Owner 1',
      score: 9.8,
      imageUrl: 'https://example.com/koi1.jpg', // Add fish image URL
    },
    {
      rank: 2,
      fishName: 'Koi Fish 2',
      owner: 'Owner 2',
      score: 9.5,
      imageUrl: 'https://example.com/koi2.jpg',
    },
    {
      rank: 3,
      fishName: 'Koi Fish 3',
      owner: 'Owner 3',
      score: 9.3,
      imageUrl: 'https://example.com/koi3.jpg',
    },
  ];

  const sponsorsData = [
    { logo: qc },

  ];

  const [isExpanded, setIsExpanded] = useState(false); // State to control read more

  const handleReadMore = () => {
    setIsExpanded(!isExpanded); // Toggle the read more
  };

  // Select theme based on light or dark mode
  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline /> {/* Apply default theme properties */}
      <Layout style={{ width: '100vw',    backgroundImage: `url(${currentTheme.palette.background.image})`, }}>
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
            <Typography variant="h6" style={{fontWeight:'bold', color: currentTheme.palette.primary.main }}>
              VietKoiExpo
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Switch to toggle theme */}
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
          <Carousel autoplay autoplaySpeed={2000} className={styles.carousel}>
            <div>
              <img src={banner1} alt="Banner 1" className={styles.bannerImage} />
            </div>
            <div>
              <img src={banner2} alt="Banner 2" className={styles.bannerImage} />
            </div>
            <div>
              <img src={banner3} alt="Banner 3" className={styles.bannerImage} />
            </div>
          </Carousel>

          {/* Introduction */}
          <Row>
            <Col span={24}>
              <Card
                title={
                  <div
                    style={{
                      color: currentTheme.palette.textTittle.primary,
                      padding: '10px',
                      borderRadius: '5px',
                      fontWeight: 'bold',
                    }}
                  >
                    <Typography variant="h6" style={{ fontWeight: 'bold', color: currentTheme.palette.primary.main }}>
                      About VietKoi
                    </Typography>
                  </div>
                }
                className={styles.introductionCard}
                style={{
                  backgroundColor: currentTheme.palette.background.paper,
                  color: currentTheme.palette.text.primary,
                  border: `2px solid ${currentTheme.palette.primary.main}`,
                  boxShadow: `0 0 10px ${currentTheme.palette.primary.main}`,
                }} // Apply SCSS styles
              >
                <p style={{ color: currentTheme.palette.text.primary }}>
                  VietKoiExpo là nền tảng trực tuyến hàng đầu tại Việt Nam dành riêng cho thế giới cá Koi rực rỡ và xinh đẹp. Trang web của chúng tôi là nơi hội tụ của những người đam mê cá Koi, những nhà lai tạo và người chơi cá từ khắp mọi miền đất nước để giới thiệu các chú cá đẹp nhất, tham gia các cuộc thi, và kết nối với cộng đồng yêu cá Koi.
                </p>
{/* Read More/Collapse Section */}
{isExpanded ? (
  <div>
    <p style={{ color: currentTheme.palette.text.primary }}>
      Mục tiêu chính của chúng tôi là tạo ra một không gian sôi động, nơi cộng đồng cá Koi có thể cùng nhau chia sẻ niềm đam mê và nghệ thuật trong việc nuôi dưỡng loài cá tuyệt đẹp này. Dù bạn là nhà lai tạo cá Koi chuyên nghiệp hay người mới bắt đầu, VietKoiExpo luôn chào đón và cung cấp nền tảng cho tất cả mọi người.
    </p>
    <p style={{ color: currentTheme.palette.text.primary }}>Những gì chúng tôi cung cấp:</p>
    <ul style={{ color: currentTheme.palette.text.primary }}>
      <li style={{ color: currentTheme.palette.text.primary }}>Cuộc thi cá Koi toàn quốc: Các cuộc thi thường niên với giải thưởng hấp dẫn, được đánh giá bởi những chuyên gia hàng đầu về cá Koi.</li>
      <li style={{ color: currentTheme.palette.text.primary }}>Triển lãm cá Koi: Phòng trưng bày trực tuyến với những chú cá Koi đẹp nhất Việt Nam.</li>
      <li style={{ color: currentTheme.palette.text.primary }}>Bí quyết từ chuyên gia: Các bài viết, mẹo và hướng dẫn từ những nhà lai tạo và chuyên gia hàng đầu trong cộng đồng.</li>
      <li style={{ color: currentTheme.palette.text.primary }}>Cộng đồng & Chợ cá Koi: Tham gia cùng những thành viên khác, chia sẻ kiến thức và tham gia vào các cuộc đấu giá, mua bán cá Koi.</li>
    </ul>
    <p style={{ color: currentTheme.palette.text.primary }}>
      Tại VietKoiExpo, chúng tôi cam kết mang đến cho bạn trải nghiệm tuyệt vời với cá Koi, trong một môi trường giàu tính học hỏi, cạnh tranh và sự tôn vinh nghệ thuật nuôi cá.
    </p>
    <Typography variant="body2" style={{ cursor: 'pointer', color: currentTheme.palette.primary.main }} onClick={handleReadMore}>
      Read Less
    </Typography>
  </div>
) : (
  <Typography variant="body2" style={{ cursor: 'pointer', color: currentTheme.palette.primary.main }} onClick={handleReadMore}>
    Read More
  </Typography>
)}

              </Card>
            </Col>
          </Row>

          {/* Summary of Contest and Vote for Fish */}
          <Row gutter={16} style={{ marginTop: '20px' }}>
            <Col span={12}>
              <Card
                title={
                  <div
                    style={{
                      color: currentTheme.palette.textTittle.primary,
                      padding: '10px',
                      borderRadius: '5px',
                      fontWeight: 'bold',
                    }}
                  >
                    <Typography variant="h6" style={{ fontWeight: 'bold', color: currentTheme.palette.primary.main }}>
                      Cuộc thi cá Koi Hấp Dẫn
                    </Typography>
                  </div>
                }
                style={{
                  backgroundColor: currentTheme.palette.background.paper,
                  color: currentTheme.palette.text.primary,
                  border: `2px solid ${currentTheme.palette.primary.main}`,
                  boxShadow: `0 0 10px ${currentTheme.palette.primary.main}`,
                }}
              >
                <div style={{ }}>
                  <p style={{ color: currentTheme.palette.text.primary }}>
                    Join the most exciting Koi contest of the year! Showcase your beautiful Koi fish and compete for the top prize.
                  </p>
                </div>
                <MuiButton variant="text" className={styles.readMore}>
                    Join Now
                  </MuiButton>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title={
                  <div
                    style={{
                     
                      color: currentTheme.palette.textTittle.primary,
                      padding: '10px',
                      borderRadius: '5px',
                      fontWeight: 'bold',
                    }}
                  >
                    <Typography variant="h6" style={{ fontWeight: 'bold', color: currentTheme.palette.primary.main }}>
                      Tham gia bình chọn
                    </Typography>
                  </div>
                }
                style={{
                  backgroundColor: currentTheme.palette.background.paper,
                  color: currentTheme.palette.text.primary,
                  border: `2px solid ${currentTheme.palette.primary.main}`,
                  boxShadow: `0 0 10px ${currentTheme.palette.primary.main}`,
                }}
              >
                <p style={{ color: currentTheme.palette.text.primary }}>
                  Cast your vote for the most beautiful Koi fish in the contest. Your vote can help decide the winner!
                </p>
                <MuiButton variant="text" className={styles.readMore}>
                    Vote Now?
                  </MuiButton>
              </Card>
            </Col>
          </Row>

          {/* Ranking Component and News Component */}
          <Row gutter={16} style={{ marginTop: '20px' }}>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column' }}>
              <RankingComponent rankingData={rankingData} theme={currentTheme} style={{ flex: 1 }} />
              <Card

                className={styles.sponsorCard}
                style={{
                  backgroundColor: currentTheme.palette.background.paper,
                  color: currentTheme.palette.text.primary,
                  border: `2px solid ${currentTheme.palette.primary.main}`,
                  boxShadow: `0 0 10px ${currentTheme.palette.primary.main}`,
                  marginTop: '20px',
                  flex: 1,
                }}
              >
                <List
                  grid={{ gutter: 16, column: 1 }}
                  dataSource={sponsorsData}
                  renderItem={(item) => (
                    <List.Item>
                      <Card
                        hoverable
                        cover={<img alt={item.name} src={item.logo} />}
                        style={{
                          backgroundColor: currentTheme.palette.background.paper,
                          border: `2px solid ${currentTheme.palette.primary.main}`,
                          boxShadow: `0 0 10px ${currentTheme.palette.primary.main}`,
                        }}
                      >
                        <Card.Meta title={item.name} style={{ textAlign: 'center', color: currentTheme.palette.text.primary }} />
                      </Card>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col  style={{
                          backgroundColor: currentTheme.palette.background.paper,
                          border: `2px solid ${currentTheme.palette.primary.main}`,
                          boxShadow: `0 0 10px ${currentTheme.palette.primary.main}`,
                        }} span={12}>
              <NewsComp theme={currentTheme} style={{ height: '100%' }} />
            </Col>
          </Row>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: 'center', backgroundColor: currentTheme.palette.background.default, color: currentTheme.palette.text.primary, }}>
          VietKoiExpo ©2024 - All Rights Reserved
        </Footer>
      </Layout>
    </ThemeProvider>
  );
};

export default MemberPage;