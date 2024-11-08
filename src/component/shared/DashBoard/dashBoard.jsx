import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Tag, Radio } from 'antd';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { fetchAllResultByCompCompId, reviewKoiEntryAction } from '../../../store/redux/action/resultAction';

const Dashboard = () => {
  const { compId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { compName } = location.state || {};
  const [koiDetails, setKoiDetails] = useState({}); // State để lưu chi tiết cá Koi
  const compResult = useSelector(state => state.resultReducer.compResultList);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false); // Để quản lý trạng thái loading

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true); // Bắt đầu loading
      await dispatch(fetchAllResultByCompCompId(compId)); // Fetch contests
      setLoading(false); // Kết thúc loading
    };

    fetchContests();
  }, [dispatch, compId]);

  useEffect(() => {
    // Lấy chi tiết từng cá Koi
    if (Array.isArray(compResult)) {
      compResult.forEach(result => {
        if (!koiDetails[result.koiId]) {
          dispatch(reviewKoiEntryAction(result.koiId)).then(detail => {
            setKoiDetails(prevDetails => ({
              ...prevDetails,
              [result.koiId]: detail,
            }));
          });
        }
      });
    }
  }, [dispatch, compResult, koiDetails]);

  // Cột cho rank cá Koi
  const columns = [
    {
      title: 'Koi Image',
      dataIndex: 'koiId',
      key: 'koiimageurl',
      render: (koiId) => koiDetails[koiId]?.imageUrl ? <img src={koiDetails[koiId].imageUrl} alt={koiDetails[koiId].koiName} style={{ width: '100px' }} /> : 'Loading...',
    },
    {
      title: 'Koi Name',
      dataIndex: 'koiId',
      key: 'koiName',
      render: (koiId) => koiDetails[koiId]?.koiName || 'Loading...',
    },
    {
      title: 'Variety',
      dataIndex: 'koiId',
      key: 'variety',
      render: (koiId) => koiDetails[koiId]?.varietyId || 'Loading...',
    },
    {
      title: 'Result Score',
      dataIndex: 'resultScore',
      key: 'resultScore',
    },
    {
      title: 'Prize',
      dataIndex: 'prize',
      key: 'prize',
    },
  ];

  return (
    <div>
      <h2>{compName}!!</h2>
      <Table
        columns={columns}
        dataSource={compResult}
        rowKey="resultId"
        pagination={{ pageSize: 5 }}
        loading={loading}
      />
      <Button type="default" style={{ marginTop: 20 }} onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
};

export default Dashboard;