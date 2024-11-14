import React, { useState, useEffect } from 'react';
import { List, Spin, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../asset/scss/NewsComp.module.scss';

const NewsComp = ({ theme }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://vietkoiexpo-backend.hiennguyendev.id.vn/api/News', {
          headers: {
            'Content-Type': 'application/json',
          }
        });
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
      className={styles.newsList}
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
      style={{ backgroundColor: theme.palette.background.paper, borderRadius:'30px' }}
      renderItem={(item) => (
        <List.Item
          key={item.newsId}
          className={styles.newsItem}
          style={{ border: `1px solid ${theme.palette.primary.main}`, boxShadow: `0 0 8px ${theme.palette.primary.main}`, backgroundColor: theme.palette.background.paper }}
        >
          <Row>
            <Col span={18}>
              <List.Item.Meta
                title={<a onClick={() => navigate(`/news/${item.newsId}`)} className={styles.title} style={{ color: theme.palette.textTittle.primary }}>{item.title}</a>}
                description={<span className={styles.description} style={{ color: theme.palette.text.secondary }} dangerouslySetInnerHTML={{ __html: item.newsDescription.substring(0, 100) + '...' }} />}
              />
            </Col>
            <Col span={6}>
              <img src={item.imageUrl} alt={item.title} className={styles.newsImage} />
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};

export default NewsComp;