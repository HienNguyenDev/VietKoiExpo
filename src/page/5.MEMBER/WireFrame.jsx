import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Tooltip, Progress, Select, Switch, Layout } from 'antd';
import Countdown from 'react-countdown';
import './WireframeCompetitionBracket.css';

const { Option } = Select;
const { Header, Content, Footer } = Layout;

const initialFishData = {
  A: [
    { id: 1, name: 'Koi 1', owner: 'Owner 1', matchTime: Date.now() + 10000, active: true },
    { id: 2, name: 'Koi 2', owner: 'Owner 2', matchTime: Date.now() + 10000, active: true },
    { id: 3, name: 'Koi 3', owner: 'Owner 3', matchTime: Date.now() + 10000, active: true },
    { id: 4, name: 'Koi 4', owner: 'Owner 4', matchTime: Date.now() + 10000, active: true },
    { id: 5, name: 'Koi 5', owner: 'Owner 5', matchTime: Date.now() + 10000, active: true },
    { id: 6, name: 'Koi 6', owner: 'Owner 6', matchTime: Date.now() + 10000, active: true },
    { id: 7, name: 'Koi 7', owner: 'Owner 7', matchTime: Date.now() + 10000, active: true },
    { id: 8, name: 'Koi 8', owner: 'Owner 8', matchTime: Date.now() + 10000, active: true },
  ],
};

const initialFeed = [];

const WireframeCompetitionBracket = () => {
  const [selectedGroup, setSelectedGroup] = useState('A');
  const [fishData, setFishData] = useState(initialFishData[selectedGroup]);
  const [currentMatches, setCurrentMatches] = useState([]);
  const [feed, setFeed] = useState(initialFeed);
  const [completedMatches, setCompletedMatches] = useState(0);
  const [processedMatches, setProcessedMatches] = useState(new Set());
  const [finalResults, setFinalResults] = useState(null);
  const [competitionFinished, setCompetitionFinished] = useState(false);
  const [themeMode, setThemeMode] = useState('light'); // State to store theme mode

  useEffect(() => {
    setFishData(initialFishData[selectedGroup]);
    setCurrentMatches([]);
    setFeed(initialFeed);
    setCompletedMatches(0);
    setProcessedMatches(new Set());
    setFinalResults(null);
    setCompetitionFinished(false);
  }, [selectedGroup]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const ongoingMatches = fishData.filter(fish => fish.matchTime > now && fish.matchTime - now < 5000);
      setCurrentMatches(ongoingMatches);
    }, 1000);

    return () => clearInterval(interval);
  }, [fishData]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const completedMatches = fishData.filter(fish => fish.matchTime <= now && fish.active);

      if (completedMatches.length > 0) {
        const newFeed = [];
        const newFishData = fishData.map(fish => ({ ...fish }));
        const winners = [];
        let matchCounter = feed.length + 1;

        for (let i = 0; i < completedMatches.length; i += 2) {
          const fish1 = completedMatches[i];
          const fish2 = completedMatches[i + 1];

          if (fish1 && fish2 && !processedMatches.has(fish1.id) && !processedMatches.has(fish2.id)) {
            const winner = Math.random() < 0.5 ? fish1 : fish2;
            const matchNumber = matchCounter++; // Increment match counter for each match

            const newMessage = `Match ${matchNumber}: ${fish1.name} vs ${fish2.name} - ${winner.name} wins!`;
            newFeed.push({ id: matchNumber, message: newMessage });

            // Mark both fish as inactive in this round
            newFishData[newFishData.findIndex(fish => fish.id === fish1.id)].active = false;
            newFishData[newFishData.findIndex(fish => fish.id === fish2.id)].active = false;

            // Advance winner to the next round
            winners.push({ ...winner, matchTime: Date.now() + 10000, active: true });
            processedMatches.add(fish1.id);
            processedMatches.add(fish2.id);
          }
        }

        if (winners.length > 1) {
          const nextMatchTime = Date.now() + 10000;

          for (let i = 0; i < winners.length; i++) {
            newFishData.push({
              ...winners[i],
              id: newFishData.length + 1,
              matchTime: nextMatchTime,
              active: true,
            });
          }
        } else if (winners.length === 1) {
          const finalMessage = `Final Winner: ${winners[0].name}`;
          newFeed.push({ id: feed.length + newFeed.length + 1, message: finalMessage });

          setFinalResults([
            { rank: 1, name: winners[0].name, owner: winners[0].owner },
          ]);

          setFeed([...feed, ...newFeed]);
          setFishData([winners[0]]);
          setCompetitionFinished(true);
          return;
        }

        setFeed([...feed, ...newFeed]);
        setFishData(newFishData);
        setCompletedMatches(0); // Reset for the next round
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [feed, fishData, completedMatches, processedMatches]);

  const countdownRenderer = ({ days, hours, minutes, seconds }) => (
    <div>
      <span>{days}d</span> <span>{hours}h</span> <span>{minutes}m</span> <span>{seconds}s</span>
    </div>
  );

  return (
    <Layout className="wireframe-layout" style={{width:'100vw'}}>
      <Header className="wireframe-header">
        <Typography.Title level={2} className="wireframe-title">
          Competition
        </Typography.Title>
        <Switch
          checked={themeMode === 'dark'}
          onChange={(checked) => setThemeMode(checked ? 'dark' : 'light')}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </Header>
      <Content className="wireframe-content">
        <Select defaultValue={selectedGroup} onChange={value => setSelectedGroup(value)} style={{ marginBottom: '20px' }}>
          <Option value="A">Group A</Option>
          <Option value="B">Group B</Option>
        </Select>
        {competitionFinished ? (
          <Typography.Title level={3} className="wireframe-title">The competition is finished</Typography.Title>
        ) : (
          [...new Set(fishData.filter(fish => fish.active).map(fish => fish.matchTime))].map(matchTime => (
            <div key={matchTime}>
              <Typography.Title level={3} className="wireframe-title">Match Time: {new Date(matchTime).toLocaleString()}</Typography.Title>
              <Row gutter={16}>
                {fishData.filter(fish => fish.matchTime === matchTime && fish.active).map((fish, index, array) => {
                  if (index % 2 === 0) {
                    const opponent = array[index + 1];
                    return (
                      <Col key={fish.id} span={12}>
                        <Row gutter={16}>
                          <Col span={12}>
                            <Tooltip title={`Owner: ${fish.owner}`}>
                              <Card className="wireframe-card">
                                <Typography.Text className="wireframe-text">{fish.name}</Typography.Text>
                                <Countdown date={fish.matchTime} renderer={countdownRenderer} />
                              </Card>
                            </Tooltip>
                          </Col>
                          {opponent && (
                            <Col span={12}>
                              <Tooltip title={`Owner: ${opponent.owner}`}>
                                <Card className="wireframe-card">
                                  <Typography.Text className="wireframe-text">{opponent.name}</Typography.Text>
                                  <Countdown date={opponent.matchTime} renderer={countdownRenderer} />
                                </Card>
                              </Tooltip>
                            </Col>
                          )}
                        </Row>
                      </Col>
                    );
                  }
                  return null;
                })}
              </Row>
            </div>
          ))
        )}
        <div style={{ marginTop: '20px' }}>
          <Typography.Title level={2} className="wireframe-title">Round Progress</Typography.Title>
          <Progress percent={(completedMatches / (fishData.length / 2)) * 100} status="active" />
        </div>
        <div style={{ marginTop: '20px' }}>
          <Typography.Title level={2} className="wireframe-title">Live Match Feed</Typography.Title>
          <ul className="wireframe-feed">
            {feed.map(item => (
              <li key={item.id} className="wireframe-feed-item">{item.message}</li>
            ))}
          </ul>
        </div>
        {finalResults && (
          <div style={{ marginTop: '20px' }}>
            <Typography.Title level={2} className="wireframe-title">Final Results</Typography.Title>
            <ul className="wireframe-results">
              {finalResults.map(result => (
                <li key={result.rank} className="wireframe-results-item">
                  {result.rank}. {result.name} (Owner: {result.owner})
                </li>
              ))}
            </ul>
          </div>
        )}
      </Content>
      <Footer className="wireframe-footer">
        <Typography.Text className="wireframe-footer-text">Footer</Typography.Text>
      </Footer>
    </Layout>
  );
};

export default WireframeCompetitionBracket;