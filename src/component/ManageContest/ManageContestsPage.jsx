import React, { useState } from 'react';
import { Table, Button, Drawer, Form, Input, Modal, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from '../../asset/scss/ManageContestsPage.module.scss';

const { confirm } = Modal;

const ManageContestsPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedContest, setSelectedContest] = useState(null);
  const [form] = Form.useForm();

  const contestsData = [
    { id: 1, name: 'Contest 1', date: '2023-10-01', location: 'Location 1', status: 'Upcoming' },
    { id: 2, name: 'Contest 2', date: '2023-11-15', location: 'Location 2', status: 'Completed' },
    // Add more entries as needed
  ];

  const showDrawer = (title, contest = null) => {
    setDrawerTitle(title);
    setSelectedContest(contest);
    if (contest) {
      form.setFieldsValue(contest);
    } else {
      form.resetFields();
    }
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedContest(null);
  };

  const handleCreate = () => {
    showDrawer('Create Contest');
  };

  const handleUpdate = (id) => {
    showDrawer('Update Contest', contestsData.find(contest => contest.id === id));
  };

  const handleView = (id) => {
    showDrawer('View Contest', contestsData.find(contest => contest.id === id));
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure you want to delete this contest?',
      onOk() {
        console.log('Deleted contest with id:', id);
        // Add your delete logic here
      },
    });
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.id)}>View</Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleUpdate(record.id)}>Update</Button>
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.manageContestsPage}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} style={{ marginBottom: 16 }}>
        Create Contest
      </Button>
      <Table dataSource={contestsData} columns={columns} rowKey="id" />
      <Drawer
        title={drawerTitle}
        width={640}
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input placeholder="Please enter the name" disabled={drawerTitle === 'View Contest'} />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please enter the date' }]}>
            <Input placeholder="Please enter the date" disabled={drawerTitle === 'View Contest'} />
          </Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please enter the location' }]}>
            <Input placeholder="Please enter the location" disabled={drawerTitle === 'View Contest'} />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please enter the status' }]}>
            <Input placeholder="Please enter the status" disabled={drawerTitle === 'View Contest'} />
          </Form.Item>
          {drawerTitle !== 'View Contest' && (
            <Form.Item>
              <Button type="primary" onClick={closeDrawer}>
                Submit
              </Button>
            </Form.Item>
          )}
        </Form>
      </Drawer>
    </div>
  );
};

export default ManageContestsPage;