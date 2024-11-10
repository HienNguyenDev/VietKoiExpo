// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { List, Avatar, Typography, Badge } from 'antd';
// import { fetchNotificationsApi } from '../../store/redux/action/notificationAction'; // Import your action to fetch notifications
// import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
// import styles from './NotificationList.module.scss';

// const NotificationList = () => {
//   const dispatch = useDispatch();
//   const userId = useSelector(state => state.userReducer.userLogin.userId);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       const response = await dispatch(fetchNotificationsApi(userId));
//       setNotifications(response);
//     };

//     fetchNotifications();
//   }, [dispatch, userId]);

//   const renderIcon = (status) => {
//     switch (status) {
//       case 'approved':
//         return <CheckCircleOutlined style={{ color: 'green' }} />;
//       case 'rejected':
//         return <CloseCircleOutlined style={{ color: 'red' }} />;
//       case 'checkin':
//         return <InfoCircleOutlined style={{ color: 'blue' }} />;
//       case 'result':
//         return <CheckCircleOutlined style={{ color: 'gold' }} />;
//       default:
//         return <InfoCircleOutlined />;
//     }
//   };

//   return (
//     <div className={styles.notificationList}>
//       <Typography.Title level={2} className={styles.title}>Notifications</Typography.Title>
//       <List
//         itemLayout="horizontal"
//         dataSource={notifications}
//         renderItem={item => (
//           <List.Item>
//             <List.Item.Meta
//               avatar={<Avatar icon={renderIcon(item.status)} />}
//               title={<Typography.Text>{item.message}</Typography.Text>}
//               description={<Typography.Text type="secondary">{item.date}</Typography.Text>}
//             />
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// export default NotificationList;