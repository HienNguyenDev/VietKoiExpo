import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `người dùng số ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    'Staff ',
  content:
    'Cá đẹp vcl. Tuyệt tác nhân loại đấy, đẹp như một bức tranh vẽ bằng mực vàng trên nền giấy xanh. Cá đẹp vcl. Tuyệt tác nhân loại đấy, đẹp như một bức tranh vẽ bằng mực vàng trên nền giấy xanh. Cá đẹp vcl. Tuyệt tác nhân loại đấy, đẹp như một bức tranh vẽ bằng mực vàng trên nền giấy xanh. Cá đẹp vcl. Tuyệt tác nhân loại đấy, đẹp như một bức tranh vẽ bằng mực vàng trên nền giấy xanh. Cá đẹp vcl. Tuyệt tác nhân loại đấy, đẹp như một bức tranh vẽ bằng mực vàng trên nền giấy xanh.',
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
const NewsComp = () => ( <List
  
    style={{overflowY:'scroll',height:'100%'}}
    itemLayout="vertical"
    size="small"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 2,
    }}
    dataSource={data}
    footer={
      <div>
      </div>
    }
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={20}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
);
export default NewsComp;