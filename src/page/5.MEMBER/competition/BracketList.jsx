// BracketList.jsx
import React from 'react';
import { List, Button } from 'antd';

const BracketList = ({ brackets, onSelectBracket }) => {
  const handleSelectBracket = (categoryId) => {
    console.log('Selected category ID:', categoryId); // Log the selected category ID
    onSelectBracket(categoryId);
  };

  return (
    <List
      dataSource={Array.isArray(brackets) ? brackets : []} // Ensure brackets is an array
      renderItem={item => (
        <List.Item>
          <Button onClick={() => handleSelectBracket(item.categoryId)}>{item.categoryId}</Button>
        </List.Item>
      )}
    />
  );
};

export default BracketList;