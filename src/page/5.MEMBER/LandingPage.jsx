import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, Row, Col, Modal, Form, Input } from 'antd';
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllContests } from '../../store/redux/action/contestAction';
import { CalendarOutlined, TrophyOutlined, FlagOutlined } from '@ant-design/icons';
import styles from './LandingPage.module.scss';

const LandingPage = () => {
  const dispatch = useDispatch();
  const competitions = useSelector(state => state.contestReducer.contestList);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllContests());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const countdownRenderer = ({ days, hours, minutes, seconds }) => (
    <div className={styles.countdown}>
      <span>{days}d</span> <span>{hours}h</span> <span>{minutes}m</span> <span>{seconds}s</span>
    </div>
  );

  const showModal = (competition) => {
    setSelectedCompetition(competition);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    console.log('Form values:', values);
    // Handle form submission logic here
    setIsModalVisible(false);
  };

  return (
    <div className={styles.landingPage}>
      <div className={styles.heroSection}>
        <Typography.Title level={1}>Welcome to the Koi Fish Competition</Typography.Title>
        <img class="giphy-gif-img giphy-img-loaded" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjJwbWl3b2szazdoOGp3dGN4emliMTFuZ3NuYzFvMDk3ZjE3ejR0ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KAI3j7HLC93Lq/giphy.gif"  alt="high life fish GIF"></img>
        <Typography.Paragraph>
          Join us for an exciting competition showcasing the most beautiful Koi fish.
        </Typography.Paragraph>
        <Button type="primary" href="/competition">Go to Competition</Button>
      </div>
      <div className={styles.competitionsSection}>
        <Typography.Title level={2}>Upcoming Competitions</Typography.Title>
        {loading ? (
          <Typography.Paragraph>Loading competitions...</Typography.Paragraph>
        ) : (
          <Row gutter={[16, 16]}>
            {competitions.map((competition) => (
              <Col key={competition.compId} span={24}>
                <Card className={styles.competitionCard}>
                  <Row gutter={[16, 16]}>
                    <Col span={6}>
                      {competition.imageUrl ? (
                        <img src={competition.imageUrl} alt={competition.compName} className={styles.competitionImage} />
                      ) : (
                        <div className={styles.placeholderImage}>No Image</div>
                      )}
                    </Col>
                    <Col span={18}>
                      <Typography.Title level={4}>{competition.compName}</Typography.Title>
                      <Typography.Paragraph>{competition.compDescription}</Typography.Paragraph>
                      <Typography.Paragraph>Location: {competition.location}</Typography.Paragraph>
                      <Typography.Paragraph>Start Date: {new Date(competition.startDate).toLocaleDateString()}</Typography.Paragraph>
                      <Typography.Title level={5}>Starts In:</Typography.Title>
                      <Countdown date={new Date(competition.startDate)} renderer={countdownRenderer} />
                      <Typography.Paragraph>
                        Key Dates:
                        <ul className={styles.keyDatesList}>
                          <li><CalendarOutlined /> Registration: {new Date(competition.startDate).toLocaleDateString()}</li>
                          <li><TrophyOutlined /> Competition Start: {new Date(competition.startDate).toLocaleDateString()}</li>
                          <li><FlagOutlined /> Finals: {new Date(competition.endDate).toLocaleDateString()}</li>
                        </ul>
                      </Typography.Paragraph>
                      <Button type="link" onClick={() => showModal(competition)}>Register</Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <Modal title="Register for Competition" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter your phone number' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LandingPage;