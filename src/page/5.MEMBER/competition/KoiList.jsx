import React from 'react';
import { Card, Row, Col, Typography, Input } from 'antd';
import styles from './KoiList.module.scss';

const KoiList = ({ koiEntries, onScoreChange }) => {
  return (
    <Row gutter={[16, 16]}>
      {koiEntries.map(koi => (
        <Col key={koi.koiId} span={12}>
          <Card
            cover={<img alt={koi.koiName} src={koi.image} />}
            hoverable
            className={styles.koiCard}
          >
            <Typography className={styles.koiName}>{koi.koiName}</Typography>
            <Typography className={styles.koiVariety}>{koi.varietyId}</Typography>
            <Input
              type="number"
              placeholder="Enter score"
              value={koi.score || ''}
              onChange={(e) => onScoreChange(koi.koiId, e.target.value)}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default KoiList;