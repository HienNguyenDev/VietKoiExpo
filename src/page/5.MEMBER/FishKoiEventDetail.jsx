import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { Button as AntButton, Card as AntCard, Row, Col } from 'antd';
import '../../asset/scss/FishKoiEventDetail.scss';
import photo1 from '../../asset/photo/koi/KOI1.jpg';
import photo2 from '../../asset/photo/koi/KOI2.jpg';
import photo3 from '../../asset/photo/koi/KOI3.jpg';
import photo4 from '../../asset/photo/koi/KOI4.jpg';
import prize from '../../asset/logo/prize.png'
const FishKoiEventDetail = () => {
  const koiFishImages = [
    photo1,
    photo2,
    photo3,
    photo4,
  ]

  return (
    <Box className="container" sx={{ padding: 4, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            {/* <div className="rainbow-overlay"></div> */}
      {/* Event Header */}
      <Box className="event-header " sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography  style={{fontWeight:'bold'}} variant="h3" component="h1" gutterBottom>
          Koi Fish Competition Event Detail
        </Typography>
        <Typography variant="body1" gutterBottom>
          Join us for an exciting Koi Fish Competition where the most beautiful and unique Koi fish will be showcased and judged.
        </Typography>
        <Box className="event-stats" sx={{ marginTop: 2 }}>
          <AntButton className="like-button" style={{ marginRight: 8 }}>36 Likes</AntButton>
          <AntButton className="dislike-button">134 Dislikes</AntButton>
        </Box>
      </Box>

      {/* Timing and Location */}
      <Row gutter={16} className="event-info" style={{ marginBottom: 16 }}>
        <Col xs={24} md={12}>
          <Box>
            <Typography variant="h5" component="h4" gutterBottom>
              Date and Time
            </Typography>
            <Typography variant="body1">
              Thứ bảy 19 thấng 10 2024
            </Typography>
          </Box>
        </Col>
        <Col xs={24} md={12}>
          <Box>
            <Typography variant="h5" component="h4" gutterBottom>
              Place
            </Typography>
            <Typography variant="body1">
             TP Đà Nẵng
            </Typography>
          </Box>
        </Col>
        <Col xs={24} style={{ textAlign: 'center' }}>
          <Typography variant="h5" component="h4" gutterBottom>
          </Typography>
          <AntButton type='link' className="vote-button">Tham gia ngay!</AntButton>
        </Col>
      </Row>

      {/* Predict Fish Section */}
      <Box className="predict-fish" sx={{ marginBottom: 4 }}>
        <Row>
          <Col span={12}>
          <Typography variant="h4" component="h2" gutterBottom>
          Predict the Winner
        </Typography>
        <Typography variant="body1" gutterBottom>
          Think you can predict which Koi fish will win? Participate in our prediction contest and stand a chance to win exciting prizes!
        </Typography>
        <AntButton className="read-more">Read More</AntButton>
          </Col>
          <Col span={12} style={{textAlign:'center'}} >
            <img style={{width:'260px',height:'260px'}} src={prize}></img>
          </Col>
        </Row>
      </Box>

      {/* Vote Section */}
      <Box className="vote-section" sx={{ marginBottom: 4 }}>
        <Typography style={{color:'white'}} variant="h4" component="h1" gutterBottom>
          Vote for Your Favorite Koi
        </Typography>
        <Row gutter={16} className="vote-options">
          {['SBD022', 'SBD034', 'SBD041', 'SBD066'].map((fish, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <AntCard className="vote-option" hoverable>
                <img src={koiFishImages[index]} alt={fish} style={{ width: '100%', borderRadius: '10px' }} />
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  {fish}
                </Typography>
              </AntCard>
            </Col>
          ))}
        </Row>
      </Box>

      {/* Similar Events */}
      <Box  className="similar-events" sx={{ marginBottom: 4 }}>
        <Typography style={{fontWeight:'bold',color:'#ffffff'}} variant="h4" component="h2" gutterBottom>
          Similar Events
        </Typography>
        <Row gutter={16} className="event-cards ">
          {[
            { title: 'Annual Koi Fish Show', date: 'Thứ 3 Ngày 2 Tháng 8 | 08:00 AM', location: 'Khánh Hòa', price: 'tham gia?' },
            { title: 'Koi Fish Exhibition', date: 'Thứ 2 ngày 6 tháng 9| 10:00 AM', location: 'TP HCM', price: 'tham gia?' },
          ].map((event, index) => (
            <Col style={{width:'600px',height:'400px'}} xs={24} sm={12} key={index}>
              <AntCard className="event-card rainbow-overlay" hoverable>
                <Typography variant="h1" component="h4" gutterBottom>
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
                <AntButton className="discount-button">20% Off</AntButton>
              </AntCard>
            </Col>
          ))}
        </Row>
      </Box>

      {/* Footer */}
      <Box className="footer" sx={{ padding: 4, backgroundColor: '#333', color: '#fff', borderRadius: 2 }}>
        <Row gutter={16}>
          <Col xs={24} md={12} className="footer-info">
            <Typography variant="h5" component="h4" gutterBottom>
              Koi Fish Competition
            </Typography>
            <Typography variant="body1">
              Categories: Competitions, Exhibitions, etc.
            </Typography>
          </Col>
          <Col xs={24} md={12} className="newsletter">
            <Typography variant="h5" component="h4" gutterBottom>
              Stay in the loop
            </Typography>
            <Box component="form" sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                type="email"
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                sx={{ marginRight: 2, flex: 1 }}
              />
              <AntButton className="subscribe-button">Subscribe</AntButton>
            </Box>
          </Col>
        </Row>
      </Box>
    </Box>
  );
};

export default FishKoiEventDetail;