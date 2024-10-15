import React, { useState } from 'react';
import { Table, Button, Drawer, Form, Input, Modal, Row, Col } from 'antd';
import { CheckOutlined, EditOutlined, EyeOutlined, TagsOutlined } from '@ant-design/icons';
import styles from '../../asset/scss/ManageKoiEntriesPage.module.scss';

const { confirm } = Modal;

const ManageKoiEntriesPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedKoi, setSelectedKoi] = useState(null);
  const [form] = Form.useForm();

  const koiEntries = [
    { id: 1, name: 'Koi 1', category: 'A', owner: 'Owner 1', status: 'Pending' },
    { id: 2, name: 'Koi 2', category: 'B', owner: 'Owner 2', status: 'Approved' },
    // Add more entries as needed
  ];

  const showDrawer = (title, koi = null) => {
    setDrawerTitle(title);
    setSelectedKoi(koi);
    if (koi) {
      form.setFieldsValue(koi);
    } else {
      form.resetFields();
    }
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedKoi(null);
  };

  const handleApprove = (id) => {
    confirm({
      title: 'Are you sure you want to approve this Koi entry?',
      onOk() {
        console.log('Approved Koi entry with id:', id);
        // Add your approve logic here
      },
    });
  };

  const handleCheckIn = (id) => {
    console.log('Checked in Koi entry with id:', id);
    // Add your check-in logic here
  };

  const handleAssignCategory = (id) => {
    console.log('Assigned category for Koi entry with id:', id);
    // Add your assign category logic here
  };

  const handleReview = (id) => {
    showDrawer('Review Koi Entry', koiEntries.find(koi => koi.id === id));
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" icon={<CheckOutlined />} onClick={() => handleApprove(record.id)}>Approve</Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleCheckIn(record.id)}>Check-In</Button>
          <Button type="link" icon={<TagsOutlined />} onClick={() => handleAssignCategory(record.id)}>Assign Category</Button>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleReview(record.id)}>Review</Button>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.manageKoiEntriesPage}>
      <Table dataSource={koiEntries} columns={columns} rowKey="id" />
      <Drawer
        title={drawerTitle}
        width={640}
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="name" label="Name">
            <Input disabled />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Input disabled />
          </Form.Item>
          <Form.Item name="owner" label="Owner">
            <Input disabled />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Input disabled />
          </Form.Item>
          <Form.Item name="comments" label="Comments">
            <Input.TextArea rows={4} placeholder="Enter your comments" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={closeDrawer}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ManageKoiEntriesPage;