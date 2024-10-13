import React,{ useState } from 'react'
import { Outlet } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import ManageScoringProcess from './ManageScoringProcess';

const koiFishList = [
  { KoiID: '1', KoiName: 'SBD021', Size: 20, Age: 2 },
  { KoiID: '2', KoiName: 'Koi 2', Size: 25, Age: 3 },
  { KoiID: '3', KoiName: 'Koi 3', Size: 22, Age: 2 },
];

const ManageJudingPage = () => {
  const [selectedKoi, setSelectedKoi] = useState(null);

  const handleScore = (koiId) => {
    // Cập nhật state để hiển thị trang chấm điểm
    const koi = koiFishList.find((k) => k.KoiID === koiId);
    setSelectedKoi(koi);
  };

  const handleBack = () => {
    // Trở lại danh sách cá Koi
    setSelectedKoi(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {!selectedKoi ? (
        // Hiển thị danh sách cá Koi nếu chưa chọn con cá nào
        <>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Danh sách cá Koi cần chấm điểm
          </Typography>
          {koiFishList.map((koi) => (
            <Box key={koi.KoiID} sx={{ mb: 2 }}>
              <Typography>
                {koi.KoiName} - Size: {koi.Size}, Age: {koi.Age}
              </Typography>
              <Button
                variant="contained"
                onClick={() => handleScore(koi.KoiID)}
              >
                Chấm điểm
              </Button>
            </Box>
          ))}
        </>
      ) : (
        // Hiển thị trang chấm điểm khi đã chọn một con cá
        <ManageScoringProcess koi={selectedKoi} handleBack={handleBack} />
      )}
    </Box>
  );
};

export default ManageJudingPage