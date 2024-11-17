import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Button, Tag, Radio } from 'antd';
import { fetchAllKoiEntriesApi, approveKoiEntryApi, rejectKoiEntryApi, reviewKoiEntryAction, classifyKoiEntryApi } from '../../store/redux/action/koiEntriesAction';
import { Box } from '@mui/system';

const ReviewKoiEntriesPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { compId, compName } = location.state || {}; // Lấy compId và compName từ state
  const [filterStatus, setFilterStatus] = useState('all');
  const [koiDetails, setKoiDetails] = useState({}); // State để lưu chi tiết cá Koi
  const navigate = useNavigate();
  // Lấy danh sách các đơn đăng ký từ Redux store
  const koiEntries = useSelector(state => state.koiEntriesReducer.koiEntries);

  useEffect(() => {
    if (compId) {
      // Fetch tất cả các đơn đăng ký cá Koi cho cuộc thi đã chọn
      dispatch(fetchAllKoiEntriesApi(compId));
    }
  }, [dispatch, compId]);

  useEffect(() => {
    // Lấy chi tiết từng cá Koi
    koiEntries.forEach(entry => {
      if (!koiDetails[entry.koiId]) {
        dispatch(reviewKoiEntryAction(entry.koiId)).then(detail => {
          setKoiDetails(prevDetails => ({
            ...prevDetails,
            [entry.koiId]: detail, // Lưu chi tiết vào state
          }));
        });
      }
    });
  }, [dispatch, koiEntries, koiDetails]);

  useEffect(() => {
    // Set interval để cập nhật danh sách cá Koi mỗi 30 giây
    const interval = setInterval(() => {
      if (compId) {
        dispatch(fetchAllKoiEntriesApi(compId));
      }
    }, 5000);

    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, [dispatch, compId]);

  // Lọc danh sách các đơn đăng ký theo trạng thái
  const filteredKoiEntries = koiEntries.filter(entry => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'pending') return entry.status === 0;
    if (filterStatus === 'approved') return entry.status === 1;
    if (filterStatus === 'rejected') return entry.status === 2;
    return true;
  });

  // Cột cho bảng đơn đăng ký cá Koi
  const columns = [
    {
      title: 'Tên Cá Koi',
      dataIndex: 'koiId',
      key: 'koiName',
      render: (koiId) => koiDetails[koiId]?.koiName || 'Đang tải...',
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'koiId',
      key: 'image',
      render: (koiId) => (<img src={koiDetails[koiId]?.imageUrl} alt="Hình Cá Koi" style={{ width: '100px' }} />  || 'Đang tải...'),
    },
    {
      title: 'Tuổi',
      dataIndex: 'koiId',
      key: 'age',
      render: (koiId) => koiDetails[koiId]?.age || 'Đang tải...',
    },
    {
      title: 'Kích Thước (cm)',
      dataIndex: 'koiId',
      key: 'size',
      render: (koiId) => koiDetails[koiId]?.size || 'Đang tải...',
    },
    {
      title: 'Loại',
      dataIndex: 'koiId',
      key: 'variety',
      render: (koiId) => koiDetails[koiId]?.varietyId || 'Đang tải...',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color;
        let statusText;
        if (status === 0) {
          color = 'volcano';
          statusText = 'Chờ duyệt';
        } else if (status === 1) {
          color = 'green';
          statusText = 'Đã duyệt';
        } else {
          color = 'red';
          statusText = 'Bị từ chối';
        }
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        record.status === 0 ? (
          <>
            <Button type="primary" onClick={() => handleApprove(record.registrationId)}>Duyệt</Button>
            <Button type="default" onClick={() => handleReject(record.registrationId)}>Từ chối</Button>
          </>
        ) : record.status === 2 ? (
          <Button type="primary" onClick={() => handleReApprove(record.registrationId)}>Duyệt lại</Button>
        ) : <Box type="primary" >Đã duyệt</Box>  
      ),
    },
  ];
  // Hàm xử lý phê duyệt đơn đăng ký và phân loại vô hạng mục thi
  const handleApprove = (entryId) => {

    if(dispatch(approveKoiEntryApi(entryId))){
      navigate(`/admin/manage-koi-entries/review-koi-entries/${compName}`, { state: { compId, compName } });
    } // Gọi action để phê duyệt
    
   /// dispatch(classifyKoiEntryApi(entryId));// Gọi action để phân vô hạng mục
  };

  // Hàm xử lý từ chối đơn đăng ký
  const handleReject = (entryId) => {
    if(dispatch(rejectKoiEntryApi(entryId, compId, compName, navigate))){ // Gọi action để từ chối
    navigate(`/admin/manage-koi-entries/review-koi-entries/${compName}`, { state: { compId, compName } });
  }
  };

  // Hàm xử lý chuyển trạng thái từ Bị từ chối sang Chờ duyệt (Duyệt lại)
  const handleReApprove = (entryId) => {
    if(dispatch(approveKoiEntryApi(entryId, compId, compName, navigate))){
      navigate(`/admin/manage-koi-entries/review-koi-entries/${compName}`, { state: { compId, compName } });
    }// Gọi action để Duyệt lại
    
  };

  

  return (
    <div>
      <h2>Đánh Giá Đơn Đăng Ký Cá Koi cho {compName}</h2>

      {/* Bộ lọc trạng thái */}
      <Radio.Group
        onChange={(e) => setFilterStatus(e.target.value)}
        value={filterStatus}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value="all">Tất cả</Radio.Button>
        <Radio.Button value="pending">Chờ duyệt</Radio.Button>
        <Radio.Button value="approved">Đã duyệt</Radio.Button>
        <Radio.Button value="rejected">Bị từ chối</Radio.Button>
      </Radio.Group>

      {/* Bảng hiển thị danh sách cá Koi */}
      <Table
        columns={columns}
        dataSource={filteredKoiEntries}
        rowKey="koiId"
        pagination={{ pageSize: 5 }}
      />
      <Button type="default" style={{ marginTop: 20 }} onClick={() => navigate(-1)}>
        Quay lại
      </Button>
    </div>
    
  );
};

export default ReviewKoiEntriesPage;
