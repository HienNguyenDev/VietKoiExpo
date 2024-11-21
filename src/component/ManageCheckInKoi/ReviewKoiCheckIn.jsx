// ReviewKoiCheckInPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Button, Tag, Radio, Input, message } from 'antd';
import { fetchCheckInByCompId, checkInKoiEntry, reviewKoiEntryAction } from '../../store/redux/action/checkInAction';
import UploadImageComponent from '../shared/UploadImage/UploadImage';
import { updateContestOnGoingActionApi } from '../../store/redux/action/contestAction';
import { Box } from '@mui/material';

const ReviewKoiCheckInPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { compId, compName } = location.state || {};
  const [filterStatus, setFilterStatus] = useState('all');
  const [koiDetails, setKoiDetails] = useState({});
  const [descriptionMap, setDescriptionMap] = useState({});
  const [imageMap, setImageMap] = useState({});
  const navigate = useNavigate();

  const koiCheckIn = useSelector(state => state.checkInReducer.checkinByCompList) || [];

  useEffect(() => {
    if (compId) {
      dispatch(fetchCheckInByCompId(compId));
    }
  }, [dispatch, compId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (compId) {
        dispatch(fetchCheckInByCompId(compId));
      }
    }, 60000); // Làm mới mỗi 60 giây
    return () => clearInterval(interval);
  }, [dispatch, compId]);

  console.log("fetchCheckInByCompId", koiCheckIn);
  useEffect(() => {
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
          [entry.checkInId]: entry.description || ''
        }));
        setImageMap(prevMap => ({
          ...prevMap,
          [entry.checkInId]: entry.checkInImageUrl || ''
        }));
      });
    }
  }, [dispatch, koiCheckIn, koiDetails]);

  const handleDescriptionChange = (checkInId, value) => {
    setDescriptionMap(prevMap => ({
      ...prevMap,
      [checkInId]: value,
    }));
  };

  const onImageUploadSuccess = (checkInId, url) => {
    setImageMap(prevMap => ({
      ...prevMap,
      [checkInId]: url,
    }));
  };

  const handleCheckin = (entryId, checkInId) => {
    const description = descriptionMap[checkInId] || '';
    const imageUrl = imageMap[checkInId] || 'https://defaultimageurl.com/placeholder.jpg';

    if (!description || !imageUrl) {
      alert('Ảnh và mô tả là bắt buộc nhập');
      return;
    }

    const checkInData = {
      status: 1,
      imageUrl,
      description,
    };
    dispatch(checkInKoiEntry(entryId, checkInData)).then(() => {
      if (compId) {
        dispatch(fetchCheckInByCompId(compId));  
      }
      message.success('Checkin thành công!');
    }).catch(() => {
      message.error('Có lỗi xảy ra khi checkin!');
    });
  };

  const handleReject = (entryId, checkInId) => {
    const description = descriptionMap[checkInId] || '';
    const imageUrl = imageMap[checkInId] || 'https://defaultimageurl.com/placeholder.jpg';

    if (!description || !imageUrl) {
      alert('Ảnh và mô tả là bắt buộc nhập');
      return;
    }

    const checkInData = {
      status: 2,
      imageUrl,
      description,
    };
    dispatch(checkInKoiEntry(entryId, checkInData)).then(() => {
      if (compId) {
        dispatch(fetchCheckInByCompId(compId));
      }
      message.success('Từ chối thành công!');
    }).catch(() => {
      message.error('Có lỗi xảy ra khi từ chối!');
    });
  };

  const columns = [
    {
      title: 'Hình Ảnh Cá Koi',
      dataIndex: 'koiId',
      key: 'koiimageurl',
      render: (koiId) => (<img src={koiDetails[koiId]?.imageUrl} alt="Hình Ảnh Cá Koi" style={{ width: '100px' }} />  || 'Đang tải...'),
    },
    {
      title: 'Hình Ảnh Chứng Nhận',
      dataIndex: 'koiId',
      key: 'certificateImageUrl',
      render: (koiId) => (<img src={koiDetails[koiId]?.certificateImageUrl} alt="Hình Ảnh Chứng Nhận" style={{ width: '100px' }} />  || 'Đang tải...'),
    },
    {
      title: 'Tên Cá Koi',
      dataIndex: 'koiId',
      key: 'koiName',
      render: (koiId) => koiDetails[koiId]?.koiName || 'Đang tải...',
    },
    {
      title: 'Hình Ảnh CheckIn',
      dataIndex: 'checkInId',
      key: 'checkinimageurl',
      render: (checkInId, record) => (
        record.status === 0 ? (
          <UploadImageComponent
            onSuccess={(url) => onImageUploadSuccess(checkInId, url)}
            defaultUrl={imageMap[checkInId]}
          />
        ) : (
          <img src={imageMap[checkInId]} alt="Hình Ảnh CheckIn" style={{ width: '100px' }} />
        )
      ),
    },
    {
      title: 'Mô Tả CheckIn',
      dataIndex: 'checkInId',
      key: 'description',
      render: (checkInId, record) => (
        record.status === 0 ? (
          <Input
            value={descriptionMap[checkInId]}
            onChange={(e) => handleDescriptionChange(checkInId, e.target.value)}
            placeholder="Nhập mô tả"
          />
        ) : (
          record.description || 'N/A'
        )
      ),
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
        let color = 'green';
        let statusText = 'Đã CheckIn';
        if (status === 0) {
          color = 'volcano';
          statusText = 'Chờ Duyệt';
        } else if (status === 2) {
          color = 'red';
          statusText = 'Bị Từ Chối';
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
            <Button type="primary" onClick={() => handleCheckin(record.registrationId, record.checkInId)}>
              Check In
            </Button>
            <Button type="default" onClick={() => handleReject(record.registrationId, record.checkInId)}>
              Từ Chối
            </Button>
          </>
        ) : <Box type="default" >Đã CheckIn</Box>
      ),
    },
  ];

  return (
    <div>
      <h2>Review Koi CheckIn cho {compName}</h2>
      <Radio.Group
        onChange={(e) => setFilterStatus(e.target.value)}
        value={filterStatus}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value="all">Tất cả</Radio.Button>
        <Radio.Button value="pending">Chờ Duyệt</Radio.Button>
        <Radio.Button value="checkin">Đã CheckIn</Radio.Button>
        <Radio.Button value="rejected">Bị Từ Chối</Radio.Button>
      </Radio.Group>
      <Table
        columns={columns}
        dataSource={Array.isArray(koiCheckIn) ? koiCheckIn.filter(entry => filterStatus === 'all' || entry.status === filterStatus) : []}
        rowKey="checkInId"
        pagination={{ pageSize: 5 }}
      />
      <Button type="default" style={{ marginTop: 20 }} onClick={() => navigate(-1)}>
        Quay Lại
      </Button>
    </div>
  );
};

export default ReviewKoiCheckInPage;
