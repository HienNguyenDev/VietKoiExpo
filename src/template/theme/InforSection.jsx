import React from 'react';
import './Slider.scss';

const InfoSection = () => {
  return (
    <section className="info_section">
      <div className="info_container layout_padding-top">
        <div className="container">
          <div className="info_top">
            <div className="info_logo">
              <img src="images/logo.png" alt="" />
              <span>VietKoiExpo</span>
            </div>
            <div className="social_box">
            </div>
          </div>

          <div className="info_main">
            <div className="row">
              <div className="col-md-3 col-lg-2">
                <div className="info_link-box">
                  <h5>Useful Link</h5>
                  <ul>
                    <li>
                      <a href="home/view-koiview-koi">Quản lí cá Koi</a>
                    </li>
                    <li>
                      <a href="assignKoi">Đăng kí cá Koi</a>
                    </li>
                    <li>
                      <a href="category.html">Thông báo</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-3">
                <h5>Văn phòng</h5>
                <p>
                 Nhà văn hóa sinh viên Làng Đại học
                </p>
              </div>

              <div className="col-md-3 col-lg-2 offset-lg-1">
                <h5>Thông tin</h5>
                <p>
                    Muốn tìm hiểu thêm thông tin về trang web vui lòng liên hệ số điện thoại và email bên dưới
                </p>
              </div>

              <div className="col-md-3 offset-lg-1">
                <div className="info_form">
                  <h5>Để lại email để thêm thông tin chi tiết</h5>
                  <form action="">
                    <input type="email" placeholder="Email" />
                    <button>Nhận thêm nhiều thông tin hơn</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 col-md-10 mx-auto">
              <div className="info_contact layout_padding2">
                <div className="row">
                  <div className="col-md-3">
                    <a href="#" className="link-box">
                      <div className="img-box">
                        <img src="images/location.png" alt="" />
                      </div>
                      <div className="detail-box">
                        <h6>Vè lại đầu trang?</h6>
                      </div>
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a href="#" className="link-box">
                      <div className="img-box">
                        <img src="images/mail.png" alt="" />
                      </div>
                      <div className="detail-box">
                        <h6>demo@vietkoiexpo.com</h6>
                      </div>
                    </a>
                  </div>
                  <div className="col-md-5">
                    <a href="#" className="link-box">
                      <div className="img-box">
                        <img src="images/call.png" alt="" />
                      </div>
                      <div className="detail-box">
                        <h6>Call +01 1234567890</h6>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InfoSection;