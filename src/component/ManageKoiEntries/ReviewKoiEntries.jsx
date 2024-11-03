import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Button, Tag, Radio } from 'antd';
import { fetchAllKoiEntriesApi, approveKoiEntryApi, rejectKoiEntryApi, reviewKoiEntryAction, classifyKoiEntryApi } from '../../store/redux/action/koiEntriesAction';

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
      title: 'Koi Name',
      dataIndex: 'koiId',
      key: 'koiName',
      render: (koiId) => koiDetails[koiId]?.koiName || 'Loading...',
    },
    {
      title: 'Image',
      dataIndex: 'koiId',
      key: 'image',
      render: (koiId) => koiDetails[koiId]?.imageUrl || 'Loading...',
    },
    {
      title: 'Age',
      dataIndex: 'koiId',
      key: 'age',
      render: (koiId) => koiDetails[koiId]?.age || 'Loading...',
    },
    {
      title: 'Size (cm)',
      dataIndex: 'koiId',
      key: 'size',
      render: (koiId) => koiDetails[koiId]?.size || 'Loading...',
    },
    {
      title: 'Variety',
      dataIndex: 'koiId',
      key: 'variety',
      render: (koiId) => koiDetails[koiId]?.varietyId || 'Loading...',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color;
        let statusText;
        if (status === 0) {
          color = 'volcano';
          statusText = 'Pending';
        } else if (status === 1) {
          color = 'green';
          statusText = 'Approved';
        } else {
          color = 'red';
          statusText = 'Rejected';
        }
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        record.status === 0 ? (
          <>
            <Button type="primary" onClick={() => handleApprove(record.registrationId)}>Approve</Button>
            <Button type="default" onClick={() => handleReject(record.registrationId)}>Reject</Button>
          </>
        ) : record.status === 2 ? (
          <Button type="primary" onClick={() => handleReApprove(record.registrationId)}>ReApprove</Button>
        ) : (
          <Button type="danger" onClick={() => handleRevertToPending(record.registrationId)}>Revert to Pending</Button>
        )
      ),
    },
  ];
  // Hàm xử lý phê duyệt đơn đăng ký và phân loại vô hạng mục thi
  const handleApprove = (entryId) => {
    dispatch(approveKoiEntryApi(entryId)); // Gọi action để phê duyệt
    dispatch(classifyKoiEntryApi(entryId));
  };

  // Hàm xử lý từ chối đơn đăng ký
  const handleReject = (entryId) => {
    dispatch(rejectKoiEntryApi(entryId)); // Gọi action để từ chối
  };

  // Hàm xử lý chuyển trạng thái từ Bị từ chối sang Chờ duyệt (ReApprove)
  const handleReApprove = (entryId) => {
    dispatch(approveKoiEntryApi(entryId)); // Gọi action để ReApprove
  };

  // Hàm xử lý chuyển trạng thái từ Đã duyệt về Chờ duyệt
  const handleRevertToPending = (entryId) => {
    dispatch(rejectKoiEntryApi(entryId)); // Chuyển trạng thái về Chờ duyệt (0)
  };

  return (
    <div>
      <h2>Review Koi Entries for {compName}</h2>

      {/* Bộ lọc trạng thái */}
      <Radio.Group
        onChange={(e) => setFilterStatus(e.target.value)}
        value={filterStatus}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="pending">Pending</Radio.Button>
        <Radio.Button value="approved">Approved</Radio.Button>
        <Radio.Button value="rejected">Rejected</Radio.Button>
      </Radio.Group>

      {/* Bảng hiển thị danh sách cá Koi */}
      <Table
        columns={columns}
        dataSource={filteredKoiEntries}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <Button type="default" style={{ marginTop: 20 }} onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
    
  );
};

export default ReviewKoiEntriesPage;
