import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Drawer, Form, Input, Modal, DatePicker, Switch, Select } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import styles from '../../asset/scss/ManageNewsUpdatesPage.module.scss';
import { fetchAllNews, createNewsActionApi, updateNewsActionApi, removeNewsActionApi, fetchNewsDetails } from '../../store/redux/action/NewsAction';
import { fetchUsersActionApi, fetchUserByIdAction } from '../../store/redux/action/userAction';
import moment from 'moment';
import UploadImageComponent from '../../component/shared/UploadImage/UploadImage';

const { confirm } = Modal;
const { Option } = Select;

const ManageNewsUpdatesPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [quillValue, setQuillValue] = useState(''); // State for ReactQuill value
  const [imageUrl, setImageUrl] = useState(''); // State for Image URL
  const [form] = Form.useForm();
  const quillRef = useRef(null); // Ref for ReactQuill instance
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const newsData = useSelector(state => state.newsReducer.newsList);
  const userProfile = useSelector(state => state.userReducer.userProfile);
  const userLogin = useSelector(state => state.userReducer.userLogin); // Get logged-in user information

  useEffect(() => {
    dispatch(fetchAllNews());
    dispatch(fetchUsersActionApi());
  }, [dispatch]);

  useEffect(() => {
    if (drawerVisible && drawerTitle === 'Create News') {
      form.resetFields();
      form.setFieldsValue({
        userFullName: userLogin?.fullName || '', // Set logged-in user directly
        newsDate: moment(),
      });
      setQuillValue('');
      setImageUrl('');
    }
  }, [drawerVisible, drawerTitle, form, userLogin]);

  const showDrawer = async (title, news = null) => {
    setDrawerTitle(title);
    setSelectedNews(news);
    setDrawerVisible(true);

    if (news) {
      const userFullName = await dispatch(fetchUserByIdAction(news.userId)).then(res => res.fullName).catch(() => '');
      form.setFieldsValue({
        ...news,
        userFullName,
        newsDate: moment(news.newsDate, 'YYYY-MM-DD'),
      });
      await dispatch(fetchNewsDetails(news.newsId));
      setQuillValue(news.newsDescription);
      setImageUrl(news.imageUrl || '');
    }
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedNews(null);
    setDrawerTitle('');
    form.resetFields();
    setQuillValue('');
    setImageUrl('');
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
        dispatch(removeNewsActionApi(id))
          .then(response => {
            console.log('Delete News Response:', response);
          })
          .catch(error => {
            console.error('Delete News Error:', error);
          });
      },
    });
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const formattedValues = {
        status: values.status,
        newsTypeId: values.newsTypeId,
        newsDate: values.newsDate.format('YYYY-MM-DD'),
        newsDescription: quillValue,
        imageUrl,
        userId: userLogin?.userId
      };
      if (drawerTitle === 'Create News') {
        values.userFullName = userLogin?.fullName;
        dispatch(createNewsActionApi(formattedValues))
          .then(response => {
            console.log('Create News Response:', response);
          })
          .catch(error => {
            console.error('Create News Error:', error);
          });
      } else if (drawerTitle === 'Update News' && selectedNews) {
        dispatch(updateNewsActionApi(selectedNews.newsId, { ...formattedValues, userId: selectedNews.userId }, navigate))
          .then(response => {
            console.log('Update News Response:', response);
          })
          .catch(error => {
            console.error('Update News Error:', error);
          });
      }
      closeDrawer();
    }).catch(errorInfo => {
      console.error('Validation Failed:', errorInfo);
    });
  };

  const columns = [
    { 
      title: 'Title', 
      dataIndex: 'title', 
      key: 'title',
      render: (_, record) => {
        const descriptionSnippet = record.newsDescription ? (record.newsDescription.match(/<h1>(.*?)<\/h1>/)?.[1] || '').substring(0, 30) + '...' : '';
        return `${record.newsTypeId} - ${descriptionSnippet}`;
      }
    },
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
        open={drawerVisible}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="newsTypeId" label="News Type" rules={[{ required: true, message: 'Please select the news type' }]}>
            <Select id="newsTypeId" placeholder="Select news type" disabled={drawerTitle === 'View News'}>
              <Option value="competition">Competition</Option>
              <Option value="general">General</Option>
              <Option value="others">Others</Option>
              <Option value="updates">Updates</Option>
            </Select>
          </Form.Item>
          <Form.Item name="userFullName" label="User">
            <Input value={form.getFieldValue('userFullName')} disabled />
          </Form.Item>
          <Form.Item name="newsDate" label="Date" initialValue={moment()} rules={[{ required: true, message: 'Please enter the date' }]}>
            <DatePicker id="newsDate" style={{ width: '100%' }} disabled={drawerTitle === 'View News'} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch id="status" disabled={drawerTitle === 'View News'} />
          </Form.Item>
          <Form.Item name="newsDescription" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
            <ReactQuill
              ref={quillRef}
              id="newsDescription"
              theme="snow"
              value={quillValue}
              onChange={setQuillValue}
              readOnly={drawerTitle === 'View News'}
              placeholder="Please enter the description"
            />
          </Form.Item>
          <Form.Item name="imageUrl" label="Image">
            {drawerTitle !== 'View News' ? (
              <UploadImageComponent
                onSuccess={(url) => {
                  setImageUrl(url);
                  form.setFieldsValue({ imageUrl: url });
                }}
                defaultUrl={imageUrl}
              />
            ) : (
              <img src={imageUrl} alt="News" style={{ width: '100px', marginTop: '10px' }} />
            )}
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


