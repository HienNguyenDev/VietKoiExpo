import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchAllResults, reviewKoiEntryAction, fetchCompetitionDetails } from '../../../store/redux/action/resultAction';
import styles from './Dashboard.module.scss';
import Header from '../../../template/theme/Header';
import InfoSection from '../../../template/theme/InforSection';

const AllResultsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [koiDetails, setKoiDetails] = useState({}); // State để lưu chi tiết cá Koi
  const [competitionNames, setCompetitionNames] = useState({}); // State to store competition names
  const allResults = useSelector(state => state.resultReducer.compResultList || []);
  const loading = useSelector(state => state.resultReducer.loading);
  const [loadingDetails, setLoadingDetails] = useState(false); // Để quản lý trạng thái loading chi tiết

  useEffect(() => {
    const fetchResults = async () => {
      setLoadingDetails(true); // Bắt đầu loading
      await dispatch(fetchAllResults()); // Fetch all results
      setLoadingDetails(false); // Kết thúc loading
    };

    fetchResults();
  }, [dispatch]);

  useEffect(() => {
    const fetchKoiDetails = async () => {
      if (Array.isArray(allResults)) {
        for (const result of allResults) {
          if (!koiDetails[result.koiId]) {
            const detail = await dispatch(reviewKoiEntryAction(result.koiId));
            setKoiDetails(prevDetails => ({
              ...prevDetails,
              [result.koiId]: detail,
            }));
          }
          if (!competitionNames[result.compId]) {
            const competitionDetail = await dispatch(fetchCompetitionDetails(result.compId));
            setCompetitionNames(prevNames => ({
              ...prevNames,
              [result.compId]: competitionDetail.compName,
            }));
          }
        }
      }
    };

    fetchKoiDetails();
  }, [dispatch, allResults, koiDetails, competitionNames]);

  // Cột cho rank cá Koi
  const columns = [
    {
      title: 'Hình Ảnh Cá Koi',
      dataIndex: 'koiId',
      key: 'koiimageurl',
      render: (koiId) => koiDetails[koiId]?.imageUrl ? <img src={koiDetails[koiId].imageUrl} alt={koiDetails[koiId].koiName} className={styles.koiImage} /> : 'Đang tải...',
    },
    {
      title: 'Tên Cá Koi',
      dataIndex: 'koiId',
      key: 'koiName',
      render: (koiId) => koiDetails[koiId]?.koiName || 'Đang tải...',
    },
    {
      title: 'Giống',
      dataIndex: 'koiId',
      key: 'variety',
      render: (koiId) => koiDetails[koiId]?.varietyId || 'Đang tải...',
    },
    {
      title: 'Điểm Số',
      dataIndex: 'resultScore',
      key: 'resultScore',
    },
    {
      title: 'Giải Thưởng',
      dataIndex: 'prize',
      key: 'prize',
    },
    {
      title: 'Tên Cuộc Thi',
      dataIndex: 'compId',
      key: 'compId',
      render: (compId) => competitionNames[compId] || 'Đang tải...',
    },
  ];

  console.log("allResults", allResults);

  return (
    <div>
      <Header/>
      <div className={styles.dashboard}>
      <h2 className={styles.title}>Kết quả các cuộc thi đã hoàn thành</h2>
      <Table
        columns={columns}
        dataSource={allResults}
        rowKey="resultId"
        pagination={{ pageSize: 5 }}
        loading={loading || loadingDetails}
        className={styles.table}
      />
      <Button type="default" className={styles.backButton} onClick={() => navigate(-1)}>
        Quay Lại
      </Button>
      <InfoSection/>
    </div>
    </div>
  );
};

export default AllResultsPage;