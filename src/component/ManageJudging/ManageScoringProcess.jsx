import React,{ useState } from 'react'
import { Box, Typography, Slider, Button } from '@mui/material';

const ManageScoringProcess = ({ koi, handleBack }) => {
  const [shapeScore, setShapeScore] = useState(0);
  const [colorScore, setColorScore] = useState(0);
  const [patternScore, setPatternScore] = useState(0);

  const calculateTotalScore = () => {
    return (shapeScore * 0.5 + colorScore * 0.3 + patternScore * 0.2).toFixed(2);
  };

  const handleSubmit = () => {
    const totalScore = calculateTotalScore();
    alert(`Tổng điểm cho cá Koi ${koi.KoiName}: ${totalScore}`);
    // Gửi điểm lên server nếu cần thiết
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Chấm điểm cho cá Koi: {koi.KoiName}
      </Typography>

      <Typography>Dáng (50%)</Typography>
      <Slider
        value={shapeScore}
        onChange={(e, newValue) => setShapeScore(newValue)}
        aria-labelledby="shape-slider"
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
        aria-labelledby="color-slider"
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
        aria-labelledby="pattern-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={10}
      />

      <Typography variant="h6" sx={{ mt: 3 }}>
        Tổng điểm: {calculateTotalScore()}
      </Typography>

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
        Gửi điểm
      </Button>
      <Button variant="outlined" sx={{ mt: 3, ml: 2 }} onClick={handleBack}>
        Quay lại
      </Button>
    </Box>
  );
};
export default ManageScoringProcess