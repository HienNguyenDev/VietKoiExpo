import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Drawer, Form, Input, Modal, DatePicker, Switch, Checkbox, Row, Col, Radio, Tag } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from '../../asset/scss/ManageContestsPage.module.scss';
import { fetchAllContests, createContestActionApi, updateContestActionApi, removeContestActionApi, fetchContestDetails, fetchCategoriesByCompId } from '../../store/redux/action/contestAction';
import { fetchKoiEntriesByCategoryAndCompId } from '../../store/redux/action/koiEntriesAction';
import moment from 'moment';

const { confirm } = Modal;

const ManageContestsPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedContest, setSelectedContest] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  
  const navigate = useNavigate();
  
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [koiEntries, setKoiEntries] = useState([]);
  const dispatch = useDispatch();
   const contestsData = useSelector(state => state.contestReducer.contestList);
  const categoriesList = useSelector(state => state.contestReducer.categoriesList);
  
  useEffect(() => {
    dispatch(fetchAllContests());
  }, [dispatch]);

  

  useEffect(() => {
    if (selectedContest) {
      const compId = selectedContest.compId;
  
      // Check if categories for this compId are not already fetched
      if (!categories[compId]) {
        // Fetch the categories using the provided action and compId
        dispatch(fetchCategoriesByCompId(compId)).then(res => {
          // Check if res and res.data exist, then map to extract categoryId
          const categoryIds = res && res.data ? res.data.map(category => category.categoryId) : [];
          // Store the categoryId array in state, indexed by compId
          setCategories(prevCategories => ({
            ...prevCategories,
            [compId]: categoryIds, // Store only the categoryId array
          }));
        }).catch(error => {
          console.error('Failed to fetch categories:', error);
        });
      }
    }
  }, [dispatch, selectedContest, categories]);
  
  // Use a useEffect to log the updated categories
  useEffect(() => {
    console.log('Updated categories:', categories);
  }, [categories]);
  

// Define the available categories
const allCategories = [
  { id: 1, name: 'Grand' },
  { id: 2, name: 'Sakura' },
  { id: 3, name: 'Mature' },
  { id: 4, name: 'Adult' },
  { id: 5, name: 'Young' },
  { id: 6, name: 'Baby' }
];



// Handle category selection change
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

  // Lọc danh sách các cuộc thi theo trạng thái
  const filteredCompetitions = contestsData.filter(competition => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'upcoming') return competition.status === 0;
    if (filterStatus === 'ongoing') return competition.status === 1;
    if (filterStatus === 'completed') return competition.status === 2;
    return true;
  });
  const showDrawer = async (title, contest = null) => {
    setDrawerTitle(title);
    setSelectedContest(contest);
    if (contest) {
      await dispatch(fetchContestDetails(contest.compId));
      form.setFieldsValue({
        ...contest,
        startDate: moment(contest.startDate),
        endDate: moment(contest.endDate),
      });
    } else {
      form.resetFields();
    }
    setDrawerVisible(true);
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
      };
      console.log('Submitting values:', formattedValues); // Debugging log
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
          {/* <Form.Item name="compId" label="Contest ID" rules={[{ required: true, message: 'Please enter the contest ID' }]}>
            <Input placeholder="Please enter the contest ID" disabled={drawerTitle === 'View Contest'} />
          </Form.Item> */}

          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: 'Choose at least one category!' }]}
          >
            <Checkbox.Group
              onChange={handleCategoryChange} // Updates the state when a checkbox is checked/unchecked
            >
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
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true, message: 'Please enter the start date' }]}>
            <DatePicker style={{ width: '100%' }} disabled={drawerTitle === 'View Contest'} />
          </Form.Item>
          <Form.Item name="endDate" label="End Date" rules={[{ required: true, message: 'Please enter the end date' }]}>
            <DatePicker style={{ width: '100%' }} disabled={drawerTitle === 'View Contest'} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status' }]}
          > 
          <Radio.Group disabled={drawerTitle === 'View Contest'}>
            <Radio value={0}>Upcoming</Radio>
            <Radio value={1}>Ongoing</Radio>
            <Radio value={2}>Complete</Radio>
          </Radio.Group>
          </Form.Item>
          {drawerTitle !== 'View Contest' && (
            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          )}
          <Table
          dataSource={koiEntries}
          columns={[
            { title: 'Koi Name', dataIndex: 'koiName', key: 'koiName' },
            { title: 'Age', dataIndex: 'age', key: 'age' },
            { title: 'Size (cm)', dataIndex: 'size', key: 'size' },
            { title: 'Variety', dataIndex: 'variety', key: 'variety' },
          ]}
          rowKey="id"
          pagination={{ pageSize: 5 }} // Optional: Paginate the table
        />
        </Form>
      </Drawer>
    </div>
  );
};

export default ManageContestsPage;