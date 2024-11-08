  import React, { useState,useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { Box, Typography, Slider, Button, CircularProgress } from '@mui/material';
  import { useNavigate, useLocation } from 'react-router-dom';
  import { submitScoreAction, fetchKoiOwner } from '../../store/redux/action/koiEntriesAction';


  const ManageScoringProcess = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { koiId, koiName, compId, userId,compName } = location.state || {};
    // Safely set initial scores, defaulting to 0 if koiId or score values are not available
    const [shapeScore, setShapeScore] = useState(koiId?.scoreShape || 0);
    const [colorScore, setColorScore] = useState(koiId?.scoreColor || 0);
    const [patternScore, setPatternScore] = useState(koiId?.scorePattern || 0);

    const OwnerProfile = useSelector(state => state.koiEntriesReducer.owner);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (koiId) {
            dispatch(fetchKoiOwner(koiId)).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch, koiId]);
  
  const calculateTotalScore = () => {
    return (shapeScore * 0.5 + colorScore * 0.3 + patternScore * 0.2).toFixed(2);
  };
  
  const ownerId = OwnerProfile?.userId;

  const handleBack = () => {
    navigate(-1); // Go back to the previous route
  };


  const totalScore = calculateTotalScore();

  const handleSubmit = () => {
    // Create the score data object
    const scoreData = {
      koiId,
      shapeScore,
      colorScore,
      patternScore,
      totalScore: parseFloat(calculateTotalScore()),
    };
    
    // Dispatch the score data to Redux
    console.log("koiId",koiId);
    console.log("compId",compId);
    console.log("OwnerId",ownerId);
    console.log("scoreData",scoreData);
    dispatch(submitScoreAction(compId,userId,scoreData,true,navigate,compName));

    // Navigate back after submission
    //navigate(-1);
  };
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
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

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit }>
        Submit
      </Button>

      <Button variant="outlined" sx={{ mt: 3, ml: 2 }} onClick={handleBack}>
        Back
      </Button>
    </Box>
  );
};

export default ManageScoringProcess;
