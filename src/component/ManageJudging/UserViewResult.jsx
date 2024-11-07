import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Tag, Radio, Typography, Card, Row, Col } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import styles from './UserViewResultsPage.module.scss';
import { fetchAllContests } from '../../store/redux/action/contestAction';

const UserViewResultsPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [koiEntries, setKoiEntries] = useState([]);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contestsData = useSelector(state => state.contestReducer.contestList);

  useEffect(() => {
    dispatch(fetchAllContests());
  }, [dispatch]);

  const filteredCompetitions = contestsData.filter(competition => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'upcoming') return competition.status === 0;
    if (filterStatus === 'ongoing') return competition.status === 1;
    if (filterStatus === 'completed') return competition.status === 2;
    return true;
  });

  const handleViewResults = (id) => {
    const contest = contestsData.find(contest => contest.compId === id);
    if (contest) {
      // Retrieve Koi fish from local storage
      const storedKoi = JSON.parse(localStorage.getItem('koiRegistrations')) || {};
      const localKoiEntries = Object.values(storedKoi).filter(koi => koi.competitions.includes(contest.compId));
      setKoiEntries(localKoiEntries);
      navigate(`/results/${id}`);
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'compName', key: 'compName' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 0 ? 'green' : status === 1 ? 'blue' : 'red';
        let statusText = status === 0 ? 'Upcoming' : status === 1 ? 'Ongoing' : 'Completed';
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewResults(record.compId)}>
          {record.status === 2 ? 'View Results' : 'Judging in Progress'}
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.userViewResultsPage}>
      <Typography.Title level={2} className={styles.title}>Competition Results</Typography.Title>
      <Radio.Group 
        onChange={(e) => setFilterStatus(e.target.value)} 
        value={filterStatus}
        style={{ marginBottom: 16 }}>
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="upcoming">Upcoming</Radio.Button>
        <Radio.Button value="ongoing">Ongoing</Radio.Button>
        <Radio.Button value="completed">Completed</Radio.Button>
      </Radio.Group>

      <Table dataSource={filteredCompetitions} columns={columns} rowKey="compId" />

      {koiEntries.length > 0 && (
        <div className={styles.resultsSection}>
          <Typography.Title level={3} className={styles.resultsTitle}>Koi Fish Results</Typography.Title>
          <Row gutter={[16, 16]}>
            {koiEntries.sort((a, b) => b.score - a.score).map((koi, index) => (
              <Col key={koi.koiId} span={8}>
                <Card className={styles.koiCard}>
                  <Typography.Title level={4} className={styles.koiName}>{koi.koiName}</Typography.Title>
                  <Typography.Text className={styles.koiOwner}>Owner: {koi.owner}</Typography.Text>
                  <Typography.Text className={styles.koiScore}>Score: {koi.score}</Typography.Text>
                  <Typography.Text className={styles.koiRank}>Rank: {index + 1}</Typography.Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default UserViewResultsPage;