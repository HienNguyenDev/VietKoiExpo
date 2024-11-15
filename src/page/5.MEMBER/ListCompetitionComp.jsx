import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Button, message } from 'antd';
import { CalendarOutlined, TrophyOutlined, FlagOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllContests } from '../../store/redux/action/contestAction';
import Countdown from 'react-countdown';
import axios from 'axios';
import styles from './ListCompetitionComp.module.scss'; // Assuming the styles are stored in a separate file

const ListCompetitionComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const competitions = useSelector(state => state.contestReducer.contestList);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState({}); // Store categories for each competition

  // Fetch all contests when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllContests());
      setLoading(false);
    };
    fetchData();

    const intervalId = setInterval(fetchData, 5000); // Refetch data every 5 seconds

    return () => clearInterval(intervalId); // Clear the interval when component unmounts
  }, [dispatch]);

  // Function to fetch categories for a specific competition
  const fetchCategories = async (compId) => {
    try {
      const response = await axios.get(`https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Competition/CompetitonCategories/${compId}`);
      setCategories(prevCategories => ({
        ...prevCategories,
        [compId]: response.data, // Store categories by competition ID
      }));
    } catch (error) {
      message.error('Không thể lấy danh mục cuộc thi');
      console.error('Error fetching categories:', error);
    }
  };

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Cuộc thi đã được diễn ra </span>;
    } else {
      return (
        <div className={styles.countdown}>
          <span>{days}d</span> <span>{hours}h</span> <span>{minutes}m</span> <span>{seconds}s</span>
        </div>
      );
    }
  };

  const filteredCompetitions = competitions.filter(competition => {
    return competition.compName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={styles.landingPage}>
      <div style={{ position: 'absolute', display: 'inline', top: '30px', left: '30px' }}>
        <Button className={styles.backButton} onClick={() => navigate('/home')}>Quay về trang chủ</Button>
      </div>
      <div className={styles.heroSection}>
        <Typography.Title level={1}>Danh sách các cuộc thi</Typography.Title>
        <img className="giphy-gif-img giphy-img-loaded" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjJwbWl3b2szazdoOGp3dGN4emliMTFuZ3NuYzFvMDk3ZjE3ejR0ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KAI3j7HLC93Lq/giphy.gif" alt="high life fish GIF" />
        <Typography.Paragraph>
          Join us for an exciting competition showcasing the most beautiful Koi fish.
        </Typography.Paragraph>
      </div>

      <div style={{ background: '#ffffff' }} className={styles.competitionsSection}>
        <Typography.Title style={{ fontWeight: '700' }} level={2}>Các cuộc thi</Typography.Title>
        {loading ? (
          <Typography.Paragraph style={{ color: '#ffffff' }}>Loading competitions...</Typography.Paragraph>
        ) : (
          <Row gutter={[16, 16]}>
            {filteredCompetitions.map((competition) => {
              const status = competition.status === 0 ? 'upcoming' : competition.status === 1 ? 'ongoing' : 'completed';

              // Fetch categories for this competition when it's not yet fetched
              if (!categories[competition.compId]) {
                fetchCategories(competition.compId);
              }

              return (
                <Col key={competition.compId} span={24}>
                  <Card className={styles.competitionCard}>
                    <Row gutter={[16, 16]}>
                      <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
                        {competition.imageUrl ? (
                          <img
                            style={{ width: '300px', height: '300px' }}
                            src={competition.imageUrl}
                            alt={competition.compName}
                            className={styles.competitionImage}
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/200'; }}
                          />
                        ) : (
                          <div className={styles.placeholderImage}>No Image</div>
                        )}
                      </Col>
                      <Col span={18}>
                        <Row>
                          <Col span={8}>
                            <Typography.Title style={{ color: '#fff', fontWeight: '600' }} level={4}>{competition.compName}</Typography.Title>
                            <Typography.Paragraph style={{ color: '#ffffff' }}>{competition.compDescription}</Typography.Paragraph>
                            <Typography.Paragraph style={{ color: '#ffffff' }}>Location: {competition.location}</Typography.Paragraph>
                          </Col>
                          <Col span={8}>
                            <Typography.Paragraph>
                              <h1 style={{ fontSize: '30px', color: '#ffffff', fontWeight: "600" }}>Lịch trình</h1>
                              <ul className={styles.keyDatesList}>
                                <li style={{ color: '#ffffff' }}><CalendarOutlined /> Ngày tiến hành đăng kí: {new Date(competition.startDate).toLocaleDateString()}</li>
                                <li style={{ color: '#ffffff' }}><TrophyOutlined /> Ngày bắt đầu: {new Date(competition.startDate).toLocaleDateString()}</li>
                                <li style={{ color: '#ffffff' }}><FlagOutlined /> Ngày kết thúc: {new Date(competition.endDate).toLocaleDateString()}</li>
                              </ul>
                            </Typography.Paragraph>
                          </Col>
                          <Col span={8}>
                            {status === 'upcoming' && (
                              <>
                                <Typography.Title level={5}>Bắt đầu diễn ra trong</Typography.Title>
                                <Countdown date={new Date(competition.startDate)} renderer={countdownRenderer} />
                              </>
                            )}
                            {status === 'ongoing' && (
                              <Typography.Title level={5} style={{ color: 'red' }}>Cuộc thi đang diễn ra</Typography.Title>
                            )}
                            {status === 'completed' && (
                              <Typography.Title level={5} style={{ color: 'red' }}>Cuộc thi hoàn thành</Typography.Title>
                            )}
                          </Col>
                        </Row>
                        {categories[competition.compId] && (
                          <Row>
                            <Col span={24}>
                              <Typography.Paragraph>
                                <strong style={{color:'#fff'}}>Danh mục cuộc thi:</strong>
                                <ul>
                                  {categories[competition.compId].map((category, index) => (
                                    <li style={{color:'ffffff'}} key={index}>{<p style={{color:"#fff"}}>{category.categoryDescription}</p>}</li> 
                                  ))}
                                </ul>
                              </Typography.Paragraph>
                            </Col>
                          </Row>
                        )}
                        <Button
                          className={styles.registerButton}
                          type="link"
                          onClick={() => navigate(`/competition/landing`)}
                        >
                          Đăng kí tham gia?
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
};

export default ListCompetitionComp;
