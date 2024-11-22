import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Tabs, Spin, Radio, Tag, Input, Row, Col } from 'antd';
import { fetchAllContests } from '../../store/redux/action/contestAction'; // Giả sử action của bạn fetch các cuộc thi
const { TabPane } = Tabs;

const ManageShowJudgingPage = () => {
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // State để lưu giá trị tìm kiếm chung
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const contests = useSelector(state => state.contestReducer.contestList);

  useEffect(() => {
    // Hàm để fetch dữ liệu từ API
    const fetchData = async () => {
      setLoading(true); // Bắt đầu loading
      await dispatch(fetchAllContests()); // Fetch các cuộc thi
      setLoading(false); // Kết thúc loading
    };

    fetchData();

    // Đặt interval để fetch dữ liệu mỗi 10 giây
    const intervalId = setInterval(fetchData, 5000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleViewKoiEntries = (compId, compName) => {
    navigate(`/referee/manage-judging/comp/${compName}`, { state: { compId, compName } });
  };

  // Lọc danh sách các cuộc thi theo trạng thái
  const filteredCompetitions = contests.filter(competition => {
    const matchesStatus = (competition.status !== 3) && (filterStatus === 'all' || 
                          (filterStatus === 'upcoming' && competition.status === 0) ||
                          (filterStatus === 'ongoing' && competition.status === 1) ||
                          (filterStatus === 'completed' && competition.status === 2));

    const matchesSearch = competition.compName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          competition.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

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
        record.status === 1 ? (
          <Button type="primary" onClick={() => handleViewKoiEntries(record.compId, record.compName)}>Xem Các Bài Thi Koi</Button>
        ) : null
      ),
    },
  ];

  return (
    <div>
      <h1>Chấm Thi Các Cuộc Thi</h1>
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
      <Radio.Group 
        onChange={(e) => setFilterStatus(e.target.value)} 
        value={filterStatus}
        style={{ marginBottom: 16 }}>
        <Radio.Button value="all">Tất Cả</Radio.Button>
        <Radio.Button value="upcoming">Sắp Diễn Ra</Radio.Button>
        <Radio.Button value="ongoing">Đang Diễn Ra</Radio.Button>
        <Radio.Button value="completed">Đã Hoàn Thành</Radio.Button>
      </Radio.Group>

      {/* Bảng hiển thị các cuộc thi đã lọc */}
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

export default ManageShowJudgingPage;
