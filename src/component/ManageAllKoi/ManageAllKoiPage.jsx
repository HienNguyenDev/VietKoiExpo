import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Tag, Radio, Drawer, Row, Col, Input } from 'antd';
import { fetchAllKoi, fetchOwnerByUserId } from '../../store/redux/action/koiRegisterAction'; // Import action từ Redux

const ManageAllKoiPage = () => {
    const dispatch = useDispatch();
    const koiList = useSelector(state => state.RegisterKoiReducer.koiList); // Lấy danh sách cá Koi từ Redux
    const ownerDetails = useSelector(state => state.RegisterKoiReducer.ownerDetail); // Lấy thông tin người sở hữu từ Redux
    const [filterVariety, setFilterVariety] = useState('all'); // Bộ lọc theo loại cá
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [userNames, setUserNames] = useState({}); // Lưu trữ tên người sở hữu theo userId
    const [visible, setVisible] = useState(false); // Trạng thái Drawer
    const [selectedUserId, setSelectedUserId] = useState(null); // ID người sở hữu được chọn
    const [searchQuery, setSearchQuery] = useState(''); // State để lưu giá trị tìm kiếm chung
    
    // Fetch danh sách cá Koi khi trang được tải
    useEffect(() => {
        const fetchKoiData = async () => {
            setLoading(true);
            await dispatch(fetchAllKoi()); // Gọi API để fetch tất cả cá Koi
            setLoading(false);
        };
        fetchKoiData();
        
        // Thêm interval để tự động fetch dữ liệu
        const intervalId = setInterval(fetchKoiData, 60000); // Fetch lại dữ liệu mỗi 60 giây
        
        // Cleanup interval khi component bị unmount
        return () => clearInterval(intervalId);
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(koiList)) {
            koiList.forEach(koi => {
                // Nếu userId có giá trị (không phải null) và chưa có trong userNames, gọi API để lấy thông tin
                if (koi.userId && !userNames[koi.userId]) {
                    dispatch(fetchOwnerByUserId(koi.userId)).then(owner => {
                        if (owner && owner.fullName) {
                            setUserNames(prev => ({
                                ...prev,
                                [koi.userId]: owner.fullName, // Lưu tên người sở hữu vào userNames
                            }));
                        } else {
                            setUserNames(prev => ({
                                ...prev,
                                [koi.userId]: "không có", // Nếu không có owner, hiển thị "không có"
                            }));
                        }
                    });
                } else if (koi.userId === null) {
                    // Nếu userId là null, hiển thị "không có"
                    setUserNames(prev => ({
                        ...prev,
                        [koi.userId]: "không có",
                    }));
                }
            });
        }
    }, [dispatch, koiList]); // Chỉ phụ thuộc vào dispatch và koiList
    
    // Lọc cá Koi theo varietyId
    const filteredKoi = koiList.filter(koi => {
        const matchesStatus = filterVariety === 'all' || 
                              (filterVariety === 'kohaku' && koi.varietyId === 'kohaku') ||
                              (filterVariety === 'sanke' && koi.varietyId ==='sanke') ||
                              (filterVariety === 'showa' && koi.varietyId === 'showa') ||
                              (filterVariety === 'utsuri' && koi.varietyId === 'utsuri') ||
                              (filterVariety === 'tancho' && koi.varietyId === 'tancho') ||
                              (filterVariety === 'bekko' && koi.varietyId === 'bekko') ||
                              (filterVariety === 'asagi' && koi.varietyId === 'asagi') ||
                              (filterVariety === 'koromo' && koi.varietyId === 'koromo') ||
                              (filterVariety === 'goromo' && koi.varietyId ==='goromo') ||
                              (filterVariety === 'shiroUtsuri' && koi.varietyId === 'shiroUtsuri');
                              
        const matchesSearch = koi.koiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              userNames[koi.userId].toLowerCase().includes(searchQuery.toLowerCase());
    
        return matchesStatus && matchesSearch;
      });
    // Cột cho bảng cá Koi
    const columns = [
        {
            title: 'Hình Ảnh Cá Koi',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (imageUrl) => <img src={imageUrl} alt="Koi" width={50} />
        },
        {
            title: 'Tên Cá Koi',
            dataIndex: 'koiName',
            key: 'koiName',
        },
        {
            title: 'Kích Thước',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Tuổi',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Loại',
            dataIndex: 'varietyId',
            key: 'varietyId',
            render: (varietyId) => {
                const varietyNames = {
                    kohaku: 'Kohaku',
                    sanke: 'Sanke',
                    showa: 'Showa',
                    utsuri: 'Utsuri',
                    tancho: 'Tancho',
                    bekko: 'Bekko',
                    asagi: 'Asagi',
                    koromo: 'Koromo',
                    goromo: 'Goromo',
                    shiroUtsuri: 'Shiro Utsuri',
                };
                return varietyNames[varietyId] || 'Không rõ';
            }
        },
        {
            title: 'Người Sở Hữu',
            dataIndex: 'userId',
            key: 'userId',
            render: (userId) => {
                // Nếu userId là null hoặc chưa có thông tin, hiển thị "không có"
                const userName = userNames[userId] || 'không có';
                return <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleViewUserDetails(userId)}>{userName}</span>;
            }
        },

    ];

    // Hàm để hiển thị chi tiết người sở hữu cá Koi trong Drawer
    const handleViewUserDetails = (userId) => {
        if (userId !== null) {
            dispatch(fetchOwnerByUserId(userId)); // Gọi action để fetch thông tin người sở hữu
            setSelectedUserId(userId); // Cập nhật ID người sở hữu được chọn
            setVisible(true); // Mở Drawer
        }
    };

    // Hàm đóng Drawer
    const onClose = () => {
        setVisible(false);
        setSelectedUserId(null); // Đặt lại ID người sở hữu khi đóng Drawer
    };

    return (
        <div>
            <h2>Quản Lý Tất Cả Cá Koi</h2>
            <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                <Col span={8}>
                    <Input
                      placeholder="Tìm kiếm..."
                      onChange={(e) => setSearchQuery(e.target.value)} 
                      style={{ width: 300 }}
                    />
                </Col>
            </Row>
            {/* Radio buttons để chọn lọc loại cá */}
            <Radio.Group 
                onChange={(e) => setFilterVariety(e.target.value)} 
                value={filterVariety}
                style={{ marginBottom: 16 }}>
                <Radio.Button value="all">Tất Cả</Radio.Button>
                <Radio.Button value="kohaku">Kohaku</Radio.Button>
                <Radio.Button value="sanke">Sanke</Radio.Button>
                <Radio.Button value="showa">Showa</Radio.Button>
                <Radio.Button value="utsuri">Utsuri</Radio.Button>
                <Radio.Button value="tancho">Tancho</Radio.Button>
                <Radio.Button value="bekko">Bekko</Radio.Button>
                <Radio.Button value="asagi">Asagi</Radio.Button>
                <Radio.Button value="koromo">Koromo</Radio.Button>
                <Radio.Button value="goromo">Goromo</Radio.Button>
                <Radio.Button value="shiroUtsuri">Shiro Utsuri</Radio.Button>
            </Radio.Group>

            {/* Table hiển thị các cá Koi đã lọc */}
            <Table
                columns={columns}
                dataSource={filteredKoi}
                rowKey="koiId"
                pagination={{ pageSize: 5 }}
                loading={loading}
            />

            {/* Drawer hiển thị chi tiết người sở hữu cá Koi */}
            <Drawer
                title="Thông Tin Người Sở Hữu"
                width={400}
                onClose={onClose}
                visible={visible}
            >
                {ownerDetails ? (
                    <div>
                        <p><strong>Họ Tên:</strong> {ownerDetails.fullName}</p>
                        <p><strong>Email:</strong> {ownerDetails.email}</p>
                        <p><strong>Số Điện Thoại:</strong> {ownerDetails.phone}</p>
                        <p><strong>Địa Chỉ:</strong> {ownerDetails.address}</p>
                    </div>
                ) : (
                    <p>Đang tải thông tin người sở hữu...</p>
                )}
            </Drawer>
        </div>
    );
};

export default ManageAllKoiPage;
