import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Button, Tag, Radio, Input } from 'antd';
import { fetchCheckInByCompId, checkInKoiEntry,  } from '../../store/redux/action/CheckInAction';
import {  reviewKoiEntryAction } from '../../store/redux/action/CheckInAction';
const ReviewKoiEntriesPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { compId, compName } = location.state || {}; // Lấy compId và compName từ state
  const [filterStatus, setFilterStatus] = useState('all');
  const [koiDetails, setKoiDetails] = useState({}); // State để lưu chi tiết cá Koi
  const [descriptionMap, setDescriptionMap] = useState({}); // State để lưu trữ mô tả nhập liệu
  const navigate = useNavigate();
  // Lấy danh sách các đơn đăng ký từ Redux store
  const koiCheckIn = useSelector(state => state.checkInReducer.checkinByCompList);

  useEffect(() => {
    if (compId) {
      // Fetch tất cả các đơn đăng ký cá Koi cho cuộc thi đã chọn
      dispatch(fetchCheckInByCompId(compId));
    }
  }, [dispatch, compId]);
  
  useEffect(() => {
    // Lấy chi tiết từng cá Koi
    if (Array.isArray(koiCheckIn)) {
    koiCheckIn.forEach(entry => {
      if (!koiDetails[entry.koiId]) {
        dispatch(reviewKoiEntryAction(entry.koiId)).then(detail => {
          setKoiDetails(prevDetails => ({
            ...prevDetails,
            [entry.koiId]: detail,
          }));
        });
      }
      setDescriptionMap(prevMap => ({
        ...prevMap,
        [entry.checkInId]: entry.description || '' // Sử dụng mô tả hiện có nếu có
      }));
    });
    }
  }, [dispatch, koiCheckIn, koiDetails]);

  // Lọc danh sách các đơn đăng ký theo trạng thái
  const filteredKoiEntries = Array.isArray(koiCheckIn) ? koiCheckIn.filter(entry => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'pending') return entry.status === 0;
    if (filterStatus === 'checkin') return entry.status === 1;
    if (filterStatus === 'rejected') return entry.status === 2;
    return true;
  }) : [];

  // Cột cho bảng đơn đăng ký cá Koi
  const columns = [
    {
      title: 'Koi Image',
      dataIndex: 'koiId',
      key: 'koiimageurl',
      render: (koiId) => koiDetails[koiId]?.imageUrl || 'Loading...',
    },
    {
      title: 'Koi Name',
      dataIndex: 'koiId',
      key: 'koiName',
      render: (koiId) => koiDetails[koiId]?.koiName || 'Loading...',
    },
    {
      title: 'CheckIn Image',
      dataIndex: 'checkInId',
      key: 'checkinimageurl'
    },
    {
      title: 'CheckIn Description',
      dataIndex: 'checkInId',
      key: 'description',
      render: (checkInId, record) => (
        record.status === 0 ? (
          <div>
        <Input
          value={descriptionMap[checkInId]}
          onChange={(e) => handleDescriptionChange(checkInId, e.target.value)}
          placeholder="Enter description"
        />
        {/* Hiển thị thông báo nếu description trống */}
        {!descriptionMap[checkInId] && (
          <span style={{ color: 'red', fontSize: '12px' }}>
            Please enter a description.
          </span>
        )}
      </div>
        ) : (
          record.description || 'N/A'
        )
      ),
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
          statusText = 'CheckIn';
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
            <Button type="primary" onClick={() => handleCheckin(record.registrationId,record.checkInImageUrl,record.checkInId)}>Check In</Button>
            <Button type="default" onClick={() => handleReject(record.registrationId,record.checkInImageUrl,record.checkInId)}>Reject</Button>
          </>
        )  :null
      ),
    },
  ];
  const handleDescriptionChange = (checkInId, value) => {
    setDescriptionMap(prevMap => ({
      ...prevMap,
      [checkInId]: value,
    }));
  };
 // Hàm xử lý phê duyệt đơn đăng ký và phân loại vô hạng mục thi
  const handleCheckin = (entryId,imageUrl,checkInId) => {
    
    const description = descriptionMap[checkInId] || '';
    console.log('checkInDatacheckInData', description)
    if(imageUrl === null){
      imageUrl = "https://imageurl.com/tmpl.jpg";
    }
    console.log('checkInData - imageUrl:', imageUrl);
    const checkInData = {
      status: 1, // duyệt (số 1)
      imageUrl: imageUrl, // đường dẫn ảnh
      description: description // mô tả check-in
    };
    console.log('checkInDatacheckInData', imageUrl)
    dispatch(checkInKoiEntry(entryId,checkInData, compId, compName, navigate)); // Gọi action để phê duyệt
 
  };


  const handleReject = (entryId,imageUrl,checkInId) => {
    const description = descriptionMap[checkInId] || '';
    console.log('checkInDatacheckInData', description)
    if(imageUrl === null){
      imageUrl = "https://imageurl.com/tmpl.jpg";
    }
    console.log('checkInData - imageUrl:', imageUrl);
    const checkInData = {
      status: 2, // hủy (số 2)
      imageUrl: imageUrl, // đường dẫn ảnh
      description: description // mô tả check-in
    };
    
    
    dispatch(checkInKoiEntry(entryId,checkInData, compId, compName, navigate)); // Gọi action để từ chối
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
        <Radio.Button value="checkin">CheckIn</Radio.Button>
        <Radio.Button value="rejected">Rejected</Radio.Button>
      </Radio.Group>

      {/* Bảng hiển thị danh sách cá Koi */}
      <Table
        columns={columns}
        dataSource={filteredKoiEntries}
        rowKey="checkInId"
        pagination={{ pageSize: 5 }}
      />
      <Button type="default" style={{ marginTop: 20 }} onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
    
  );
};

export default ReviewKoiEntriesPage;