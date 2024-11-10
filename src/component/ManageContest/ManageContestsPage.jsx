// ManageContestsPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Drawer, Form, Input, Modal, DatePicker, Checkbox, Row, Col, Radio, Tag } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from '../../asset/scss/ManageContestsPage.module.scss';
import { fetchAllContests, createContestActionApi, updateContestActionApi, removeContestActionApi, fetchContestDetails, fetchCategoriesByCompId } from '../../store/redux/action/contestAction';
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
          console.error('Failed to fetch categories:', error);
        });
      }
    }
  }, [dispatch, selectedContest, categories]);

  useEffect(() => {
    console.log('Updated categories:', categories);
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
      console.log('Selected Categories:', categories[selectedContest.compId]);
      setCheckedCategories(categories[selectedContest.compId]);
    }
  }, [selectedContest, categories]);

  useEffect(() => {
    console.log('Checked Categories:', checkedCategories);
  }, [checkedCategories]);

  const filteredCompetitions = contestsData.filter(competition => {
    const matchesSearchTerm = competition.compName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              competition.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'upcoming' && competition.status === 0) ||
      (filterStatus === 'ongoing' && competition.status === 1) ||
      (filterStatus === 'completed' && competition.status === 2);

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
    showDrawer('Create Contest');
  };

  const handleUpdate = (id) => {
    const contest = contestsData.find(contest => contest.compId === id);
    if (contest) {
      showDrawer('Update Contest', contest);
    }
  };

  const handleView = (id) => {
    const contest = contestsData.find(contest => contest.compId === id);
    if (contest) {
      showDrawer('View Contest', contest);
    }
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure you want to delete this contest?',
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
        status: values.status,
        tblcompetitionCategories: values.categoryId.map(categoryId => ({ categoryId })),
      };
      console.log('Submitting values:', formattedValues);
      if (drawerTitle === 'Create Contest') {
        dispatch(createContestActionApi(formattedValues));
      } else if (drawerTitle === 'Update Contest' && selectedContest) {
        dispatch(updateContestActionApi(selectedContest.compId, formattedValues, navigate));
      }
      closeDrawer();
      navigate('/admin/manage-contests');
    }).catch(errorInfo => {
      console.error('Validation Failed:', errorInfo);
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
    const interval = setInterval(updateContestStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [contestsData, dispatch]);

  const columns = [
    { title: 'Name', dataIndex: 'compName', key: 'compName' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 0 ? 'green' : status === 1 ? 'blue' : 'red';
        let statusText = status === 0 ? 'Upcoming' : status === 1 ? 'Ongoing' : 'Completed';
        return <Tag color={color}>{statusText}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record.compId)}>View</Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleUpdate(record.compId)}>Update</Button>
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.compId)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.manageContestsPage}>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate} style={{ marginBottom: 16 }}>
        Create Contest
      </Button>
      <br/>
      <div style={{ marginBottom: 16 }}>
        <Input 
          placeholder="Search by Name or Location" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 300 }}
        />
      </div>
      <Radio.Group 
        onChange={(e) => setFilterStatus(e.target.value)} 
        value={filterStatus}
        style={{ marginBottom: 16 }}>
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="upcoming">Upcoming</Radio.Button>
        <Radio.Button value="ongoing">Ongoing</Radio.Button>
        <Radio.Button value="completed">Completed</Radio.Button>
      </Radio.Group>

      <Table dataSource={filteredCompetitions} columns={columns}  rowKey="compId" />
      <Drawer
        title={drawerTitle}
        width={640}
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="categoryId" label="Select category" rules={[{ required: true, message: 'Choose at least two!' }]}>
            <Checkbox.Group>
              <Row>
                {allCategories.map((category, index) => (
                  <Col span={24} key={index}>
                    <Checkbox
                      value={category.name}
                      checked={checkedCategories.includes(category.name)} 
                      disabled={drawerTitle === 'View Contest'}
                    >
                      {category.name}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name="compName" label="Name" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input placeholder="Please enter the name" disabled={drawerTitle === 'View Contest'} />
          </Form.Item>
          <Form.Item name="compDescription" label="Description" rules={[{ required: true, message: 'Please enter the description' }]}>
            <Input placeholder="Please enter the description" disabled={drawerTitle === 'View Contest'} />
          </Form.Item>
          <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please enter the location' }]}>
            <Input placeholder="Please enter the location" disabled={drawerTitle === 'View Contest'} />
          </Form.Item>
          <Form.Item name="imageUrl" label="Image">
            {drawerTitle !== 'View Contest' ? (
              <UploadImageComponent 
                onSuccess={(url) => form.setFieldsValue({ imageUrl: url })}
                defaultUrl={form.getFieldValue('imageUrl')}
              />
            ) : (
              <img src={form.getFieldValue('imageUrl')} alt="Contest" style={{ width: '100px', marginTop: '10px' }} />
            )}
          </Form.Item>
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true, message: 'Please enter the start date' }]}>
            <DatePicker style={{ width: '100%' }} disabledDate={disabledStartDate} disabled={drawerTitle === 'View Contest'} />
          </Form.Item>
          <Form.Item name="endDate" label="End Date" rules={[{ required: true, message: 'Please enter the end date' }]}>
            <DatePicker style={{ width: '100%' }} disabledDate={disabledEndDate} disabled={drawerTitle === 'View Contest'} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status' }]}
          > 
          <Radio.Group disabled={drawerTitle === 'View Contest'}>
            <Radio value={0}>Upcoming</Radio>
            <Radio value={1}>Ongoing</Radio>
            <Radio value={2}>Completed</Radio>
          </Radio.Group>
          </Form.Item>
          {drawerTitle !== 'View Contest' && (
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

export default ManageContestsPage;
