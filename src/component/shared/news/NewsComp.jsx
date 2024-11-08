import React, { useState, useEffect } from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { List, Space, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../asset/scss/NewsComp.module.scss'; // Adjust the path as necessary

const IconText = ({ icon, text }) => (
  <Space className={styles.iconText}>
    {React.createElement(icon)}
    {text}
  </Space>
);

const NewsComp = ({ theme }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://localhost:7246/api/News');
        setNewsData(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <List
      className={styles.newsList} // Use the custom class for styling
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={newsData}
      footer={<div />}
      style={{ backgroundColor: theme.palette.background.paper }} // Apply background color to the list container
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          style={{ border: `1px solid ${theme.palette.primary.main}`, boxShadow: `0 0 8px ${theme.palette.primary.main}`, backgroundColor: theme.palette.background.paper }} // Apply background color to the list item
        >
          <List.Item.Meta
            title={<a onClick={() => navigate(`/news/${item.newsTypeId}`)} className={styles.title} style={{ color: theme.palette.textTittle.primary }}>{item.title}</a>} // Added custom class for title
            description={<span className={styles.description} style={{ color: theme.palette.text.secondary }}>{item.description}</span>} // Added custom class for description
          />
          <p className={styles.content} style={{ color: theme.palette.text.primary }}>{item.content}</p> {/* Added custom class for content */}
        </List.Item>
      )}
    />
  );
};

export default NewsComp;