import React, { useState, useEffect } from 'react';
import { Table, Button, Radio, notification } from 'antd';
import { useParams } from 'react-router-dom';

// Mock API để lấy thông tin cuộc thi và người dùng đã được phân công
const fetchCompetitionDetails = async (compID) => {
  // Dữ liệu giả lập với cả Referee và Staff đã được phân công
  const competition = {
    compID,
    name: '',
    assigned: ['1', '3', '6'], // Danh sách userID của Staff và Referee đã được phân công
  };
  return competition;
};

// Mock API để lấy danh sách người dùng
const fetchUsers = async () => {
  // Dữ liệu giả lập của tất cả người dùng (Referee và Staff)
  const users = [
    { userID: '1', role: 'Referee', FullName: 'User 1', Email: 'user1@example.com', Phone: '123456789', Experience: 5 },
    { userID: '2', role: 'Staff', FullName: 'User 2', Email: 'user2@example.com', Phone: '987654321', Experience: 2 },
    { userID: '3', role: 'Referee', FullName: 'User 3', Email: 'user3@example.com', Phone: '555666777', Experience: 7 },
    { userID: '4', role: 'Staff', FullName: 'User 4', Email: 'user4@example.com', Phone: '444555666', Experience: 1 },
    { userID: '5', role: 'Referee', FullName: 'User 5', Email: 'user5@example.com', Phone: '123123123', Experience: 4 },
    { userID: '6', role: 'Staff', FullName: 'User 6', Email: 'user6@example.com', Phone: '321321321', Experience: 3 },
    { userID: '7', role: 'Referee', FullName: 'User 7', Email: 'user7@example.com', Phone: '567676766', Experience: 3 },
    { userID: '8', role: 'Staff', FullName: 'User 8', Email: 'user8@example.com', Phone: '112184546497', Experience: 3 },
  ];
  return users;
};

const TaskAllocationProcess = () => {
  const { compID } = useParams(); // Lấy compID từ URL
  const [competition, setCompetition] = useState(null); // Thông tin cuộc thi
  const [users, setUsers] = useState([]); // Danh sách người dùng
  const [assignedUsers, setAssignedUsers] = useState([]); // Danh sách đã được phân công (bao gồm cả Staff và Referee)
  const [viewMode, setViewMode] = useState('available'); // Chế độ xem (available/assigned)

  // Lấy dữ liệu cuộc thi và người dùng khi component được mount
  useEffect(() => {
    const loadCompetitionData = async () => {
      const compData = await fetchCompetitionDetails(compID);
      const allUsers = await fetchUsers();

      setCompetition(compData);
      setUsers(allUsers);

      // Lấy những người đã được phân công dựa trên userID
      const assigned = allUsers.filter(user => compData.assigned.includes(user.userID));
      setAssignedUsers(assigned);
    };

    loadCompetitionData();
  }, [compID]);

  // Lọc danh sách người dùng khả dụng (chưa được phân công)
  const availableUsers = users.filter(user => !assignedUsers.some(assigned => assigned.userID === user.userID));

  // Hàm để phân công người dùng vào cuộc thi
  const handleAssign = (userID) => {
    const userToAssign = availableUsers.find(user => user.userID === userID);

    if (!userToAssign) {
      return;
    }

    // Nếu đang cố gắng phân công trọng tài
    if (userToAssign.role === 'Referee') {
      if (assignedUsers.filter(user => user.role === 'Referee').length >= 3) {
        notification.error({
          message: 'Cannot assign more judges',
          description: 'Each competition can only have up to 3 judges.',
        });
        return;
      }
    }

    // Thêm người dùng vào danh sách phân công
    setAssignedUsers([...assignedUsers, userToAssign]);
  };

  // Hàm để xóa người dùng khỏi danh sách phân công
  const handleRemove = (userID) => {
    setAssignedUsers(assignedUsers.filter(user => user.userID !== userID)); // Loại bỏ khỏi danh sách phân công
  };

  // Cột cho bảng người dùng
  const columns = [
    { title: 'Full Name', dataIndex: 'FullName', key: 'FullName' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Email', dataIndex: 'Email', key: 'Email' },
    { title: 'Phone', dataIndex: 'Phone', key: 'Phone' },
    { title: 'Experience', dataIndex: 'Experience', key: 'Experience' },
    {
      title: 'Action',
      key: 'action',
      render: (_, user) => viewMode === 'available' ? (
        <Button type="primary" onClick={() => handleAssign(user.userID)}>
          Assign
        </Button>
      ) : (
        <Button type="danger" onClick={() => handleRemove(user.userID)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Task Allocation for Competition {compID}</h2>

      {/* Radio buttons để chọn giữa Available và Assigned */}
      <Radio.Group
        onChange={(e) => setViewMode(e.target.value)}
        value={viewMode}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value="available">Available</Radio.Button>
        <Radio.Button value="assigned">Assigned</Radio.Button>
      </Radio.Group>

      {/* Hiển thị bảng người dùng dựa trên viewMode */}
      <Table
        columns={columns}
        dataSource={viewMode === 'available' ? availableUsers : assignedUsers}
        rowKey="userID"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default TaskAllocationProcess;
