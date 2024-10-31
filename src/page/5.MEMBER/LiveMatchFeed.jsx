import React from 'react';
import { Typography, List } from 'antd';

const LiveMatchFeed = ({ feed, currentTheme }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Typography style={{ fontWeight: 'bold', color: currentTheme.palette.primary.main }} variant="h3">
        Live Match Feed
      </Typography>
      <List
        bordered
        dataSource={feed}
        renderItem={item => (
          <List.Item style={{ backgroundColor: currentTheme.palette.background.paper }}>
            <Typography style={{ color: currentTheme.palette.primary.main }}>
              Match {item.message.matchNumber}: <span style={{ fontWeight: 'bold' }}>{item.message.fish1Name}</span> vs <span style={{ fontWeight: 'bold' }}>{item.message.fish2Name}</span> - <span style={{ fontWeight: 'bold', color: currentTheme.palette.text.secondary }}>{item.message.winnerName} wins!</span>
            </Typography>
          </List.Item>
        )}
      />
    </div>
  );
};

export default LiveMatchFeed;