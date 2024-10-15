import React from 'react';
import { Layout, Row, Col, Carousel, Card, List } from 'antd';
import ControlledOpenSpeedDialCustom from '../../component/shared/speed dial/SpeedDial';

const { Header, Footer, Content } = Layout;

const MemberPage = () => {
  const rankingData = [
    { title: 'Rank 1', description: 'Description 1' },
    { title: 'Rank 2', description: 'Description 2' },
    { title: 'Rank 3', description: 'Description 3' },
  ];

  const sponsorsData = [
    { name: 'Sponsor 1', logo: '' },
    { name: 'Sponsor 2', logo: '' },
    { name: 'Sponsor 3', logo: '' },
  ];

  return (
    <Layout style={{ width:'100vw'}}>
      {/* Fixed Header */}
      <Header style={{ }}>
        <h1>Member Page</h1>
      </Header>

      {/* Scrollable Content */}
      <Content style={{  }}>
        {/* Carousel */}
        <Carousel autoplay autoplaySpeed={5000} style={{height:'5rem' }}>
          <div>
            <h3>Slide 1</h3>
          </div>
          <div>
            <h3>Slide 2</h3>
          </div>
          <div>
            <h3>Slide 3</h3>
          </div>
        </Carousel>

        {/* Introduction */}
        <Row>
          <Col span={24}>
            <Card title="Introduction">
              <p>This is the introduction section.</p>
            </Card>
          </Col>
        </Row>
        {/* contest */}
        <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={8}>
            <Card title="Miscellaneous 1">
              <p>Content 2</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Miscellaneous 2">
              <p>Content 2</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Miscellaneous 3">
              <p>Content 3</p>
            </Card>
          </Col>
        </Row>
        {/* Koi competition */}

        <Row style={{ marginTop: '20px' }}>
          <Col span={16}>
            <Card title="">
             <img></img>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Koi Competition">
              <p>Content</p>
            </Card>
          </Col>
        </Row>
        {/* Ranking */}
        <Row style={{ marginTop: '20px' }}>
          <Col span={12}>
            <Card title="Ranking">
              <List
                itemLayout="horizontal"
                dataSource={rankingData}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={12}>
              {/* news */}
            <Card title="News">
              <p>News</p>
            </Card>

          </Col>
        </Row>       
        {/* Sponsors */}
        <Row gutter={16} style={{ marginTop: '20px' }}>
  {sponsorsData.map((sponsor, index) => (
    <Col span={8} key={index}>
      <Card cover={<img alt={sponsor.name} src={sponsor.logo} />}>
        <Card.Meta title={sponsor.name} />
      </Card>
    </Col>
  ))}
</Row>
      </Content>

      
      <Footer style={{ textAlign: 'center' }}>
        KoiExpo
      </Footer>


        {/* <ControlledOpenSpeedDialCustom /> */}

    </Layout>
  );
};

export default MemberPage;
