import React, { useEffect, useState } from 'react';
import { Layout, Typography, Spin, notification, Card, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCheckInData } from '../../store/redux/action/checkInAction';
import { fetchCompetitionData, fetchCategoriesByCompId, fetchKoiEntries, fetchCheckedInKoiForCompetition } from '../../store/redux/action/competitionAction';
import BracketList from './competition/BracketList';
import KoiList from './competition/KoiList';
import styles from './CompetitionPage.module.scss';
import { getRegistrationByRegisID } from '../../service/koiRegist';
import { fetchScores } from '../../store/redux/action/scoreAction';

const { Title, Paragraph } = Typography;

const CompetitionPage = () => {
  const { compId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkInData = useSelector(state => state.checkInReducer.checkInData || []);
  const registrationData = useSelector(state => state.registerKoi.regisKoiList || []);
  const competition = useSelector(state => state.competitionReducer.competition || {});
  const categories = useSelector(state => Array.isArray(state.competitionReducer.categories) ? state.competitionReducer.categories : []); // Ensure categories is an array
  const koiEntries = useSelector(state => state.competitionReducer.koiEntries || []);
  const loading = useSelector(state => state.checkInReducer.loading || state.registerKoi.loading || state.competitionReducer.loading || state.scoreReducer.loading);
  const competitionStatus = useSelector(state => state.competitionReducer.competitionStatus || []);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const koiEntriesListScore = useSelector(state => state.scoreReducer.scores || []);
  const [notificationShown, setNotificationShown] = useState(false);

  useEffect(() => {
    dispatch(fetchCheckInData());
    dispatch(fetchCompetitionData(compId));
    dispatch(fetchCategoriesByCompId(compId));
    dispatch(fetchScores(compId));
  }, [dispatch, compId]);

  useEffect(() => {
    if (checkInData.length > 0) {
      console.log('Check-in data:', checkInData);
      const passedCheckIn = checkInData.filter(checkIn => checkIn.status === 1);
      const registrationIds = passedCheckIn.map(checkIn => checkIn.registrationId);
      dispatch(getRegistrationByRegisID(registrationIds));
    }
  }, [checkInData, dispatch]);

  useEffect(() => {
    if (registrationData.length > 0) {
      console.log('Registration data:', registrationData);
      const ongoingRegistrations = registrationData.filter(registration => registration.status === 1);
      const competitionIds = ongoingRegistrations.map(registration => registration.compId);
      competitionIds.forEach(compId => dispatch(fetchCompetitionData(compId)));
    }
  }, [registrationData, dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      console.log('Fetching koi entries for category ID:', selectedCategory); // Log the selected category ID
      dispatch(fetchKoiEntries(compId, selectedCategory));
    }
  }, [selectedCategory, dispatch, compId]);

  useEffect(() => {
    if (koiEntries.length > 0) {
      console.log('Koi entries in the competition:', koiEntries);
    }
  }, [koiEntries]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchCheckedInKoiForCompetition(compId));
      dispatch(fetchScores(compId));
    }, 5000); // Check competition status every 5 seconds
    return () => clearInterval(interval);
  }, [dispatch, compId]);

  useEffect(() => {
    const allJudged = koiEntriesListScore.every(koi => koi.status === true);
    if (allJudged && !notificationShown) {
      notification.success({
        message: 'Competition Completed',
        description: 'The competition has ended. You can now view the dashboard or ranking.',
        btn: (
          <Button type="primary" onClick={() => navigate(`/dashboard/${compId}`, { state: { compId, compName: competition.compName } })}>
            Go to Dashboard
          </Button>
        ),
        onClose: () => setNotificationShown(true),
      });
    }
  }, [koiEntriesListScore, notificationShown, navigate, compId, competition.compName]);

  useEffect(() => {
    if (competitionStatus === 'completed' && !notificationShown) {
      notification.success({
        message: 'Competition Completed',
        description: 'The competition has ended. You can now view the dashboard or ranking.',
        btn: (
          <Button type="primary" onClick={() => navigate(`/dashboard/${compId}`, { state: { compId, compName: competition.compName } })}>
            Go to Dashboard
          </Button>
        ),
        onClose: () => setNotificationShown(true),
      });
    }
  }, [competitionStatus, notificationShown, navigate, compId, competition.compName]);

  if (loading) {
    return <Spin size="large" />;
  }

  console.log('Filtered Koi entries:', koiEntries);

  return (
    <Layout className={styles.competitionPage}>
      <Card className={styles.competitionCard}>
        <Title style={{color:'#ffffff'}} level={2}>{competition.compName}</Title>
        <Paragraph style={{color:'#ffffff'}}>{competition.compDescription}</Paragraph>
        <Paragraph style={{color:'#ffffff'}}><strong>Location:</strong> {competition.location}</Paragraph>
        <Paragraph style={{color:'#ffffff'}}><strong>Start Date:</strong> {new Date(competition.startDate).toLocaleDateString()}</Paragraph>
        <Paragraph style={{color:'#ffffff'}}><strong>End Date:</strong> {new Date(competition.endDate).toLocaleDateString()}</Paragraph>
        {/* <div className={styles.registerButton}>Register</div> */}
      </Card>
      <div className={styles.content}>
        <Card className={styles.bracketCard}>
          <Title style={{color:'#ffffff'}} level={4}>Categories</Title>
          <BracketList brackets={categories} onSelectBracket={setSelectedCategory} />
        </Card>
        <Card className={styles.koiEntriesCard}>
          <Title style={{color:'#ffffff'}} level={4}>Koi Entries</Title>
          {selectedCategory ? (
            <KoiList koiEntries={koiEntries} />
          ) : (
            <Paragraph style={{color:'#ffffff'}}>Please select a category to view koi entries.</Paragraph>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default CompetitionPage;