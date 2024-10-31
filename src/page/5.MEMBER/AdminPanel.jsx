import React, { useState } from 'react';
import { Typography, Button, Table, Modal, Form, Input, Select } from 'antd';
import styles from './AdminPanel.module.scss';

const { Option } = Select;

const AdminPanel = () => {
  const [participants, setParticipants] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddParticipant = () => {
    form.validateFields().then((values) => {
      setParticipants([...participants, values]);
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Class', dataIndex: 'class', key: 'class' },
  ];

  return (
    <div className={styles.adminPanel}>
      <Typography.Title level={2}>Admin Panel</Typography.Title>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Participant
      </Button>
      <Table dataSource={participants} columns={columns} rowKey="id" style={{ marginTop: '20px' }} />
      <Modal
        title="Add Participant"
        visible={isModalVisible}
        onOk={handleAddParticipant}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" label="ID" rules={[{ required: true, message: 'Please input the ID!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="class" label="Class" rules={[{ required: true, message: 'Please select the class!' }]}>
            <Select>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPanel;