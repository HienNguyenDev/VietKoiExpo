import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Grid, Card, CardContent, CardMedia } from '@mui/material';
import photo1 from '../../asset/photo/koi/sbd1.jpg'
import photo2 from '../../asset/photo/koi/sbd2.png'
import photo3 from '../../asset/photo/koi/sbd3.png'
import photo4 from '../../asset/photo/koi/sbd4.jpg'
import photo5 from '../../asset/photo/koi/sbd5.png'
import photo6 from '../../asset/photo/koi/sbd6.png'
import photo7 from '../../asset/photo/koi/sbd7.jpg'
import photo8 from '../../asset/photo/koi/sbd3.png'
import photo9 from '../../asset/photo/koi/sbd2.png'
const koiFishList = [
  { KoiID: '1', KoiName: 'SBD021', Size: 20, Age: 2, Photo: photo1 },
  { KoiID: '2', KoiName: 'SBD022', Size: 25, Age: 3, Photo: photo2 },
  { KoiID: '3', KoiName: 'SBD024', Size: 22, Age: 2, Photo: photo3 },
  { KoiID: '4', KoiName: 'SBD027', Size: 20, Age: 2, Photo: photo4 },
  { KoiID: '5', KoiName: 'SBD032', Size: 25, Age: 3, Photo: photo5 },
  { KoiID: '6', KoiName: 'SBD035', Size: 22, Age: 2, Photo: photo6 },
  { KoiID: '7', KoiName: 'SBD041', Size: 20, Age: 2, Photo: photo7 },
  { KoiID: '8', KoiName: 'SBD066', Size: 25, Age: 3, Photo: photo8 },
  { KoiID: '9', KoiName: 'SBD070', Size: 22, Age: 2, Photo: photo9 },
];

const KoiFishCompetition = () => {
  const [selectedKoi, setSelectedKoi] = useState(null);
  const [predictedScore, setPredictedScore] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const calculateWinner = () => {
      let highestScore = 0;
      let winnerKoi = null;

      koiFishList.forEach((koi) => {
        const score = (koi.Size * 2) + (koi.Age * 3);
        if (score > highestScore) {
          highestScore = score;
          winnerKoi = koi;
        }
      });

      setWinner(winnerKoi);
    };

    calculateWinner();
  }, []);

  const handleScore = (koiId) => {
    const koi = koiFishList.find((k) => k.KoiID === koiId);
    setSelectedKoi(koi);
    setPredictedScore(null); // Reset predicted score when a new Koi is selected
  };

  const handleBack = () => {
    setSelectedKoi(null);
    setPredictedScore(null); // Reset predicted score when going back
  };

  const handlePredict = () => {
    const { Size, Age } = selectedKoi;
    const score = (Size * 2) + (Age * 3);
    setPredictedScore(score);
  };

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {!selectedKoi ? (
        <>
          <Typography variant="h4" gutterBottom>
            Koi Fish List
          </Typography>
          <Grid container spacing={2}>
            {koiFishList.map((koi) => (
              <Grid item xs={12} sm={6} md={4} key={koi.KoiID}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={koi.Photo}
                    alt={koi.KoiName}
                  />
                  <CardContent>
                    <Typography variant="h6">{koi.KoiName}</Typography>
                    <Button variant="contained" onClick={() => handleScore(koi.KoiID)}>
                      Predict Score
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {winner && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                Predicted Winner: {winner.KoiName}
              </Typography>
            </Box>
          )}
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Predict Score for {selectedKoi.KoiName}
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              width: '300px',
            }}
          >
            <TextField
              label="Size (cm)"
              name="size"
              type="number"
              value={selectedKoi.Size}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Age (years)"
              name="age"
              type="number"
              value={selectedKoi.Age}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handlePredict}>
              Predict Score
            </Button>
            <Button variant="outlined" onClick={handleBack}>
              Back to List
            </Button>
          </Box>
          {predictedScore !== null && (
            <Typography variant="h6" sx={{ mt: 4 }}>
              Predicted Score: {predictedScore}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default KoiFishCompetition;