import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Drawer, Form, Input, Modal, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from '../../asset/scss/ManageNewsUpdatesPage.module.scss';
import { createNewsAction, updateNewsAction, deleteNewsAction, getAllNewsAction, getNewsAction } from '../../store/redux/action/NewsAction';
import moment from 'moment';

const { confirm } = Modal;

const ManageNewsUpdatesPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const newsData = useSelector(state => state.newsReducer.news);

  useEffect(() => {
    dispatch(getAllNewsAction());
  }, [dispatch]);

  const showDrawer = async (title, news = null) => {
    setDrawerTitle(title);
    setSelectedNews(news);
    if (news) {
      await dispatch(getNewsAction(news.newsId));
      form.setFieldsValue({
        ...news,
        date: moment(news.date),
      });
    } else {
      form.resetFields();
    }
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedNews(null);
    form.resetFields();
  };

  const handleCreate = () => {
    showDrawer('Create News');
  };

  const handleUpdate = (id) => {
    const news = Object.values(newsData).find(news => news.newsId === id);
    if (news) {
      showDrawer('Update News', news);
    }
  };

  const handleView = (id) => {
    const news = Object.values(newsData).find(news => news.newsId === id);
    if (news) {
      showDrawer('View News', news);
    }
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure you want to delete this news?',
      onOk() {
        dispatch(deleteNewsAction(id));
      },
    });
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const formattedValues = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      };
      console.log('Submitting values:', formattedValues); // Debugging log
      if (drawerTitle === 'Create News') {
        dispatch(createNewsAction(formattedValues));
      } else if (drawerTitle === 'Update News' && selectedNews) {
        dispatch(updateNewsAction(selectedNews.newsId, formattedValues));
      }
      closeDrawer();
      navigate('/admin/manage-news');
    }).catch(errorInfo => {
      console.error('Validation Failed:', errorInfo);
    });
  };

  const columns = [
    { title: 'News ID', dataIndex: 'newsId', key: 'newsId' },
    { title: 'News Type ID', dataIndex: 'newsTypeId', key: 'newsTypeId' },
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.newsId)}>View</Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleUpdate(record.newsId)}>Update</Button>
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.newsId)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.manageNewsUpdatesPage}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} style={{ marginBottom: 16 }}>
        Create News
      </Button>
      <Table dataSource={Object.values(newsData)} columns={columns} rowKey="newsId" />
      <Drawer
        title={drawerTitle}
        width={640}
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="newsId" label="News ID" rules={[{ required: true, message: 'Please enter the news ID' }]}>
            <Input placeholder="Please enter the news ID" disabled={drawerTitle === 'View News'} />
          </Form.Item>
          <Form.Item name="newsTypeId" label="News Type ID" rules={[{ required: true, message: 'Please enter the news type ID' }]}>
            <Input placeholder="Please enter the news type ID" disabled={drawerTitle === 'View News'} />
          </Form.Item>
          <Form.Item name="userId" label="User ID" rules={[{ required: true, message: 'Please enter the user ID' }]}>
            <Input placeholder="Please enter the user ID" disabled={drawerTitle === 'View News'} />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please enter the date' }]}>
            <DatePicker style={{ width: '100%' }} disabled={drawerTitle === 'View News'} />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
            <Input.TextArea rows={2} placeholder="Please enter the description" disabled={drawerTitle === 'View News'} />
          </Form.Item>
          {drawerTitle !== 'View News' && (
            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          )}
        </Form>
      </Drawer>
    </div>
  );
};

export default ManageNewsUpdatesPage;