import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col, Spin, notification, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCheckInData } from '../../store/redux/action/CheckInAction';
import { fetchCompetitionData, fetchCategoriesByCompId, fetchKoiEntries, fetchCheckedInKoiForCompetition } from '../../store/redux/action/competitionAction';
import BracketList from './competition/BracketList';
import KoiList from './competition/KoiList';
import styles from './CompetitionPage.module.scss';
import { getRegistrationByRegisID } from '../../service/koiRegist';

const { Title, Paragraph } = Typography;

const CompetitionPage = () => {
  const { compId } = useParams();
  const dispatch = useDispatch();
  const checkInData = useSelector(state => state.checkInReducer.checkInData || []);
  const registrationData = useSelector(state => state.registerKoi.regisKoiList || []);
  const competition = useSelector(state => state.competitionReducer.competition || {});
  const categories = useSelector(state => state.competitionReducer.categories || []);
  const koiEntries = useSelector(state => state.competitionReducer.koiEntries || []);
  const loading = useSelector(state => state.checkInReducer.loading || state.registerKoi.loading || state.competitionReducer.loading);
  const competitionStatus = useSelector(state => state.competitionReducer.competitionStatus || []);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCheckInData());
    dispatch(fetchCompetitionData(compId));
    dispatch(fetchCategoriesByCompId(compId));
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
    }, 5000); // Check competition status every 5 seconds
    return () => clearInterval(interval);
  }, [dispatch, compId]);

  useEffect(() => {
    if (competitionStatus === 'completed') {
      notification.success({
        message: 'Competition Completed',
        description: 'The competition has ended. You can now view the dashboard or ranking.',
      });
    }
  }, [competitionStatus]);

  if (loading) {
    return <Spin size="large" />;
  }

  console.log('Filtered Koi entries:', competitionStatus);

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
          <Title   style={{color:'#ffffff'}} level={4}>Koi Entries</Title>
          {selectedCategory ? (
            <KoiList koiEntries={competitionStatus} />
          ) : (
            <KoiList koiEntries={competitionStatus} />
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default CompetitionPage;