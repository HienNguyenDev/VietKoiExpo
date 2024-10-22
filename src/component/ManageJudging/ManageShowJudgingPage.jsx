import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Tabs, Spin } from 'antd';
import { fetchAllContests } from '../../store/redux/action/contestAction'; // Assuming your action fetches contests

const { TabPane } = Tabs;

// Mock data for testing
const mockContests = [
  { id: 1, name: 'Spring Koi Show', status: 1 }, // 1 = upcoming
  { id: 2, name: 'Summer Koi Championship', status: 2 }, // 2 = ongoing
  { id: 3, name: 'Autumn Koi Classic', status: 3 }, // 3 = completed
];

const ManageShowJudgingPage = () => {
  const [loading, setLoading] = useState(true);
  const [contests, setContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Try to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetchAllContests(); // Actual data fetch
        setContests(response.data || mockContests); // If API fetch fails, fallback to mock data
        setFilteredContests(response.data || mockContests); // Initially show all
      } catch (error) {
        console.error('Failed to fetch contests, using mock data:', error);
        setContests(mockContests); // Fallback to mock data on error
        setFilteredContests(mockContests);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowClick = (show) => {
    navigate(`/referee/manage-judging/${show.status}/${show.id}`);
  };

  // Function to filter contests based on status
  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === 'all') {
      setFilteredContests(contests); // Show all contests
    } else if (key === '1') {
      setFilteredContests(contests.filter((contest) => contest.status === 1)); // Upcoming
    } else if (key === '2') {
      setFilteredContests(contests.filter((contest) => contest.status === 2)); // Ongoing
    } else if (key === '3') {
      setFilteredContests(contests.filter((contest) => contest.status === 3)); // Completed
    }
  };

  const columns = [
    {
      title: 'Show Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if (status === 1) return 'Upcoming';
        if (status === 2) return 'Ongoing';
        return 'Completed';
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (show) => (
        <Button
          type="primary"
          onClick={() => handleShowClick(show)}
          disabled={show.status !== 2} // Only enable judging for ongoing shows
        >
          {show.status === 2 ? 'Judge' : 'View'}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Judging Shows</h2>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="All" key="all" />
        <TabPane tab="Upcoming" key="1" />
        <TabPane tab="Ongoing" key="2" />
        <TabPane tab="Completed" key="3" />
      </Tabs>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={filteredContests} columns={columns} rowKey="id" />
      )}

      <Button type="default" style={{ marginTop: 20 }} onClick={() => navigate(-1)}>
        Quay lại
      </Button>
    </div>
  );
};

export default ManageShowJudgingPage;
