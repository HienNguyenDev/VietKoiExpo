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

    // Thêm interval để gọi lại fetchContests mỗi 30 giây
    const interval = setInterval(() => {
      fetchContests();
    }, 5000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  // Lọc danh sách các cuộc thi theo trạng thái và tìm kiếm
  const filteredCompetitions = contests.filter(competition => {
    const matchesStatus = (competition.status !== 3) && (filterStatus === 'all' || 
                          (filterStatus === 'upcoming' && competition.status === 0) ||
                          (filterStatus === 'ongoing' && competition.status === 1) ||
                          (filterStatus === 'completed' && competition.status === 2));

    const matchesSearch = competition.compName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          competition.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Cột cho bảng cuộc thi
  const columns = [
    {
      title: 'Tên Cuộc Thi',
      dataIndex: 'compName',
      key: 'compName',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'compDescription',
      key: 'compDescription',
    },
    {
      title: 'Địa Điểm',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Ngày Bắt Đầu',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Ngày Kết Thúc',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 0 ? 'green' : status === 1 ? 'blue' : 'red';
        let statusText = status === 0 ? 'Sắp Diễn Ra' : status === 1 ? 'Đang Diễn Ra' : 'Đã Hoàn Thành';
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        record.status === 0 ? (
          <Button type="primary" onClick={() => handleViewKoiCheckIn(record.compId, record.compName)}>Xem Danh Sách Check-In</Button>
        ) : null
      ),
    },
  ];

  const handleViewKoiCheckIn = (compId, compName) => {
    navigate(`/admin/manage-koi-checkin/review-koi-checkin/${compName}`, { state: { compId, compName } });
  };

  return (
    <div>
      <h1>Quản Lý Check In</h1>
      <br></br>
      {/* Thanh tìm kiếm chung */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input 
            placeholder="Tìm kiếm theo Tên Cuộc Thi hoặc Địa Điểm" 
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
        <Radio.Button value="all">Tất Cả</Radio.Button>
        <Radio.Button value="upcoming">Sắp Diễn Ra</Radio.Button>
        <Radio.Button value="ongoing">Đang Diễn Ra</Radio.Button>
        <Radio.Button value="completed">Đã Hoàn Thành</Radio.Button>
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
