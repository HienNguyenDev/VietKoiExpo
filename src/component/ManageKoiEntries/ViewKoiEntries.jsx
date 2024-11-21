import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Card, Image, Spin, Button, Modal, Input, Form, Select, message, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateKoiDetail } from '../../store/redux/action/koiRegisterAction';
import axios from 'axios';
import UploadImageComponent from '../../component/shared/UploadImage/UploadImage';
import AccountMenu from '../../component/shared/AccountMenu/AccountMenu';
import moment from 'moment';

const { Header, Content } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

const ViewKoiEntries = () => {
  const [localKoi, setLocalKoi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentKoi, setCurrentKoi] = useState(null);
  const [form] = Form.useForm();
  
  const userId = useSelector(state => state.userReducer.userLogin.userId);
  const fullName = useSelector(state => state.userReducer.userLogin.fullName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentTheme = {
    palette: {
      background: { default: '#f0f2f5' },
      primary: { main: '#1890ff' },
      text: { primary: '#333' }
    }
  };

  useEffect(() => {
    const fetchKoiEntries = async () => {
      try {
        const response = await axios.get(`https://vietkoiexpo-backend.hiennguyendev.id.vn/api/Koifish/user/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        setLocalKoi(response.data);
      } catch (error) {
        message.error('Lỗi khi lấy dữ liệu cá Koi');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchKoiEntries();
    }
  }, [userId]);

  const handleUpdate = (koi) => {
    console.log('Bắt đầu cập nhật cá Koi:', koi);
    setCurrentKoi(koi);
    setIsModalVisible(true);
    const formValues = {
      koiName: koi.koiName,
      size: Number(koi.size),
      age: koi.age,
      varietyId: koi.varietyId,
      imageUrl: koi.imageUrl,
      certificateImageUrl: koi.certificateImageUrl,
      birthDate: koi.birthDate ? moment(koi.birthDate) : null,
      userId: userId,
      status: koi.status
    };
    console.log('Thiết lập giá trị form:', formValues);
    form.setFieldsValue(formValues);
  };

  const handleDelete = (koi) => {
    dispatch(updateKoiDetail(koi.koiId, { 
      koiName: koi.koiName,
      size: koi.size,
      age: koi.age,
      varietyId: koi.varietyId,
      imageUrl: koi.imageUrl,
      certificateImageUrl: koi.certificateImageUrl,
      birthDate: koi.birthDate,
      userId,
      status: false
    }));
    setLocalKoi((prev) => prev.filter((a) => a.koiId !== koi.koiId));
    message.success('Xóa cá Koi thành công');
  };

  const handleModalOk = async (values) => {
    try {
      const { koiName, size, age, varietyId, imageUrl, certificateImageUrl, birthDate } = values;
  
      // Format birthDate using native JavaScript Date methods
      const formattedBirthDate = birthDate ? new Date(birthDate).toISOString().split('T')[0] : currentKoi?.birthDate;
  
      const updatedData = { 
        koiName, 
        size: Number(size), // Ensure size is a number
        age: Number(age), // Ensure age is a number
        varietyId, 
        imageUrl, 
        certificateImageUrl, 
        birthDate: formattedBirthDate,
        userId, 
        status: true 
      };
  
      console.log('Sending update data:', updatedData); // Debug log
  
      await dispatch(updateKoiDetail(currentKoi.koiId, updatedData));
  
      setLocalKoi((prev) =>
        prev.map((koi) =>
          koi.koiId === currentKoi.koiId ? { ...koi, ...updatedData } : koi
        )
      );
  
      setIsModalVisible(false);
      message.success('Cập nhật cá Koi thành công');
    } catch (error) {
      console.error('Lỗi cập nhật:', error);
      message.error('Cập nhật thất bại: ' + error.response?.data?.BirthDate?.[0] || error.message);
    }
  };
  

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw', backgroundColor: currentTheme.palette.background.default }}>
      <Header
        style={{
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: currentTheme.palette.background.default,
          position: 'fixed',
          width: '100%'
        }}
      >
        <div>
          <Title style={{ color: currentTheme.palette.text.primary }}>
            Danh sách cá Koi của {fullName}
          </Title>
        </div>
        <AccountMenu />
      </Header>
      <Content style={{ marginTop: 64 }}>
        <Row gutter={[16, 16]}>
          {localKoi.map((koi) => (
            <Col span={8} key={koi.koiId}>
              <Card
                hoverable
                cover={<Image alt="Koi" src={koi.imageUrl} />}
                actions={[
                  <Button type="link" onClick={() => handleUpdate(koi)}>Cập nhật</Button>,
                  <Button type="link" danger onClick={() => handleDelete(koi)}>Xóa</Button>,
                ]}
              >
                <Title level={4}>{koi.koiName}</Title>
                <Text>{`Kích thước: ${koi.size}, Tuổi: ${koi.age}, Giống: ${koi.varietyId}`}</Text>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Modal for updating koi details */}
        <Modal
          title="Cập nhật cá Koi"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          onOk={() => form.submit()}
        >
          <Form
            form={form}
            onFinish={handleModalOk}
            layout="vertical"
          >
            <Form.Item name="koiName" label="Tên cá" rules={[{ required: true }]}>
              <Input placeholder="Vui lòng nhập tên cá Koi" />
            </Form.Item>
            <Form.Item name="size" label="Kích thước" rules={[{ required: true }]}>
              <Input type="number" placeholder="Vui lòng nhập kích thước" />
            </Form.Item>
            <Form.Item name="age" label="Tuổi" rules={[{ required: true }]}>
              <Input type="number" placeholder="Vui lòng nhập tuổi cá" />
            </Form.Item>
            <Form.Item name="varietyId" label="Giống cá" rules={[{ required: true }]}>
              <Select placeholder="Chọn giống cá">
                <Option value="1">Giống 1</Option>
                <Option value="2">Giống 2</Option>
                {/* Add other varieties here */}
              </Select>
            </Form.Item>
            {currentKoi && (
  <Form.Item name="birthDate" label="Ngày sinh">
    <DatePicker value={currentKoi?.birthDate ? moment(currentKoi.birthDate) : null} format="YYYY-MM-DD" />
  </Form.Item>
)}

            <Form.Item name="imageUrl" label="Hình ảnh">
              <UploadImageComponent />
            </Form.Item>
            <Form.Item name="certificateImageUrl" label="Hình ảnh chứng nhận">
              <UploadImageComponent />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ViewKoiEntries;
