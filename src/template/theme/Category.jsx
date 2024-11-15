import React from 'react';
import { useNavigate } from 'react-router-dom'; // Sử dụng react-router-dom để chuyển hướng
import logo2 from '../../asset/icon/register-svgrepo-com.svg';
import logo1 from '../../asset/icon/dashboard-builder-svgrepo-com.svg';
import logo3 from '../../asset/icon/prize-badge-with-star-and-ribbon-svgrepo-com.svg';
import './Slider.scss';

const Category = () => {
  const navigate = useNavigate(); // Hook để điều hướng

  const handleRedirect = (path) => {
    navigate(path); // Chuyển hướng tới đường dẫn được cung cấp
  };

  return (
    <div>
      <section className="category_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Danh mục</h2>
          </div>
          <div className="category_container">
            <div className="box" 
                 onClick={() => handleRedirect('/danh-sach-cuoc-thi')} 
                 style={{ cursor: 'pointer' }}>
              <div className="img-box">
                <img src={logo1} alt="" />
              </div>
              <div className="detail-box">
                <h5>Danh sách cuộc thi</h5>
              </div>
            </div>
            <div className="box" 
                 onClick={() => handleRedirect('/competition/landing')} 
                 style={{ cursor: 'pointer' }}>
              <div className="img-box">
                <img style={{ color: 'white' }} src={logo2} alt="" />
              </div>
              <div className="detail-box">
                <h5>Đăng kí thi đấu</h5>
              </div>
            </div>
            <div className="box" 
                 onClick={() => handleRedirect('/bang-thanh-tich')} 
                 style={{ cursor: 'pointer' }}>
              <div className="img-box">
                <img src={logo3} alt="" />
              </div>
              <div className="detail-box">
                <h5>Bảng thành tích</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
