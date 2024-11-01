import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Tooltip, Progress, Select, Switch, Layout, Button } from 'antd';
import Countdown from 'react-countdown';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import RankingTable from './RankingTable';
import LiveMatchFeed from './LiveMatchFeed.jsx';

const { Option } = Select;

const initialFishData = {
  A: [
    { id: 1, name: 'Koi 1', owner: 'Owner 1', image: 'koi1.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 2, name: 'Koi 2', owner: 'Owner 2', image: 'koi2.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 3, name: 'Koi 3', owner: 'Owner 3', image: 'koi3.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 4, name: 'Koi 4', owner: 'Owner 4', image: 'koi4.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 5, name: 'Koi 5', owner: 'Owner 5', image: 'koi5.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 6, name: 'Koi 6', owner: 'Owner 6', image: 'koi6.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 7, name: 'Koi 7', owner: 'Owner 7', image: 'koi7.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 8, name: 'Koi 8', owner: 'Owner 8', image: 'koi8.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 9, name: 'Koi 9', owner: 'Owner 9', image: 'koi9.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 10, name: 'Koi 10', owner: 'Owner 10', image: 'koi10.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 11, name: 'Koi 11', owner: 'Owner 11', image: 'koi11.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 12, name: 'Koi 12', owner: 'Owner 12', image: 'koi12.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 13, name: 'Koi 13', owner: 'Owner 13', image: 'koi13.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 14, name: 'Koi 14', owner: 'Owner 14', image: 'koi14.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 15, name: 'Koi 15', owner: 'Owner 15', image: 'koi15.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 16, name: 'Koi 16', owner: 'Owner 16', image: 'koi16.jpg', matchTime: Date.now() + 10000, active: true },
  ],
  B: [
    { id: 17, name: 'Koi 17', owner: 'Owner 17', image: 'koi17.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 18, name: 'Koi 18', owner: 'Owner 18', image: 'koi18.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 19, name: 'Koi 19', owner: 'Owner 19', image: 'koi19.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 20, name: 'Koi 20', owner: 'Owner 20', image: 'koi20.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 21, name: 'Koi 21', owner: 'Owner 21', image: 'koi21.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 22, name: 'Koi 22', owner: 'Owner 22', image: 'koi22.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 23, name: 'Koi 23', owner: 'Owner 23', image: 'koi23.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 24, name: 'Koi 24', owner: 'Owner 24', image: 'koi24.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 25, name: 'Koi 25', owner: 'Owner 25', image: 'koi25.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 26, name: 'Koi 26', owner: 'Owner 26', image: 'koi26.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 27, name: 'Koi 27', owner: 'Owner 27', image: 'koi27.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 28, name: 'Koi 28', owner: 'Owner 28', image: 'koi28.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 29, name: 'Koi 29', owner: 'Owner 29', image: 'koi29.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 30, name: 'Koi 30', owner: 'Owner 30', image: 'koi30.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 31, name: 'Koi 31', owner: 'Owner 31', image: 'koi31.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 32, name: 'Koi 32', owner: 'Owner 32', image: 'koi32.jpg', matchTime: Date.now() + 10000, active: true },
  ],
  C: [
    { id: 33, name: 'Koi 33', owner: 'Owner 33', image: 'koi33.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 34, name: 'Koi 34', owner: 'Owner 34', image: 'koi34.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 35, name: 'Koi 35', owner: 'Owner 35', image: 'koi35.jpg', matchTime: Date.now() + 10000, active: true },
    { id: 36, name: 'Koi 36', owner: 'Owner 36', image: 'koi36.jpg', matchTime: Date.now() + 10000, active: true },
  ],
};


const CompetitionBracket = () => {
  const [selectedGroup, setSelectedGroup] = useState('A');
  const [fishData, setFishData] = useState(initialFishData[selectedGroup]);
  const [currentMatches, setCurrentMatches] = useState([]);
  const [feed, setFeed] = useState([]);
  const [completedMatches, setCompletedMatches] = useState(0);
  const [processedMatches, setProcessedMatches] = useState(new Set());
  const [finalResults, setFinalResults] = useState(null);
  const [competitionFinished, setCompetitionFinished] = useState(false);
  const [themeMode, setThemeMode] = useState('light');
  const [competitionStartTime, setCompetitionStartTime] = useState(Date.now() + 10000);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  const groupOrder = ['A', 'B', 'C'];

  useEffect(() => {
    // Xử lý logic khi đến giờ bắt đầu
    if (Date.now() >= competitionStartTime) {
      setFishData(initialFishData[groupOrder[currentGroupIndex]]);
      setFeed([]);
      setCompletedMatches(0);
      setProcessedMatches(new Set());
      setFinalResults(null);
      setCompetitionFinished(false);
    }
  }, [competitionStartTime, currentGroupIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const ongoingMatches = fishData.filter(fish => fish.matchTime > now && fish.matchTime - now < 5000);
      setCurrentMatches(ongoingMatches);
    }, 1000);
    return () => clearInterval(interval);
  }, [fishData]);

  const countdownRenderer = ({ days, hours, minutes, seconds }) => (
    <div style={{ color: themeMode === 'light' ? '#000' : '#fff' }}>
      <span>{days}d</span> <span>{hours}h</span> <span>{minutes}m</span> <span>{seconds}s</span>
    </div>
  );

  const handleGroupCompletion = () => {
    if (currentGroupIndex < groupOrder.length - 1) {
      setCurrentGroupIndex(currentGroupIndex + 1);
    } else {
      setCompetitionFinished(true);
    }
  };

  const currentTheme = createTheme({
    palette: {
      mode: themeMode,
      primary: { main: themeMode === 'dark' ? '#00ffcc' : '#ff6f61' },
      background: { default: themeMode === 'dark' ? '#141414' : '#f7f9fc' },
    },
  });

  return (
    <ThemeProvider theme={currentTheme}>
    <CssBaseline />
    <Layout style={{ width: '100vw', backgroundColor: currentTheme.palette.background.default, padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Typography style={{ fontWeight: 'bold', color: currentTheme.palette.primary.main, textAlign: 'center' }} variant="h2">
          Koi Fish Competition
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Switch
            checked={themeMode === 'dark'}
            onChange={checked => setThemeMode(checked ? 'dark' : 'light')}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </div>
        {Date.now() < competitionStartTime ? (
          <div style={{ textAlign: 'center' }}>
            <Typography style={{ fontWeight: 'bold' }}>Chưa đến giờ</Typography>
            <Countdown date={competitionStartTime} renderer={countdownRenderer} />
          </div>
        ) : competitionFinished ? (
          <Typography style={{ fontWeight: 'bold', color: currentTheme.palette.primary.main, textAlign: 'center' }} variant="h3">
            Cuộc thi đã hoàn thành
          </Typography>
        ) : (
          <>
            <Typography variant="h3" style={{ color: currentTheme.palette.primary.main, textAlign: 'center', marginBottom: '20px' }}>
              Bảng thi đấu hiện tại: {groupOrder[currentGroupIndex]}
            </Typography>
            <Row gutter={16}>
              {fishData.filter(fish => fish.active).map(fish => (
                <Col key={fish.id} span={6}>
                  <Tooltip title={`Owner: ${fish.owner}`}>
                    <Card
                      cover={<img alt={fish.name} src={fish.image} />}
                      hoverable
                      style={{ marginBottom: '20px', borderRadius: '10px', overflow: 'hidden' }}
                    >
                      <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>{fish.name}</Typography>
                    </Card>
                  </Tooltip>
                </Col>
              ))}
            </Row>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Button type="primary" onClick={handleGroupCompletion}>
                Hoàn tất bảng đấu
              </Button>
            </div>
            <Progress percent={(completedMatches / (fishData.length / 2)) * 100} status="active" />
          </>
        )}
        {finalResults && (
          <div style={{ marginTop: '20px' }}>
            <Typography variant="h2" style={{ textAlign: 'center' }}>Kết quả cuối cùng</Typography>
            <RankingTable data={finalResults} theme={currentTheme} />
          </div>
        )}
        <LiveMatchFeed feed={feed} currentTheme={currentTheme} />
      </div>
    </Layout>
  </ThemeProvider>
  );
};

export default CompetitionBracket;
