import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col, Spin, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCheckInData } from '../../store/redux/action/CheckInActionNguyen';
import { fetchCompetitionData, fetchCategoryData, fetchKoiEntries, checkCompetitionStatus } from '../../store/redux/action/competitionAction';
import BracketList from './competition/BracketList';
import KoiList from './competition/KoiList';
import styles from './CompetitionPage.module.scss';
import { getRegistrationByRegisID } from '../../service/koiRegist';

const CompetitionPage = ({ match }) => {
  const { compId } = match.params;
  const dispatch = useDispatch();
  const checkInData = useSelector(state => state.checkInReducer.checkInData);
  const registrationData = useSelector(state => state.registrationReducer.registrationData);
  const competition = useSelector(state => state.competitionReducer.competition);
  const categories = useSelector(state => state.competitionReducer.categories);
  const koiEntries = useSelector(state => state.competitionReducer.koiEntries);
  const loading = useSelector(state => state.checkInReducer.loading || state.registrationReducer.loading || state.competitionReducer.loading);
  const competitionStatus = useSelector(state => state.competitionReducer.competitionStatus);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCheckInData());
  }, [dispatch]);

  useEffect(() => {
    if (checkInData.length > 0) {
      const passedCheckIn = checkInData.filter(checkIn => checkIn.status === 1);
      const registrationIds = passedCheckIn.map(checkIn => checkIn.registrationId);
      dispatch(getRegistrationByRegisID(registrationIds));
    }
  }, [checkInData, dispatch]);

  useEffect(() => {
    if (registrationData.length > 0) {
      const ongoingRegistrations = registrationData.filter(registration => registration.status === 1);
      const competitionIds = ongoingRegistrations.map(registration => registration.compId);
      competitionIds.forEach(compId => dispatch(fetchCompetitionData(compId)));
    }
  }, [registrationData, dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchKoiEntries(compId, selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkCompetitionStatus(compId));
    }, 5000); // Check competition status every 5 seconds
    return () => clearInterval(interval);
  }, [dispatch, compId]);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Layout className={styles.competitionPage}>
      <Typography.Title level={2}>{competition?.compName}</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Typography.Title level={4}>Brackets</Typography.Title>
          <BracketList brackets={categories} onSelectBracket={setSelectedCategory} />
        </Col>
        <Col span={18}>
          <Typography.Title level={4}>Koi Entries</Typography.Title>
          {selectedCategory ? (
            <KoiList koiEntries={koiEntries} />
          ) : (
            <Typography.Text>Select a bracket to view Koi entries</Typography.Text>
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default CompetitionPage;