import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { fetchAllResultByCompCompId, reviewKoiEntryAction } from '../../../store/redux/action/resultAction';
import styles from './Dashboard.module.scss';
import Header from '../../../template/theme/Header';
import InfoSection from '../../../template/theme/InforSection';

const Dashboard = () => {
  const { compId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { compName } = location.state || {};
  const [koiDetails, setKoiDetails] = useState({}); // State để lưu chi tiết cá Koi
  const compResult = useSelector(state => state.resultReducer.compResultList);
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
      render: (koiId) => koiDetails[koiId]?.imageUrl ? <img src={koiDetails[koiId].imageUrl} alt={koiDetails[koiId].koiName} className={styles.koiImage} /> : 'Loading...',
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
      <Header/>
      <div className={styles.dashboard}>
      <h2 className={styles.title}>{compName}</h2>
      <Table
        columns={columns}
        dataSource={compResult}
        rowKey="resultId"
        pagination={{ pageSize: 5 }}
        loading={loading}
        className={styles.table}
      />
      <Button type="default" className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </Button>
      <InfoSection/>
    </div>
    </div>
  );
};

export default Dashboard;