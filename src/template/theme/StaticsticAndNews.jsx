import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import './Slider.scss';
import './StatisticsAndNews.scss';
import { fetchAllNews } from '../../store/redux/action/NewsAction'; 
// Import images
import f1 from '../../asset/images/f1.png';
import f2 from '../../asset/images/f2.png';
import f3 from '../../asset/images/f3.png';
import f4 from '../../asset/images/f4.png';
import freelanceImg from '../../asset/images/freelance-img.jpg';

const statisticsData = [
  {
    id: 'One',
    img: f1,
    number: '50+',
    title: 'Thí sinh tham gia',
  },
  {
    id: 'Two',
    img: f2,
    number: '70+',
    title: 'Con cá Koi thi đấu',
  },
  {
    id: 'Three',
    img: f3,
    number: '10+ tỉnh thành',
    title: 'Tổ chức trên toàn quốc',
  },
  {
    id: 'Four',
    img: f4,
    number: '98%',
    title: 'Hài lòng với cuộc thi',
  },
];

const StatisticsAndNews = () => {
  const dispatch = useDispatch();
  const newsList = useSelector((state) => state.newsReducer.newsList); // Get the news list from the Redux store
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('One');

  useEffect(() => {
    // Dispatch action to fetch news when component mounts
    dispatch(fetchAllNews());

    // Set interval to fetch news every 5 seconds
    const intervalId = setInterval(() => {
      dispatch(fetchAllNews());
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handlePrev = () => {
    setActiveIndex((current) => (current === 0 ? newsList.length - 1 : current - 1));
  };

  const handleNext = () => {
    setActiveIndex((current) => (current === newsList.length - 1 ? 0 : current + 1));
  };

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
                  {newsList.map((newsItem, index) => (
                    <div
                      key={newsItem.id}
                      className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                    >
                      <div style={{ borderRadius: '20px' }} className="detail-box">
                        <h4>{(newsItem.newsDescription.match(/<(h[1-6])>(.*?)<\/\1>/)?.[2] || '').substring(0, 40) + '...'}</h4>
                        <p>{newsItem.newsDescription.replace(/<[^>]*>/g, '')}</p>
                        <img src={newsItem.imageUrl} alt="NewsImage" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
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