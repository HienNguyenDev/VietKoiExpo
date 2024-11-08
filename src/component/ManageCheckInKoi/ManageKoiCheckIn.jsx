import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Tag, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Thêm axios cho phần gọi API
import { fetchAllContests } from '../../store/redux/action/contestAction'; 
const ManageKoiCheckInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const contests = useSelector(state => state.contestReducer.contestList);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false); // Để quản lý trạng thái loading

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true); // Bắt đầu loading
      await dispatch(fetchAllContests()); // Fetch contests
      setLoading(false); // Kết thúc loading
    };

    fetchContests();
  }, [dispatch]);

  // Lọc danh sách các cuộc thi theo trạng thái
  const filteredCompetitions = contests.filter(competition => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'upcoming') return competition.status === 0;
    if (filterStatus === 'ongoing') return competition.status === 1;
    if (filterStatus === 'completed') return competition.status === 2;
    return true;
  });

  // Cột cho bảng cuộc thi
  const columns = [
    {
      title: 'Competition Name',
      dataIndex: 'compName',
      key: 'compName',
    },
    {
      title: 'Description',
      dataIndex: 'compDescription',
      key: 'compDescription',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 0 ? 'green' : status === 1 ? 'blue' : 'red';
        let statusText = status === 0 ? 'Upcoming' : status === 1 ? 'Ongoing' : 'Completed';
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        record.status === 0 ? (
          <Button type="primary" onClick={() => handleViewKoiCheckIn(record.compId, record.compName)}>View Koi Entries</Button>
        ) : null
      ),
    },
  ];


  console.log('Contests:', contests);
  // Điều hướng tới trang chi tiết các Koi Entries
  const handleViewKoiCheckIn = (compId, compName) => {
    
    navigate(`/admin/manage-koi-checkin/review-koi-checkin/${compName}`, { state: { compId, compName } });
  };

  

  return (
    <div>
      <h2>Manage Check In </h2>

      {/* Radio buttons để chọn lọc trạng thái */}
      <Radio.Group 
        onChange={(e) => setFilterStatus(e.target.value)} 
        value={filterStatus}
        style={{ marginBottom: 16 }}>
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="upcoming">Upcoming</Radio.Button>
        <Radio.Button value="ongoing">Ongoing</Radio.Button>
        <Radio.Button value="completed">Completed</Radio.Button>
      </Radio.Group>

      {/* Table hiển thị các cuộc thi đã lọc */}
      <Table
        columns={columns}
        dataSource={filteredCompetitions}
        rowKey="compId"
        pagination={{ pageSize: 5 }}
        loading={loading} // Hiển thị trạng thái loading nếu cần
      />
    </div>
  );
};

export default ManageKoiCheckInPage;
