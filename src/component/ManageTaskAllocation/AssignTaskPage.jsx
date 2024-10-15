import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Thêm axios cho phần gọi API

const AssignTaskPage = () => {
  const navigate = useNavigate();

  // Dữ liệu tĩnh cho các cuộc thi với trạng thái (0: Completed, 1: Ongoing, 2: Upcoming)
  const initialCompetitions = [
    { id: '1', name: 'Koi Competition 2024', status: 2, startDate: '2024-12-01', endDate: '2024-12-10' },
    { id: '2', name: 'Koi Competition Summer 2024', status: 1, startDate: '2024-10-01', endDate: '2024-10-10' },
    { id: '3', name: 'Koi Competition Spring 2024', status: 0, startDate: '2024-03-01', endDate: '2024-03-10' },
    { id: '4', name: 'Koi Competition Fall 2024', status: 2, startDate: '2024-11-01', endDate: '2024-11-10' },
  ];

  // State quản lý danh sách cuộc thi, mặc định là dữ liệu tĩnh
  const [competitions, setCompetitions] = useState(initialCompetitions);
  const [loading, setLoading] = useState(false); // Để quản lý trạng thái loading
  const [filterStatus, setFilterStatus] = useState('all');  // State để lọc trạng thái

  // Giả lập API gọi dữ liệu cuộc thi (khi có API thực sự)
  const fetchCompetitions = async () => {
    try {
      setLoading(true); // Bắt đầu loading
      // Giả sử URL API của bạn sẽ là '/api/competitions'
      const response = await axios.get('/api/competitions');
      setCompetitions(response.data);  // Cập nhật state bằng dữ liệu từ API
    } catch (error) {
      console.error("Error fetching competitions from API:", error);
      // Giữ nguyên dữ liệu tĩnh trong trường hợp lỗi
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  // useEffect sẽ gọi API khi component mount
  useEffect(() => {
    fetchCompetitions();  // Gọi API khi component được render lần đầu
  }, []);

  // Lọc danh sách các cuộc thi theo trạng thái
  const filteredCompetitions = competitions.filter(competition => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'upcoming') return competition.status === 2;
    if (filterStatus === 'ongoing') return competition.status === 1;
    if (filterStatus === 'completed') return competition.status === 0;
    return true;
  });

  // Cột cho bảng cuộc thi
  const columns = [
    {
      title: 'Competition Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 2 ? 'green' : status === 1 ? 'blue' : 'red';
        let statusText = status === 2 ? 'Upcoming' : status === 1 ? 'Ongoing' : 'Completed';
        return <Tag color={color}>{statusText}</Tag>;
      },
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        record.status === 2 ? (
          <Button type="primary" onClick={() => handleAssignTask(record.id, record.name)}>Assign Task</Button>
        ) : null
      ),
    },
  ];

  // Điều hướng tới trang phân công nhiệm vụ cho một cuộc thi
  const handleAssignTask = (compID, compName) => {
    navigate(`/admin/manage-task-allocation/${compID}`, { state: { compName } });
  };
  

  return (
    <div>
      <h2>Task Allocation</h2>

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
        rowKey="id"
        pagination={{ pageSize: 5 }}
        loading={loading} // Hiển thị trạng thái loading nếu cần
      />
    </div>
  );
};

export default AssignTaskPage;
