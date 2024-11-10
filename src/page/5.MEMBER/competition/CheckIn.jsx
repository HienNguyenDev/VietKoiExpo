import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, message, Card, Row, Col } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './KoiListForCompetition.module.scss';

const KoiListForCompetition = () => {
  const { competitionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registeredKoi = useSelector(state => state.RegisterKoiReducer.koiList);
  const registrationList = useSelector(state => state.RegisterKoiReducer.registrationList);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setLoading(true);
    try {
      // Perform any necessary logic here
      message.success('Proceeding to competition page!');
      navigate(`/competitionMatch/${competitionId}`);
    } catch (error) {
      message.error('Failed to proceed.');
      console.error('Error during proceeding:', error);
    } finally {
      setLoading(false);
    }
  };

  const userRegisteredKoi = registrationList.filter(registration => registration.compId === competitionId && registeredKoi.some(koi => koi.koiId === registration.koiId));

  return (
    <div className={styles.koiListPage}>
      <Typography.Title level={2} style={{color:'#00ffcc'}} className={styles.title}>List of Koi for Competition</Typography.Title>
      <Typography.Paragraph className={styles.paragraph}>
        Here is the list of your Koi fish that could compete in the competition.
      </Typography.Paragraph>
      <Row gutter={[16, 16]}>
        {userRegisteredKoi.map(registration => {
          const koi = registeredKoi.find(k => k.koiId === registration.koiId);
          return (
            <Col key={koi.koiId} span={8}>
              <Card title={koi.koiName} bordered={false} className={styles.card}>
                <p><strong>Age:</strong> {koi.age}</p>
                <p><strong>Size:</strong> {koi.size} cm</p>
                <img src={koi.imageUrl} alt={koi.koiName} className={styles.koiImage} />
              </Card>
            </Col>
          );
        })}
      </Row>
      <div className={styles.nextButton}>
        <Button type="primary" onClick={handleNext} loading={loading} className={styles.button}>
          Click to Next
        </Button>
      </div>
    </div>
  );
};

export default KoiListForCompetition;