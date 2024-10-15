import React, { useEffect } from 'react';
import { Button, Upload, Col, Row, Typography, Modal, message } from 'antd';
import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../../asset/scss/UpdateContestForm.module.scss';
import PlaceHolder from '../../component/shared/placeholder/PlaceHolder';
import CustomizeButton from '../../component/shared/button/CustomizeButton';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { updateContestActionApi, fetchContestDetails } from '../../store/redux/action/contestAction'; // replace with your actual actions

const { confirm } = Modal;

const UpdateContest = () => {
  const { id: contestId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contestDetails = useSelector(state => state.contest.contestDetails);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(fetchContestDetails(contestId));
  }, [dispatch, contestId]);

  const frm = useFormik({
    initialValues: {
      competitionName: contestDetails.competitionName || '', 
      description: contestDetails.description || '',
      location: contestDetails.location || '', 
      startDate: contestDetails.startDate || '',
      endDate: contestDetails.endDate || '', 
      status: contestDetails.status || '' 
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      confirm({
        title: 'Do you want to update these changes?',
        icon: <ExclamationCircleOutlined />,
        content: 'Please confirm your changes.',
        onOk() {
          const actionAsync = updateContestActionApi(contestId, values, navigate); 
          dispatch(actionAsync);
          message.success('Contest updated successfully.');
        },
        onCancel() {
          message.info('Update cancelled.');
        },
      });
    },
  });

  return (
    <div className={styles.container}>
      <Row gutter={16}>
        <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className={styles.formContainer}>
            <form
              onSubmit={frm.handleSubmit}
              autoComplete="off"
              className={styles.updateContestForm}
            >
              <div className={styles.title}>
                <h1>Update Contest</h1>
              </div>
              <div className={styles.formItem}>
                <PlaceHolder onChange={frm.handleChange} id='competitionName' label='Competition Name' placeholder='Enter competition name' type='text' value={frm.values.competitionName} /> 
              </div>
              <div className={styles.formItem}>
                <PlaceHolder
                  onChange={frm.handleChange}
                  id='description'
                  height="300px"
                  label='Description'
                  placeholder='Enter description'
                  type='textarea'
                  value={frm.values.description}
                />
              </div>
              <div className={styles.formItem}>
                <PlaceHolder onChange={frm.handleChange} id='location' label='Location' placeholder='Enter location' type='text' value={frm.values.location} />
              </div>
              <div className={styles.formItem}>
                <PlaceHolder onChange={frm.handleChange} id='startDate' label='Start Date' placeholder='Enter start date' type='date' value={frm.values.startDate} />
              </div>
              <div className={styles.formItem}>
                <PlaceHolder onChange={frm.handleChange} id='endDate' label='End Date' placeholder='Enter end date' type='date' value={frm.values.endDate} /> 
              </div>
              <div className={styles.formItem}>
                <PlaceHolder onChange={frm.handleChange} id='status' label='Status' placeholder='Enter status' type='text' value={frm.values.status} /> 
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
      </Row>
    </div>
  );
}

export default UpdateContest;