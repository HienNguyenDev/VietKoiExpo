// ReviewKoiCheckInPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Button, Tag, Radio, Input } from 'antd';
import { fetchCheckInByCompId, checkInKoiEntry, reviewKoiEntryAction } from '../../store/redux/action/checkInAction';
import UploadImageComponent from '../shared/UploadImage/UploadImage';
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

    const checkInData = {
      status: 1,
      imageUrl,
      description,
    };
    dispatch(checkInKoiEntry(entryId, checkInData, compId, compName, navigate));
  };

  const handleReject = (entryId, checkInId) => {
    const description = descriptionMap[checkInId] || '';
    const imageUrl = imageMap[checkInId] || 'https://defaultimageurl.com/placeholder.jpg';

    const checkInData = {
      status: 2,
      imageUrl,
      description,
    };
    dispatch(checkInKoiEntry(entryId, checkInData, compId, compName, navigate));
  };

  const columns = [
    {
      title: 'Koi Image',
      dataIndex: 'koiId',
      key: 'koiimageurl',
      render: (koiId) => (<img src={koiDetails[koiId]?.imageUrl} alt="Koi  Image" style={{ width: '100px' }} />  || 'Loading...'),
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
      key: 'checkinimageurl',
      render: (checkInId, record) => (
        record.status === 0 ? (
          <UploadImageComponent
            onSuccess={(url) => onImageUploadSuccess(checkInId, url)}
            defaultUrl={imageMap[checkInId]}
          />
        ) : (
          <img src={imageMap[checkInId]} alt="CheckIn Image" style={{ width: '100px' }} />
        )
      ),
    },
    {
      title: 'CheckIn Description',
      dataIndex: 'checkInId',
      key: 'description',
      render: (checkInId, record) => (
        record.status === 0 ? (
          <Input
            value={descriptionMap[checkInId]}
            onChange={(e) => handleDescriptionChange(checkInId, e.target.value)}
            placeholder="Enter description"
          />
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
        let color = 'green';
        let statusText = 'CheckIn';
        if (status === 0) {
          color = 'volcano';
          statusText = 'Pending';
        } else if (status === 2) {
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
            <Button type="primary" onClick={() => handleCheckin(record.registrationId, record.checkInId)}>
              Check In
            </Button>
            <Button type="default" onClick={() => handleReject(record.registrationId, record.checkInId)}>
              Reject
            </Button>
          </>
        ) : <Box type="default" >ChekcIn</Box>
      ),
    },
  ];

  return (
    <div>
      <h2>Review Koi CheckIn for {compName}</h2>
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
      <Table
        columns={columns}
        dataSource={Array.isArray(koiCheckIn) ? koiCheckIn.filter(entry => filterStatus === 'all' || entry.status === filterStatus) : []}
        rowKey="checkInId"
        pagination={{ pageSize: 5 }}
      />
      <Button type="default" style={{ marginTop: 20 }} onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
};

export default ReviewKoiCheckInPage;
