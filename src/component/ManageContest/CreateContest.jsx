import React from 'react';
import { Button, Upload, Col, Row, List, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styles from '../../asset/scss/CreateContestForm.module.scss';
import PlaceHolder from '../../component/shared/placeholder/PlaceHolder';
import CustomizeButton from '../../component/shared/button/CustomizeButton';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { createContestActionApi } from '../../store/redux/action/contestAction'; // replace with your actual action

const CreateContest = () => {
  const dispatch = useDispatch();
  const frm = useFormik({
    initialValues: {
      compName: '', 
      compDescription: '',
      location: '', 
      startDate: '',
      endDate: '', 
      status: 1 
    },
    onSubmit: (values) => {
      console.log('value', values);
      const actionAsync = createContestActionApi(values); 
      dispatch(actionAsync);
    },
  });

  // Mock data for contests
  const pastCompetitions = [
    { id: 1, name: 'Koi Fish Competition 2023', date: '2023-10-15' },
    { id: 2, name: 'Annual Koi Show 2022', date: '2022-09-20' },
    { id: 3, name: 'Koi Expo 2021', date: '2021-08-10' },
  ];

  const currentCompetitions = [
    { id: 4, name: 'Koi Fish Competition 2024', date: '2024-10-15' },
  ];

  const futureCompetitions = [
    { id: 5, name: 'Koi Fish Competition 2025', date: '2025-10-15' },
  ];

  return (
    <div className={styles.container}>
      <Row gutter={16}>
        <Col span={12}>
          <div className={styles.formContainer}>
            <form
              onSubmit={frm.handleSubmit}
              autoComplete="off"
              className={styles.createContestForm}
            >
              <div className={styles.title}>
                <h1>Create Contest</h1>
              </div>
              <div className={styles.formItem}>
                <PlaceHolder onChange={frm.handleChange} id='compName' label='Competition Name' placeholder='Enter competition name' type='text' /> 
              </div>
              <div className={styles.formItem}>
                <PlaceHolder
                  onChange={frm.handleChange}
                  id='compDescription'
                  height="300px"
                  label='Description'
                  placeholder='Enter description'
                  type='textarea'
                />
              </div>
              <div className={styles.formItem}>
                <PlaceHolder onChange={frm.handleChange} id='location' label='Location' placeholder='Enter location' type='text' />
              </div>
              <div className={styles.formItem}>
                <PlaceHolder onChange={frm.handleChange} id='startDate' label='Start Date' placeholder='Enter start date' type='date' />
              </div>
              <div className={styles.formItem}>
                <PlaceHolder onChange={frm.handleChange} id='endDate' label='End Date' placeholder='Enter end date' type='date' /> 
              </div>
              <div className={styles.formItem}>
                <PlaceHolder onChange={frm.handleChange} id='status' label='Status' placeholder='Enter status' type='text' /> 
              </div>
              <div className={styles.formItem}>
                <label htmlFor="photo">Upload Photo</label>
                <Upload
                  id="photo"
                  name="photo"
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false} // Prevent automatic upload
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </div>
              <div className={styles.formItem}>
                <CustomizeButton />
              </div>
            </form>
          </div>
        </Col>
        <Col span={12}>
          <div className={styles.competitionsContainer}>
            <Typography.Title level={2}>Current Competitions</Typography.Title>
            <List
              bordered
              dataSource={currentCompetitions}
              renderItem={item => (
                <List.Item key={item.id}>
                  <Typography.Text>{item.name}</Typography.Text> - <Typography.Text>{item.date}</Typography.Text>
                </List.Item>
              )}
            />
            <Typography.Title level={2}>Future Competitions</Typography.Title>
            <List
              bordered
              dataSource={futureCompetitions}
              renderItem={item => (
                <List.Item key={item.id}>
                  <Typography.Text>{item.name}</Typography.Text> - <Typography.Text>{item.date}</Typography.Text>
                </List.Item>
              )}
            />
            <Typography.Title level={2}>Past Competitions</Typography.Title>
            <List
              bordered
              dataSource={pastCompetitions}
              renderItem={item => (
                <List.Item key={item.id}>
                  <Typography.Text>{item.name}</Typography.Text> - <Typography.Text>{item.date}</Typography.Text>
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CreateContest;