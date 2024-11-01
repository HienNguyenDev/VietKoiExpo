import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Drawer, Form, Input, Modal, DatePicker, Switch, Select, Upload } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
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
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);

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
      });
    } else {
      form.resetFields();
    }
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedNews(null);
    form.resetFields();
    setFileList([]);
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
        dispatch(removeNewsActionApi(id));
      },
    });
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const formattedValues = {
        ...values,
        newsDate: values.newsDate.format('YYYY-MM-DD'),
        status: values.status ? 1 : 0, // Convert boolean to integer
        imageUrl: fileList.length > 0 ? fileList[0].response.url : '', // Assuming the server returns the URL in the response
      };
      console.log('Submitting values:', formattedValues); // Debugging log
      if (drawerTitle === 'Create News') {
        dispatch(createNewsActionApi(formattedValues));
      } else if (drawerTitle === 'Update News' && selectedNews) {
        dispatch(updateNewsActionApi(selectedNews.newsId, formattedValues, navigate));
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
            <Select placeholder="Select news type" disabled={drawerTitle === 'View News'}>
              <Option value="type1">Type 1</Option>
              <Option value="type2">Type 2</Option>
            </Select>
          </Form.Item>
          <Form.Item name="userId" label="User ID" rules={[{ required: true, message: 'Please enter the user ID' }]}>
            <Input placeholder="Please enter the user ID" disabled={drawerTitle === 'View News'} />
          </Form.Item>
          <Form.Item name="newsDate" label="Date" rules={[{ required: true, message: 'Please enter the date' }]}>
            <DatePicker style={{ width: '100%' }} disabled={drawerTitle === 'View News'} />
          </Form.Item>
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch disabled={drawerTitle === 'View News'} />
          </Form.Item>
          <Form.Item name="newsDescription" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
            <ReactQuill theme="snow" placeholder="Please enter the description" readOnly={drawerTitle === 'View News'} />
          </Form.Item>
          <Form.Item name="imageUrl" label="Image URL" rules={[{ required: true, message: 'Please upload an image' }]}>
            <Upload
              action="/upload" // Replace with your upload URL
              listType="picture"
              fileList={fileList}
              onChange={handleUploadChange}
              disabled={drawerTitle === 'View News'}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
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