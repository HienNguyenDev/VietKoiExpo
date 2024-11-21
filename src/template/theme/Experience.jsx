// src/components/Experience/Experience.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Slider.scss';
import experienceImg from '../../asset/banner/bannercomp.png';

const Experience = () => {
  return (
    <section className="experience_section layout_padding">
      <Container>
        <Row>
          <Col md={5}>
            <div className="img-box">
              <img src={experienceImg} alt="experience" />
            </div>
          </Col>
          <Col md={7}>
            <div className="detail-box">
              <div className="heading_container">
                <h2>
                  Về Trang web của chúng tôi
                </h2>
              </div>
              <p>
                  VietKoiExpo là nền tảng trực tuyến hàng đầu tại Việt Nam dành riêng cho thế giới cá Koi rực rỡ và xinh đẹp. Trang web của chúng tôi là nơi hội tụ của những người đam mê cá Koi, những nhà lai tạo và người chơi cá từ khắp mọi miền đất nước để giới thiệu các chú cá đẹp nhất, tham gia các cuộc thi, và kết nối với cộng đồng yêu cá Koi.
                </p>
              <div className="btn-box">
                <a href="" className="btn-1">
                  Đọc Thêm
                </a>
                <a href="" className="btn-2">
                  Rút gọn
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Experience;