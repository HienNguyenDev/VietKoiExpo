// src/components/Slider/Slider.jsx
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './Slider.scss';
import photo1 from '../../asset/banner/banner1.webp';
import photo2 from '../../asset/banner/banner2.webp';
import photo3 from '../../asset/banner/banner3.webp';
import { Col, Row } from 'antd';

const sliderData = [
  {
    id: 1,
    title: 'Cuộc Thi\nCá Koi Tháng 131\nNăm 2024',
    description: 'Với phần thưởng vô cùng hấp dẫn cùng với đó là thể lệ thi đấu hấp dẫn nhất',
    image: photo1
  },
  {
    id: 2,
    title: 'Cuộc Thi\nCá Koi Tháng 11\nNăm 2024',
    description: 'Với phần thưởng vô cùng hấp dẫn cùng với đó là thể lệ thi đấu hấp dẫn nhất',
    image: photo2
  },
  {
    id: 3,
    title: 'Cuộc Thi\nCá Koi Tháng 11\nNăm 2024',
    description: 'Với phần thưởng vô cùng hấp dẫn cùng với đó là thể lệ thi đấu hấp dẫn nhất',
    image: photo3
  }
];

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => 
        current === sliderData.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="slider_section">
      <div id="carouselExampleIndicators" className="carousel slide">

        <div className="carousel-inner">
          {sliderData.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${activeIndex === index ? 'active' : ''}`}
            >
              <Container>
                <Row>
                  <Col span={8} offset={1}>
                    <div className="detail-box">
                      <h1>{slide.title}</h1>
                      <p>{slide.description}</p>
                      <div className="btn-box">
                        <a href="" className="btn-1">
                          Đăng kí tham gia ngay?
                        </a>
                        <a href="" className="btn-2">
                          Xem chi tiết hơn?
                        </a>
                      </div>
                    </div>
                  </Col>
                  <Col span={14} offset={1} className="img-container">
                    <div className="img-box">
                      <img src={slide.image} alt="" />
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;