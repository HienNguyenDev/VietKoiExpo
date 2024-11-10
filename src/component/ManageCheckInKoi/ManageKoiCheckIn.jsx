import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Tag, Radio, Input, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Thêm axios cho phần gọi API
import { fetchAllContests } from '../../store/redux/action/contestAction'; 

const ManageKoiCheckInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const contests = useSelector(state => state.contestReducer.contestList);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(''); // State để lưu giá trị tìm kiếm chung

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      await dispatch(fetchAllContests());
      setLoading(false);
    };

    fetchContests();
  }, [dispatch]);

  // Lọc danh sách các cuộc thi theo trạng thái và tìm kiếm
  const filteredCompetitions = contests.filter(competition => {
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'upcoming' && competition.status === 0) ||
                          (filterStatus === 'ongoing' && competition.status === 1) ||
                          (filterStatus === 'completed' && competition.status === 2);

    const matchesSearch = competition.compName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          competition.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
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
          <Button type="primary" onClick={() => handleViewKoiCheckIn(record.compId, record.compName)}>View CheckIn List</Button>
        ) : null
      ),
    },
  ];

  const handleViewKoiCheckIn = (compId, compName) => {
    navigate(`/admin/manage-koi-checkin/review-koi-checkin/${compName}`, { state: { compId, compName } });
  };

  return (
    <div>
      <h1>Manage Check In </h1>
      <br></br>
      {/* Thanh tìm kiếm chung */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input 
            placeholder="Search by Competition Name or Location" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            style={{ width: 300 }}
          />
        </Col>
      </Row>

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
        loading={loading}
      />
    </div>
  );
};

export default ManageKoiCheckInPage;
