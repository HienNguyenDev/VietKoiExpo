import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Drawer, Form, Input, Modal, DatePicker, Switch, Select } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import styles from '../../asset/scss/ManageNewsUpdatesPage.module.scss';
import { fetchAllNews, createNewsActionApi, updateNewsActionApi, removeNewsActionApi, fetchNewsDetails } from '../../store/redux/action/NewsAction';
import moment from 'moment';

const { confirm } = Modal;
const { Option } = Select;

const ManageNewsUpdatesPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [quillValue, setQuillValue] = useState(''); // State for ReactQuill value
  const userId = useSelector(state => state.userReducer.userLogin.userId);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const newsData = useSelector(state => state.newsReducer.newsList);

  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);

  const showDrawer = async (title, news = null) => {
    setDrawerTitle(title);
    setSelectedNews(news);
    setDrawerVisible(true); // Show the drawer first
  
    if (news) {
      // Wait until fetchNewsDetails completes
      await dispatch(fetchNewsDetails(news.newsId));
      form.setFieldsValue({
        ...news,
        newsDate: moment(news.newsDate),
        userId: userId, // Set the userId from state
      });
      setQuillValue(news.newsDescription); // Set the initial value for ReactQuill
    } else {
      form.setFieldsValue({
        userId: userId, // Set the userId from state
      });
      setQuillValue(''); // Reset the ReactQuill value
    }
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedNews(null);
    form.resetFields();
    setQuillValue(''); // Reset the ReactQuill value
  };

  const handleCreate = () => {
    showDrawer('Create News');
  };

  const handleUpdate = (id) => {
    const news = newsData.find(news => news.newsId === id);
    if (news) {
      showDrawer('Update News', news);
    }
  };

  const handleView = (id) => {
    const news = newsData.find(news => news.newsId === id);
    if (news) {
      showDrawer('View News', news);
    }
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure you want to delete this news?',
      onOk() {
        console.log('Deleting news with ID:', id); // Debugging log
        dispatch(removeNewsActionApi(id))
          .then(response => {
            console.log('Delete News Response:', response); // Debugging log
          })
          .catch(error => {
            console.error('Delete News Error:', error); // Debugging log
          });
      },
    });
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const formattedValues = {
        ...values,
        newsDate: values.newsDate.format('YYYY-MM-DD'),
        status: values.status ? 1 : 0, // Convert boolean to integer
        newsDescription: quillValue, // Include the ReactQuill value
      };
      console.log('Submitting values:', formattedValues); // Debugging log
      if (drawerTitle === 'Create News') {
        dispatch(createNewsActionApi(formattedValues))
          .then(response => {
            console.log('Create News Response:', response); // Debugging log
          })
          .catch(error => {
            console.error('Create News Error:', error); // Debugging log
          });
      } else if (drawerTitle === 'Update News' && selectedNews) {
        dispatch(updateNewsActionApi(selectedNews.newsId, formattedValues, navigate))
          .then(response => {
            console.log('Update News Response:', response); // Debugging log
          })
          .catch(error => {
            console.error('Update News Error:', error); // Debugging log
          });
      }
      closeDrawer();
      navigate('/admin/manage-news');
    }).catch(errorInfo => {
      console.error('Validation Failed:', errorInfo);
    });
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Date', dataIndex: 'newsDate', key: 'newsDate' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => (status ? 'Active' : 'Inactive') },
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
      <Table dataSource={newsData} columns={columns} rowKey="newsId" />
      <Drawer
        title={drawerTitle}
        width={640}
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="newsTypeId" label="News Type" rules={[{ required: true, message: 'Please select the news type' }]}>
            <Select id="newsTypeId" placeholder="Select news type" disabled={drawerTitle === 'View News'}>
              <Option value="type1">Type 1</Option>
              <Option value="type2">Type 2</Option>
            </Select>
          </Form.Item>
          <Form.Item name="userId" label="User ID" rules={[{ required: true, message: 'Please enter the user ID' }]}>
            <Input id="userId" placeholder="Please enter the user ID" disabled={true} />
          </Form.Item>
          <Form.Item name="newsDate" label="Date" rules={[{ required: true, message: 'Please enter the date' }]}>
            <DatePicker id="newsDate" style={{ width: '100%' }} disabled={drawerTitle === 'View News'} />
          </Form.Item>
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch id="status" disabled={drawerTitle === 'View News'} />
          </Form.Item>
          <Form.Item name="newsDescription" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
            <ReactQuill
              id="newsDescription"
              theme="snow"
              value={quillValue}
              onChange={setQuillValue}
              readOnly={drawerTitle === 'View News'}
              placeholder="Please enter the description"
            />
          </Form.Item>
          <Form.Item name="imageUrl" label="Image URL" rules={[{ required: true, message: 'Please enter the image URL' }]}>
            <Input id="imageUrl" placeholder="Please enter the image URL" />
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