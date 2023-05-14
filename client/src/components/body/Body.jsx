import "./body.scss";
import imgContract from "../../assets/manage/contract.svg";
import imgContracts from "../../assets/manage/contracts.svg";
import imgUser from "../../assets/manage/user.svg";
import imgAccount from "../../assets/manage/account.svg";
import imgManage from "../../assets/manage/setting.svg";

import imgToday from "../../assets/manage/today.png";
import imgTomorrow from "../../assets/manage/tomorrow.png";
import imgSearchContract from "../../assets/manage/searchcontract.png";

import { useRef, useState } from "react";
import ExtendContent from "./ExtendContent";
import BodyRight from "./BodyRight";
import UserInfo from "../user/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { toggleBottom } from "../../redux/features/showBottom";
import Manager from "../manager/Manager";
export const IconsTop = [
  {
    display: "Hợp đồng mới",
    icon: imgContract,
    extend: [
      {
        display: "Hôm nay",
        icon: imgToday,
        path: "/new-contract-today",
      },
      {
        display: "Những ngày trước",
        icon: imgTomorrow,
        path: "/new-contract-old",
      },
      {
        display: "Tìm kiếm",
        icon: imgSearchContract,
        path: "/new-contract-search",
      },
    ],
  },
  {
    display: "Hợp đồng ",
    path: "./contracts",
    icon: imgContracts,
    extend: [
      {
        display: "Hợp đồng nợ",
        icon: "",
        path: "/debt-contracts",
      },
      {
        display: "Tìm kiếm hợp đồng nợ",
        icon: "",
        path: "/debt-contracts-search",
      },
    ],
  },
  {
    display: "Người dùng",
    path: "./contracts",
    icon: imgUser,
    extend: [
      {
        display: "Danh sách",
        icon: "",
        path: "/users",
      },
      {
        display: "Tìm kiếm ",
        icon: "",
        path: "/users-search",
      },
    ],
  },
];

const IconsBottom = [
  {
    display: "Thông tin tài khoản",
    path: "/user-info",
    icon: imgAccount,
    show: <UserInfo />,
  },
  {
    display: "Quản lý ",
    path: "/manager",
    icon: imgManage,
    show: <Manager />,
  },
];
const Body = (props) => {
  const { show } = useSelector((state) => state.showBottom);
  const dispatch = useDispatch();
  const refActive = useRef(null);
  const refExtend = useRef(null);
  const refUserInfo = useRef(null);
  const refShow = useRef(null);

  const [active, setActive] = useState("");
  const [activeShow, setActiveShow] = useState("");

  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  const [initialSizeRight, setInitialSizeRight] = useState(null);

  const toggleActive = (event) => {
    active === event.target.alt ? setActive("") : setActive(event.target.alt);
    let getResized = document.getElementsByClassName("resized")[0];
    refExtend.current.classList.contains("resized") &&
      (getResized.style.width = "0");
    // refExtend.current.classList.contains("resized") &&
    //   refExtend.current.classList.contains("extend") &&
    //   (getResized.style.width = `${initialSize}px`);
  };
  const initial = (e) => {
    let resizable = document.getElementById("Resizable-left");
    let resizableRight = document.getElementById("Resizable-right");

    setInitialPos(e.clientX);
    setInitialSize(resizable.offsetWidth);
    setInitialSizeRight(resizableRight.offsetWidth);
  };

  const resize = (e) => {
    let resizable = document.getElementById("Resizable-left");
    let resizableRight = document.getElementById("Resizable-right");

    resizable.style.width = `${
      parseInt(initialSize) + parseInt(e.clientX - initialPos)
    }px`;
    resizableRight.style.width = `${
      parseInt(initialSizeRight) + parseInt(e.clientX + initialPos)
    }px`;
    refExtend.current.classList.add("resized");
  };

  const handleUserInfo = (data) => {
    // dispatch(toggleBottom());
    // e.stopPropagation();
    // console.log(e);
    // refShow.current.classList.toggle("active");
    activeShow === "" ? setActiveShow(data) : setActiveShow("");
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
                <div className="tool-tip">{item.display}</div>
              </li>
            ))}
          </ul>
          <ul className="icons-bottom">
            {IconsBottom.map((item) => (
              <li
                className="icons-bottom-item"
                key={item.display}
                onClick={() => handleUserInfo(item.display)}
              >
                <img src={item.icon} alt={item.display} />
                <div className="tool-tip">{item.display}</div>
                <div
                  className={`show ${
                    activeShow === item.display ? "active" : ""
                  }`}
                  ref={refShow}
                >
                  {item.show}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div
          id="Resizable-left"
          className={`manage-body-left-extend ${active === "" ? "" : "extend"}`}
          ref={refExtend}
        >
          {/* <div className="extend-content">extend</div> */}
          <ExtendContent title={active} />
          <div
            className="extend-resize"
            draggable="true"
            onDragStart={initial}
            onDrag={resize}
          ></div>
        </div>
      </div>
      <div id="Resizable-right" className="manage-body-right">
        <BodyRight />
      </div>
    </div>
  );
};

export default Body;
