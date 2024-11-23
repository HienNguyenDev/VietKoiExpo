import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Slider.scss';
import experienceImg from '../../asset/banner/bannercomp.png';

const Experience = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

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
                <h2>Về Trang web của chúng tôi</h2>
              </div>
              <p>
                VietKoiExpo là nền tảng trực tuyến hàng đầu tại Việt Nam dành riêng cho thế giới cá Koi rực rỡ và xinh đẹp. Trang web của chúng tôi là nơi hội tụ của những người đam mê cá Koi, những nhà lai tạo và người chơi cá từ khắp mọi miền đất nước để giới thiệu các chú cá đẹp nhất, tham gia các cuộc thi, và kết nối với cộng đồng yêu cá Koi.
              </p>
              {isExpanded && (
                <div className="extra-content">
                  <p>
                    Bên cạnh đó, chúng tôi còn cung cấp các dịch vụ độc quyền, bao gồm:
                  </p>
                  <ul>
                    <li>Chợ cá Koi trực tuyến, giúp bạn dễ dàng tìm mua những chú cá yêu thích.</li>
                    <li>Các sự kiện và buổi gặp mặt, giúp kết nối cộng đồng đam mê cá Koi.</li>
                    <li>Thông tin và bài viết chia sẻ kinh nghiệm nuôi dưỡng, chăm sóc cá Koi.</li>
                  </ul>
                  <p>
                    Với VietKoiExpo, chúng tôi cam kết mang đến trải nghiệm tốt nhất, giúp bạn không chỉ khám phá mà còn chia sẻ niềm đam mê với cộng đồng cá Koi.
                  </p>
                </div>
              )}
              <div className="btn-box">
                <button onClick={toggleContent} className="btn-1">
                  {isExpanded ? 'Rút gọn' : 'Đọc Thêm'}
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Experience;
