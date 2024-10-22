import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Button, Spin, Tabs } from 'antd';
import { fetchContestDetails } from '../../store/redux/action/contestAction'; // Assuming your action fetches a specific contest

const { TabPane } = Tabs;

// Mock data for testing
const mockKoiEntries = {
  1: [
    { id: 1, koiID: 'K001', name: 'Koi Fish 1', score: null },
    { id: 2, koiID: 'K002', name: 'Koi Fish 2', score: null },
  ],
  2: [
    { id: 3, koiID: 'K003', name: 'Koi Fish 3', score: null },
    { id: 4, koiID: 'K004', name: 'Koi Fish 4', score: null },
  ],
  3: [
    { id: 5, koiID: 'K005', name: 'Koi Fish 5', score: 8.5 },
    { id: 6, koiID: 'K006', name: 'Koi Fish 6', score: 9.0 },
  ],
};

const ManageKoiJudgingPage = () => {
  const { id, status } = useParams(); // Status is passed in the URL
  const [loading, setLoading] = useState(true);
  const [koiEntries, setKoiEntries] = useState([]);
  const [filteredKoi, setFilteredKoi] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKoiEntries = async () => {
      try {
        const response = await fetchContestDetails(id); // Try fetching actual data
        const entries = response.data?.koiEntries || mockKoiEntries[id]; // Fallback to mock if no data
        setKoiEntries(entries);
        setFilteredKoi(entries); // Initially show all koi entries
      } catch (error) {
        console.error('Failed to fetch koi entries, using mock data:', error);
        setKoiEntries(mockKoiEntries[id]); // Use mock data on error
        setFilteredKoi(mockKoiEntries[id]);
      } finally {
        setLoading(false);
      }
    };

    fetchKoiEntries();
  }, [id]);

  

  const handleJudgeClick = (koi) => {
    if (status === '2') {
      navigate(`/referee/manage-judging/scoring/${koi.id}`);
    }
  };

  const columns = [
    {
      title: 'Koi ID',
      dataIndex: 'koiID',
      key: 'koiID',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (score, koi) => {
        if (status === '3') return score; // Completed: Show scores
        if (status === '1') return 'N/A'; // Upcoming: Not available for judging
        return score || 'Pending'; // Ongoing: Show pending if no score
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (koi) => (
        <Button
          type="primary"
          onClick={() => handleJudgeClick(koi)}
          disabled={status !== '2'} // Only enable judging for ongoing contests
        >
          {status === '2' ? 'Judge' : 'View'}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Manage Koi Judging</h2>
     

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table dataSource={filteredKoi} columns={columns} rowKey="id" />
      )}

      <Button type="default" style={{ marginTop: 20 }} onClick={() => navigate(-1)}>
        Quay lại
      </Button>
    </div>
  );
};

export default ManageKoiJudgingPage;
