import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { List, Space } from 'antd';
import styles from '../../../asset/scss/NewsComp.module.scss'; // Adjust the path as necessary

const data = [
  {
    href: 'https://example.com/news1',
    title: 'Koi Contest Winner Announced!',
    description: 'Winner: Owner 1',
    content: 'The koi fish named "Golden Beauty" has set a new record with a score of 9.8. This fish is a true masterpiece, showcasing vibrant colors and perfect symmetry. It has captivated the judges and audience alike, earning the highest score in the contest. Congratulations to Owner 1 for this remarkable achievement!',
  },
  {
    href: 'https://example.com/news2',
    title: 'New Record in Koi Contest!',
    description: 'Winner: Owner 2',
    content: 'The koi fish named "Silver Stream" has set a new record with a score of 9.7. This fish is known for its stunning silver scales and graceful movements. Owner 2 has done an excellent job in raising this beautiful fish.',
  },
  {
    href: 'https://example.com/news3',
    title: 'Koi Fish "Ruby Red" Shines Bright!',
    description: 'Winner: Owner 3',
    content: 'The koi fish named "Ruby Red" has impressed everyone with a score of 9.6. Its deep red color and perfect form have made it a standout in the contest. Congratulations to Owner 3 for this fantastic achievement!',
  },
  {
    href: 'https://example.com/news4',
    title: 'Spectacular Performance by "Blue Wave"',
    description: 'Winner: Owner 4',
    content: 'The koi fish named "Blue Wave" has set a new record with a score of 9.5. This fish is known for its striking blue color and elegant movements. Owner 4 has done an outstanding job in raising this beautiful fish.',
  },
  {
    href: 'https://example.com/news5',
    title: 'Koi Contest Highlights: "Emerald Green"',
    description: 'Winner: Owner 5',
    content: 'The koi fish named "Emerald Green" has set a new record with a score of 9.4. Its vibrant green color and perfect symmetry have made it a favorite among the judges. Congratulations to Owner 5 for this remarkable achievement!',
  },
  {
    href: 'https://example.com/news6',
    title: 'Stunning Victory for "Sunset Glow"',
    description: 'Winner: Owner 6',
    content: 'The koi fish named "Sunset Glow" has set a new record with a score of 9.3. This fish is known for its beautiful orange and red hues, reminiscent of a sunset. Owner 6 has done an excellent job in raising this stunning fish.',
  },
  {
    href: 'https://example.com/news7',
    title: 'Koi Fish "Midnight Star" Takes the Lead!',
    description: 'Winner: Owner 7',
    content: 'The koi fish named "Midnight Star" has set a new record with a score of 9.2. Its deep black color and perfect form have made it a standout in the contest. Congratulations to Owner 7 for this fantastic achievement!',
  },
  {
    href: 'https://example.com/news8',
    title: 'Impressive Performance by "Golden Sun"',
    description: 'Winner: Owner 8',
    content: 'The koi fish named "Golden Sun" has set a new record with a score of 9.1. This fish is known for its bright yellow color and graceful movements. Owner 8 has done an outstanding job in raising this beautiful fish.',
  },
  {
    href: 'https://example.com/news9',
    title: 'Koi Contest Highlights: "Crystal Clear"',
    description: 'Winner: Owner 9',
    content: 'The koi fish named "Crystal Clear" has set a new record with a score of 9.0. Its pristine white color and perfect symmetry have made it a favorite among the judges. Congratulations to Owner 9 for this remarkable achievement!',
  },
  {
    href: 'https://example.com/news10',
    title: 'Spectacular Victory for "Ocean Blue"',
    description: 'Winner: Owner 10',
    content: 'The koi fish named "Ocean Blue" has set a new record with a score of 8.9. This fish is known for its stunning blue color and elegant movements. Owner 10 has done an excellent job in raising this beautiful fish.',
  },
];

const IconText = ({ icon, text }) => (
  <Space className={styles.iconText}>
    {React.createElement(icon)}
    {text}
  </Space>
);

const NewsComp = ({ theme }) => (
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
    dataSource={data}
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
          title={<a href={item.href} className={styles.title} style={{ color: theme.palette.textTittle.primary }}>{item.title}</a>} // Added custom class for title
          description={<span className={styles.description} style={{ color: theme.palette.text.secondary }}>{item.description}</span>} // Added custom class for description
        />
        <p className={styles.content} style={{ color: theme.palette.text.primary }}>{item.content}</p> {/* Added custom class for content */}
      </List.Item>
    )}
  />
);

export default NewsComp;