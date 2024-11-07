import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Image } from 'antd';
import styles from './ViewKoiEntries.module.scss';

const ViewKoiEntries = () => {
  const [localKoi, setLocalKoi] = useState([]);

  useEffect(() => {
    // Retrieve Koi fish from local storage
    const storedKoi = JSON.parse(localStorage.getItem('koiRegistrations')) || {};
    setLocalKoi(Object.values(storedKoi));
  }, []);

  return (
    <div className={styles.viewKoiEntries}>
      <Typography.Title level={2} className={styles.title}>View Koi Entries</Typography.Title>
      <Row gutter={[16, 16]}>
        {localKoi.map(koi => (
          <Col key={koi.koiId} span={8}>
            <Card
              hoverable
              cover={<Image alt={koi.koiName} src={koi.imageUrl || 'https://via.placeholder.com/150'} />}
              className={styles.koiCard}
            >
              <Card.Meta title={koi.koiName} description={`Variety: ${koi.varietyId}`} />
              <div className={styles.koiDetails}>
                <p><strong>ID:</strong> {koi.koiId}</p>
                <p><strong>User ID:</strong> {koi.userId}</p>
                <p><strong>Size:</strong> {koi.size} cm</p>
                <p><strong>Age:</strong> {koi.age} years</p>
                <p><strong>Status:</strong> {koi.status ? 'Active' : 'Inactive'}</p>
                <p><strong>Competitions:</strong> {koi.competitions.join(', ')}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ViewKoiEntries;