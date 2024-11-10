import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Image, Spin, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './ViewKoiEntries.module.scss';

const ViewKoiEntries = () => {
  const [localKoi, setLocalKoi] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector(state => state.userReducer.userLogin.userId);
  const fullName = useSelector(state => state.userReducer.userLogin.fullName);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKoiEntries = async () => {
      try {
        const response = await axios.get(`https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Koifish/user/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        setLocalKoi(response.data);
      } catch (error) {
        console.error('Error fetching Koi entries:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchKoiEntries();
    }
  }, [userId]);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className={styles.viewKoiEntries}>
      <Button className={styles.backButton} onClick={() => navigate('/home')}>Back to Homepage</Button>
      <Typography.Title level={2} className={styles.title}>View Koi Entries</Typography.Title>
      <Row gutter={[16, 16]}>
        {localKoi.map(koi => (
          <Col key={koi.koiId} span={8}>
            <Card
              hoverable
              cover={<Image alt={koi.koiName} src={koi.imageUrl || 'https://via.placeholder.com/150'} />}
              className={styles.koiCard}
            >
              <Card.Meta title={koi.koiName} description={<p style={{color:'#ffffff'}}><strong>Variety:</strong>{koi.varietyId}</p>} />
              <div className={styles.koiDetails}>
                <p><strong>Owner:</strong> {fullName}</p>
                <p><strong>Size:</strong> {koi.size} cm</p>
                <p><strong>Age:</strong> {koi.age} years</p>
                <p><strong>Status:</strong> {koi.status ? 'Active' : 'Inactive'}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ViewKoiEntries;