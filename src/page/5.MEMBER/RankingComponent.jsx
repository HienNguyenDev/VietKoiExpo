import React from 'react';
import { Card, Col, Row, List, Avatar, Typography } from 'antd';
import styles from '../../asset/scss/RankingPage.module.scss'; // Custom SCSS file
import { useTheme } from '@mui/material/styles'; // Import useTheme from MUI

const { Text } = Typography;

const RankingComponent = ({ rankingData }) => {
  const theme = useTheme(); // Access the current theme

  return (
    <div className={styles.rankingLayout}>
      <Row gutter={[16, 16]} style={{ marginTop: '20px', borderRadius: '10px', }}>
        <Col span={24}>
          <Card
            title={<span style={{ fontWeight: 'bold', color: theme.palette.textTittle.primary }}>Koi Fish Ranking</span>}
            className={styles.rankingCard}
            style={{ backgroundColor: theme.palette.background.paper, color: theme.palette.textTittle.primary, border: `2px solid ${theme.palette.primary.main}`, boxShadow: `0 0 10px ${theme.palette.primary.main}` }}
          >
            <List
              itemLayout="horizontal"
              dataSource={rankingData}
              renderItem={(item) => (
                <List.Item className={styles.rankingItem}>
                  <List.Item.Meta
                    avatar={<Avatar size={64} src={item.imageUrl} />}
                    title={
                      <Text className={styles.rankText} style={{ color: theme.palette.textTittle.primary }}>
                        #{item.rank} - {item.fishName}
                      </Text>
                    }
                    description={
                      <div className={styles.rankingDetails}>
                        <Text style={{ color: theme.palette.text.secondary }}>Owner: {item.owner}</Text>-
                        <Text style={{ color: theme.palette.text.secondary }}>Score: {item.score}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RankingComponent;