import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, Row, Col, Modal, Form, Select, message, Input, Tag,Tooltip } from 'antd';
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllContests } from '../../store/redux/action/contestAction';
import { getAllRegistrations, getKoiById } from '../../store/redux/action/koiRegisterAction';
import { CalendarOutlined, TrophyOutlined, FlagOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.scss';
import BackButton from '../../component/shared/button/BackButton';
import { registerKoiForCompetitionApi } from '../../service/koiRegistAPI';
import contestReducer from '../../store/redux/reducers/contestReducer';
import axios from 'axios';
import Header from '../../template/theme/Header';
import InfoSection from '../../template/theme/InforSection';

const { Option } = Select;
const { Search } = Input;

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const competitions = useSelector(state => state.contestReducer.contestList);
  const registeredKoi = useSelector(state => state.RegisterKoiReducer.koiList);
  const registrationList = useSelector(state => state.RegisterKoiReducer.registrationList); // Get registration list from Redux state
  console.log(contestReducer.contestList);
  const userId = useSelector(state => state.userReducer.userLogin.userId); // Select userId
  const koiList = useSelector(state => state.RegisterKoiReducer.koiList); // Get koiList from Redux state
  
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [mockKoiList, setMockKoiList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchCategories = async (compId) => {
    try {
      const response = await axios.get(`https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Competition/CompetitonCategories/${compId}`);
      setCategories(response.data); // Cập nhật danh mục vào state
    } catch (error) {
      message.error('Không thể lấy danh mục cuộc thi');
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => { 
    const fetchData = async () => {
      await dispatch(fetchAllContests());
      await dispatch(getAllRegistrations());
      await dispatch(getKoiById(userId));

      setLoading(false);
    };
    fetchData();

    // Set interval to fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch, userId]);

  useEffect(() => {
    console.log('koiList:', koiList); // Log koiList to verify data
    setMockKoiList(Array.isArray(koiList) ? koiList : []); // Ensure koiList is an array
  }, [koiList]);

  const reloadKoiList = async () => {
    await dispatch(getAllRegistrations());
    await dispatch(getKoiById(userId));
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

  const showModal = async (competition) => {
    const status = getCompetitionStatus(competition);
    if (status === 'ongoing') {
      Modal.warning({
        title: 'Competition Ongoing',
        content: 'Cuộc thi hiện tại đang diễn ra. Không thể đăng ký.',
      });
      return;
    }
    if (status === 'completed') {
      Modal.warning({
        title: 'Competition Completed',
        content: 'Cuộc thi đã kết thúc. Vui lòng chọn cuộc thi khác.',
      });
      return;
    }
    setSelectedCompetition(competition);
    await fetchCategories(competition.compId); // Gọi hàm lấy danh mục khi mở modal
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

    try {
      for (const koiId of koiIds) {
        const koi = mockKoiList.find(k => k.koiId === koiId);
        console.log(`Registering Koi "${koi.koiName}" for competition "${selectedCompetition.compName}" with compId: ${selectedCompetition.compId}`); // Debug compId
        await registerKoiForCompetitionApi(koiId, selectedCompetition.compId, 0); // Register each koi individually
      }
      message.success('All selected Koi successfully registered!');
      await reloadKoiList(); // Reload the Koi list after registration
    } catch (error) {
      message.error('Registration failed for some Koi.');
      console.error('Error during koi registration:', error);
    }

    setIsModalVisible(false); // Close modal after processing all koi
  };

  // Filter out Koi fish that have already been registered for the selected competition
  const availableKoiList = mockKoiList.filter(koi => {
    return !registrationList.some(registration => registration.koiId === koi.koiId && registration.compId === selectedCompetition?.compId);
  });

  const getCompetitionStatus = (competition) => {
    const statusCom = competition.status;

    if (statusCom === 0) {
      return 'upcoming';
    }
    if (statusCom === 1) {
      return 'ongoing';
    }
    if (statusCom === 2) {
      return 'completed';
    }
    if (statusCom === 3) {
      return 'inactive';
    }
  };

  const isUserRegistered = (competitionId) => {
    if (!registrationList || !registeredKoi) {
      return false; // Return false if either list is undefined
    }
  
    return registrationList.some(registration => 
      registration.compId === competitionId && 
      registeredKoi.some(koi => koi.koiId === registration.koiId)
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCompetitions = competitions.filter(competition => {
    const status = getCompetitionStatus(competition);
    return (
      status !== 'inactive' &&
      (competition.compName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className={styles.landingPage}>
       <Header/>
      <div className={styles.heroSection}>
        <Typography.Title level={1}>Danh sách các cuộc thi </Typography.Title>
        <img className="giphy-gif-img giphy-img-loaded" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjJwbWl3b2szazdoOGp3dGN4emliMTFuZ3NuYzFvMDk3ZjE3ejR0ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KAI3j7HLC93Lq/giphy.gif" alt="high life fish GIF" />
        <Typography.Paragraph>
         Danh sách các cuộc thi hiện đã, đang và sắp diễn ra. Hãy tham gia ngay!
        </Typography.Paragraph>
      </div>
      <div className={styles.searchSection}>
        <Search
          placeholder="Search competitions"
          onChange={handleSearch}
          value={searchTerm}
          enterButton
          className={styles.searchInput}
        />
      </div>
      <div style={{background:'#ffffff'}} className={styles.competitionsSection}>
        <Typography.Title style={{ fontWeight:'700'}} level={2}>Các cuộc thi </Typography.Title>
        {loading ? (
          <Typography.Paragraph style={{color:'#ffffff'}}>Loading competitions...</Typography.Paragraph>
        ) : (
          <Row gutter={[16, 16]}>
            {filteredCompetitions.map((competition) => {
              const status = getCompetitionStatus(competition);
              const userRegistered = isUserRegistered(competition.compId);
              return (
                <Col key={competition.compId} span={24}>
                  <Card className={styles.competitionCard}>
                    <Row gutter={[16, 16]}>
                    <Col span={6} style={{ display: 'flex', alignItems: 'center' }}>
  {competition.imageUrl ? (
    <img
      src={competition.imageUrl}
      alt={competition.compName}
      className={styles.competitionImage}
      onError={(e) => { 
        e.target.onerror = null; 
        e.target.src = 'https://via.placeholder.com/200'; 
      }}
    />
  ) : (
    <div className={styles.placeholderImage}>No Image</div>
  )}
</Col>
                      <Col span={18}>
                        <Row>
                          <Col span={8}>
                            <Typography.Title style={{color:'#fff',fontWeight:'600'}} level={4}>{competition.compName}</Typography.Title>
                            <Typography.Paragraph style={{ color: '#ffffff' }}>{competition.compDescription}</Typography.Paragraph>
                            <Typography.Paragraph style={{ color: '#ffffff' }}>Location: {competition.location}</Typography.Paragraph>
                          </Col>
                          <Col span={8}>
                            <Typography.Paragraph>
                             <h1 style={{fontSize:'30px',color:'#ffffff',fontWeight:"600"}}>Lịch trình</h1>
                              <ul  className={styles.keyDatesList}>
                                <li style={{color:'#ffffff'}} ><CalendarOutlined /> Ngày tiến hành đăng kí: {new Date(competition.startDate).toLocaleDateString()}</li>
                                <li style={{color:'#ffffff'}}><TrophyOutlined /> Ngày bắt đầu: {new Date(competition.startDate).toLocaleDateString()}</li>
                                <li style={{color:'#ffffff'}}><FlagOutlined /> Ngày kết thúc: {new Date(competition.endDate).toLocaleDateString()}</li>
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
                            {status === 'ongoing' && userRegistered && (
                              <Button style={{ color: '#e162c1',
                                textShadow: '0 0 10px #e162c1, 0 0 20px #e162c1, 0 0 30px #e162c1',fontWeight:'600'}} type="link" onClick={() => navigate(`/checkin/${competition.compId}`)}>
                                Check In
                              </Button>
                            )}
                            {status === 'ongoing' && !userRegistered && (
                              <Typography.Title style={{ color: 'red' }} level={5}>Đăng kí để tham gia thi đấu</Typography.Title>
                            )}
                            {status === 'completed' && (
                              <Typography.Title level={5} style={{color:'red'}}>Cuộc thi hoàn thành </Typography.Title>
                            )}
                          </Col>
                        </Row>
                        <Button
                          className={styles.registerButton}
                          type="link"
                          onClick={() => showModal(competition)}
                        >
                         Đăng kí?
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




    <Modal
      title={`Đăng ký cho cuộc thi ${selectedCompetition?.compName}`}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <Form onFinish={handleFormSubmit}>
        <Form.Item label="Chọn Koi" name="koiIds" rules={[{ required: true, message: 'Vui lòng chọn ít nhất một Koi' }]}>
          <Select mode="multiple" placeholder="Chọn Koi" optionLabelProp="label">
            {availableKoiList.map((koi) => (
              <Option key={koi.koiId} value={koi.koiId} label={koi.koiName}>
                {koi.koiName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Danh Mục Cuộc Thi">
          <div>
            {categories.length > 0 ? (
              categories.map((category) => (
                <Tooltip key={category.categoryId} title={category.categoryDescription}>
                  <Tag>{category.categoryName}</Tag>
                </Tooltip>
              ))
            ) : (
              <span>Không có danh mục</span>
            )}
          </div>
          <Typography.Paragraph style={{ marginTop: 10, color: '#888' }}>
        Bấm vào từng danh mục để xem chi tiết
      </Typography.Paragraph>
        </Form.Item>

        <Button type="primary" htmlType="submit">Đăng ký</Button>
      </Form>
    </Modal>
    <InfoSection/>
    </div>
  );
};

export default LandingPage;
