import React, { useState } from 'react';
import { Box, Typography, Slider, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Mock Koi object
const mockKoi = {
  KoiID: 'K001',
  Scores: {
    shape: 0,
    color: 0,
    pattern: 0,
  },
};

const ManageScoringProcess = ({ koi = mockKoi }) => {
  const initialScores = koi?.Scores || { shape: 0, color: 0, pattern: 0 };
  const [shapeScore, setShapeScore] = useState(initialScores.shape);
  const [colorScore, setColorScore] = useState(initialScores.color);
  const [patternScore, setPatternScore] = useState(initialScores.pattern);
  const navigate = useNavigate();

  const calculateTotalScore = () => {
    return (shapeScore * 0.5 + colorScore * 0.3 + patternScore * 0.2).toFixed(2);
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous route
  };

  const totalScore = calculateTotalScore();

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Chấm điểm cá Koi
      </Typography>

      <Typography>Dáng (50%)</Typography>
      <Slider
        value={shapeScore}
        onChange={(e, newValue) => setShapeScore(newValue)}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={10}
      />

      <Typography>Màu sắc (30%)</Typography>
      <Slider
        value={colorScore}
        onChange={(e, newValue) => setColorScore(newValue)}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={10}
      />

      <Typography>Hoa văn (20%)</Typography>
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

      <Button variant="contained" sx={{ mt: 3 }}>
        Gửi điểm (mock)
      </Button>

      <Button variant="outlined" sx={{ mt: 3, ml: 2 }} onClick={handleBack}>
        Quay lại
      </Button>
    </Box>
  );
};

export default ManageScoringProcess;
