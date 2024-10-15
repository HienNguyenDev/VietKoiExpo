import { Col, Row, Button, Card, Typography, List, Carousel, Pagination, Drawer, Form, Input, Upload, Modal } from 'antd';
import { UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from '../../asset/scss/ManageNewsUpdatesPage.module.scss';

const { Title, Paragraph } = Typography;
const { confirm } = Modal;

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const ManageNewsUpdatesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('Create News');
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [form] = Form.useForm();
  const itemsPerPage = 3;

  const newsData = [
    { id: 1, author: 'staff1', dateCreate: '28-10-2023', title: 'News Title 1', content: 'lorem12', description: 'News description 1' },
    { id: 2, author: 'staff1', dateCreate: '28-10-2023', title: 'News Title 2', content: 'lorem12', description: 'News description 2' },
    { id: 3, author: 'staff1', dateCreate: '28-10-2023', title: 'News Title 3', content: 'lorem12', description: 'News description 3' },
    { id: 4, author: 'staff1', dateCreate: '28-10-2023', title: 'News Title 4', content: 'lorem12', description: 'News description 4' },
    { id: 5, author: 'staff1', dateCreate: '28-10-2023', title: 'News Title 5', content: 'lorem12', description: 'News description 5' },
    { id: 6, author: 'staff1', dateCreate: '28-10-2023', title: 'News Title 6', content: 'lorem12', description: 'News description 6' },
    { id: 7, author: 'staff1', dateCreate: '28-10-2023', title: 'News Title 7', content: 'lorem12', description: 'News description 7' },
    { id: 8, author: 'staff1', dateCreate: '28-10-2023', title: 'News Title 8', content: 'lorem12', description: 'News description 8' },
    { id: 9, author: 'staff1', dateCreate: '28-10-2023', title: 'News Title 9', content: 'lorem12', description: 'News description 9' },
    { id: 10, author: 'staff1', dateCreate: '28-10-2023', title: 'News Title 10', content: 'lorem12', description: 'News description 10' },
  ];

  const onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
    setCurrentPage(pageNumber);
  };

  const showDrawer = (title, data = {}) => {
    setDrawerTitle(title);
    form.setFieldsValue(data);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    form.resetFields();
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure delete this news?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      onOk() {
        console.log('Deleted news with id:', id);
        // Add your delete logic here
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const showViewModal = (news) => {
    setSelectedNews(news);
    setViewModalVisible(true);
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedNews(null);
  };

  // Calculate the news items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNewsData = newsData.slice(startIndex, endIndex);

  return (
    <div className={styles.manageNewsUpdatesPage}>
      <div className={styles.containerNews}>
        <Row gutter={16}>
          <Col span={12}>
            <div className={styles.viewComponent}>
              <Card title="View All News" className={styles.viewAllCard}>
                <List
                  itemLayout="vertical"
                  dataSource={currentNewsData}
                  renderItem={item => (
                    <List.Item className={styles.viewAllContentItem}>
                      <div className={styles.newsHeader}>
                        <Title level={4} className={styles.newsTitle}>{item.title}</Title>
                        <div className={styles.newsActions}>
                          <Button type="default" className={styles.updateButton} onClick={() => showDrawer('Update News', item)}>Update</Button>
                          <Button type="danger" className={styles.deleteButton} onClick={() => showDeleteConfirm(item.id)}>Delete</Button>
                        </div>
                      </div>
                      <Paragraph className={styles.newsContent}>{item.description}</Paragraph>
                      <Button type="primary" className={styles.viewButton} onClick={() => showViewModal(item)}>View</Button>
                    </List.Item>
                  )}
                />
                <Pagination
                  showQuickJumper
                  current={currentPage}
                  total={newsData.length}
                  pageSize={itemsPerPage}
                  onChange={onChange}
                  className={styles.pagination}
                />
              </Card>
            </div>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={24}>
                <Row gutter={16} className={styles.containerFunction}>
                  <Col span={24}>
                    <Card className={styles.functionCard}>
                      <Button type="primary" className={styles.createNewsButton} onClick={() => showDrawer('Create News')}>Create News</Button>
                    </Card>
                  </Col>
                </Row>
              </Col>
              <Col span={24} style={{ paddingTop: '40px', height: '230px' }}>
                <div className={styles.templateComponent} style={{ height: '100%' }}>
                  <h1>Choose template for the news</h1>
                  <Row style={{ height: '100%', marginTop: '20px' }}>
                    <Col span={8}>
                      <div style={{ height: '100%', background: 'red' }} className={styles.box1}>1</div>
                    </Col>
                    <Col span={8}>
                      <div style={{ height: '100%', background: 'blue' }} className={styles.box2}>2</div>
                    </Col>
                    <Col span={8}>
                      <div style={{ height: '100%', background: 'green' }} className={styles.box3}>3</div>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col span={24}>
                {/* <Carousel afterChange={onChange} className={styles.carousel}>
                  <div>
                    <h3 style={contentStyle}>1</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>2</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>3</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>4</h3>
                  </div>
                </Carousel> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Drawer
        title={drawerTitle}
        width={720}
        onClose={closeDrawer}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" hideRequiredMark form={form}>   
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input placeholder="Please enter the title" />
          </Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Please enter the author' }]}
          >
            <Input placeholder="Please enter the author" />
          </Form.Item>
          <Form.Item
            name="dateCreate"
            label="Date Created"
            rules={[{ required: true, message: 'Please enter the date created' }]}
          >
            <Input placeholder="Please enter the date created" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea rows={2} placeholder="Please enter the description" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter the content' }]}
          >
            <Input.TextArea rows={4} placeholder="Please enter the content" />
          </Form.Item>
          <Form.Item
            name="photo"
            label="Photo"
            rules={[{ required: true, message: 'Please upload a photo' }]}
          >
            <Upload
              name="photo"
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={closeDrawer}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Modal
        title="News Details"
        visible={viewModalVisible}
        onCancel={closeViewModal}
        footer={[
          <Button key="close" onClick={closeViewModal}>
            Close
          </Button>,
        ]}
      >
        {selectedNews && (
          <div>
            <p><strong>ID:</strong> {selectedNews.id}</p>
            <p><strong>Title:</strong> {selectedNews.title}</p>
            <p><strong>Author:</strong> {selectedNews.author}</p>
            <p><strong>Date Created:</strong> {selectedNews.dateCreate}</p>
            <p><strong>Description:</strong> {selectedNews.description}</p>
            <p><strong>Content:</strong> {selectedNews.content}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageNewsUpdatesPage;