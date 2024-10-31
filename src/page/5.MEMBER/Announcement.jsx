import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col } from 'antd';
import styles from './Announcement.module.scss';

const Announcement = () => {
  const [winningFish, setWinningFish] = useState([]);

  useEffect(() => {
    // Fetch winning fish data
    const fetchWinningFish = async () => {
      // Simulate fetching data
      const data = [
        { id: 1, name: 'Koi 1', image: 'koi1.jpg', class: 'A', rank: 1 },
        { id: 2, name: 'Koi 2', image: 'koi2.jpg', class: 'B', rank: 1 },
        { id: 3, name: 'Koi 3', image: 'koi3.jpg', class: 'A', rank: 2 },
        { id: 4, name: 'Koi 4', image: 'koi4.jpg', class: 'B', rank: 2 },
      ];
      setWinningFish(data);
    };

    fetchWinningFish();
  }, []);

  return (
    <div className={styles.announcement}>
      <Typography.Title level={2}>Announcement</Typography.Title>
      <Typography.Paragraph>
        Highlighting the winning fish and showcasing relevant details.
      </Typography.Paragraph>
      <Row gutter={16}>
        {winningFish.map((fish) => (
          <Col key={fish.id} span={6}>
            <Card
              hoverable
              cover={<img alt={fish.name} src={fish.image} />}
            >
              <Card.Meta title={`${fish.name} (Class: ${fish.class})`} description={`Rank: ${fish.rank}`} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Announcement;