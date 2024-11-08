import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, message, Upload, Card, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CheckIn.module.scss';

const CheckIn = () => {
  const { competitionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registeredKoi = useSelector(state => state.registerKoi.koiList);
  const registrationList = useSelector(state => state.registerKoi.registrationList);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState({});

  const handleCheckIn = async () => {
    setLoading(true);
    try {
      // Perform check-in logic here
      // For each Koi fish, verify the uploaded image
      for (const koiId in fileList) {
        const file = fileList[koiId];
        // Perform image verification logic here
        // Example: await verifyImage(koiId, file);
      }
      message.success('Check-in successful!');
      navigate(`/competitionMatch/${competitionId}`);
    } catch (error) {
      message.error('Check-in failed.');
      console.error('Error during check-in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadChange = (koiId, info) => {
    setFileList(prevState => ({
      ...prevState,
      [koiId]: info.fileList[0],
    }));
  };

  const userRegisteredKoi = registrationList.filter(registration => registration.compId === competitionId && registeredKoi.some(koi => koi.koiId === registration.koiId));

  return (
    <div className={styles.checkInPage}>
      <Typography.Title level={2}>Check In for Competition</Typography.Title>
      <Typography.Paragraph>
        Please check in your Koi fish for the competition by uploading a recent image of each fish.
      </Typography.Paragraph>
      <Row gutter={[16, 16]}>
        {userRegisteredKoi.map(registration => {
          const koi = registeredKoi.find(k => k.koiId === registration.koiId);
          return (
            <Col key={koi.koiId} span={8}>
              <Card title={koi.koiName} bordered={false}>
                <Upload
                  listType="picture"
                  maxCount={1}
                  onChange={(info) => handleUploadChange(koi.koiId, info)}
                >
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Card>
            </Col>
          );
        })}
      </Row>
      <div className={styles.checkInButton}>
        <Button type="primary" onClick={handleCheckIn} loading={loading}>
          Check In
        </Button>
      </div>
    </div>
  );
};

export default CheckIn;