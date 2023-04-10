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
import Modal from "../components/modal/Modal";
import Helmet from "../components/Helmet";
import { Link } from "react-router-dom";
import Grid from "../components/grid/Grid";
// https://codepen.io/norcal82/full/DjpyNQ
const Landing = () => {
  const refToggle = useRef(null);
  const refHide = useRef(null);
  // const [toogle, setToogle] = useState(false);
  const handleClick = (event) => {
    // 👇️ toggle class on click
    // setToogle(!toogle);
    // console.log(toogle);
    refToggle.current.classList.toggle("header-toggle");
    refHide.current.classList.toggle("triangle-dow-text-hide");
    // if (!toogle) {
    //   refToggle.current.classList.add("header-toggle");
    // } else {
    //   refToggle.current.classList.remove("header-toggle");
    // }
  };
  let _do1, _do2, _do3;
  const t1 = "✺ Tiết kiệm ✦ ✦ thời gian ✺ ";
  const t2 = "✺ Thống kê ✦ ✦ nhanh chóng ✺ ";
  const t3 = "✺ Báo cáo ✦ ❋ ✦ dễ dàng ✺ ❋";
  _do1 = 360 / t1.length;
  _do2 = 360 / t2.length;
  _do3 = 360 / t3.length;
  const [modalShown, toggleModal] = useState(false);
  const handleClickHome = () => {
    window.location.replace("https://congchungnhabe.com/");
  };
  const handleShowmap = (e) => {
    // setIsShowMap((pre) => !pre);
  };
  return (
    <Helmet title="Xin Chào">
      <div className="landing">
        <div className="header" ref={refToggle}>
          <div className="header-logo">
            <div className="header-logo-image">
              <div className="header-logo-image-content">
                <img src={logo} alt="Logo vpcc Nguyễn Đức Điền" />
                <h2>Trang văn phòng</h2>
                <button onClick={handleClickHome}>xem</button>
              </div>
            </div>
            <div className="header-logo-text">
              <p>Văn phòng công chứng</p>
              <p>Nguyễn Đức Điền</p>
              <p>An Toàn – Uy Tín – Tận Tâm</p>
            </div>
          </div>
          <div className="header-address">
            <div className="header-address-title">Địa chỉ</div>
            <div
              className="header-address-main "
              onClick={() => {
                toggleModal(!modalShown);
              }}
            >
              393C Nguyễn Bình, Phú Xuân, Nhà Bè
            </div>
          </div>
          <div className="header-menu">
            <div className="header-menu-item">
              <Link to="/login">
                <button className="glow-on-hover">Đăng Nhập</button>
              </Link>
            </div>
          </div>
          <div className="triangle-dow"></div>
          <div
            className="triangle-dow-text"
            onClick={handleClick}
            ref={refHide}
          >
            <div className="triangle-dow-text-h"></div>
            <div className="triangle-dow-text-v"></div>
          </div>

          <Modal
            shown={modalShown}
            close={() => {
              toggleModal(false);
            }}
          >
            <MapsGoogle />
          </Modal>
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
                    - Thống kê số lượng hồ sơ nợ => Rất khó khăn => Mất rất
                    nhiều thời gian.
                  </div>
                  <div className="main-sub">
                    - Mỗi lần báo cáo với Sếp thì lại là 1 lần thống kê => Rất
                    khó khăn.
                  </div>
                  <div className="main-sub">
                    - Việc báo cáo không linh động. Phải lên gặp trực tiếp Sếp
                    để báo cáo hoặc đánh máy rồi gửi Sếp thì cũng mất thời gian.
                  </div>
                </div>
              </div>
              <div className="content-middle">
                <div className="circle">
                  <div className="circle-name-office"></div>
                  <div className="circle-number"></div>
                  <div className="circle-name-notary"></div>
                  <div className="circle-save"></div>
                  <div className="circle-excerpt"></div>
                  <div className="circle-text">văn thư</div>
                </div>
              </div>
              <div className="content-right">
                <h3 className="content-right-title">Sự ra đời ?</h3>
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
              <div className="time">
                <div className="time-image">
                  <img src={imgTime} />
                  <p>Tiết kiệm thời gian</p>
                </div>
                <div className="main-circle">
                  {t1.split("").map((item, i) => (
                    <span
                      key={i}
                      style={{ transform: `rotate(${i * _do2}deg)` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className="statistical"
                style={{ backgroundImage: `url(${imgStatistical})` }}
              >
                <p>Thống kê nhanh chóng</p>
                <div className="statistical-main-circle">
                  {t2.split("").map((item, i) => (
                    <span
                      key={i}
                      style={{ transform: `rotate(${i * _do1}deg)` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className="report"
                style={{ backgroundImage: `url(${imgReport})` }}
              >
                <p>Báo cáo dễ dàng</p>
                <div className="report-main-circle">
                  {t3.split("").map((item, i) => (
                    <span
                      key={i}
                      style={{ transform: `rotate(${i * _do1}deg)` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="landing-main-info">
            <div className="landing-main-info-main">
              <div className="landing-main-info-main-item">
                <div className="item-icon">
                  <FaPhone />
                </div>
                <div className="item-content">
                  <span className="title-word title-word-1">091 </span>
                  <span className="title-word title-word-2">181 </span>
                  <span className="title-word title-word-3">4004</span>
                </div>
              </div>
              <div className="landing-main-info-main-item">
                <div className="item-icon-user">
                  <FaUser />
                </div>
                <div className="item-content">Nguyễn Văn Công</div>
              </div>
              <div className="landing-main-info-main-item">
                <div className="item-icon-email">
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
                  Trong quá trình sử dụng có gì thắc mắc xin liên hệ với tôi.
                </p>
                <p>Tôi sẽ hồi đáp sớm nhất khi có thể</p>
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
              <p className="design">Thiết kế bởi Văn Thư </p> {"  -  "}
              <p className="animate-charcter"> Văn</p> phòng{" "}
              <p className="animate-charcter"> Công</p> Chứng{" "}
              <p className="animate-charcter">Nguyễn</p> Đức Điền
            </div>
          </div>
        </div>
        {/* <div className="circle-main">
          <div className="vuong"></div>
          <div className="circle-11"></div>
        </div> */}
      </div>
    </Helmet>
  );
};
//tiet kiem tgian, thong ke nhanh chong, bao cao de dang
export default Landing;
