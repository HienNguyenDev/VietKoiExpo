import React from 'react';
import { List, Typography } from 'antd';
import styles from './BracketList.module.scss';

const BracketList = ({ brackets, onSelectBracket }) => {
  return (
    <List
      className={styles.bracketList}
      bordered
      dataSource={brackets}
      renderItem={item => (
        <List.Item onClick={() => onSelectBracket(item.competitionCategoryId)}>
          <Typography.Text>{item.categoryId}</Typography.Text>
        </List.Item>
      )}
    />
  );
};

export default BracketList;