import React, { useState } from "react";
import "./landing.scss";
import logo from "../assets/logo.png";
import bgMain from "../assets/bg-nguyenducdien.jpg";
import imgTime from "../assets/landing/time1.svg";
import imgStatistical from "../assets/landing/statistical.svg";
import imgReport from "../assets/landing/report.svg";
import { useRef } from "react";
import { FaPhone, FaMailBulk, FaUser } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import MapsGoogle from "../components/map/MapsGoogle";
// https://codepen.io/norcal82/full/DjpyNQ
const Register = () => {
  const refToggle = useRef(null);
  // const [toogle, setToogle] = useState(false);
  const handleClick = (event) => {
    // 👇️ toggle class on click
    // setToogle(!toogle);
    // console.log(toogle);
    refToggle.current.classList.toggle("header-toggle");
    // if (!toogle) {
    //   refToggle.current.classList.add("header-toggle");
    // } else {
    //   refToggle.current.classList.remove("header-toggle");
    // }
  };
  const [isShowMap, setIsShowMap] = useState(false);
  const handleShowmap = (e) => {
    setIsShowMap((pre) => !pre);
  };
  return (
    <div className="landing">
      <div className="header" ref={refToggle}>
        <div className="header-logo">
          <div className="header-logo-image">
            <img src={logo} alt="Logo vpcc Nguyễn Đức Điền" />
          </div>
          <div className="header-logo-text">
            <p>Văn phòng công chứng</p>
            <p>Nguyễn Đức Điền</p>
            <p>An Toàn – Uy Tín – Tận Tâm</p>
          </div>
        </div>
        <div className="header-address">
          <div className="header-address-title">Địa chỉ</div>
          <div className="header-address-main" onClick={handleShowmap}>
            393C Nguyễn Bình, Phú Xuân, Nhà Bè
          </div>
        </div>
        <div className="header-menu">
          <div className="header-menu-item">
            <button className="glow-on-hover">Đăng Nhập</button>
          </div>
        </div>
        <div className="triangle-dow" onClick={handleClick}>
          <p></p>
        </div>
      </div>
      <div className="sub-header"></div>
      <div
        className="landing-main"
        // style={{ backgroundImage: `url(${bgMain})` }}
      >
        <div className="landing-main-title">
          <h1>
            Phần mềm <strong>văn thư</strong> công chứng
          </h1>
          <div className="content">
            <div className="content-left">
              <h3 className="content-left-title">
                Khó khăn khi quản lý hồ sơ nợ bằng cách viết tay
              </h3>

              <div className="content-left-main">
                <div className="main-sub">
                  - Một ngày có tầm hơn 20 bộ hồ sơ => viết tay rất lâu.
                </div>
                <div className="main-sub">
                  - Khi kiểm tra hồ sơ thì dễ sai sót trong việc ✔ => Phải cẩn
                  thận thì mất thời gian.
                </div>
                <div className="main-sub">
                  - Thống kê số lượng hồ sơ nợ => Rất khó khăn => Mất rất nhiều
                  thời gian.
                </div>
                <div className="main-sub">
                  - Mỗi lần báo cáo với Sếp thì lại là 1 lần thống kê => Rất khó
                  khăn.
                </div>
                <div className="main-sub">
                  - Việc báo cáo không linh động. Phải lên gặp trực tiếp Sếp để
                  báo cáo hoặc đánh máy rồi gửi Sếp thì cũng mất thời gian.
                </div>
              </div>
            </div>
            <div className="content-middle">
              <p>Văn Thư</p>
            </div>
            <div className="content-right">
              <h3 className="content-right-title">sự ra đời ?</h3>
              <div className="content-right-main">
                <div className="content-right-main-intro">
                  {/* Phần mềm văn thư công chứng ra đời với mục tiêu là : */}
                </div>
                <div className="main-sub">
                  1)Đánh dấu những hồ sơ mà thư ký đã trả
                </div>
                <div className="main-sub">
                  2)Liệt kê những thư ký nợ hồ sơ và nợ những bộ nào
                </div>
                <div className="main-sub">
                  3)Thống kê bằng biểu đồ và số liệu để tiện báo cáo với Sếp
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-main-content">
          <div className="landing-main-content-text">
            <div className="text-left">Phần mềm</div>
            <div className="text-middle">Văn Thư</div>
            <div className="text-right">Công chứng là . . .</div>
          </div>
          <div className="landing-main-content-body">
            <div
              className="time"
              style={{ backgroundImage: `url(${imgTime})` }}
            >
              Tiết kiệm thời gian
            </div>
            <div
              className="statistical"
              style={{ backgroundImage: `url(${imgStatistical})` }}
            >
              Thống kê nhanh chóng
            </div>
            <div
              className="report"
              style={{ backgroundImage: `url(${imgReport})` }}
            >
              Báo cáo dễ dàng
            </div>
          </div>
        </div>
        <div className="landing-main-info">
          <div className="landing-main-info-main">
            <div className="landing-main-info-main-item">
              <div className="item-icon">
                <FaPhone />
              </div>
              <div className="item-content">0969 229 489</div>
            </div>
            <div className="landing-main-info-main-item">
              <div className="item-icon">
                <FaUser />
              </div>
              <div className="item-content">Nguyễn Văn Công</div>
            </div>
            <div className="landing-main-info-main-item">
              <div className="item-icon">
                <FaMailBulk />
              </div>
              <div className="item-content">nguyenvancong.nvc@gmail.com</div>
            </div>
          </div>
          <div className="landing-main-info-extend">
            <div className="extend-title">Thông tin liên hệ</div>
            <div className="extend-icon">
              <TiMessages />
            </div>
            <div className="extend-content">
              <p>
                Trong quá trình sử dụng có gì thắc mắc xin liên hệ với tôi. Tôi
                sẽ hồi đáp sớm nhất có thể
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-line"></div>
        <div className="footer-content">
          <div className="footer-content-copy">
            Copyright 2022 © vanthucongchung.com
          </div>
          <div className="footer-content-design">
            Thiết kế bởi Văn Thư - Văn phòng Công Chứng Nguyễn Đức Điền
          </div>
        </div>
      </div>
      {/* <div className="map">
        <iframe
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=vpcc%20nguyen%20duc%20dien&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        ></iframe>
      </div> */}
      <MapsGoogle isToggle={isShowMap} />
    </div>
  );
};
//tiet kiem tgian, thong ke nhanh chong, bao cao de dang
export default Register;
