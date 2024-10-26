import { Layout, Row, Col, Card, List, Switch, Button as AntButton, Button } from 'antd';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography, Button as MuiButton, Box, TextField } from '@mui/material';
import AccountMenu from '../../component/shared/AccountMenu/AccountMenu';
import styles from '../../asset/scss/FishKoiEventDetail.module.scss';
import photo1 from '../../asset/photo/koi/KOI1.jpg';
import photo2 from '../../asset/photo/koi/KOI2.jpg';
import photo3 from '../../asset/photo/koi/KOI3.jpg';
import photo4 from '../../asset/photo/koi/KOI4.jpg';
import prize from '../../asset/logo/prize.png';
import qc from '../../asset/photo/qc.jpg';
import { useState } from 'react';

const { Header, Footer, Content } = Layout;

const FishKoiEventDetail = () => {
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
            textShadow: '0 0 8px #ff6f61', // Pastel Coral glow for text
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

  const darkTheme = createTheme({
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

  const handleThemeChange = (checked) => {
    setThemeMode(checked ? 'dark' : 'light');
  };

  const koiFishImages = [photo1, photo2, photo3, photo4];

  const sponsorsData = [
    { logo: qc },
  ];

  const [isExpanded, setIsExpanded] = useState(false); // State to control read more

  const handleReadMore = () => {
    setIsExpanded(!isExpanded); // Toggle the read more
  };

  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline /> {/* Apply default theme properties */}
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
            <Typography variant="h6" style={{ fontWeight: 'bold', color: currentTheme.palette.primary.main }}>
              VietKoiExpo
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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
          {/* Event Header */}
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
                      Koi Fish Competition Event Detail
                    </Typography>
                  </div>
                }
                className={styles.introductionCard}
                style={{
                  backgroundColor: currentTheme.palette.background.paper,
                  color: currentTheme.palette.text.primary,
                  border: `2px solid ${currentTheme.palette.primary.main}`,
                  boxShadow: `0 0 10px ${currentTheme.palette.primary.main}`,
                }}
              >
                <Typography variant="body1" gutterBottom>
                  Join us for an exciting Koi Fish Competition where the most beautiful and unique Koi fish will be showcased and judged.
                </Typography>
                <Box className={styles.eventStats} sx={{ marginTop: 2 }}>
                  <AntButton className={styles.likeButton} style={{ marginRight: 8 }}>36 Likes</AntButton>
                  <AntButton className={styles.dislikeButton}>134 Dislikes</AntButton>
                </Box>
              </Card>
            </Col>
          </Row>

          {/* Timing and Location */}
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
                      Date and Time
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
                <Typography variant="body1">
                  Thứ bảy 19 thấng 10 2024
                </Typography>
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
                      Place
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
                <Typography variant="body1">
                  TP Đà Nẵng
                </Typography>
              </Card>
            </Col>
          </Row>

          {/* Event Highlights */}
          <Row gutter={16} style={{ marginTop: '20px' }}>
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
                      Event Highlights
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
                <Typography variant="body1" gutterBottom>
                  - Showcase of the most beautiful and unique Koi fish.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  - Expert judges from around the world.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  - Exciting prizes for the winners.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  - Interactive sessions and workshops.
                </Typography>
              </Card>
            </Col>
          </Row>

          {/* Predict Fish Section */}
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
                      Predict the Winner
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
                <Typography variant="body1" gutterBottom>
                  Think you can predict which Koi fish will win? Participate in our prediction contest and stand a chance to win exciting prizes!
                </Typography>
                <AntButton className={styles.readMore}>Read More</AntButton>
              </Card>
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              <Card
                style={{
                  backgroundColor: currentTheme.palette.background.paper,
                  color: currentTheme.palette.text.primary,
                  border: `2px solid ${currentTheme.palette.primary.main}`,
                  boxShadow: `0 0 10px ${currentTheme.palette.primary.main}`,
                }}
              >
                <img style={{ width: '260px', height: '260px' }} src={prize} alt="Prize" />
              </Card>
            </Col>
          </Row>

          {/* Vote Section */}
          <Row gutter={16} style={{ marginTop: '20px' }}>
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
                      Vote for Your Favorite Koi
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
                <Row gutter={16} className={styles.voteOptions}>
                  {['SBD022', 'SBD034', 'SBD041', 'SBD066'].map((fish, index) => (
                    <Col xs={24} sm={12} md={6} key={index}>
                      <Card className={styles.voteOption} hoverable>
                        <img src={koiFishImages[index]} alt={fish} style={{ width: '100%', borderRadius: '10px' }} />
                        <Typography variant="body1" sx={{ marginTop: 2 }}>
                          {fish}
                        </Typography>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>

          {/* Judges Section */}
          <Row gutter={16} style={{ marginTop: '20px' }}>
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
                      Meet the Judges
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
                <Typography variant="body1" gutterBottom>
                  Our panel of expert judges includes renowned Koi fish breeders and enthusiasts from around the world.
                </Typography>
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    { name: 'Judge 1', description: 'Expert Koi Breeder from Japan' },
                    { name: 'Judge 2', description: 'Renowned Koi Enthusiast from the USA' },
                    { name: 'Judge 3', description: 'Koi Fish Specialist from the UK' },
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={<Typography variant="body1" style={{ color: currentTheme.palette.text.primary }}>{item.name}</Typography>}
                        description={<Typography variant="body2" style={{ color: currentTheme.palette.text.secondary }}>{item.description}</Typography>}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>

          {/* Similar Events */}
          <Row gutter={16} style={{ marginTop: '20px' }}>
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
                      Similar Events
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
                <Row gutter={16} className={styles.eventCards}>
                  {[
                    { title: 'Annual Koi Fish Show', date: 'Thứ 3 Ngày 2 Tháng 8 | 08:00 AM', location: 'Khánh Hòa',  },
                    { title: 'Koi Fish Exhibition', date: 'Thứ 2 ngày 6 tháng 9| 10:00 AM', location: 'TP HCM', },
                  ].map((event, index) => (
                    <Col xs={24} sm={12} key={index}>
                      <Card className={styles.eventCard} hoverable>
                        <Typography variant="h5" component="h4" gutterBottom>
                          {event.title}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {event.date}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {event.location}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          {event.price}
                        </Typography>
                        <AntButton className={styles.discountButton}>Tham gia ngay?</AntButton>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>

          {/* Footer */}
          <Box className={styles.footer} sx={{ padding: 4, backgroundColor: '#333', color: '#fff', borderRadius: 2, marginTop: '20px' }}>
            <Row gutter={16}>
              <Col xs={24} md={12} className={styles.footerInfo}>
                <Typography variant="h5" component="h4" gutterBottom>
                  Koi Fish Competition
                </Typography>
                <Typography variant="body1">
                  Categories: Competitions, Exhibitions, etc.
                </Typography>
              </Col>
              <Col xs={24} md={12} className={styles.newsletter}>
                <Typography variant="h5" component="h4" gutterBottom>
                 Leave your email to receive updates
                </Typography>
                <Box component="form" sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    type="email"
                    placeholder="Enter your email"
                    variant="outlined"
                    size="small"
                    sx={{ marginRight: 2, flex: 1 }}
                  />
                  <AntButton className={styles.subscribeButton}>Subscribe</AntButton>
                </Box>
              </Col>
            </Row>
          </Box>
        </Content>
      </Layout>
    </ThemeProvider>
  );
};

export default FishKoiEventDetail;