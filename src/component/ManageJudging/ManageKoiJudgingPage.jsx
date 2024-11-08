import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Table, Button, Spin, Tabs, Tag, Radio } from 'antd';
import { fetchKoiFromCompId} from '../../store/redux/action/contestAction'; // Assuming your action fetches a specific contest
import { fetchAllScore } from '../../store/redux/action/koiEntriesAction';
const { TabPane } = Tabs;


const ManageKoiJudgingPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { compId, compName, userId } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();
  


  const scores = useSelector(state => state.koiEntriesReducer.scoretList);
  useEffect(() => {
    const fetchScore = async () => {
      setLoading(true); // Bắt đầu loading
      await dispatch(fetchAllScore()); // Fetch score 
      setLoading(false); // Kết thúc loading
    };
    
    fetchScore();
  }, [dispatch]);
  //tôi cần lấy những thông tin như scoreShape,scoreColor,scorePattern và scoreTotal từ fetchAllScore với điều kiện là koiId với compId trùng với những gì đang có của tôi

  // Lấy danh sách cá Koi có trong cuộc thi từ Redux store
  const koiList = useSelector(state => state.contestReducer.koiList);
  console.log("koiList",koiList);
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
  }).map(koi => {
    const matchedScore = Array.isArray(scores)
        ? scores.find(score => score.koiId === koi.koiId && score.compId === compId)
        : null;
    
      return {
      ...koi,
      scoreShape: matchedScore?.scoreShape ?? 'None',
      scoreColor: matchedScore?.scoreColor ?? 'None',
      scorePattern: matchedScore?.scorePattern ?? 'None',
      totalScore: matchedScore?.totalScore ?? 'None',
    };
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
      title: 'Size (cm)',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Shape Score',
      dataIndex: 'scoreShape',
      key: 'scoreShape',
      
    },
    {
      title: 'Color Score',
      dataIndex: 'scoreColor',
      key: 'scoreColor',
      
    },
    {
      title: 'Pattern Score',
      dataIndex: 'scorePattern',
      key: 'scorePattern',
    },
    {
      title: 'Total Score',
      dataIndex: 'totalScore',
      key: 'totalScore',
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
          <Button type="  danger" onClick={() => handleJudgeClick(record.koiId, record.koiName)}>ReJudge</Button>
        ) : (
          <Button type="primary" onClick={() => handleJudgeClick(record.koiId, record.koiName)}>Judge</Button>
        )
      ),
    },
  ];
  
  const handleJudgeClick = (koiId, koiName) => {
      navigate(`/referee/manage-judging/scoring/${koiId}`, { state: { koiId, koiName, compId } });
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
        rowKey="koiId"
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