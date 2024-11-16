import React, { useEffect, useState } from 'react';
import { Layout, Typography, Spin, notification, Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCheckInData } from '../../store/redux/action/checkInAction';
import { fetchCompetitionData, fetchCategoriesByCompId, fetchKoiEntries, fetchCheckedInKoiForCompetition } from '../../store/redux/action/competitionAction';
import { fetchScores } from '../../store/redux/action/scoreAction';
import { fetchKoiStatus } from '../../store/redux/action/competitionAction'; // Import action fetchKoiStatus
import BracketList from './competition/BracketList';
import KoiList from './competition/KoiList';
import styles from './CompetitionPage.module.scss';
import { getRegistrationByRegisID } from '../../service/koiRegistAPI';
import Header from '../../template/theme/Header';
import InfoSection from '../../template/theme/InforSection';

const { Title, Paragraph } = Typography;

const CompetitionPage = () => {
  const { compId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux State selectors
  const checkInData = useSelector(state => state.checkInReducer.checkInData || []);
  const registrationData = useSelector(state => state.RegisterKoiReducer.regisKoiList || []);
  const competition = useSelector(state => state.competitionReducer.competition || {});
  const categories = useSelector(state => Array.isArray(state.competitionReducer.categories) ? state.competitionReducer.categories : []);
  const koiEntries = useSelector(state => state.competitionReducer.koiEntries || []);
  const koiStatus = useSelector(state => state.competitionReducer.koiStatus || []); // Add koiStatus state
  const loading = useSelector(state => state.checkInReducer.loading || state.RegisterKoiReducer.loading || state.competitionReducer.loading || state.scoreReducer.loading);
  const competitionStatus = useSelector(state => state.competitionReducer.competitionStatus[compId] || []);
  const koiEntriesListScore = useSelector(state => state.scoreReducer.scores.filter(score => score.compId === compId));

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notificationShown, setNotificationShown] = useState(false);

  // Fetch competition data and koi status
  useEffect(() => {
    dispatch(fetchCheckInData());
    dispatch(fetchCompetitionData(compId));
    dispatch(fetchCategoriesByCompId(compId));
    dispatch(fetchScores(compId));
    dispatch(fetchKoiStatus(compId)); // Dispatch fetchKoiStatus
  }, [dispatch, compId]);

  // Handle check-in data
  useEffect(() => {
    if (checkInData.length > 0) {
      const passedCheckIn = checkInData.filter(checkIn => checkIn.status === 1);
      const registrationIds = passedCheckIn.map(checkIn => checkIn.registrationId);
      dispatch(getRegistrationByRegisID(registrationIds));
    }
  }, [checkInData, dispatch]);

  // Handle registration data
  useEffect(() => {
    if (registrationData.length > 0) {
      const ongoingRegistrations = registrationData.filter(registration => registration.status === 1);
      const competitionIds = ongoingRegistrations.map(registration => registration.compId);
      competitionIds.forEach(compId => dispatch(fetchCompetitionData(compId)));
    }
  }, [registrationData, dispatch]);

  // Fetch Koi entries for the selected category
  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchKoiEntries(compId, selectedCategory));
    }
  }, [selectedCategory, dispatch, compId]);

  // Check competition status and koi judgment status
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchCheckedInKoiForCompetition(compId));
      dispatch(fetchScores(compId));

    }, 5000); // Check competition status every 5 seconds
    return () => clearInterval(interval);
  }, [dispatch, compId]);

  // Display notification if all koi are judged or competition is completed
  useEffect(() => {
    // Kiểm tra xem cuộc thi đã hoàn thành chưa và hiển thị thông báo
    if (competitionStatus === 'completed' && competition.compId === compId && !notificationShown) {
      notification.success({
        message: 'Cuộc thi đã hoàn thành',
        description: 'Cuộc thi đã kết thúc. Bạn có thể xem bảng điều khiển hoặc xếp hạng.',
        btn: (
          <Button type="primary" onClick={() => navigate(`/dashboard/${compId}`, { state: { compId, compName: competition.compName } })}>
            Đi đến Bảng điều khiển
          </Button>
        ),
        onClose: () => setNotificationShown(true), // Set notificationShown to true after closing the notification
      });
    }
  
    // Kiểm tra xem tất cả các Koi đã được chấm điểm chưa và hiển thị thông báo
    const allJudged = koiEntriesListScore.every(koi => koi.status === true); // Check if all Koi have status true (judged)
    if (allJudged && !notificationShown) {
      notification.success({
        message: 'Cuộc thi đã hoàn thành',
        description: 'Cuộc thi đã kết thúc. Bạn có thể xem bảng điều khiển hoặc xếp hạng.',
        btn: (
          <Button type="primary" onClick={() => navigate(`/dashboard/${compId}`, { state: { compId, compName: competition.compName } })}>
            Đi đến Bảng điều khiển
          </Button>
        ),
        onClose: () => setNotificationShown(true), // Set notificationShown to true after closing the notification
      });
    }
  }, [competitionStatus, koiEntriesListScore, notificationShown, navigate, compId, competition.compName]);


  // Loading state
  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <Layout className={styles.competitionPage}>
        <Card className={styles.competitionCard}>
          <Title style={{ color: '#ffffff' }} level={2}>{competition.compName}</Title>
          <Paragraph style={{ color: '#ffffff' }}>{competition.compDescription}</Paragraph>
          <Paragraph style={{ color: '#ffffff' }}><strong>Địa điểm:</strong> {competition.location}</Paragraph>
          <Paragraph style={{ color: '#ffffff' }}><strong>Ngày bắt đầu:</strong> {new Date(competition.startDate).toLocaleDateString()}</Paragraph>
          <Paragraph style={{ color: '#ffffff' }}><strong>Ngày kết thúc:</strong> {new Date(competition.endDate).toLocaleDateString()}</Paragraph>
        </Card>
        <div className={styles.content}>
          <Card className={styles.bracketCard}>
            <Title style={{ color: '#ffffff' }} level={4}>Danh mục</Title>
            <BracketList brackets={categories} onSelectBracket={setSelectedCategory} />
          </Card>
          <Card className={styles.koiEntriesCard}>
            <Title style={{ color: '#ffffff' }} level={4}>Danh sách Koi</Title>
            {selectedCategory ? (
              <KoiList koiEntries={koiEntries} />
            ) : (
              <Paragraph style={{ color: '#ffffff' }}>Vui lòng chọn một danh mục để xem danh sách Koi.</Paragraph>
            )}
          </Card>
        </div>
      </Layout>
      <InfoSection />
    </div>
  );
};

export default CompetitionPage;
