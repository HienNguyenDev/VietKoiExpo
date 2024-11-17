import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Tag, Radio, Input, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Thêm axios cho phần gọi API
import { fetchAllContests } from '../../store/redux/action/contestAction'; 
const ManageKoiEntriesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const contests = useSelector(state => state.contestReducer.contestList);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false); // Để quản lý trạng thái loading
  const [searchQuery, setSearchQuery] = useState(''); // State để lưu giá trị tìm kiếm chung

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true); // Bắt đầu loading
      await dispatch(fetchAllContests()); // Fetch contests
      setLoading(false); // Kết thúc loading
    };

    fetchContests();

    const interval = setInterval(() => {
      fetchContests();
    }, 5000); // Gọi fetchContests mỗi 60 giây

    return () => clearInterval(interval); // Clear interval khi component unmount
  }, [dispatch]);

  // Lọc danh sách các cuộc thi theo trạng thái
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
          <Button type="primary" onClick={() => handleViewKoiEntries(record.compId, record.compName)}>Xem Bài Dự Thi Koi</Button>
        ) : null
      ),
    },
  ];

  // Điều hướng tới trang chi tiết các Koi Entries
  const handleViewKoiEntries = (compId, compName) => {
    navigate(`/admin/manage-koi-entries/review-koi-entries/${compName}`, { state: { compId, compName } });
  };

  return (
    <div>
      <h1>Quản Lý Bài Dự Thi Koi</h1>
      <br></br>
      {/* Radio buttons để chọn lọc trạng thái */}
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
        loading={loading} // Hiển thị trạng thái loading nếu cần
      />
    </div>
  );
};

export default ManageKoiEntriesPage;
