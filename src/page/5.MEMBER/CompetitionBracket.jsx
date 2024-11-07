import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Tooltip, Progress, Switch, Layout, Button, message, Input, Modal } from 'antd';
import Countdown from 'react-countdown';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import RankingTable from './RankingTable';
import LiveMatchFeed from './LiveMatchFeed.jsx';
import styles from './CompetitionBracket.module.scss';

const CompetitionBracket = () => {
  const { compId } = useParams();
  const [competition, setCompetition] = useState(null);
  const [koiEntries, setKoiEntries] = useState([]);
  const [currentMatches, setCurrentMatches] = useState([]);
  const [feed, setFeed] = useState([]);
  const [completedMatches, setCompletedMatches] = useState(0);
  const [processedMatches, setProcessedMatches] = useState(new Set());
  const [finalResults, setFinalResults] = useState(null);
  const [competitionFinished, setCompetitionFinished] = useState(false);
  const [themeMode, setThemeMode] = useState('light');
  const [competitionStartTime, setCompetitionStartTime] = useState(Date.now() + 10000);
  const [winner, setWinner] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Fetch competition details and participants from local storage
    const fetchCompetitionDetails = () => {
      const competitions = JSON.parse(localStorage.getItem('competitions')) || [];
      const selectedCompetition = competitions.find(comp => comp.compId === compId);
      setCompetition(selectedCompetition);

      const storedKoi = JSON.parse(localStorage.getItem('koiRegistrations')) || {};
      const localKoiEntries = Object.values(storedKoi).filter(koi => koi.competitions.includes(compId));
      setKoiEntries(localKoiEntries);
    };

    fetchCompetitionDetails();

    // Listen for changes in localStorage
    const handleStorageChange = (event) => {
      if (event.key === 'competitionStatusUpdate') {
        fetchCompetitionDetails();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [compId]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const ongoingMatches = koiEntries.filter(koi => koi.matchTime > now && koi.matchTime - now < 5000);
      setCurrentMatches(ongoingMatches);
    }, 1000);
    return () => clearInterval(interval);
  }, [koiEntries]);

  const countdownRenderer = ({ days, hours, minutes, seconds }) => (
    <div className={styles.countdown}>
      <span>{days}d</span> <span>{hours}h</span> <span>{minutes}m</span> <span>{seconds}s</span>
    </div>
  );

  const handleGroupCompletion = () => {
    setCompetitionFinished(true);
    setIsModalVisible(true);
  };

  const handleScoreChange = (id, newScore) => {
    setKoiEntries(entries => entries.map(entry =>
      entry.koiId === id ? { ...entry, score: newScore } : entry
    ));

    // Update local storage
    const storedKoi = JSON.parse(localStorage.getItem('koiRegistrations')) || {};
    if (storedKoi[id]) {
      storedKoi[id].score = newScore;
      localStorage.setItem('koiRegistrations', JSON.stringify(storedKoi));
    }

    message.success('Score updated successfully!');
  };

  const handleSelectWinner = () => {
    const highestScoreKoi = koiEntries.reduce((max, koi) => (koi.score > max.score ? koi : max), koiEntries[0]);
    setWinner(highestScoreKoi);
    setIsModalVisible(false);
    message.success(`Winner selected: ${highestScoreKoi.koiName}`);
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
          <Typography className={styles.title} variant="h2">
            Koi Fish Competition
          </Typography>
          <div className={styles.themeSwitch}>
            <Switch
              checked={themeMode === 'dark'}
              onChange={checked => setThemeMode(checked ? 'dark' : 'light')}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
          </div>
          {Date.now() < competitionStartTime ? (
            <div className={styles.centered}>
              <Typography className={styles.waitMessage}>Vui lòng chờ trong giây lát</Typography>
              <Countdown date={competitionStartTime} renderer={countdownRenderer} />
            </div>
          ) : competition?.status === 2 ? (
            <div className={styles.centered}>
              <Typography className={styles.finishedMessage} variant="h3">
                Cuộc thi đã kết thúc
              </Typography>
              <Link to={`/results/${compId}`}>
                <Button type="primary" className={styles.dashboardButton}>
                  Xem Dashboard
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Typography className={styles.competitionName} variant="h3">
                {competition?.compName}
              </Typography>
              <Row gutter={[16, 16]}>
                {koiEntries.map(koi => (
                  <Col key={koi.koiId} span={12}>
                    <Tooltip title={`Owner: ${koi.owner}`}>
                      <Card
                        cover={<img alt={koi.koiName} src={koi.image} />}
                        hoverable
                        className={styles.koiCard}
                      >
                        <Typography className={styles.koiName}>{koi.koiName}</Typography>
                        <Typography className={styles.koiVariety}>{koi.varietyId}</Typography>
                        <Input
                          type="number"
                          placeholder="Enter score"
                          value={koi.score || ''}
                          onChange={(e) => handleScoreChange(koi.koiId, e.target.value)}
                          disabled // Disable input for users
                        />
                      </Card>
                    </Tooltip>
                  </Col>
                ))}
              </Row>
              <div className={styles.centered}>
                <Button type="primary" onClick={handleGroupCompletion} disabled>
                  Hoàn tất bảng đấu
                </Button>
              </div>
              <Progress className={styles.progress} percent={(completedMatches / (koiEntries.length / 2)) * 100} status="active" />
            </>
          )}
          {finalResults && (
            <div className={styles.finalResults}>
              <Typography variant="h2" className={styles.finalResultsTitle}>Kết quả cuối cùng</Typography>
              <RankingTable data={finalResults} theme={currentTheme} />
            </div>
          )}
          <LiveMatchFeed feed={feed} currentTheme={currentTheme} />
        </div>
      </Layout>
      <Modal
        title="Select Winner"
        visible={isModalVisible}
        onOk={handleSelectWinner}
        onCancel={() => setIsModalVisible(false)}
      >
        <Typography>Select the highest scoring Koi as the winner.</Typography>
      </Modal>
    </ThemeProvider>
  );
};

export default CompetitionBracket;