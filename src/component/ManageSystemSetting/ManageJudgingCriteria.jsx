import React from 'react';
import { Typography, List, Divider, Card, Steps } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

const ManageJudgingCriteria = () => {
  return (
    <div >
      <Card style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Typography>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>Tiêu Chí & Hạng Mục Đánh Giá Koi</Title>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Trong các cuộc thi cá Koi, vẻ đẹp và chất lượng của mỗi con cá được các giám khảo chuyên gia đánh giá cẩn thận. 
            Quá trình đánh giá dựa trên ba tiêu chí chính. Hãy cùng tìm hiểu các bước đánh giá cá Koi, 
            với những con cá Koi đẹp nhất sẽ trở thành người chiến thắng. 
          </Paragraph>

          <Divider />

          <Title level={4}>Quy Trình Đánh Giá Từng Bước:</Title>

          <Steps direction="vertical" size="default" current={3}>
            <Step
              title="Bước 1: Đánh Giá Hình Dáng (50%)"
              description={
                <Paragraph>
                  Tiêu chí đầu tiên và quan trọng nhất là <Text strong>hình dáng</Text> của cá Koi. Các giám khảo sẽ kiểm tra cẩn thận 
                  cấu trúc cơ thể tổng thể, đảm bảo rằng cá có hình dáng cân đối và tỷ lệ. Cá Koi lý tưởng nên có thân hình mượt mà, 
                  thon dài và đối xứng từ đầu đến đuôi. Bất kỳ khuyết điểm hoặc khiếm khuyết nào về hình dáng 
                  sẽ dẫn đến điểm số thấp hơn. Hình dáng chiếm <Text strong>50%</Text> tổng điểm.
                </Paragraph>
              }
            />
            <Step
              title="Bước 2: Phân Tích Màu Sắc (30%)"
              description={
                <Paragraph>
                  Tiêu chí thứ hai là <Text strong>màu sắc</Text>, chiếm <Text strong>30%</Text> tổng điểm. Các giám khảo tìm kiếm 
                  màu sắc sống động, sâu và rực rỡ. Màu sắc phải đồng nhất trên toàn bộ cơ thể, 
                  không có sự phai màu hoặc không đều. Cá Koi có màu sắc nổi bật và tinh khiết sẽ đạt điểm cao trong hạng mục này.
                </Paragraph>
              }
            />
            <Step
              title="Bước 3: Đánh Giá Hoa Văn (20%)"
              description={
                <Paragraph>
                  Tiêu chí cuối cùng là <Text strong>hoa văn</Text> của cá Koi, chiếm <Text strong>20%</Text> tổng điểm. 
                  Hoa văn là sự sắp xếp độc đáo của các màu sắc trên cơ thể cá. Các giám khảo ưa thích những con cá Koi có 
                  hoa văn đối xứng và cân đối, với các đường viền rõ ràng và sắc nét giữa các khu vực màu sắc khác nhau. 
                  Một con cá Koi có hoa văn đẹp có thể nâng cao đáng kể vẻ đẹp thẩm mỹ của nó.
                </Paragraph>
              }
            />
          </Steps>

          <Divider />

          <Title level={4}>Tính Toán Kết Quả Cuối Cùng:</Title>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Sau khi mỗi giám khảo đã chấm điểm cá Koi trong tất cả ba hạng mục, điểm số cuối cùng sẽ được tính toán. Có một số phương pháp 
            để xác định người chiến thắng:
          </Paragraph>
          <List
            header={<Text strong>Các Phương Pháp Thông Thường Để Xác Định Kết Quả Cuối Cùng:</Text>}
            bordered
            dataSource={[
              'Tổng điểm cao nhất từ tất cả các giám khảo.',
              'Cá Koi có số điểm cao nhất trong các hạng mục riêng lẻ.',
              'Điểm trung bình có trọng số kết hợp tất cả các tiêu chí dựa trên tỷ lệ phần trăm của chúng (50% hình dáng, 30% màu sắc, 20% hoa văn).'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />

          <Divider />

          <Title level={4}>Phân Loại Tự Động:</Title>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Mỗi con cá Koi sẽ được tự động phân vào một trong sáu hạng mục thi đấu dựa trên các tiêu chí đã định trước. Việc phân loại 
            xem xét ba yếu tố chính: <Text strong>giống loài</Text>, <Text strong>kích thước</Text>, và <Text strong>tuổi</Text>. Các hạng mục này đảm bảo sự công bằng bằng cách nhóm các con cá Koi có đặc điểm tương tự lại với nhau.
          </Paragraph>

          <List
            header={<Text strong>Các Hạng Mục Thi Đấu:</Text>}
            bordered
            dataSource={[
              'Grand Champion - Giải thưởng danh giá nhất, dành cho con cá Koi xuất sắc nhất.',
              'Sakura Champion - Trao cho con cá Koi xuất sắc nhất trong giống "Sakura".',
              'Mature Champion - Dành cho con cá Koi xuất sắc nhất trong hạng mục "Mature" (cá lớn, già hơn).',
              'Adult Champion - Cá Koi xuất sắc nhất trong nhóm tuổi trưởng thành.',
              'Young Champion - Cá Koi xuất sắc nhất trong hạng mục trẻ, tập trung vào những nhà vô địch tương lai đầy triển vọng.',
              'Baby Champion - Trao cho con cá Koi trẻ xuất sắc nhất, thể hiện tiềm năng phát triển và vẻ đẹp trong tương lai.'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />

          <Paragraph style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.6' }}>
            Việc phân loại dựa trên các tiêu chí sau:
          </Paragraph>

          <List
            header={<Text strong>Tiêu Chí Phân Loại:</Text>}
            bordered
            dataSource={[
              'Giống Loài - Các giống cá Koi khác nhau được đánh giá dựa trên các đặc điểm độc đáo của chúng.',
              'Kích Thước - Cá Koi được nhóm vào các hạng mục tùy thuộc vào kích thước của chúng để đảm bảo sự công bằng.',
              'Tuổi - Tuổi đóng vai trò quan trọng, với các con cá Koi trẻ và già thi đấu trong các hạng mục khác nhau.'
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />

          <Divider />

          <Paragraph style={{ textAlign: 'center', marginTop: '20px', fontSize: '16px' }}>
            <Text italic>“Vẻ đẹp thực sự của một con cá Koi không chỉ nằm ở ngoại hình, mà còn ở cách nó thu hút ánh nhìn qua tất cả các hạng mục, bất kể tuổi tác hay kích thước.”</Text>
          </Paragraph>
        </Typography>
      </Card>
    </div>
  );
};

export default ManageJudgingCriteria;
