import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import ManageScoringProcess from './ManageScoringProcess';

// Dữ liệu giả lập danh sách cá Koi cho mỗi cuộc thi (không có điểm cứng)
const koiDataByCompetition = {
  '1': [
    { KoiID: 'K1', KoiName: 'Koi A', Size: 20, Age: 2, TotalScore: null, Scores: { shape: 0, color: 0, pattern: 0 }},
    { KoiID: 'K2', KoiName: 'Koi B', Size: 25, Age: 3, TotalScore: null, Scores: { shape: 0, color: 0, pattern: 0 }},
  ],
  '2': [
    { KoiID: 'K3', KoiName: 'Koi C', Size: 22, Age: 1,  TotalScore: 8.5, Scores: { shape: 9, color: 8, pattern: 8 }}, 
    { KoiID: 'K4', KoiName: 'Koi D', Size: 30, Age: 4, TotalScore: 7.9, Scores: { shape: 7, color: 8, pattern: 8 }},
  ],
  '3': [
    { KoiID: 'K5', KoiName: 'Koi E', Size: 28, Age: 2, TotalScore: null, Scores: { shape: 0, color: 0, pattern: 0 }},
    { KoiID: 'K6', KoiName: 'Koi F', Size: 26, Age: 3, TotalScore: null, Scores: { shape: 0, color: 0, pattern: 0 }},
  ],
};

const ManageKoiJudgingPage = ({ competition, handleBack }) => {
  const [selectedKoi, setSelectedKoi] = useState(null);
  const [koiList, setKoiList] = useState(koiDataByCompetition[competition.CompID] || []);

  useEffect(() => {
    // Sort by score if the competition is completed
    if (!competition.Status && new Date(competition.EndDate) < new Date()) {
      const sortedKoiList = [...koiList].sort((a, b) => (b.TotalScore || 0) - (a.TotalScore || 0));
      setKoiList(sortedKoiList);
    }
  }, [competition, koiList]);

  const handleSelectKoi = (koi) => {
    setSelectedKoi(koi);
  };

  // Handles score submission from ManageScoringProcess
  const handleScoreSubmit = (koiID, scores) => {
    const totalScore = (scores.shape * 0.5 + scores.color * 0.3 + scores.pattern * 0.2).toFixed(2);

    // Update the koi's score in the koiList
    const updatedKoiList = koiList.map(koi =>
      koi.KoiID === koiID ? { ...koi, TotalScore: totalScore, Scores: scores } : koi
    );
    setKoiList(updatedKoiList);
    setSelectedKoi(null); // Go back to Koi list
  };

  const isUpcoming = new Date(competition.StartDate) > new Date();
  const isCompleted = new Date(competition.EndDate) < new Date();

  return (
    <Box sx={{ p: 3 }}>
      {!selectedKoi ? (
        <>
          <Typography variant="h4" sx={{ mb: 3 }}>
            {isUpcoming ? "Danh sách cá Koi (Sắp diễn ra)" : isCompleted ? "Danh sách cá Koi (Đã kết thúc)" : `Danh sách cá Koi cho cuộc thi ${competition.CompName}`}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên cá Koi</TableCell>
                <TableCell>Kích thước</TableCell>
                <TableCell>Tuổi</TableCell>
                <TableCell>Điểm</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {koiList.map((koi) => (
                <TableRow key={koi.KoiID}>
                  <TableCell>{koi.KoiName}</TableCell>
                  <TableCell>{koi.Size} cm</TableCell>
                  <TableCell>{koi.Age}</TableCell>
                  <TableCell>{koi.TotalScore !== null ? koi.TotalScore : isUpcoming ? "Sắp diễn ra" : "Chưa chấm"}</TableCell>
                  <TableCell>
                    {competition.Status && !isCompleted ? (
                      <Button variant="contained" onClick={() => handleSelectKoi(koi)}>
                        Chấm điểm
                      </Button>
                    ) : (
                      <Button variant="outlined" disabled>
                        {isCompleted ? "Xem điểm" : "Chờ"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="outlined" onClick={handleBack} sx={{ mt: 3 }}>
            Quay lại
          </Button>
        </>
      ) : (
        <ManageScoringProcess
          koi={selectedKoi}
          handleBack={() => setSelectedKoi(null)}
          handleSubmitScore={handleScoreSubmit}
        />
      )}
    </Box>
  );
};

export default ManageKoiJudgingPage;
