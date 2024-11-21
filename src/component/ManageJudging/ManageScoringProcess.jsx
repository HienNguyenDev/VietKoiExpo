import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Slider, Button, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { submitScoreAction, fetchKoiOwner, fetchAllScore } from '../../store/redux/action/koiEntriesAction';

const ManageScoringProcess = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { koiId, koiName, compId, userId, compName, imageUrl } = location.state || {};
  // State for scores
  const [shapeScore, setShapeScore] = useState(0);
  const [colorScore, setColorScore] = useState(0);
  const [patternScore, setPatternScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const OwnerProfile = useSelector(state => state.koiEntriesReducer.owner);
  const scoreList = useSelector(state => state.koiEntriesReducer.scoretList);

  useEffect(() => {
    if (koiId && compId) {
      // Fetch Koi Owner and Scores
      dispatch(fetchKoiOwner(koiId));
      dispatch(fetchAllScore()).then(() => {
        // Set initial scores if available
        const koiScore = scoreList.find(score => score.koiId === koiId && score.compId === compId);
        if (koiScore) {
          setShapeScore(koiScore.scoreShape || 0);
          setColorScore(koiScore.scoreColor || 0);
          setPatternScore(koiScore.scorePattern || 0);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [dispatch, koiId, compId]);

  const calculateTotalScore = () => {
    return (shapeScore * 0.5 + colorScore * 0.3 + patternScore * 0.2).toFixed(2);
  };

  const totalScore = calculateTotalScore();

  const handleBack = () => {
    navigate(`/referee/manage-judging/comp/${compName}`, { state: { compId, compName } });
  };

  const handleSubmit = () => {
    const scoreData = {
      koiId,
      shapeScore,
      colorScore,
      patternScore,
      totalScore: parseFloat(totalScore),
    };
    dispatch(submitScoreAction(compId, userId, scoreData, true, navigate, compName)).then(() => {
          navigate(`/referee/manage-judging/comp/${compName}`, { state: { compId, compName } });
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ display: 'flex', maxWidth: 800, margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      {imageUrl && (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '20px' }}>
          <img
            src={imageUrl}
            alt={`${koiName}`}
            style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px' }}
          />
        </Box>
      )}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          {koiName} grading!
        </Typography>

        <Typography>Shape (50%)</Typography>
        <Slider
          value={shapeScore}
          onChange={(e, newValue) => setShapeScore(newValue)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={10}
        />

        <Typography>Color (30%)</Typography>
        <Slider
          value={colorScore}
          onChange={(e, newValue) => setColorScore(newValue)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={10}
        />

        <Typography>Pattern (20%)</Typography>
        <Slider
          value={patternScore}
          onChange={(e, newValue) => setPatternScore(newValue)}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={10}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" value={(totalScore / 10) * 100} size={100} />
            <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" component="div" color="textSecondary">
                {totalScore}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>

          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageScoringProcess;
