import React, { useState } from 'react';
import { Card, Button, Select, Typography, notification } from 'antd';
import styles from './AdvancementView.module.scss';

const { Option } = Select;

const fishData = [
  { id: 1, name: 'Koi 1', round: 1, status: 'Pending' },
  { id: 2, name: 'Koi 2', round: 1, status: 'Pending' },
  // Add more fish data as needed
];

const AdvancementView = () => {
  const [selectedRound, setSelectedRound] = useState(1);

  const handleApproval = (fishId) => {
    notification.success({
      message: 'Approval Successful',
      description: `Fish ID ${fishId} has been approved for the next round.`,
    });
  };

  return (
    <div className={styles.advancementView}>
      <Typography.Title level={2}>Advancement View</Typography.Title>
      <Select
        defaultValue={selectedRound}
        onChange={value => setSelectedRound(value)}
        className={styles.roundSelect}
      >
        <Option value={1}>Round 1</Option>
        <Option value={2}>Round 2</Option>
        {/* Add more rounds as needed */}
      </Select>
      <div className={styles.fishCards}>
        {fishData.filter(fish => fish.round === selectedRound).map(fish => (
          <Card key={fish.id} className={styles.fishCard}>
            <Typography.Title level={4}>{fish.name}</Typography.Title>
            <Typography.Paragraph>Status: {fish.status}</Typography.Paragraph>
            <Button type="primary" onClick={() => handleApproval(fish.id)}>Approve</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdvancementView;