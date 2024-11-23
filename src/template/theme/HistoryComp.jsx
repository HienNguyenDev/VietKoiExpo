import React, { useState, useEffect } from 'react';
import './HistoryPage.scss';
import { Spin, message } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';

const HistoryComp = () => {
    const [koiData, setKoiData] = useState([]); // All koi data for user
    const [registrationData, setRegistrationData] = useState([]); // Data from registration API
    const [checkInData, setCheckInData] = useState([]); // Data from check-in API
    const [resultData, setResultData] = useState([]); // Data from result API
    const [competitionNames, setCompetitionNames] = useState({}); // To store competition names
    const [loading, setLoading] = useState(false);
    const userId = useSelector((state) => state.userReducer.userLogin.userId);

    // Function to fetch competition name by compId
    const fetchCompetitionName = async (compId) => {
        try {
            const response = await axios.get(
                `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Competition/${compId}`
            );
            return response.data?.compName || 'Cuộc thi không có tên';
        } catch (error) {
            console.error("Error fetching competition:", error);
            return 'Cuộc thi không có tên';
        }
    };

    // Function to fetch check-in data by compId
    const fetchCheckInDataByCompId = async (compId) => {
        try {
            const response = await axios.get(
                `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/CheckIn/competition/${compId}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching check-in data:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch Koi data for user
                const koiResponse = await axios.get(
                    `https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Koifish/user/${userId}`
                );
                setKoiData(koiResponse.data);

                // Fetch other data needed for different sections
                const registrationResponse = await axios.get(
                    'https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Registration'
                );
                const resultResponse = await axios.get(
                    'https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Result'
                );

                setRegistrationData(registrationResponse.data);
                setResultData(resultResponse.data);

                // Fetch competition names and check-in data for each competition
                const competitionResponse = await axios.get(
                    'https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Competition'
                );
                const compNames = {};
                const allCheckInData = [];
                for (let comp of competitionResponse.data) {
                    if (comp.compId && !compNames[comp.compId]) {
                        const compName = await fetchCompetitionName(comp.compId);
                        compNames[comp.compId] = compName;
                    }
                    const checkInData = await fetchCheckInDataByCompId(comp.compId);
                    allCheckInData.push(...checkInData);
                }
                setCompetitionNames(compNames);
                setCheckInData(allCheckInData);
            } catch (error) {
                message.error('Lỗi khi tải dữ liệu, vui lòng thử lại!');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    // Table for registered koi
    const renderKoiRegisteredTable = () => {
        return (
            <table className="koi-table">
                <thead>
                    <tr>
                        <th>Tên Cá Koi</th>
                        <th>Giống loài</th>
                    </tr>
                </thead>
                <tbody>
                    {koiData.map((koi) => (
                        <tr key={koi.koiId}>
                            <td>{koi.koiName}</td>
                            <td>{koi.varietyId}</td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    // Table for registered koi with specific status (approved or rejected)
    const renderKoiRegistrationStatusTable = (status) => {
        const filteredRegistration = registrationData.filter(
            (reg) => reg.status === status && reg.koiId
        );

        return (
            <table className="koi-table">
                <thead>
                    <tr>
                        <th>Tên Cá Koi</th>
                        <th>Trạng Thái</th>
                        <th>Cuộc Thi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRegistration.map((reg) => {
                        const koi = koiData.find((k) => k.koiId === reg.koiId);
                        const competitionName = competitionNames[reg.compId] || 'N/A'; // Get competition name from state

                        return (
                            koi && (
                                <tr key={reg.registrationId}>
                                    <td>{koi.koiName}</td>
                                    <td>{status === 1 ? 'Đã duyệt' : 'Từ chối'}</td>
                                    <td>{competitionName}</td>
                                </tr>
                            )
                        );
                    })}
                </tbody>
            </table>
        );
    };

    // Table for koi that has check-in status (approved or rejected)
    const renderKoiCheckInStatusTable = (status) => {
        const filteredCheckIn = checkInData.filter(
            (check) => check.status === status && check.koiId
        );

        return (
            <table className="koi-table">
                <thead>
                    <tr>
                       
                        <th>Tên Cá Koi</th>
                        <th>Trạng Thái Check-In</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCheckIn.map((check) => {
                        const koi = koiData.find((k) => k.koiId === check.koiId);
                        return (
                            koi && (
                                <tr key={check.koiId}>
                                    <td>{koi.koiName}</td>
                                    <td>{status === 1 ? 'Đã duyệt' : 'Từ chối'}</td>
                                </tr>
                            )
                        );
                    })}
                </tbody>
            </table>
        );
    };

    // Table for koi with results
    const renderKoiResultTable = () => {
        return (
            <table className="koi-table">
                <thead>
                    <tr>
                        <th>Tên Cá Koi</th>
                        <th>Cuộc Thi</th>
                        <th>Kết Quả</th>
                    </tr>
                </thead>
                <tbody>
                    {resultData.map((result) => {
                        const koi = koiData.find((k) => k.koiId === result.koiId);
                        const competitionName = competitionNames[result.compId] || 'N/A'; // Get competition name from state
                        return (
                            koi && (
                                <tr key={result.koiId}>
                                    <td>{koi.koiName}</td>
                                    <td>{competitionName}</td>
                                    <td>{result.resultScore}</td>
                                </tr>
                            )
                        );
                    })}
                </tbody>
            </table>
        );
    };

    return (
        <div className="history-page">
            <h1>Lịch Sử Quản Lý Cá Koi</h1>
            {loading ? (
                <Spin tip="Đang tải dữ liệu..." />
            ) : (
                <>
                    <section>
                        <h2>Cá Koi Đã Đăng Ký</h2>
                        {renderKoiRegisteredTable()}
                    </section>
                    <section>
                        <h2>Cá Koi Đã Phê Duyệt/Từ Chối vào Cuộc thi</h2>
                        {renderKoiRegistrationStatusTable(1)} {/* Approved */}
                        {renderKoiRegistrationStatusTable(2)} {/* Rejected */}
                    </section>
                    <section>
                        <h2>Cá Koi Đã Phê Duyệt/Từ Chối Check In trước khi thi đấu</h2>
                        {renderKoiCheckInStatusTable(1)} {/* Approved */}
                        {renderKoiCheckInStatusTable(2)} {/* Rejected */}
                    </section>
                    <section>
                        <h2>Kết Quả Thi Đấu</h2>
                        {renderKoiResultTable()}
                    </section>
                </>
            )}
        </div>
    );
};

export default HistoryComp;

// https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Koifish/user/{userId}(dùng để gọi ra list cá mà userLogin đã đăng kí)
/*
    [
  {
    "koiId": "759b9a2d-a65c-4928-a8bf-6bb0eeb8d114",
    "varietyId": "asagi",
    "userId": "caf7d708-3f8d-47f5-a548-72be40ef4be8",
    "koiName": "Cá Koi 1",
    "size": 80,
    "age": 3,
    "imageUrl": "https://res.cloudinary.com/dyv4nmtwl/image/upload/v1731284599/VietKoiExpo/nejryginkvfgimd0wo0n.png",
    "status": true,
    "tblcompetitionCategories": [],
    "tblpredictions": [],
    "tblregistrations": [],
    "tblresults": [],
    "tblscores": [],
    "user": null,
    "variety": null
  },
  {
    "koiId": "627753dc-c801-4f9a-bdf8-89dcc9d588d4",
    "varietyId": "kohaku",
    "userId": "caf7d708-3f8d-47f5-a548-72be40ef4be8",
    "koiName": "manager",
    "size": 80,
    "age": 3,
    "imageUrl": "https://res.cloudinary.com/dyv4nmtwl/image/upload/v1731284714/VietKoiExpo/ibqelgaejuootzkopiul.png",
    "status": true,
    "tblcompetitionCategories": [],
    "tblpredictions": [],
    "tblregistrations": [],
    "tblresults": [],
    "tblscores": [],
    "user": null,
    "variety": null
  }]
*/ 

// https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Registration (lấy ra list đăng kí cá vào những cuộc thi của userLogin,status 1 là đã được duyệt,0 đang đợi duyệt, 2 là bị từ chối)
/*
    [
    {
        "   ": "4f6e3d99-78fa-41b1-bd5e-0f3c0632d580",
        "koiId": "f15e00e9-a5b6-45a4-8d04-a2d50f1d24c7",
        "compId": "50f08f88-602c-4914-b714-c99fb4a5e458",
        "status": 2,
        "comp": null,
        "koi": null,
        "tblcheckIns": []
    },
    {
        "registrationId": "6c7e6c1b-b47f-427a-bf44-1087146a9876",
        "koiId": null,
        "compId": "bb442c96-6ff7-44bb-a170-dad217ca5981",
        "status": 1,
        "comp": null,
        "koi": null,
        "tblcheckIns": []
    },
    {
        "registrationId": "fc1ad2f1-b50a-41dd-9a48-1449173e6106",
        "koiId": null,
        "compId": "00ccd1f6-5c27-4e15-ba1b-22a13f3ba84e",
        "status": 1,
        "comp": null,
        "koi": null,
        "tblcheckIns": []
        },
    ]
 */

// https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Competition/{compId} (lấy ra thông tin của cuộc thi)
/*
{
  "compId": "bb442c96-6ff7-44bb-a170-dad217ca5981",
  "compName": "Annual Koi Show 2024",
  "compDescription": "A major Koi competition",
  "location": "Tokyo",
  "imageUrl": null,
  "startDate": "2024-11-10",
  "endDate": "2024-11-12",
  "status": 1,
  "tblcompetitionCategories": [
    {
      "competitionCategoryId": "39c343d7-b544-4ca0-9342-139be27655da",
      "compId": "bb442c96-6ff7-44bb-a170-dad217ca5981",
      "categoryId": "baby",
      "koiId": null,
      "category": null,
      "comp": null,
      "koi": null
    },
    {
      "competitionCategoryId": "aeb0bcb9-785b-4d5a-9319-4c81380e8782",
      "compId": "bb442c96-6ff7-44bb-a170-dad217ca5981",
      "categoryId": "grand",
      "koiId": null,
      "category": null,
      "comp": null,
      "koi": null
    },
    {
      "competitionCategoryId": "2671a017-2ede-4b7f-8aeb-5a1953c1d409",
      "compId": "bb442c96-6ff7-44bb-a170-dad217ca5981",
      "categoryId": "mature",
      "koiId": null,
      "category": null,
      "comp": null,
      "koi": null
    },
    {
      "competitionCategoryId": "c67e0aef-667d-46e4-a2e6-7f62b234c3a4",
      "compId": "bb442c96-6ff7-44bb-a170-dad217ca5981",
      "categoryId": "sakura",
      "koiId": null,
      "category": null,
      "comp": null,
      "koi": null
    },
    {
      "competitionCategoryId": "a8223159-6c2b-4b7d-883b-ba4cb6f92e65",
      "compId": "bb442c96-6ff7-44bb-a170-dad217ca5981",
      "categoryId": "young",
      "koiId": null,
      "category": null,
      "comp": null,
      "koi": null
    },
    {
      "competitionCategoryId": "6083261e-d392-478a-a5a7-f2036e569e37",
      "compId": "bb442c96-6ff7-44bb-a170-dad217ca5981",
      "categoryId": "adult",
      "koiId": null,
      "category": null,
      "comp": null,
      "koi": null
    }
  ],
  "tblpredictions": [],
  "tblregistrations": [],
  "tblresults": [],
  "tblscores": [],
  "tbltasks": []
}
*/

// https://vietkoiexpo-backend.hiennguyendev.id.vn/api/CheckIn(lấy ra list checkin cá Koi vào các cuộc thi của  của userLogin, 0 là đang chờ duyệt, 1 là đã được duyệt, 2 là bị từ chối)

/*
[  {
    "checkInId": "3e907ecb-ef32-4956-ae69-0a67b312edd4",
    "imageUrl": "https://defaultimageurl.com/placeholder.jpg",
    "status": 1,
    "registrationId": "ce69673e-fb5b-435a-9959-c6b4942dc67f",
    "description": "",
    "registration": null
  },
  {
    "checkInId": "dc418e8f-648b-4b15-90d5-1d94e586eb9f",
    "imageUrl": "https://example.com/image_thao_showa.jpg",
    "status": 1,
    "registrationId": null,
    "description": "Check-in for Th?o’s Showa",
    "registration": null
  },
  {
    "checkInId": "a64621aa-be84-4cba-af95-1f3249f9f7be",
    "imageUrl": "http://example.com/images/tuan_anh_goromo.jpg",
    "status": 1,
    "registrationId": null,
    "description": "Checked in for competition.",
    "registration": null
  },]
 */
