// src/components/Slider/Slider.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllContests } from '../../store/redux/action/contestAction';
import { Container, Col, Row } from 'react-bootstrap';
import './Slider.scss';

const Slider = () => {
  const dispatch = useDispatch();
  const contestList = useSelector(state => state.contestReducer.contestList);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Gọi action để lấy danh sách cuộc thi khi component được render
    dispatch(fetchAllContests());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => 
        contestList.length > 0 ? (current === contestList.length - 1 ? 0 : current + 1) : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [contestList]);

  // Convert contestList to match the format you need
  const formattedContestList = contestList.map((contest, index) => ({
    id: index + 1,
    title: contest.compName || '',
    description: contest.compDescription || '',
    image: contest.imageUrl || 'default_image_url_here'
  }));

  return (
    <section className="slider_section">
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-inner">
          {formattedContestList.length > 0 ? (
            formattedContestList.map((contest, index) => (
              <div
                key={contest.id}
                className={`carousel-item ${activeIndex === index ? 'active' : ''}`}
              >
                <Container>
                  <Row className="align-items-center">
                    <Col xs={12} md={6} className="detail-box-container">
                      <div className="detail-box">
                        <h1>{contest.title}</h1>
                        <p>{contest.description}</p>
                        <div className="btn-box">
                          <a href="/competition/landing" className="btn-1">
                            Đăng kí tham gia ngay?
                          </a>
                          <a href="" className="btn-2">
                            Xem chi tiết hơn?
                          </a>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} md={6} className="img-container">
                      <div className="img-box" style={{ height: '100%', overflow: 'hidden' }}>
                      <img src={contest.image} alt={contest.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <Container>
                <Row>
                  <Col>
                    <div className="detail-box">
                      <h1>Không có cuộc thi nào để hiển thị</h1>
                      <p>Vui lòng thử lại sau.</p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Slider;