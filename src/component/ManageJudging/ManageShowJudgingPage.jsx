import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import ManageKoiJudgingPage from './ManageKoiJudgingPage'; // Thành phần hiển thị danh sách cá Koi
import { useParams } from 'react-router-dom'; // Sử dụng useParams để lấy trạng thái từ URL

// Dữ liệu giả lập cho danh sách cuộc thi (1: ongoing, 2: upcoming, 0: completed)
const competitions = [
  { CompID: '1', CompName: 'Cuộc thi Koi 2024', Location: 'Hà Nội', StartDate: '2024-11-01', EndDate: '2024-11-03', Status: 1 },
  { CompID: '2', CompName: 'Cuộc thi Koi Quốc tế', Location: 'TP. HCM', StartDate: '2024-12-01', EndDate: '2024-12-05', Status: 0 },
  { CompID: '3', CompName: 'Cuộc thi Koi Nhật Bản', Location: 'Tokyo', StartDate: '2025-01-10', EndDate: '2025-01-12', Status: 2 },
];
  /* const [competitions, setcompetitions] = useState({
    CompName: '',
    CompDescription: '',
    Location: '',
    StartDate: '',
    EndDate: '',
    Status: '',
  });
  const [open, setOpen] = useState(false); */

const ManageShowJudgingPage = () => { 
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const { status } = useParams(); // Lấy trạng thái từ URL (nếu có)

  // Lọc cuộc thi dựa trên trạng thái nếu có status
  const filteredCompetitions = status
    ? competitions.filter((comp) => {
        if (status === 'completed') return comp.Status === 0; // Đã kết thúc
        if (status === 'ongoing') return comp.Status === 1; // Đang diễn ra
        if (status === 'upcoming') return comp.Status === 2; // Sắp diễn ra
        return false;
      })
    : competitions; // Nếu không có status, hiển thị tất cả cuộc thi

  const handleSelectCompetition = (competition) => {
    setSelectedCompetition(competition); // Chọn cuộc thi
  };

  return (
    <Box sx={{ p: 3 }}>
      {!selectedCompetition ? (
        <>
          <Typography variant="h4" sx={{ mb: 3 }}>
            {status === 'completed' && 'Danh sách cuộc thi đã kết thúc'}
            {status === 'ongoing' && 'Danh sách cuộc thi đang diễn ra'}
            {status === 'upcoming' && 'Danh sách cuộc thi sắp diễn ra'}
            {!status && 'Danh sách tất cả các cuộc thi'}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên cuộc thi</TableCell>
                <TableCell>Địa điểm</TableCell>
                <TableCell>Ngày bắt đầu</TableCell>
                <TableCell>Ngày kết thúc</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCompetitions.map((comp) => (
                <TableRow key={comp.CompID}>
                  <TableCell>{comp.CompName}</TableCell>
                  <TableCell>{comp.Location}</TableCell>
                  <TableCell>{comp.StartDate}</TableCell>
                  <TableCell>{comp.EndDate}</TableCell>
                  <TableCell>
                    {comp.Status === 1
                      ? 'Đang diễn ra'
                      : comp.Status === 2
                      ? 'Sắp diễn ra'
                      : 'Đã kết thúc'}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={() => handleSelectCompetition(comp)}>
                      Xem cá Koi
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <ManageKoiJudgingPage competition={selectedCompetition} handleBack={() => setSelectedCompetition(null)} />
      )}
    </Box>
  );
};

export default ManageShowJudgingPage;
