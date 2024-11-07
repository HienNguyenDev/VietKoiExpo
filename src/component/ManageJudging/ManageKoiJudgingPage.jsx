import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Button, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchContestDetails, fetchAllContests } from '../../store/redux/action/contestAction'; // Assuming your action fetches a specific contest

const ManageKoiJudgingPage = () => {
  const { id, status } = useParams(); // Status is passed in the URL
  const [loading, setLoading] = useState(true);
  const [koiEntries, setKoiEntries] = useState([]);
  const [filteredKoi, setFilteredKoi] = useState([]);
  const [mockKoiList, setMockKoiList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllContests());
        // Retrieve updated Koi list from local storage
        const storedKoiList = JSON.parse(localStorage.getItem('mockKoiList')) || [];
        setMockKoiList(storedKoiList);
      } catch (error) {
        console.error('Failed to fetch contests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchKoiEntries = async () => {
      try {
        const response = await dispatch(fetchContestDetails(id)); // Try fetching actual data
        const entries = response.data?.koiEntries || []; // Fallback to empty array if no data
        setKoiEntries(entries);

        // Retrieve Koi fish from local storage
        const storedKoi = JSON.parse(localStorage.getItem('koiRegistrations')) || {};
        const localKoiEntries = Object.values(storedKoi).filter(koi => koi.competitions.includes(id));

        // Combine local Koi entries with API entries
        const combinedKoiEntries = [...localKoiEntries, ...entries];

        setFilteredKoi(combinedKoiEntries); // Initially show all koi entries
      } catch (error) {
        console.error('Failed to fetch koi entries:', error);
        setKoiEntries([]); // Use empty array on error
        setFilteredKoi([]);
      } finally {
        setLoading(false);
      }
    };

    fetchKoiEntries();
  }, [dispatch, id]);

  const handleJudgeClick = (koi) => {
    if (status === '2') {
      navigate(`/referee/manage-judging/scoring/${koi.koiId}`);
    }
  };

  const columns = [
    {
      title: 'Koi ID',
      dataIndex: 'koiId',
      key: 'koiId',
    },
    {
      title: 'Name',
      dataIndex: 'koiName',
      key: 'koiName',
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
        <Table dataSource={filteredKoi} columns={columns} rowKey="koiId" />
      )}

      <Button type="default" style={{ marginTop: 20 }} onClick={() => navigate(-1)}>
        Quay lại
      </Button>
    </div>
  );
};

export default ManageKoiJudgingPage;