import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchNewsDetails } from '../../../store/redux/action/NewsAction';
import NewsContent from './NewsContent';

const NewsPage = () => {
  const { newsTypeId } = useParams();
  const dispatch = useDispatch();
  const newsData = useSelector(state => state.newsReducer.news);

  useEffect(() => {
    dispatch(fetchNewsDetails(newsTypeId));
  }, [dispatch, newsTypeId]);

  return (
    <div>
      <h2>{newsData.title}</h2>
      <NewsContent content={newsData.newsDescription} />
    </div>
  );
};

export default NewsPage;