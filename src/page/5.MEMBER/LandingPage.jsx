import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, Row, Col, Modal, Form, Select, message } from 'antd';
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllContests } from '../../store/redux/action/contestAction';
import { getAllRegisteredKoiForCompetition, getKoiById } from '../../store/redux/action/koiRegisterAction';
import { CalendarOutlined, TrophyOutlined, FlagOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.scss';
import { registerKoiForCompetitionApi } from '../../service/koiRegist';

const { Option } = Select;

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const competitions = useSelector(state => state.contestReducer.contestList);
  const registeredKoi = useSelector(state => state.registerKoi.koiList);
  const userId = useSelector(state => state.userReducer.userLogin.userId); // Select userId
  const koiList = useSelector(state => state.registerKoi.koiList); // Get koiList from Redux state

  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [mockKoiList, setMockKoiList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllContests());
      await dispatch(getAllRegisteredKoiForCompetition());
      await dispatch(getKoiById(userId));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, userId]);

  useEffect(() => {
    setMockKoiList(Array.isArray(koiList) ? koiList : []); // Ensure koiList is an array
  }, [koiList]);

  const reloadKoiList = async () => {
    await dispatch(getAllRegisteredKoiForCompetition());
    await dispatch(getKoiById(userId));
  };

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Competition has ended</span>;
    } else {
      return (
        <div className={styles.countdown}>
          <span>{days}d</span> <span>{hours}h</span> <span>{minutes}m</span> <span>{seconds}s</span>
        </div>
      );
    }
  };

  const showModal = (competition) => {
    console.log('Selected competition:', competition); // Debug selected competition
    setSelectedCompetition(competition);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    const { koiIds } = values;
    if (!selectedCompetition || !selectedCompetition.compId) {
      message.error('Please select a competition to register.');
      return;
    }

    for (const koiId of koiIds) {
      const koi = mockKoiList.find(k => k.koiId === koiId);
      const confirmRegistration = await new Promise((resolve) => {
        Modal.confirm({
          title: 'Confirm Registration',
          content: `Do you want to register Koi "${koi.koiName}" for the competition "${selectedCompetition.compName}"?`,
          onOk: () => resolve(true),
          onCancel: () => resolve(false),
        });
      });

      if (confirmRegistration) {
        try {
          console.log(`Registering Koi "${koi.koiName}" for competition "${selectedCompetition.compName}" with compId: ${selectedCompetition.compId}`); // Debug compId
          await registerKoiForCompetitionApi(koiId, selectedCompetition.compId); // Register each koi individually
          message.success(`Koi "${koi.koiName}" successfully registered!`);
          await reloadKoiList(); // Reload the Koi list after registration
        } catch (error) {
          message.error(`Registration failed for Koi "${koi.koiName}".`);
          console.error('Error during koi registration:', error);
        }
      } else {
        message.info(`Skipped registration for Koi "${koi.koiName}".`);
      }
    }

    setIsModalVisible(false); // Close modal after processing all koi
  };

  // Filter out Koi fish that have already been registered for the selected competition
  const availableKoiList = mockKoiList.filter(koi => {
    return !registeredKoi.some(registration => registration.koiId === koi.koiId && registration.compId === selectedCompetition?.compId);
  });

  const getCompetitionStatus = (competition) => {
    const now = new Date();
    const startDate = new Date(competition.startDate);
    const endDate = new Date(competition.endDate);

    if (now < startDate) {
      return 'upcoming';
    } else if (now >= startDate && now <= endDate) {
      return 'ongoing';
    } else {
      return 'ended';
    }
  };

  const isUserRegistered = (competitionId) => {
    return mockKoiList.some(koi => koi.competitions?.includes(competitionId));
  };

  return (
    <div className={styles.landingPage}>
      <div className={styles.heroSection}>
        <Typography.Title level={1}>Welcome to the Koi Fish Competition</Typography.Title>
        <img className="giphy-gif-img giphy-img-loaded" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjJwbWl3b2szazdoOGp3dGN4emliMTFuZ3NuYzFvMDk3ZjE3ejR0ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KAI3j7HLC93Lq/giphy.gif" alt="high life fish GIF" />
        <Typography.Paragraph>
          Join us for an exciting competition showcasing the most beautiful Koi fish.
        </Typography.Paragraph>
      </div>
      <div className={styles.competitionsSection}>
        <Typography.Title level={2}>Upcoming Competitions</Typography.Title>
        {loading ? (
          <Typography.Paragraph>Loading competitions...</Typography.Paragraph>
        ) : (
          <Row gutter={[16, 16]}>
            {competitions.map((competition) => {
              const status = getCompetitionStatus(competition);
              const userRegistered = isUserRegistered(competition.compId);
              return (
                <Col key={competition.compId} span={24}>
                  <Card className={styles.competitionCard}>
                    <Row gutter={[16, 16]}>
                      <Col span={6}>
                        {competition.imageUrl ? (
                          <img
                            src={competition.imageUrl}
                            alt={competition.compName}
                            className={styles.competitionImage}
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/150'; }} // Fallback image
                          />
                        ) : (
                          <div className={styles.placeholderImage}>No Image</div>
                        )}
                      </Col>
                      <Col span={18}>
                        <Row>
                          <Col span={8}>
                            <Typography.Title style={{ color: '#ffffff' }} level={4}>{competition.compName}</Typography.Title>
                            <Typography.Paragraph style={{ color: '#ffffff' }}>{competition.compDescription}</Typography.Paragraph>
                            <Typography.Paragraph style={{ color: '#ffffff' }}>Location: {competition.location}</Typography.Paragraph>
                            <Typography.Paragraph style={{ color: '#ffffff' }}>Start Date: {new Date(competition.startDate).toLocaleDateString()}</Typography.Paragraph>
                          </Col>
                          <Col span={8}>
                            <Typography.Paragraph>
                              Key Dates:
                              <ul className={styles.keyDatesList}>
                                <li><CalendarOutlined /> Registration: {new Date(competition.startDate).toLocaleDateString()}</li>
                                <li><TrophyOutlined /> Competition Start: {new Date(competition.startDate).toLocaleDateString()}</li>
                                <li><FlagOutlined /> Finals: {new Date(competition.endDate).toLocaleDateString()}</li>
                              </ul>
                            </Typography.Paragraph>
                          </Col>
                          <Col span={8}>
                            {status === 'upcoming' && (
                              <>
                                <Typography.Title level={5}>Starts In:</Typography.Title>
                                <Countdown date={new Date(competition.startDate)} renderer={countdownRenderer} />
                              </>
                            )}
                            {status === 'ongoing' && userRegistered && (
                              <Button type="primary" onClick={() => navigate(`/competition/${competition.compId}`)}>
                                Compete
                              </Button>
                            )}
                            {status === 'ongoing' && !userRegistered && (
                              <Typography.Title style={{ color: 'red' }} level={5}>Please Register to Compete</Typography.Title>
                            )}
                            {status === 'ended' && (
                              <Typography.Title level={5}>Competition Ended</Typography.Title>
                            )}
                          </Col>
                        </Row>
                        <Button type="link" onClick={() => showModal(competition)}>Register</Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
      <Modal
        title="Register for Competition"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="koiIds"
            label="Select Your Koi"
            rules={[{ required: true, message: 'Please select at least one Koi' }]}
          >
            <Select
              mode="multiple"
              placeholder="Select your Koi for the competition"
              allowClear
            >
              {availableKoiList.map((koi) => (
                <Option key={koi.koiId} value={koi.koiId}>
                  {koi.koiName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LandingPage;