import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAllNews } from '../../../store/redux/action/NewsAction';
import NewsContent from './NewsContent';

const NewsPage = () => {
  const { newsTypeId } = useParams();
  const dispatch = useDispatch();
  const newsData = useSelector(state => state.newsReducer.newsList);

  useEffect(() => {
    dispatch(fetchAllNews());
  }, [dispatch]);

  const filteredNews = newsData.filter(news => news.newsTypeId === newsTypeId);

  return (
    <div>
      {filteredNews.map(news => (
        <div key={news.newsId}>
          <h2>{news.title}</h2>
          <img src={news.imageUrl} alt={news.title} />
          <NewsContent content={news.newsDescription} />
        </div>
      ))}
    </div>
  );
};

export default NewsPage;