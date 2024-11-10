import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Tabs, Spin, Radio, Tag, Input, Row, Col } from 'antd';
import { fetchAllContests } from '../../store/redux/action/contestAction'; // Assuming your action fetches contests
const { TabPane } = Tabs;


const ManageShowJudgingPage = () => {
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State để lưu giá trị tìm kiếm chung
  //const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const contests = useSelector(state => state.contestReducer.contestList);
  useEffect(() => {
    // Try to fetch data from the API
    const fetchData = async () => {
      setLoading(true); // Bắt đầu loading
      await dispatch(fetchAllContests()); // Fetch contests
      setLoading(false); // Kết thúc loading
    };

    fetchData();
  }, [dispatch]);

  const handleViewKoiEntries = (compId, compName) => {
    navigate(`/referee/manage-judging/comp/${compName}`, { state: { compId, compName } });
  };

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
        record.status === 1 ? (
          <Button type="primary" onClick={() => handleViewKoiEntries(record.compId, record.compName)}>View Koi Entries</Button>
        ) : null
      ),
    },
  ];

  return (
    <div>
      <h1>Judging Shows</h1>
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

export default ManageShowJudgingPage;