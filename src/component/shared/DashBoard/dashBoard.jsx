import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Tag, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchAllResultByCompCompId,reviewKoiEntryAction } from '../../../store/redux/action/resultAction'; 
const ManageKoiEntriesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const compResult = useSelector(state => state.resultReducer.compResultList);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false); // Để quản lý trạng thái loading


  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true); // Bắt đầu loading
      await dispatch(fetchAllResultByCompCompId()); // Fetch contests
      setLoading(false); // Kết thúc loading
    };

    fetchContests();
  }, [dispatch]);

  useEffect(() => {
    // Lấy chi tiết từng cá Koi
    if (Array.isArray(koiCheckIn)) {
    koiCheckIn.forEach(entry => {
      if (!koiDetails[entry.koiId]) {
        dispatch(reviewKoiEntryAction(entry.koiId)).then(detail => {
          setKoiDetails(prevDetails => ({
            ...prevDetails,
            [entry.koiId]: detail,
          }));
        });
      }
      setDescriptionMap(prevMap => ({
        ...prevMap,
        [entry.checkInId]: entry.description || '' // Sử dụng mô tả hiện có nếu có
      }));
    });
    }
  }, [dispatch, koiCheckIn, koiDetails]);
  

  // Cột cho rank cá Koi
  const columns = [
    {
      title: 'Koi Image',
      dataIndex: 'koiId',
      key: 'koiimageurl',
      render: (koiId) => koiDetails[koiId]?.imageUrl || 'Loading...',
    },
    {
      title: 'Koi Name',
      dataIndex: 'koiId',
      key: 'koiName',
      render: (koiId) => koiDetails[koiId]?.koiName || 'Loading...',
    },

    {
        title: 'Variety',
        dataIndex: 'koiId',
        key: 'variety',
        render: (koiId) => koiDetails[koiId]?.varietyId || 'Loading...',
    },
    
    {
      title: 'Result Score',
      dataIndex: 'resultScore',
      key: 'resultScore',
    },

    {
        title: 'Prize',
        dataIndex: 'prize',
        key: 'prize',
      },
  ];

  return (
    <div>
      <h2> {compName}!!</h2>

     
      <Table
        columns={columns}
        dataSource={filteredCompResult}
        rowKey="resultId"
        pagination={{ pageSize: 5 }}
      />
      <Button type="default" style={{ marginTop: 20 }} onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
    
  );
};

export default ManageKoiEntriesPage;
