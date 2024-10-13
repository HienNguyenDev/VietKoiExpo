import React, { useState, useEffect } from 'react';
import { Col, Row, List, Typography, Button } from 'antd';
import AccountMenu from '../AccountMenu/AccountMenu';

const NotificationBlock = () => {
  const [showEmails, setShowEmails] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (showEmails) {
      // Fetch notifications (mock data for now)
      setNotifications([
        { id: 1, message: 'Your fish has been approved for the competition.' },
        { id: 2, message: 'Congratulations! Your fish won the first prize in the competition.' },
        { id: 3, message: 'Your fish has been disqualified due to health issues.' },
      ]);
    }
  }, [showEmails]);

  return (
    <div style={{background:'#ffffff'}}>
      <Row>
        <Col span={12} style={{ padding: '20px' }}>
          <AccountMenu />
          <Button type="primary" onClick={() => setShowEmails(!showEmails)}>
            {showEmails ? 'Hide Notifications' : 'Show Notifications'}
          </Button>
          {showEmails && (
            <List
              header={<div>Notifications</div>}
              bordered
              dataSource={notifications}
              renderItem={item => (
                <List.Item key={item.id}>
                  <Typography.Text>{item.message}</Typography.Text>
                </List.Item>
              )}
              style={{ marginTop: '20px' }}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default NotificationBlock;