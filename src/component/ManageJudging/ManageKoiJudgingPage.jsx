import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Table, Button, Spin, Tabs, Tag, Radio } from 'antd';
import { fetchKoiFromCompId, setKoiListByContestAction } from '../../store/redux/action/contestAction'; // Assuming your action fetches a specific contest

const { TabPane } = Tabs;


const ManageKoiJudgingPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { compId, compName } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();


  // Lấy danh sách cá Koi có trong cuộc thi từ Redux store
  const koiList = useSelector(state => state.contestReducer.koiList);

  useEffect(() => {
    if (compId) {
      dispatch(fetchKoiFromCompId(compId)).finally(() => setLoading(false));
    }
  }, [dispatch, compId]);

  // Filter koi based on status
  const filteredKoi = koiList.filter(koi => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'unjudged') return !koi.status;
    if (filterStatus === 'judged') return koi.status;
    return true;
  });

  const columns = [
    {
      title: 'Koi Name',
      dataIndex: 'koiName',
      key: 'koiName',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Size (cm)',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Shape Score',
      dataIndex: 'koiId',
      key: 'scoreShape',
      render: (koiId) => koiId.scoreShape || 'Loading...',
    },
    {
      title: 'Color Score',
      dataIndex: 'koiId',
      key: 'scoreColor',
      render: (koiId) => koiId.scoreColor || 'Loading...',
    },
    {
      title: 'Pattern Score',
      dataIndex: 'koiId',
      key: 'scorePattern',
      render: (koiId) => koiId.scorePattern || 'Loading...',
    },
    {
      title: 'Total Score',
      dataIndex: 'koiId',
      key: 'totalScore',
      render: (koiId) => koiId.totalScore || 'Loading...',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status ? 'green' : 'red';
        let statusText = status ? 'Graded' : 'Pending';
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        record.status ? (
          <Button type="primary" onClick={() => handleJudgeClick(record.compId, record.compName)}>Judge</Button>
        ) : (
          <Button type="danger" onClick={() => handleJudgeClick(record.registrationId)}>ReJudge</Button>
        )
      ),
    },
  ];

  const handleJudgeClick = (koiId) => {
      navigate(`/referee/manage-judging/scoring/${koiId}`);
  };

  return (
    <div>
      <h2>Manage Koi Judging in {compName} </h2>
      <Radio.Group
        onChange={(e) => setFilterStatus(e.target.value)}
        value={filterStatus}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="unjudged">Unjudged</Radio.Button>
        <Radio.Button value="judged">Judged</Radio.Button>
      </Radio.Group>

      {/* Table component with pagination and loading */}
      <Table
        columns={columns}
        dataSource={filteredKoi}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        loading={loading}
      />


      <Button type="default" style={{ marginTop: 20 }} onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
};

export default ManageKoiJudgingPage;
