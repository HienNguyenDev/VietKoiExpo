import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Tag, Radio, Drawer } from 'antd';
import { fetchAllKoi, fetchOwnerByUserId } from '../../store/redux/action/koiRegisterAction'; // Import action từ Redux

const ManageAllKoiPage = () => {
    const dispatch = useDispatch();
    const koiList = useSelector(state => state.RegisterKoiReducer.koiList); // Lấy danh sách cá Koi từ Redux
    const ownerDetails = useSelector(state => state.RegisterKoiReducer.ownerDetail); // Lấy thông tin người sở hữu từ Redux
    const [filterVariety, setFilterVariety] = useState('all'); // Filter theo loại cá
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [userNames, setUserNames] = useState({}); // Lưu trữ tên người sở hữu theo userId
    const [visible, setVisible] = useState(false); // Trạng thái Drawer
    const [selectedUserId, setSelectedUserId] = useState(null); // ID người sở hữu được chọn

    // Fetch danh sách cá Koi khi trang được tải
    useEffect(() => {
        const fetchKoiData = async () => {
            setLoading(true);
            await dispatch(fetchAllKoi()); // Gọi API để fetch tất cả cá Koi
            setLoading(false);
        };
        fetchKoiData();
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
                                [koi.userId]: "none", // Nếu không có owner, hiển thị "none"
                            }));
                        }
                    });
                } else if (koi.userId === null) {
                    // Nếu userId là null, hiển thị "none"
                    setUserNames(prev => ({
                        ...prev,
                        [koi.userId]: "none",
                    }));
                }
            });
        }
    }, [dispatch, koiList]); // Chỉ phụ thuộc vào dispatch và koiList
    
    
    
    

    // Lọc cá Koi theo varietyId
    const filteredKoi = koiList.filter(koi => {
        if (filterVariety === 'all') return true;
        return koi.varietyId === filterVariety;
    });

    // Cột cho bảng cá Koi
    const columns = [
        {
            title: 'Koi Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (imageUrl) => <img src={imageUrl} alt="Koi" width={50} />
        },
        {
            title: 'Koi Name',
            dataIndex: 'koiName',
            key: 'koiName',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Variety',
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
                return varietyNames[varietyId] || 'Unknown';
            }
        },
        {
            title: 'Owner',
            dataIndex: 'userId',
            key: 'userId',
            render: (userId) => {
                // Nếu userId là null hoặc chưa có thông tin, hiển thị "none"
                const userName = userNames[userId] || 'none';
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
            <h2>Manage All Koi</h2>

            {/* Radio buttons để chọn lọc Variety */}
            <Radio.Group 
                onChange={(e) => setFilterVariety(e.target.value)} 
                value={filterVariety}
                style={{ marginBottom: 16 }}>
                <Radio.Button value="all">All</Radio.Button>
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
                title="User Details"
                width={400}
                onClose={onClose}
                visible={visible}
            >
                {ownerDetails ? (
                    <div>
                        <p><strong>Full Name:</strong> {ownerDetails.fullName}</p>
                        <p><strong>Email:</strong> {ownerDetails.email}</p>
                        <p><strong>Phone:</strong> {ownerDetails.phone}</p>
                        <p><strong>Address:</strong> {ownerDetails.address}</p>
                    </div>
                ) : (
                    <p>Loading user details...</p>
                )}
            </Drawer>
        </div>
    );
};

export default ManageAllKoiPage;
