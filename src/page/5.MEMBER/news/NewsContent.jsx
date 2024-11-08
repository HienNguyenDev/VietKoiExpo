import React from 'react';

const NewsContent = ({ content }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default NewsContent;