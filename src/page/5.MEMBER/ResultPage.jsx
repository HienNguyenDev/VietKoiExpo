// ResultPage.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Table, List, Typography, Card, Spin, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styles from './ResultPage.module.scss';
const { Content, Sider } = Layout;
const { Title } = Typography;

const ResultPage = () => {
  const [results, setResults] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [koiDetails, setKoiDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCompId, setSelectedCompId] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  // Fetch all required data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resultsRes, compsRes] = await Promise.all([
          axios.get('https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Result'),
          axios.get('https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Competition')
        ]);

        setResults(resultsRes.data);
        setCompetitions(compsRes.data);

        // Get unique koi IDs
        const koiIds = [...new Set(resultsRes.data.map(r => r.koiId).filter(id => id))];
        
        // Fetch koi details
        const koiPromises = koiIds.map(id => 
          axios.get(`https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Koifish/${id}`)
        );
        const koiResponses = await Promise.all(koiPromises);
        const koiData = {};
        koiResponses.forEach(res => {
          koiData[res.data.koiId] = res.data;
        });
        setKoiDetails(koiData);

        // Fetch user details for each koi
        const userIds = [...new Set(Object.values(koiData).map(k => k.userId))];
        const userPromises = userIds.map(id =>
          axios.get(`https://vietkoiexpo-backend.hiennguyendev.id.vn/api/User/${id}`)
        );
        const userResponses = await Promise.all(userPromises);
        const userData = {};
        userResponses.forEach(res => {
          userData[res.data.userId] = res.data;
        });
        setUserDetails(userData);

      } catch (error) {
        message.error('Failed to fetch data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Koi Name',
      dataIndex: 'koiId',
      key: 'koiName',
      render: (koiId) => koiDetails[koiId]?.koiId || 'N/A'
    },
    {
      title: 'Owner',
      dataIndex: 'koiId',
      key: 'owner',
      render: (koiId) => {
        const koi = koiDetails[koiId];
        return userDetails[koi?.userId]?.fullName || 'N/A';
      }
    },
    {
      title: 'Score',
      dataIndex: 'resultScore',
      key: 'score',
      sorter: (a, b) => a.resultScore - b.resultScore,
    },
    {
      title: 'Prize',
      dataIndex: 'prize',
      key: 'prize',
      render: (prize) => prize || 'No prize'
    }
  ];

  const filteredResults = selectedCompId
    ? results.filter(r => r.compId === selectedCompId)
    : [];

  return (
    <Layout className={styles.resultPage} style={{ width:'100vw',minHeight: '100vh' }}>
      <Sider width={300} theme="light" style={{ padding: '20px' }}>
        <Title level={4}>Competitions</Title>
        <List
          dataSource={competitions}
          loading={loading}
          renderItem={comp => (
            <List.Item 
              onClick={() => setSelectedCompId(comp.compId)}
              style={{ 
                cursor: 'pointer',
                backgroundColor: selectedCompId === comp.compId ? '#e6f7ff' : 'transparent'
              }}
            >
              <Card title={comp.compName} size="small" style={{ width: '100%' }}>
                <p>{new Date(comp.startDate).toLocaleDateString()} - {new Date(comp.endDate).toLocaleDateString()}</p>
              </Card>
            </List.Item>
          )}
        />
      </Sider>
      <Content style={{ padding: '20px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        ) : selectedCompId ? (
          <>
            <Title level={3}>
              {competitions.find(c => c.compId === selectedCompId)?.compName} Results
            </Title>
            <Table 
              columns={columns}
              dataSource={filteredResults}
              rowKey="resultId"
            />
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Title level={4}>Select a competition to view results</Title>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default ResultPage;