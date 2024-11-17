import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Drawer, Form, Input, Modal, DatePicker, Switch, Select } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import styles from '../../asset/scss/ManageNewsUpdatesPage.module.scss';
import { fetchAllNews, createNewsActionApi, updateNewsActionApi, removeNewsActionApi, fetchNewsDetails } from '../../store/redux/action/NewsAction';
import moment from 'moment';
import UploadImageComponent from '../../component/shared/UploadImage/UploadImage';
const { confirm } = Modal;
const { Option } = Select;
const { Search } = Input;

const ManageNewsUpdatesPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [quillValue, setQuillValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [searchValue, setSearchValue] = useState(''); // State for search value

  const [form] = Form.useForm();
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const newsData = useSelector(state => state.newsReducer.newsList);

  useEffect(() => {
    dispatch(fetchAllNews());

    const interval = setInterval(() => {
      dispatch(fetchAllNews());
    }, 5000); // Fetch news every 60 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSearch = (value) => {
    setSearchValue(value.toLowerCase());
  };

  const filteredNewsData = newsData.filter(news =>
    !searchValue ||
    (news.title && news.title.toLowerCase().includes(searchValue)) ||
    (news.newsTypeId && news.newsTypeId.toLowerCase().includes(searchValue)) ||
    (news.newsDescription && news.newsDescription.toLowerCase().includes(searchValue))
  );

  const showDrawer = async (title, news = null) => {
    setDrawerTitle(title);
    setSelectedNews(news);
    setDrawerVisible(true);

    if (news) {
      form.setFieldsValue({
        ...news,
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
    showDrawer('Tạo Tin Tức');
  };

  const handleUpdate = (id) => {
    const news = newsData.find(news => news.newsId === id);
    if (news) {
      showDrawer('Cập Nhật Tin Tức', news);
    }
  };

  const handleView = (id) => {
    const news = newsData.find(news => news.newsId === id);
    if (news) {
      showDrawer('Xem Tin Tức', news);
    }
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa tin tức này không?',
      onOk() {
        dispatch(removeNewsActionApi(id))
          .then(response => {
            console.log('Xóa Tin Tức Thành Công:', response);
          })
          .catch(error => {
            console.error('Lỗi Xóa Tin Tức:', error);
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
      };
      if (drawerTitle === 'Tạo Tin Tức') {
        dispatch(createNewsActionApi(formattedValues))
          .then(response => {
            console.log('Tạo Tin Tức Thành Công:', response);
          })
          .catch(error => {
            console.error('Lỗi Tạo Tin Tức:', error);
          });
      } else if (drawerTitle === 'Cập Nhật Tin Tức' && selectedNews) {
        dispatch(updateNewsActionApi(selectedNews.newsId, { ...formattedValues, userId: selectedNews.userId }, navigate))
          .then(response => {
            console.log('Cập Nhật Tin Tức Thành Công:', response);
          })
          .catch(error => {
            console.error('Lỗi Cập Nhật Tin Tức:', error);
          });
      }
      closeDrawer();
    }).catch(errorInfo => {
      console.error('Xác Minh Thất Bại:', errorInfo);
    });
  };

  const columns = [
    {
      title: 'Hình Ảnh',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl) => (
        imageUrl ? <img src={imageUrl} alt="news-thumbnail" style={{ width: '100px' }} /> : 'Không Có Hình'
      )
    },
    {
      title: 'Tiêu Đề',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => {
        const descriptionSnippet = record.newsDescription ? (record.newsDescription.match(/<h1>(.*?)<\/h1>/)?.[1] || '').substring(0, 30) + '...' : '';
        return `${record.newsTypeId} - ${descriptionSnippet}`;
      }
    },
    {
      title: 'Loại',
      dataIndex: 'newsTypeId',
      key: 'newsTypeId',
    },
    {
      title: 'Ngày',
      dataIndex: 'newsDate',
      key: 'newsDate',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: status => (status ? 'Hoạt Động' : 'Không Hoạt Động')
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.newsId)}>Xem</Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleUpdate(record.newsId)}>Cập Nhật</Button>
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.newsId)}>Xóa</Button>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.manageNewsUpdatesPage}>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} style={{ marginRight: 16 }}>
          Tạo Tin Tức
        </Button>
        <Input
          placeholder="Tìm kiếm theo tiêu đề hoặc loại"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
      </div>
      <Table dataSource={filteredNewsData} columns={columns} rowKey="newsId" />
      <Drawer
        title={drawerTitle}
        width={640}
        onClose={closeDrawer}
        open={drawerVisible}
        destroyOnClose
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="newsTypeId" label="Loại Tin Tức" rules={[{ required: true, message: 'Vui lòng chọn loại tin tức' }]}>
            <Select id="newsTypeId" placeholder="Chọn loại tin tức" disabled={drawerTitle === 'Xem Tin Tức'}>
              <Option value="competition">Cuộc Thi</Option>
              <Option value="general">Chung</Option>
              <Option value="others">Khác</Option>
              <Option value="updates">Cập Nhật</Option>
            </Select>
          </Form.Item>
          <Form.Item name="userFullName" label="Tác Giả">
            <Input value={form.getFieldValue('userFullName')} disabled />
          </Form.Item>
          <Form.Item name="newsDate" label="Ngày" initialValue={moment()} rules={[{ required: true, message: 'Vui lòng nhập ngày' }]}>
            <DatePicker
              id="newsDate"
              style={{ width: '100%' }}
              disabled={drawerTitle === 'Xem Tin Tức'}
              format="YYYY-MM-DD"
              disabledDate={(current) => current && current < moment().startOf('day')}
            />
          </Form.Item>
          <Form.Item name="status" label="Trạng Thái" valuePropName="checked">
            <Switch id="status" disabled={drawerTitle === 'Xem Tin Tức'} />
          </Form.Item>
          <Form.Item name="newsDescription" label="Mô Tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
            <ReactQuill
              ref={quillRef}
              id="newsDescription"
              theme="snow"
              value={quillValue}
              onChange={setQuillValue}
              readOnly={drawerTitle === 'Xem Tin Tức'}
              placeholder="Vui lòng nhập mô tả"
            />
          </Form.Item>
          <Form.Item name="imageUrl" label="Hình Ảnh">
            {drawerTitle !== 'Xem Tin Tức' ? (
              <UploadImageComponent
                onSuccess={(url) => {
                  setImageUrl(url);
                  form.setFieldsValue({ imageUrl: url });
                }}
                defaultUrl={imageUrl}
              />
            ) : (
              <img src={imageUrl} alt="Tin Tức" style={{ width: '100px', marginTop: '10px' }} />
            )}
          </Form.Item>
          {drawerTitle !== 'Xem Tin Tức' && (
            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Gửi
              </Button>
            </Form.Item>
          )}
        </Form>
      </Drawer>
    </div>
  );
};

export default ManageNewsUpdatesPage;
