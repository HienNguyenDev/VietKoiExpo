// src/components/PredictionComp/PredictionComp.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Pagination, Form } from 'react-bootstrap';
import './PredictionComp.scss';

const ITEMS_PER_PAGE = 24;

const SCORE_FILTERS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Điểm Cao (≥8)', value: 'high' },
  { label: 'Điểm Trung Bình (5-7)', value: 'medium' },
  { label: 'Điểm Thấp (<5)', value: 'low' }
];

// Update getScoreColor function
const getScoreColor = (score) => {
  if (score >= 8) return 'success';
  if (score >= 5) return 'warning';
  return 'danger';
};


const PredictionComp = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scoreFilter, setScoreFilter] = useState('all');
  const [koiDetails, setKoiDetails] = useState({});

  const [users, setUsers] = useState([]);
  const [compDetails, setCompDetails] = useState([]);

  useEffect(() => {
    fetchPredictions();
  }, []);


  useEffect(() => {
    const fetchAllKoiDetails = async () => {
      const uniqueKoiIds = [...new Set(predictions.map(p => p.koiId).filter(Boolean))];
      await Promise.all(uniqueKoiIds.map(fetchKoiDetails));
    };
    
    if (predictions.length > 0) {
      fetchAllKoiDetails();
    }
  }, [predictions]);

  useEffect(() => {
    setCurrentPage(1);
  }, [scoreFilter]);
  useEffect(() => {
    fetchUsers();
    fetchCompDetails();
  }, []);

  const fetchCompDetails = async () => {
    try {
        const response = await fetch('https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Competition');
        const data = await response.json();
        setCompDetails(data);
      } catch (err) {
        console.error('Error fetching comp', err);
      }
  }

  // Add users fetch function
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://vietkoiexpo-backend.hiennguyendev.id.vn/api/User');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };
  const fetchPredictions = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Registration/Predict');
      const data = await response.json();
      setPredictions(data.sort((a, b) => b.predictedScore - a.predictedScore));
    } catch (err) {
      setError('Không thể tải dự đoán. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const fetchKoiDetails = async (koiId) => {
    try {
      const response = await fetch(`https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Koifish/${koiId}`);
      const data = await response.json();
      setKoiDetails(prev => ({
        ...prev,
        [koiId]: data
      }));
    } catch (err) {
      console.error(`Error fetching koi details for ${koiId}:`, err);
    }
  };



  const getFilteredPredictions = () => {
    return predictions.filter(prediction => {
      switch(scoreFilter) {
        case 'high':
          return prediction.predictedScore >= 8;
        case 'medium':
          return prediction.predictedScore >= 5 && prediction.predictedScore < 8;
        case 'low':
          return prediction.predictedScore < 5;
        default:
          return true;
      }
    });
  };

  const filteredPredictions = getFilteredPredictions();
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredPredictions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPredictions.length / ITEMS_PER_PAGE);

  if (loading) return (
    <div className="text-center p-5">
      <Spinner animation="border" variant="primary" />
      <p>Đang tải dự đoán...</p>
    </div>
  );

  if (error) return <div className="text-center text-danger p-5">{error}</div>;

  

  // Add helper function to get user name
  const getUserName = (userId) => {
    const user = users.find(u => u.userId === userId);
    return user ? user.fullName : userId;
  };

  const getCompName = (compId) => {
    const comp = compDetails.find(c => c.compId === compId);
    return comp ? comp.compName : compId;
  }


  return (
    <section className="prediction-section py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Dự Đoán Điểm Số</h2>
          <Form.Select 
            style={{ width: 'auto' }}
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value)}
          >
            {SCORE_FILTERS.map(filter => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </Form.Select>
        </div>

        <Row>
          {currentItems.map((prediction) => (
            <Col key={prediction.predictionId} lg={4} md={6} className="mb-4">
              <Card className="prediction-card h-100">
                <Card.Body>
                  <div className="score-badge">
                    <Badge bg={getScoreColor(prediction.predictedScore)}>
                      {prediction.predictedScore}/10
                    </Badge>
                  </div>
                  <Card.Title className="mb-3">Mã Dự Đoán: {prediction.predictionId.slice(0,8)}...</Card.Title>
                  
                  {prediction.koiId && koiDetails[prediction.koiId] ? (
                    <>
                      <div style={{height:'450px'}} className="koi-image-container mb-6">
                        <img 
                          src={koiDetails[prediction.koiId].imageUrl} 
                          alt="Koi fish"
                          className="koi-image img-fluid rounded"
                        />
                      </div>
                      <Card.Text>
                        <p><strong>Tên cá:</strong> {koiDetails[prediction.koiId].koiName}</p>
                        <p><strong>Kích thước:</strong> {koiDetails[prediction.koiId].size}cm</p>
                        <p><strong>Tuổi:</strong> {koiDetails[prediction.koiId].age} tuổi</p>
                        <p><strong>Tên cuộc thi: </strong>{getCompName(prediction.compId)}</p> 
                        <p>
                
                        </p>
                      </Card.Text>
                    </>
                  ) : (
                    <Card.Text>
                      <p><strong>Mã Cá Koi:</strong> {prediction.koiId || 'Chưa xác định'}</p>
                      <p><strong>Mã Cuộc Thi:</strong> {prediction.compId}</p>
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </div>
      </Container>
    </section>
  );
};

export default PredictionComp;