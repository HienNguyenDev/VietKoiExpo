import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, message, Card, Row, Col, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './KoiListForCompetition.module.scss';

const KoiListForCompetition = () => {
  const { competitionId } = useParams();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userReducer.userLogin.userId);
  const [koiData, setKoiData] = useState([]);
  const [checkInData, setCheckInData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Koi data for user
        const koiResponse = await axios.get(
          `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Koifish/user/${userId}`
        );
        setKoiData(koiResponse.data);

        // Fetch check-in data for the competition
        const checkInResponse = await axios.get(
          `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/CheckIn/competition/${competitionId}`
        );
        setCheckInData(checkInResponse.data);
      } catch (error) {
        message.error('Lỗi khi tải dữ liệu, vui lòng thử lại!');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, competitionId]);

  const handleNext = () => {
    setLoading(true);
    try {
      message.success('Proceeding to competition page!');
      navigate(`/competitionMatch/${competitionId}`);
    } catch (error) {
      message.error('Failed to proceed.');
      console.error('Error during proceeding:', error);
    } finally {
      setLoading(false);
    }
  };

  const userCheckedInKoi = checkInData.filter(
    (checkIn) =>
      checkIn.status === 1 && // Only include approved check-ins
      koiData.some((koi) => koi.koiId === checkIn.koiId)
  );

  return (
    <div className={styles.koiListPage}>
      <Typography.Title level={2} style={{ color: '#00ffcc' }} className={styles.title}>
        List of Koi for Competition
      </Typography.Title>
      <Typography.Paragraph className={styles.paragraph}>
        Here is the list of your Koi fish that could compete in the competition.
      </Typography.Paragraph>
      {loading ? (
        <Spin tip="Đang tải dữ liệu..." />
      ) : (
        <Row gutter={[16, 16]}>
          {userCheckedInKoi.map((checkIn) => {
            const koi = koiData.find((k) => k.koiId === checkIn.koiId);
            return (
              <Col key={koi.koiId} span={8}>
                <Card title={koi.koiName} bordered={false} className={styles.card}>
                  <p>
                    <strong>Age:</strong> {koi.age}
                  </p>
                  <p>
                    <strong>Size:</strong> {koi.size} cm
                  </p>
                  <img src={koi.imageUrl} alt={koi.koiName} className={styles.koiImage} />
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
      <div className={styles.nextButton}>
        <Button type="primary" onClick={handleNext} loading={loading} className={styles.button}>
          Click to Next
        </Button>
      </div>
    </div>
  );
};

export default KoiListForCompetition;