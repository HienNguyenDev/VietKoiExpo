import React from 'react';
import { Typography } from '@material-ui/core';
import './Slider.scss';
import koi3 from '../../asset/icon/koi3.png';
import sea from '../../asset/photo/sea.jpg';
const AboutSection = ({ currentTheme }) => {
  return (
    <section className="about_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-lg-9 mx-auto">
            <div className="img-box">
              <img style={{width:'300px'}} src={koi3} alt="" />
            </div>
          </div>
        </div>
        <div className="detail-box" >
          <Typography variant="body1" style={{ marginBottom: '10px' }}>
            <strong>Quy Định Cuộc Thi:</strong>
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '10px' }}>
            1. Tất cả các thí sinh phải đăng ký cá Koi của mình trước ngày bắt đầu cuộc thi.
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '10px' }}>
            2. Mỗi thí sinh được đăng ký tối đa 3 con cá Koi.
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '10px' }}>
            3. Cá Koi phải khỏe mạnh và không có bất kỳ bệnh tật nào.
          </Typography>
          <Typography variant="body1" style={{ marginBottom: '10px' }}>
            <strong>Tiêu Chí Chấm Điểm:</strong>
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '10px' }}>
            1. Màu sắc và Hoa văn: Độ rực rỡ và sự độc đáo của màu sắc và hoa văn của cá Koi.
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '10px' }}>
            2. Hình dáng cơ thể: Hình dáng tổng thể và sự cân đối của cá Koi.
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '10px' }}>
            3. Sức khỏe và Sự linh hoạt: Sức khỏe, chuyển động và sự linh hoạt của cá Koi.
          </Typography>
          <Typography variant="body2" style={{ marginBottom: '10px' }}>
            4. Kích thước: Kích thước của cá Koi so với độ tuổi của nó.
          </Typography>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;