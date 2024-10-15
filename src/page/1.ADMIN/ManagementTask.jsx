import { Col, Row, Form, Input, Button, Select, DatePicker, message, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import CalendarComponent from '../../component/shared/diagram/calendar/CalendarComponent';
import dayjs from 'dayjs';
import { enUS } from 'date-fns/locale';
import axios from 'axios';
import '../../component/shared/speed dial/BlurAnimation.scss';
const { Option } = Select;

const ManagementTask = () => {
    
  const [dateRange, setDateRange] = useState([
    dayjs('2024-10-1'),
    dayjs('2024-10-5'),
  ]);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch users for task assignment
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://your-api-url.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDateChange = async (range) => {
    setDateRange([dayjs(range.startDate), dayjs(range.endDate)]);

    const startDate = dayjs(range.startDate).format('YYYY-MM-DD');
    const endDate = dayjs(range.endDate).format('YYYY-MM-DD');

    try {
      const response = await axios.get(`https://your-api-url.com/projects?start=${startDate}&end=${endDate}`);
      const projects = response.data;
      // Now you have the projects within the selected date range
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const handleCreateTask = async (values) => {
    try {
      const response = await axios.post('https://your-api-url.com/tasks', {
        ...values,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
      });
      message.success('Task created successfully');
      form.resetFields();
    } catch (error) {
      console.error('Failed to create task:', error);
      message.error('Failed to create task');
    }
  };

  return (
    <div>
      <Row className='headerManageTask'></Row>
      <Row>
        <Col className='calendar' span={18}>
        <div style={{ padding: '20px' }}>
      <h1>Calendar Task</h1>
      <CalendarComponent
        locale={enUS}
        onDateChange={handleDateChange}
        backgroundColor="#f9f9f9"
        hoverColor="#e6f7ff"
        selectedColor="#1890ff"
        buttonBackgroundColor="#1890ff"
        buttonTextColor="#fff"
        buttonHoverBackgroundColor="#40a9ff"
        width={'800px'}
        height={'auto'}
      />
    </div>
        </Col>
        <Col className='urgentTask' span={6}>
          {/* Display urgent tasks */}
        </Col>
      </Row>
      <Row>
        <Col className='projectDirectory' span={12}>
          {/* Display project directory */}
        </Col>
        <Col className='newComment' span={12}>
          {/* Display new comments */}
        </Col>
        <Col className='teamDirectory' span={12}>
          {/* Display team directory */}
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="Create New Task">
            <Form form={form} onFinish={handleCreateTask} layout="vertical">
              <Form.Item
                name="title"
                label="Task Title"
                rules={[{ required: true, message: 'Please enter the task title' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Task Description"
                rules={[{ required: true, message: 'Please enter the task description' }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item
                name="assignee"
                label="Assign To"
                rules={[{ required: true, message: 'Please select a user' }]}
              >
                <Select placeholder="Select a user">
                  {users.map(user => (
                    <Option key={user.id} value={user.id}>
                      {user.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="dueDate"
                label="Due Date"
                rules={[{ required: true, message: 'Please select a due date' }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Create Task
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ManagementTask;