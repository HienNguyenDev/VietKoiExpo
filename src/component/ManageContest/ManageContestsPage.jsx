// ManageContestsPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Drawer, Form, Input, Modal, DatePicker, Checkbox, Row, Col, Radio, Tag } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from '../../asset/scss/ManageContestsPage.module.scss';
import { fetchAllContests, createContestActionApi, updateContestActionApi, removeContestActionApi, fetchContestDetails, fetchCategoriesByCompId, fetchKoiFromCompId } from '../../store/redux/action/contestAction';
import moment from 'moment';

import UploadImageComponent from '../../component/shared/UploadImage/UploadImage';

const { confirm } = Modal;

const ManageContestsPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedContest, setSelectedContest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [koiList, setKoiList] = useState([]);
  const dispatch = useDispatch();
  const contestsData = useSelector(state => state.contestReducer.contestList);
  const categoriesList = useSelector(state => state.contestReducer.categoriesList);

  useEffect(() => {
    dispatch(fetchAllContests());
  }, [dispatch]);

  useEffect(() => {
    if (selectedContest) {
      const compId = selectedContest.compId;

      if (!categories[compId]) {
        dispatch(fetchCategoriesByCompId(compId)).then(res => {
          const categoryIds = res && res.data ? res.data.map(category => category.categoryId) : [];
          setCategories(prevCategories => ({
            ...prevCategories,
            [compId]: categoryIds,
          }));
        }).catch(error => {
          console.error('Không thể lấy danh sách thể loại:', error);
        });
      }

      // Lấy danh sách cá Koi cho cuộc thi đã chọn
      dispatch(fetchKoiFromCompId(compId)).then(res => {
        if (res && res.data) {
          setKoiList(res.data);
        }
      }).catch(error => {
        console.error('Không thể lấy danh sách cá Koi:', error);
      });
    }
  }, [dispatch, selectedContest, categories]);

  useEffect(() => {
    console.log('Danh sách thể loại đã cập nhật:', categories);
  }, [categories]);

  const allCategories = [
    { id: 1, name: 'Grand' },
    { id: 2, name: 'Sakura' },
    { id: 3, name: 'Mature' },
    { id: 4, name: 'Adult' },
    { id: 5, name: 'Young' },
    { id: 6, name: 'Baby' }
  ];

  const handleCategoryChange = (checkedValues) => {
    setCheckedCategories(checkedValues);
  };

  useEffect(() => {
    if (selectedContest && categories[selectedContest.compId]) {
      console.log('Thể loại đã chọn:', categories[selectedContest.compId]);
      setCheckedCategories(categories[selectedContest.compId]);
    }
  }, [selectedContest, categories]);

  useEffect(() => {
    console.log('Thể loại được chọn:', checkedCategories);
  }, [checkedCategories]);

  const filteredCompetitions = contestsData.filter(competition => {
    const matchesSearchTerm = competition.compName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              competition.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'upcoming' && competition.status === 0) ||
      (filterStatus === 'ongoing' && competition.status === 1) ||
      (filterStatus === 'completed' && competition.status === 2) ||
      (filterStatus === 'deleted' && competition.status === 3);

    return matchesSearchTerm && matchesStatus;
  });

  const showDrawer = async (title, contest = null) => {
    setDrawerTitle(title);
    setSelectedContest(contest);
    setDrawerVisible(true);

    if (contest) {
      dispatch(fetchContestDetails(contest.compId));
      form.setFieldsValue({
        ...contest,
        startDate: moment(contest.startDate),
        endDate: moment(contest.endDate),
        categoryId: contest.tblcompetitionCategories.map(category => category.categoryId),
      });
    } else {
      form.resetFields();
    }
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedContest(null);
    form.resetFields();
  };

  const handleCreate = () => {
    showDrawer('Tạo Cuộc Thi');
  };

  const handleUpdate = (id) => {
    const contest = contestsData.find(contest => contest.compId === id);
    if (contest) {
      showDrawer('Cập Nhật Cuộc Thi', contest);
    }
  };

  const handleView = (id) => {
    const contest = contestsData.find(contest => contest.compId === id);
    if (contest) {
      showDrawer('Xem Chi Tiết Cuộc Thi', contest);
    }
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa cuộc thi này không?',
      onOk() {
        dispatch(removeContestActionApi(id));
      },
    });
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const formattedValues = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
        status: drawerTitle === 'Tạo Cuộc Thi' ? 0 : values.status,
        tblcompetitionCategories: values.categoryId.map(categoryId => ({ categoryId })),
      };
      console.log('Giá trị đang gửi:', formattedValues);
      if (drawerTitle === 'Tạo Cuộc Thi') {
        dispatch(createContestActionApi(formattedValues));
      } else if (drawerTitle === 'Cập Nhật Cuộc Thi' && selectedContest) {
        dispatch(updateContestActionApi(selectedContest.compId, formattedValues, navigate));
      }
      closeDrawer();
      navigate('/admin/manage-contests');
    }).catch(errorInfo => {
      console.error('Xác thực thất bại:', errorInfo);
    });
  };

  const disabledStartDate = (current) => {
    return current && current < moment().startOf('day');
  };

  const disabledEndDate = (current) => {
    const startDate = form.getFieldValue('startDate');
    return current && (current < moment().startOf('day') || (startDate && current < startDate));
  };

  const updateContestStatus = () => {
    const now = moment();
    contestsData.forEach(contest => {
      if (contest.status === 0 && moment(contest.startDate).isSameOrBefore(now)) {
        dispatch(updateContestActionApi(contest.compId, { ...contest, status: 1 }));
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(updateContestStatus, 240000); // Kiểm tra mỗi phút
    return () => clearInterval(interval);
  }, [contestsData, dispatch]);

  const columns = [
    { title: 'Tên Cuộc Thi', dataIndex: 'compName', key: 'compName' },
    { title: 'Ngày Bắt Đầu', dataIndex: 'startDate', key: 'startDate' },
    { title: 'Ngày Kết Thúc', dataIndex: 'endDate', key: 'endDate' },
    { title: 'Địa Điểm', dataIndex: 'location', key: 'location' },
    { title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 0 ? 'green' : status === 1 ? 'blue' : status === 2 ? 'red' : 'gray';
        let statusText = status === 0 ? 'Sắp Diễn Ra' : status === 1 ? 'Đang Diễn Ra' : status === 2 ? 'Đã Hoàn Thành' : 'Đã Xóa';
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.compId)}>Xem</Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleUpdate(record.compId)} disabled={record.status === 3}>Cập Nhật</Button>
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.compId)} disabled={record.status === 3}>Xóa</Button>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.manageContestsPage}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} style={{ marginBottom: 16 }}>
        Tạo Cuộc Thi
      </Button>
      <br/>
      <div style={{ marginBottom: 16 }}>
        <Input 
          placeholder="Tìm kiếm theo Tên hoặc Địa điểm" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 300 }}
        />
      </div>
      <Radio.Group 
        onChange={(e) => setFilterStatus(e.target.value)} 
        value={filterStatus}
        style={{ marginBottom: 16 }}>
        <Radio.Button value="all">Tất Cả</Radio.Button>
        <Radio.Button value="upcoming">Sắp Diễn Ra</Radio.Button>
        <Radio.Button value="ongoing">Đang Diễn Ra</Radio.Button>
        <Radio.Button value="completed">Đã Hoàn Thành</Radio.Button>
        <Radio.Button value="deleted">Đã Xóa</Radio.Button>
      </Radio.Group>

      <Table dataSource={filteredCompetitions} columns={columns}  rowKey="compId" />
      <Drawer
        title={drawerTitle}
        width={640}
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="categoryId" label="Chọn thể loại" rules={[{ required: true, message: 'Hãy chọn ít nhất hai!' }]}>            
            <Checkbox.Group>
              <Row>
                {allCategories.map((category, index) => (
                  <Col span={24} key={index}>
                    <Checkbox
                      value={category.name}
                      checked={checkedCategories.includes(category.name)} 
                      disabled={(drawerTitle === 'Xem Chi Tiết Cuộc Thi' )}
                    >
                      {category.name}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name="compName" label="Tên Cuộc Thi" rules={[{ required: true, message: 'Hãy nhập tên cuộc thi' }]}>            
            <Input placeholder="Hãy nhập tên cuộc thi" disabled={drawerTitle === 'Xem Chi Tiết Cuộc Thi'} />
          </Form.Item>
          <Form.Item name="compDescription" label="Mô Tả" rules={[{ required: true, message: 'Hãy nhập mô tả' }]}>            
            <Input placeholder="Hãy nhập mô tả" disabled={drawerTitle === 'Xem Chi Tiết Cuộc Thi'} />
          </Form.Item>
          <Form.Item name="location" label="Địa Điểm" rules={[{ required: true, message: 'Hãy nhập địa điểm' }]}>            
            <Input placeholder="Hãy nhập địa điểm" disabled={drawerTitle === 'Xem Chi Tiết Cuộc Thi'} />
          </Form.Item>
          <Form.Item name="imageUrl" label="Hình Ảnh">
            {drawerTitle !== 'Xem Chi Tiết Cuộc Thi' ? (
              <UploadImageComponent 
                onSuccess={(url) => form.setFieldsValue({ imageUrl: url })}
                defaultUrl={form.getFieldValue('imageUrl')}
              />
            ) : (
              <img src={form.getFieldValue('imageUrl')} alt="Cuộc Thi" style={{ width: '100px', marginTop: '10px' }} />
            )}
          </Form.Item>
          <Form.Item name="startDate" label="Ngày Bắt Đầu" rules={[{ required: true, message: 'Hãy nhập ngày bắt đầu' }]}>            
            <DatePicker style={{ width: '100%' }} disabledDate={disabledStartDate} disabled={drawerTitle === 'Xem Chi Tiết Cuộc Thi'} />
          </Form.Item>
          <Form.Item name="endDate" label="Ngày Kết Thúc" rules={[{ required: true, message: 'Hãy nhập ngày kết thúc' }]}>            
            <DatePicker style={{ width: '100%' }} disabledDate={disabledEndDate} disabled={drawerTitle === 'Xem Chi Tiết Cuộc Thi'} />
          </Form.Item>
          {drawerTitle !== 'Tạo Cuộc Thi' && (
            <Form.Item
              name="status"
              label="Trạng Thái"
              rules={[{ required: true, message: 'Hãy chọn trạng thái' }]}
            >
              <Radio.Group
                disabled={koiList.length > 0 || selectedContest && selectedContest.status === 1 || drawerTitle === 'Xem Chi Tiết Cuộc Thi'}>
                <Radio value={0} disabled={koiList.length > 0 && selectedContest && selectedContest.status !== 0 || drawerTitle === 'Xem Chi Tiết Cuộc Thi'}>Sắp Diễn Ra</Radio>
                <Radio value={1}>Đang Diễn Ra</Radio>
                <Radio value={2} disabled={koiList.length > 0 && selectedContest && selectedContest.status === 1 || drawerTitle === 'Xem Chi Tiết Cuộc Thi'}>Đã Hoàn Thành</Radio>
                
              </Radio.Group>
            </Form.Item>
          )}
          {drawerTitle !== 'Xem Chi Tiết Cuộc Thi' && (
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

export default ManageContestsPage;
