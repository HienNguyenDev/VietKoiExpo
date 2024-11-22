import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Table, Button, Spin, Tabs, Tag, Radio } from 'antd';
import { fetchAllContests, fetchKoiFromCompId, updateContestCompleteActionApi } from '../../store/redux/action/contestAction'; // Giả sử hành động của bạn lấy một cuộc thi cụ thể
import { fetchAllScore } from '../../store/redux/action/koiEntriesAction';
import { setTopPrizesAction } from '../../store/redux/action/resultAction';
import { Box } from '@mui/system';
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
      setLoading(true); // Bắt đầu tải
      await dispatch(fetchAllScore()); // Lấy điểm số
      setLoading(false); // Kết thúc tải
    };

    fetchScore();
  }, [dispatch]);
  // tôi cần lấy những thông tin như scoreShape, scoreColor, scorePattern và scoreTotal từ fetchAllScore với điều kiện là koiId với compId trùng với những gì đang có của tôi

  // Lấy danh sách cá Koi có trong cuộc thi từ Redux store
  const koiList = useSelector(state => state.contestReducer.koiList);
  console.log("koiList", koiList);
  useEffect(() => {
    if (compId) {
      dispatch(fetchKoiFromCompId(compId)).finally(() => setLoading(false));
    }
  }, [dispatch, compId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (compId) {
        dispatch(fetchKoiFromCompId(compId));
      }
    }, 5000); // Làm mới danh sách cá koi mỗi 60 giây

    return () => clearInterval(intervalId); // Dọn dẹp interval khi thành phần unmount
  }, [dispatch, compId]);

  const areAllKoiJudged = koiList.length > 0 && koiList.every(koi => koi.status); // Kiểm tra nếu tất cả cá Koi đã được đánh giá

  useEffect(() => {
    console.log("areAllKoiJudged", areAllKoiJudged);
    if (areAllKoiJudged) {
      setLoading(true); // Đặt loading thành true trong khi đang thiết lập giải thưởng
      dispatch(setTopPrizesAction(compId))
        .then(() => dispatch(updateContestCompleteActionApi(compId)))
        .finally(() => setLoading(false));
    }
  }, [areAllKoiJudged, dispatch, compId]);

  // Lọc cá koi dựa trên trạng thái
  const filteredKoi = koiList
    .filter(koi => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'unjudged') return !koi.status;
      if (filterStatus === 'judged') return koi.status;
      return true;
    })
    .map(koi => {
      const matchedScore = Array.isArray(scores)
        ? scores.find(score => score.koiId === koi.koiId && score.compId === compId)
        : null;

      return {
        ...koi,
        scoreShape: matchedScore?.scoreShape ?? 'Không có',
        scoreColor: matchedScore?.scoreColor ?? 'Không có',
        scorePattern: matchedScore?.scorePattern ?? 'Không có',
        totalScore: matchedScore?.totalScore ? parseFloat(matchedScore.totalScore.toFixed(2)) : 'Không có',
      };
    });

  const columns = [
    {
      title: 'Tên cá Koi',
      dataIndex: 'koiName',
      key: 'koiName',
    },
    {
      title: 'Tuổi',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Kích thước (cm)',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Điểm hình dáng',
      dataIndex: 'scoreShape',
      key: 'scoreShape',
    },
    {
      title: 'Điểm màu sắc',
      dataIndex: 'scoreColor',
      key: 'scoreColor',
    },
    {
      title: 'Điểm hoa văn',
      dataIndex: 'scorePattern',
      key: 'scorePattern',
    },
    {
      title: 'Tổng điểm',
      dataIndex: 'totalScore',
      key: 'totalScore',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        let color = status ? 'green' : 'red';
        let statusText = status ? 'Đã chấm' : 'Đang chờ';
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) =>
        record.status ? (
          <Box type="default">Đã Chấm</Box>
        ) : (
          <Button type="primary" onClick={() => handleJudgeClick(record.koiId, record.koiName, record.imageUrl)}>
            Chấm điểm
          </Button>
        ),
    },
  ];

  const handleJudgeClick = (koiId, koiName, imageUrl) => {
    navigate(`/referee/manage-judging/scoring/${koiId}`, { state: { koiId, koiName, compId, compName, imageUrl } });
  };

  return (
    <div>
      <h2>Quản lý chấm điểm cá Koi trong {compName} </h2>
      <Radio.Group
        onChange={e => setFilterStatus(e.target.value)}
        value={filterStatus}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value="all">Tất cả</Radio.Button>
        <Radio.Button value="unjudged">Chưa chấm</Radio.Button>
        <Radio.Button value="judged">Đã chấm</Radio.Button>
      </Radio.Group>

      {/* Bảng hiển thị với phân trang và tải dữ liệu */}
      <Table
        columns={columns}
        dataSource={filteredKoi}
        rowKey="koiId"
        pagination={{ pageSize: 5 }}
        loading={loading}
      />

      <Button type="default" style={{ marginTop: 20 }} onClick={() => navigate('/referee/manage-judging')}>
        Quay lại
      </Button>
    </div>
  );
};

export default ManageKoiJudgingPage;
