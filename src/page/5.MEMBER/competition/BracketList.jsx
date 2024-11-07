import React from 'react';
import { List, Typography } from 'antd';

const BracketList = ({ brackets, onSelectBracket }) => {
  return (
    <List
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