import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Drawer, Form, Input, Modal, DatePicker, Switch, Checkbox, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from '../../asset/scss/ManageContestsPage.module.scss';
import { fetchAllContests, createContestActionApi, updateContestActionApi, removeContestActionApi, fetchContestDetails } from '../../store/redux/action/contestAction';
import moment from 'moment';

const { confirm } = Modal;

const ManageContestsPage = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [selectedContest, setSelectedContest] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const contestsData = useSelector(state => state.contestReducer.contestList);

  useEffect(() => {
    dispatch(fetchAllContests());
  }, [dispatch]);

  const showDrawer = async (title, contest = null) => {
    setDrawerTitle(title);
    setSelectedContest(contest);
    setDrawerVisible(true); // Show the drawer first
  
    if (contest) {
      // Wait until fetchContestDetails completes
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
        status: values.status ? 1 : 0, // Convert boolean to integer
        tblcompetitionCategories: values.categoryId.map(categoryId => ({ categoryId })),
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
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => (status ? 'Active' : 'Inactive') },
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
      <Table dataSource={contestsData} columns={columns} rowKey="compId" />
      <Drawer
        title={drawerTitle}
        width={640}
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="categoryId" label="Select category" rules={[{ required: true, message: 'Choose at least one!' }]}>
            <Checkbox.Group>
              <Row>
                <Col span={24}>
                  <Checkbox value="adult">Adult Champion</Checkbox>
                  <Checkbox value="baby">Baby Champion</Checkbox>
                  <Checkbox value="grand">Grand Champion</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="mature">Mature Champion</Checkbox>
                  <Checkbox value="sakura">Sakura Champion</Checkbox>
                  <Checkbox value="young">Young Champion</Checkbox>
                </Col>
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
          <Form.Item name="imageUrl" label="Image URL" rules={[{ required: true, message: 'Please enter the image URL' }]}>
            <Input placeholder="Please enter the image URL" disabled={drawerTitle === 'View Contest'} />
          </Form.Item>
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true, message: 'Please enter the start date' }]}>
            <DatePicker style={{ width: '100%' }} disabled={drawerTitle === 'View Contest'} />
          </Form.Item>
          <Form.Item name="endDate" label="End Date" rules={[{ required: true, message: 'Please enter the end date' }]}>
            <DatePicker style={{ width: '100%' }} disabled={drawerTitle === 'View Contest'} />
          </Form.Item>
          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch disabled={drawerTitle === 'View Contest'} />
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