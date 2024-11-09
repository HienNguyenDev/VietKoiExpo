import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Tag, Radio, Modal, Form, Input, DatePicker, Select, Switch, List } from 'antd';
import { PlusOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { fetchAllContests } from '../../store/redux/action/contestAction';
import { fetchUsersActionApi } from '../../store/redux/action/userAction';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;

const AssignTaskPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const competitions = useSelector(state => state.contestReducer.contestList);
  const usersData = useSelector(state => state.userReducer.listUser);
  const [loading, setLoading] = useState(false); // Để quản lý trạng thái loading
  const [filterStatus, setFilterStatus] = useState('all');  // State để lọc trạng thái
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [isParticipantsModalVisible, setIsParticipantsModalVisible] = useState(false); // State to control participants modal visibility
  const [selectedCompId, setSelectedCompId] = useState(null); // State to store selected competition ID
  const [assignedParticipants, setAssignedParticipants] = useState([]); // State to store assigned participants
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    dispatch(fetchAllContests()).finally(() => setLoading(false));
    dispatch(fetchUsersActionApi());
  }, [dispatch]);

  // Lọc danh sách các cuộc thi theo trạng thái
  const filteredCompetitions = competitions.filter(competition => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'upcoming') return competition.status === 0;
    if (filterStatus === 'ongoing') return competition.status === 1;
    if (filterStatus === 'completed') return competition.status === 2;
    return true;
  });

  // Lọc danh sách người dùng theo role
  const filteredUsers = usersData.filter(user => ['staff', 'manager', 'judge'].includes(user.roleId));

  // Cột cho bảng cuộc thi
  const columns = [
    {
      title: 'Competition Name',
      dataIndex: 'compName',
      key: 'compName',
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
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date) => moment(date).format('YYYY-MM-DD'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date) => moment(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" icon={<UsergroupAddOutlined />} onClick={() => showParticipantsModal(record.compId)}>
          View Participants
        </Button>
      ),
    },
  ];

  // Hiển thị modal phân công nhiệm vụ
  const showAssignTaskModal = (compId) => {
    setSelectedCompId(compId);
    setIsModalVisible(true);
    form.setFieldsValue({ compId });
  };

  // Hiển thị modal xem người tham gia
  const showParticipantsModal = async (compId) => {
    try {
      // Fetch users if not already fetched
      if (usersData.length === 0) {
        await dispatch(fetchUsersActionApi());
      }

      const response = await axios.get('https://localhost:7246/api/Task');
      const tasks = response.data.filter(task => task.compId === compId);

      const participants = tasks.map(task => {
        const user = usersData.find(user => user.userId === task.userId);
        return {
          ...task,
          fullName: user ? user.fullName : 'No User Assigned',
          roleId: user ? user.role : 'N/A',
        };
      });

      setAssignedParticipants(participants);
      setIsParticipantsModalVisible(true);
    } catch (error) {
      console.error('Failed to fetch participants:', error);
    }
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Đóng modal người tham gia
  const handleParticipantsModalCancel = () => {
    setIsParticipantsModalVisible(false);
  };

  // Xử lý submit form
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        status: values.status ? true : false,
      };
      console.log('Submitting values:', formattedValues); // Debugging log
      // Gửi dữ liệu lên server
      await axios.post('https://localhost:7246/api/Task', formattedValues);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to submit task:', error);
    }
  };

  // Lọc danh sách các cuộc thi ở trạng thái upcoming
  const upcomingCompetitions = competitions.filter(competition => competition.status === 0);

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

      {/* Button để phân công nhiệm vụ */}
      <Button type="primary" icon={<UserAddOutlined />} onClick={() => showAssignTaskModal(upcomingCompetitions[0]?.compId)} style={{ marginBottom: 16 }}>
        Assign Task
      </Button>

      {/* Table hiển thị các cuộc thi đã lọc */}
      <Table
        columns={columns}
        dataSource={filteredCompetitions}
        rowKey="compId"
        pagination={{ pageSize: 5 }}
        loading={loading} // Hiển thị trạng thái loading nếu cần
      />

      {/* Modal phân công nhiệm vụ */}
      <Modal
        title="Assign Task"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="compId" label="Competition" rules={[{ required: true, message: 'Please select the competition' }]}>
            <Select placeholder="Select competition">
              {upcomingCompetitions.map(comp => (
                <Option key={comp.compId} value={comp.compId}>
                  {comp.compName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="taskName" label="Task Name" rules={[{ required: true, message: 'Please enter the task name' }]}>
            <Input placeholder="Enter task name" />
          </Form.Item>
          <Form.Item name="userId" label="User ID" rules={[{ required: true, message: 'Please select the user' }]}>
            <Select placeholder="Select user">
              {filteredUsers.map(user => (
                <Option key={user.userId} value={user.userId}>
                  {user.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="taskDescription" label="Task Description" rules={[{ required: true, message: 'Please enter the task description' }]}>
            <Input.TextArea placeholder="Enter task description" />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the date' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal xem người tham gia */}
      <Modal
        title="Assigned Participants"
        visible={isParticipantsModalVisible}
        onCancel={handleParticipantsModalCancel}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={assignedParticipants}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={`Name: ${item.fullName}`}
                description={`Task Description: ${item.taskDescription}`}
              />
            </List.Item>
          )}  
        />
      </Modal>
    </div>
  );
};

export default AssignTaskPage;