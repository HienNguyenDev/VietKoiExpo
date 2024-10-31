  import React, { useEffect, useState } from 'react';
  import { Card, Row, Col, Typography, Tooltip, Progress, Select, Switch, Layout } from 'antd';
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
    C:[
      {id:33, name: 'Koi 33', owner: 'Owner 33', image: 'koi33.jpg', matchTime: Date.now() + 10000, active: true},
      {id:34, name: 'Koi 34', owner: 'Owner 34', image: 'koi34.jpg', matchTime: Date.now() + 10000, active: true},
      {id:35, name: 'Koi 35', owner: 'Owner 35', image: 'koi35.jpg', matchTime: Date.now() + 10000, active: true},
      {id:36, name: 'Koi 36', owner: 'Owner 36', image: 'koi36.jpg', matchTime: Date.now() + 10000, active: true},
      
    ]
  };

  const initialFeed = [];

  // const shuffleArray = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // };


  const CompetitionBracket = () => {
    const [selectedGroup, setSelectedGroup] = useState('A');
    const [fishData, setFishData] = useState(initialFishData[selectedGroup]);
    const [currentMatches, setCurrentMatches] = useState([]);
    const [feed, setFeed] = useState(initialFeed);
    const [completedMatches, setCompletedMatches] = useState(0);
    const [processedMatches, setProcessedMatches] = useState(new Set());
    const [finalResults, setFinalResults] = useState(null);
    const [competitionFinished, setCompetitionFinished] = useState(false);
    const [lastEliminated, setLastEliminated] = useState([]);
    const [themeMode, setThemeMode] = useState('light'); // State to store theme mode
    const lightTheme = createTheme({
      palette: {
        mode: 'light',
        primary: {
          main: '#ff6f61', // Pastel Coral
        },
        background: {
          default: '#f7f9fc', // Light pastel blue background
          paper: '#ffffff', // White card background
        },
        text: {
          primary: '#333333', // Dark gray for primary text
          secondary: '#555555', // Medium gray for secondary text
          title: '#ff6f61', // Pastel Coral for titles
        },
      },
      components: {
        MuiTypography: {
          styleOverrides: {
            h2: {
              color: '#ff6f61', // Pastel Coral for h2 titles
              textAlign: 'center',
            },
            h3: {
              color: '#333333', // Dark gray for h3 subtitles
            },
            body1: {
              color: '#333333', // Body text color
            },
            body2: {
              color: '#555555', // Slightly lighter gray for body text
            },
          },
        },
        MuiSelect: {
          styleOverrides: {
            root: {
              borderColor: '#ff6f61', // Pastel Coral border for select
            },
          },
        },
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              backgroundColor: '#ff6f61', // Pastel Coral background for tooltip
              color: '#ffffff', // White text for tooltip
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: '10px', // Rounded edges for a modern look
              border: '2px solid #ff6f61', // Pastel Coral border
              boxShadow: '0 0 10px rgba(255, 111, 97, 0.5)', // Soft shadow
            },
          },
        },
      },
    });
    
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#00ffcc', // Neon cyan for primary elements
        },
        background: {
          default: '#141414', // Darker background for neon contrast
          paper: '#1c1c1c', // Dark card background
        },
        text: {
          primary: '#ffffff', // White for primary text
          secondary: '#ff00ff', // Neon magenta for secondary text
          title: '#00ffcc', // Neon cyan for titles
        },
      },
      components: {
        MuiTypography: {
          styleOverrides: {
            h2: {
              color: '#00ffcc', // Neon cyan for h2 titles
              textAlign: 'center',
            },
            h3: {
              color: '#ffffff', // White for h3 subtitles
            },
            body1: {
              color: '#ffffff', // White for body text
            },
            body2: {
              color: '#ff00ff', // Neon magenta for secondary body text
            },
          },
        },
        MuiSelect: {
          styleOverrides: {
            root: {
              borderColor: '#00ffcc', // Neon cyan border for select
            },
          },
        },
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              backgroundColor: '#00ffcc', // Neon cyan background for tooltip
              color: '#000000', // Black text for tooltip
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: '10px', // Rounded edges for a modern look
              border: '2px solid #00ffcc', // Neon cyan border
              boxShadow: '0 0 10px rgba(0, 255, 204, 0.5)', // Soft shadow
            },
          },
        },
      },
    });
    
    
    // Function to toggle theme
    const handleThemeChange = (checked) => {
      setThemeMode(checked ? 'dark' : 'light');
    };

    // Select theme based on light or dark mode
    const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

    useEffect(() => {
      setFishData(initialFishData[selectedGroup]);
      setCurrentMatches([]);
      setFeed(initialFeed);
      setCompletedMatches(0);
      setProcessedMatches(new Set());
      setFinalResults(null);
      setCompetitionFinished(false);
      setLastEliminated([]);
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
  
              const newMessage = createMatchMessage(matchNumber, fish1, fish2, winner);
              newFeed.push({ id: matchNumber, message: newMessage });
  
              // Mark both fish as inactive in this round
              newFishData[newFishData.findIndex(fish => fish.id === fish1.id)].active = false;
              newFishData[newFishData.findIndex(fish => fish.id === fish2.id)].active = false;
  
              // Track last eliminated fish
              setLastEliminated(prev => [...prev, fish1.id === winner.id ? fish2 : fish1]);
  
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
            const finalMessage = createMatchMessage(matchCounter, winners[0], null, winners[0]);
            newFeed.push({ id: feed.length + newFeed.length + 1, message: finalMessage });
  
            // Determine 2nd and tied 3rd places
            const secondPlace = fishData.find(fish => fish.active && fish.id !== winners[0].id);
            const thirdPlace = lastEliminated.slice(-2);
  
            setFinalResults([
              { rank: 1, name: winners[0].name, owner: winners[0].owner },
              { rank: 2, name: secondPlace.name, owner: secondPlace.owner },
              ...thirdPlace.map(fish => ({ rank: 3, name: fish.name, owner: fish.owner })),
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
    }, [feed, fishData, completedMatches, processedMatches, lastEliminated]);
  
  
    const countdownRenderer = ({ days, hours, minutes, seconds }) => (
      <div style={{ color: currentTheme.palette.text.primary }}>
        <span>{days}d</span> <span>{hours}h</span> <span>{minutes}m</span> <span>{seconds}s</span>
      </div>
    );
  

           const createMatchMessage = (matchNumber, fish1, fish2, winner) => {
        return {
          matchNumber,
          fish1Name: fish1.name,
          fish2Name: fish2 ? fish2.name : 'N/A',
          winnerName: winner.name,
        };
      };

    return (
      <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Layout style={{ width: '100vw', backgroundColor: currentTheme.palette.background.default }}>
        <div style={{}}>
          <Typography style={{fontWeight:'bold', color: currentTheme.palette.primary.main }} variant="h2">Competition Bracket</Typography>
          <Switch
            checked={themeMode === 'dark'}
            onChange={handleThemeChange}
            checkedChildren="Dark"
            unCheckedChildren="Light"
            style={{ marginBottom: '20px' }}
          />
          <Select defaultValue={selectedGroup} onChange={value => setSelectedGroup(value)} style={{ marginBottom: '20px' }}>
            <Option value="A">Group A</Option>
            <Option value="B">Group B</Option>
          </Select>
          {competitionFinished ? (
            <Typography style={{fontWeight:'bold', color: currentTheme.palette.primary.main }} variant="h3">The competition is finished</Typography>
          ) : (
            [...new Set(fishData.filter(fish => fish.active).map(fish => fish.matchTime))].map(matchTime => (
              <div key={matchTime}>
                <Typography style={{fontWeight:'bold', color: currentTheme.palette.primary.main }} variant="h3">Match Time: <p  style={{color: currentTheme.palette.text.primary }}>{new Date(matchTime).toLocaleString()}</p></Typography>
                <Row gutter={16}>
                  {fishData.filter(fish => fish.matchTime === matchTime && fish.active).map((fish, index, array) => {
                    if (index % 2 === 0) {
                      const opponent = array[index + 1];
                      return (
                        <Col key={fish.id} span={12}>
                          <Row gutter={16}>
                            <Col span={12}>
                              <Tooltip   style={{color: currentTheme.palette.text.primary }}   title={`Owner: ${fish.owner}`}>
                                <Card
                                  hoverable
                                  cover={<img alt={fish.name} src={fish.image} />}
                                  style={{backgroundColor: currentTheme.palette.background.default ,
                                    marginBottom: '20px',
                                    border: currentMatches.some(match => match.id === fish.id)
                                      ? `2px solid ${currentTheme.palette.primary.main}`
                                      : `1px solid ${currentTheme.palette.divider}`,
                                    boxShadow: !fish.active ? `0 0 10px ${currentTheme.palette.primary.main}` : 'none',
                                  }}
                                >
                                  <Card.Meta   title={<Typography   style={{color: currentTheme.palette.text.secondary }}  variant="body1">{fish.name} </Typography>} />
                                  <Countdown date={fish.matchTime} renderer={countdownRenderer} />
                                </Card>
                              </Tooltip>
                            </Col>
                            {opponent && (
                              <Col span={12}>
                                <Tooltip  style={{color: currentTheme.palette.text.primary }} title={`Owner: ${opponent.owner}`}>
                                  <Card
                                    hoverable
                                    cover={<img alt={opponent.name} src={opponent.image} />}
                                    style={{
                                      backgroundColor: currentTheme.palette.background.default ,
                                      marginBottom: '20px',
                                      border: currentMatches.some(match => match.id === opponent.id)
                                        ? `2px solid ${currentTheme.palette.primary.main}`
                                        : `1px solid ${currentTheme.palette.divider}`,
                                      boxShadow: !opponent.active ? `0 0 10px ${currentTheme.palette.primary.main}` : 'none',
                                    }}
                                  >
                                    <Card.Meta   title={<Typography   style={{color: currentTheme.palette.text.secondary }} variant="body1">{opponent.name}</Typography>} />
                                    <Countdown  date={opponent.matchTime} renderer={countdownRenderer} />
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
            <Typography style={{fontWeight:'bold', color: currentTheme.palette.primary.main }} variant="h2">Round Progress</Typography>
            <Progress percent={(completedMatches / (fishData.length / 2)) * 100} status="active" />
          </div>
          <div style={{ marginTop: '20px' }}>

            <LiveMatchFeed feed={feed} currentTheme={currentTheme} />
          </div>
          {finalResults && (
    <div style={{ marginTop: '20px' }}>
      <Typography variant="h2">Final Results</Typography>
        <RankingTable data={finalResults} theme={themeMode === 'dark' ? darkTheme : lightTheme}/>
    </div>
  )}
        </div>
      </Layout>
    </ThemeProvider>
    

    );
  };

  export default CompetitionBracket;