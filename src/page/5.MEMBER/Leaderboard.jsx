import React, { useState } from 'react';
import { Table, Input, Switch, Typography } from 'antd';
import styles from './Leaderboard.module.scss';

const { Search } = Input;

const fishData = [
  { id: 1, name: 'Koi 1', score: 95, owner: 'Owner 1', rank: 1 },
  { id: 2, name: 'Koi 2', score: 90, owner: 'Owner 2', rank: 2 },
  // Add more fish data as needed
];

const Leaderboard = () => {
  const [viewMode, setViewMode] = useState('score');

  const columns = [
    { title: 'Rank', dataIndex: 'rank', key: 'rank' },
    { title: 'Fish Name', dataIndex: 'name', key: 'name' },
    { title: 'Score/Votes', dataIndex: 'score', key: 'score' },
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
  ];

  return (
    <div className={styles.leaderboard}>
      <Typography.Title level={2}>Leaderboard</Typography.Title>
      <Search placeholder="Search by fish name or owner" className={styles.searchBar} />
      <Switch
        checkedChildren="Score"
        unCheckedChildren="Votes"
        onChange={checked => setViewMode(checked ? 'score' : 'votes')}
        className={styles.viewToggle}
      />
      <Table
        dataSource={fishData}
        columns={columns}
        rowKey="id"
        className={styles.table}
        pagination={false}
      />
    </div>
  );
};

export default Leaderboard;