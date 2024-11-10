import React, { useState, useEffect } from 'react';
import { List, Spin, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../asset/scss/NewsComp.module.scss'; // Adjust the path as necessary

const NewsComp = ({ theme }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userMap, setUserMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://localhost:7246/api/News');
        const news = response.data;

        // Fetch user details for each news item
        const userIds = [...new Set(news.map(item => item.userId))];
        const userResponses = await Promise.all(userIds.map(id => axios.get(`https://localhost:7246/api/User/${id}`)));
        const users = userResponses.map(res => res.data);

        // Create a map of userId to userName
        const userMap = users.reduce((acc, user) => {
          acc[user.userId] = user.fullName;
          return acc;
        }, {});

        setUserMap(userMap);
        setNewsData(news);
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
        pageSize: 5,
      }}
      dataSource={newsData}
      footer={<div />}
      style={{ backgroundColor: theme.palette.background.paper,borderRadius:'30px' }} // Apply background color to the list container
      renderItem={(item) => (
        <List.Item
          key={item.newsId}
          className={styles.newsItem} // Use the custom class for styling
          style={{ border: `1px solid ${theme.palette.primary.main}`, boxShadow: `0 0 8px ${theme.palette.primary.main}`, backgroundColor: theme.palette.background.paper }} // Apply background color to the list item
        >
          <Row>
            <Col span={18}>
              <List.Item.Meta
                title={<a onClick={() => navigate(`/news/${item.newsId}`)} className={styles.title} style={{ color: theme.palette.textTittle.primary }}>{item.title}</a>} // Added custom class for title
                description={<span className={styles.description} style={{ color: theme.palette.text.secondary }} dangerouslySetInnerHTML={{ __html: item.newsDescription.substring(0, 100) + '...' }} />} // Added custom class for description and truncated text
              />
              <div className={styles.content} style={{ color: theme.palette.text.primary }}>
                {userMap[item.userId] || 'Unknown Author'}
              </div> {/* Display author's name */}
            </Col>
            <Col span={6}>
              <img src={item.imageUrl} alt={item.title} className={styles.newsImage} /> {/* Added image */}
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};

export default NewsComp;