// src/components/StatisticsAndNews/StatisticsAndNews.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import './Slider.scss';
import './StatisticsAndNews.scss';
// Import images
import f1 from '../../asset/images/f1.png';
import f2 from '../../asset/images/f2.png';
import f3 from '../../asset/images/f3.png';
import f4 from '../../asset/images/f4.png';
import freelanceImg from '../../asset/images/freelance-img.jpg';
import quoteImg from '../../asset/images/quote.png';

const statisticsData = [
  {
    id: 'One',
    img: f1,
    number: '50+',
    title: 'Thí sinh tham gia'
  },
  {
    id: 'Two',
    img: f2,
    number: '70+',
    title: 'Con cá Koi thi đấu'
  },
  {
    id: 'Three',
    img: f3,
    number: '10+ tỉnh thành',
    title: 'Tổ chức trên toàn quốc'
  },
  {
    id: 'Four',
    img: f4,
    number: '98%',
    title: 'Hài lòng với cuộc thi'
  }
];

const testimonialData = [
    {
      id: 1,
      name: 'Cuộc lội ngược dòng ngoạn mục của cá Koi',
      content: 'Trải qua nhiều vòng thi đấu và tranh đua với rất nhiều đối thủ khó nhằn'
    },
    {
      id: 2,
      name: 'Chiến thắng áp đảo',
      content: 'Trải qua nhiều vòng thi đấu và tranh đua với rất nhiều đối thủ khó nhằn'
    },
    {
      id: 3,
      name: 'Không nằm ngoài dự đoán',
      content: 'Trải qua nhiều vòng thi đấu và tranh đua với rất nhiều đối thủ khó nhằn'
    }
  ];
  


const StatisticsAndNews = () => {
    const [activeIndex, setActiveIndex] = useState(0);
  
    const handlePrev = () => {
      setActiveIndex(current => 
        current === 0 ? testimonialData.length - 1 : current - 1
      );
    };
  
    const handleNext = () => {
      setActiveIndex(current => 
        current === testimonialData.length - 1 ? 0 : current + 1
      );
    };
  const [activeTab, setActiveTab] = useState('One');

  return (
    <>
      <section className="freelance_section">
        <div id="accordion">
          <Container fluid>
            <Row>
              <Col md={5} className="offset-md-1">
                <div className="detail-box">
                  <div className="heading_container">
                    <h2>Thống kê trang web</h2>
                  </div>
                  <div className="tab_container">
                    {statisticsData.map((item) => (
                      <div
                        key={item.id}
                        className={`t-link-box ${activeTab !== item.id ? 'collapsed' : ''}`}
                        onClick={() => setActiveTab(item.id)}
                        aria-expanded={activeTab === item.id}
                      >
                        <div className="img-box">
                          <img src={item.img} alt="" />
                        </div>
                        <div className="detail-box">
                          <h5>{item.number}</h5>
                          <h3>{item.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col md={6}>
                {statisticsData.map((item) => (
                  <div
                    key={item.id}
                    className={`collapse ${activeTab === item.id ? 'show' : ''}`}
                    id={`collapse${item.id}`}
                  >
                    <div className="img-box">
                      <img src={freelanceImg} alt="" />
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="client_section layout_padding">
      <Container>
        <Row>
          <Col lg={9} md={10} className="mx-auto">
            <div className="heading_container">
              <h2>Tin tức</h2>
            </div>
            <div id="carouselExampleControls" className="carousel slide">
              <div className="carousel-inner">
                {testimonialData.map((testimonial, index) => (
                  <div 
                    key={testimonial.id}
                    className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                  >
                    <div className="detail-box">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.content}</p>
                      <img src={quoteImg} alt="" />
                    </div>
                  </div>
                ))}
              </div>
              
              <a 
                className="carousel-control-prev" 
                role="button"
                onClick={handlePrev}
              >
                <span className="sr-only"></span>
              </a>
              <a 
                className="carousel-control-next" 
                role="button"
                onClick={handleNext}
              >
                <span className="sr-only"></span>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  );
};

export default StatisticsAndNews;