import React from 'react';
import { List, Card, Image } from 'antd';

const KoiList = ({ koiEntries }) => {
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={Array.isArray(koiEntries) ? koiEntries : []} // Ensure koiEntries is an array
      renderItem={item => (
        <List.Item>
          <Card title={item.koiName}>
            <Image src={item.imageUrl} alt={item.koiName} width={200} height={200} />
            <p><strong>Variety:</strong> {item.varietyId}</p>
            <p><strong>Size:</strong> {item.size} cm</p>
            <p><strong>Age:</strong> {item.age} years</p>
            <p><strong>Status:</strong> {item.status ? 'Active' : 'Inactive'}</p>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default KoiList;