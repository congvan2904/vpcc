import "./body.scss";
import imgContract from "../../assets/manage/contract.svg";
import imgContracts from "../../assets/manage/contracts.svg";
import imgUser from "../../assets/manage/user.svg";
import imgAccount from "../../assets/manage/account.svg";
import imgManage from "../../assets/manage/setting.svg";
import { useRef, useState } from "react";
const IconsTop = [
  {
    display: "Hợp đồng mới",
    path: "./contracts",
    icon: imgContract,
  },
  {
    display: "Hợp đồng ",
    path: "./contracts",
    icon: imgContracts,
  },
  {
    display: "Người dùng",
    path: "./contracts",
    icon: imgUser,
  },
];
const IconsBottom = [
  {
    display: "Thông tin tài khoản",
    path: "./contracts",
    icon: imgAccount,
  },
  {
    display: "Quản lý ",
    path: "./contracts",
    icon: imgManage,
  },
];
const Body = () => {
  const refActive = useRef(null);
  const [active, setActive] = useState("");

  const toggleActive = (event) => {
    setActive(event.target.alt);
  };
  return (
    <div className="manage-body">
      <div className="manage-body-left">
        <div className="manage-body-left-icons">
          <ul className="icons-top">
            {IconsTop.map((item) => (
              <li
                className="icons-top-item"
                key={item.display}
                onClick={toggleActive}
              >
                <img src={item.icon} alt={item.display} />
                <div
                  ref={refActive}
                  className={active === item.display ? "active" : ""}
                ></div>
              </li>
            ))}
          </ul>
          <ul className="icons-bottom">
            {IconsBottom.map((item) => (
              <li className="icons-bottom-item" key={item.display}>
                <img src={item.icon} alt={item.display} />
              </li>
            ))}
          </ul>
        </div>
        <div className="manage-body-left-extend">extend</div>
      </div>
      <div className="manage-body-right">Right</div>
    </div>
  );
};

export default Body;
