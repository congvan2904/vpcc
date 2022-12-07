import React, { useState } from "react";
import "./landing.scss";
import logo from "../assets/logo.png";
import bgMain from "../assets/bg-nguyenducdien.jpg";
import { useRef } from "react";
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
          </div>
        </div>
        <div className="header-menu">
          <div className="header-menu-item">
            <button>Đăng Nhập</button>
          </div>
        </div>
        <div className="triangle-dow" onClick={handleClick}>
          <p></p>
        </div>
      </div>
      <div className="sub-header"></div>
      <div
        className="landing-main"
        style={{ backgroundImage: `url(${bgMain})` }}
      >
        <div className="landing-main-title">
          <h1>
            Phần mềm <strong>văn thư</strong> công chứng
          </h1>
          <div className="content">
            <div className="content-left">
              <h3 className="content-left-title">sự ra đời ?</h3>
              <p>
                Công việc văn thư với khó khăn trong việc quản lý hồ sơ.Đặc biệt
                là những hồ sơ thư ký nợ.Khi mới vào làm thì tôi viết tay danh
                sách hồ sơ của thư ký nào làm.Nhưng do mất quá nhiều thời gian
                thì Chúng Tôi đã lập danh sách trên Excel và Chúng tôi hàng ngày
                phải in danh sách những hồ sơ được phát hành.Sáng hôm sau chúng
                tôi sẽ trả lại những hồ sơ cho thư ký.Sau khi thư kí viết bút
                lục và ký tên thì gửi cho Chúng Tôi và Chúng tôi sẽ đánh dấu ✔.
                Nhưng vấn đề ở đây là hồ sơ nợ từ thư ký mỗi lần đưa cho văn thư
                có khi lên tới 150 bộ.Khiến công việc kiểm tra trên giấy tờ rất
                khó và nhiều khi ✔ sai.Đồng thời để tìm thư ký đã nợ bao nhiêu
                hồ sơ thì rất khó.Mỗi khi Sếp hỏi hồ sơ nợ của thư ký thì Chúng
                Tôi rất khó để trả lời.Vì vậy Chúng Tôi đã nghĩ đến việc quản lý
                hồ sơ nợ bằng phần mền sẽ nhanh chóng và tiện lợi hơn so với
                việc quản lý hồ sơ nợ trên gấy tờ.Đó là lý do Phần Mền Văn Thư
                Công Chứng ra đời với 1 mục tiêu duy nhất là để nhanh chóng trả
                lời số hồ sơ mà thư ký đã nợ là bao nhiêu và tổng số hồ sơ nợ là
                bao nhiêu mỗi khi Sếp hỏi.
              </p>
            </div>
            <div className="content-middle">
              <p>Văn Thư</p>
            </div>
            <div className="content-right">
              <p>
                Phần mềm văn thư công chứng ra đời với mục tiêu là : 1)Đánh dấu
                những thư ký đã trả hồ sơ 2)Liệt kê những thư ký nợ hồ sơ và nợ
                những bộ nào 3)Thống kê bằng biểu đồ và số liệu để tiện báo cáo
                với Sếp
              </p>
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
            <p className="time">Thời gian</p>
            <p className="statistical">Thống kê</p>
            <p className="report">Báo cáo</p>
          </div>
        </div>
        <div className="landing-main-info">Info</div>
      </div>
    </div>
  );
};

export default Register;
