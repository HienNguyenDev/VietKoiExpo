import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button, Typography, Modal, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchAllContests } from '../../store/redux/action/contestAction'; // replace with your actual action

const { Title } = Typography;
const { confirm } = Modal;

const ViewContest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contests = useSelector(state => state.contest.contestList);
  const user = useSelector(state => state.auth.user);
  const [permissionCode, setPermissionCode] = useState('');

  useEffect(() => {
    dispatch(fetchAllContests());
  }, [dispatch]);

  const handleUpdateClick = (contestId) => {
    if (user.role === 'admin') {
      navigate(`/update-contest/${contestId}`);
    } else {
      confirm({
        title: 'Enter Permission Code',
        content: (
          <Input.Password
            placeholder="Permission Code"
            onChange={(e) => setPermissionCode(e.target.value)}
          />
        ),
        onOk() {
          if (permissionCode === 'VALID_CODE') { // Replace with your actual validation logic
            navigate(`/update-contest/${contestId}`);
          } else {
            message.error('Invalid permission code.');
          }
        },
        onCancel() {
          message.info('Update cancelled.');
        },
      });
    }
  };

  return (
    <div>
      <Title level={2}>Contests</Title>
      <List
        bordered
        dataSource={contests}
        renderItem={contest => (
          <List.Item key={contest.id}>
            <Typography.Text>{contest.name}</Typography.Text>
            <Button type="primary" onClick={() => handleUpdateClick(contest.id)}>
              Update
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ViewContest;