import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Drawer, Form, Input, Radio, Tag, message } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import styles from './ManageShowJudgingPage.module.scss';
import { fetchAllContests } from '../../store/redux/action/contestAction';

const ManageShowJudgingPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedContest, setSelectedContest] = useState(null);
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

  const showDrawer = (title, contest) => {
    setDrawerTitle(title);
    setSelectedContest(contest);
    setDrawerVisible(true);

    if (contest) {
      // Retrieve Koi fish from local storage
      const storedKoi = JSON.parse(localStorage.getItem('koiRegistrations')) || {};
      const localKoiEntries = Object.values(storedKoi).filter(koi => koi.competitions.includes(contest.compId));
      setKoiEntries(localKoiEntries);
    }
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedContest(null);
  };

  const handleView = (id) => {
    const contest = contestsData.find(contest => contest.compId === id);
    if (contest) {
      showDrawer('Judging for Contest', contest);
    }
  };

  const handleScoreChange = (id, newScore) => {
    setKoiEntries(entries => entries.map(entry =>
      entry.koiId === id ? { ...entry, score: newScore } : entry
    ));
  };

  const confirmScores = () => {
    // Update local storage
    const storedKoi = JSON.parse(localStorage.getItem('koiRegistrations')) || {};
    koiEntries.forEach(entry => {
      if (storedKoi[entry.koiId]) {
        storedKoi[entry.koiId].score = entry.score;
      }
    });
    localStorage.setItem('koiRegistrations', JSON.stringify(storedKoi));

    // Update competition status to "completed"
    const updatedContests = contestsData.map(contest => 
      contest.compId === selectedContest.compId ? { ...contest, status: 2 } : contest
    );
    localStorage.setItem('competitions', JSON.stringify(updatedContests));

    // Notify other tabs about the update
    localStorage.setItem('competitionStatusUpdate', Date.now());

    message.success('Scores confirmed and saved successfully!');
    closeDrawer();
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
        <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.compId)}>Judge</Button>
      ),
    },
  ];

  return (
    <div className={styles.manageShowJudgingPage}>
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

      <Drawer
        title={drawerTitle}
        width={640}
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <Form layout="vertical">
          <Form.Item label="Contest Name">
            <Input value={selectedContest ? selectedContest.compName : ''} disabled />
          </Form.Item>
          <Table
            dataSource={koiEntries}
            columns={[
              { title: 'Koi Name', dataIndex: 'koiName', key: 'koiName' },
              { title: 'Age', dataIndex: 'age', key: 'age' },
              { title: 'Size (cm)', dataIndex: 'size', key: 'size' },
              { title: 'Variety', dataIndex: 'variety', key: 'variety' },
              {
                title: 'Score',
                key: 'score',
                render: (text, record) => (
                  <Input
                    type="number"
                    placeholder="Enter score"
                    value={record.score || ''}
                    onChange={(e) => handleScoreChange(record.koiId, e.target.value)}
                  />
                ),
              },
            ]}
            rowKey="koiId"
            pagination={{ pageSize: 5 }}
          />
          <Form.Item>
            <Button type="primary" onClick={confirmScores}>
              Confirm Scores
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ManageShowJudgingPage;