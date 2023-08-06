import "./body.scss";
import imgContract from "../../assets/manage/contract.svg";
import imgContracts from "../../assets/manage/contracts.svg";
import imgUser from "../../assets/manage/user.svg";
import imgAccount from "../../assets/manage/account.svg";
import imgManage from "../../assets/manage/setting.svg";
import imgBorrowing from "../../assets/manage/borrowing.svg";

import imgToday from "../../assets/manage/today.png";
import imgTomorrow from "../../assets/manage/tomorrow.png";
import imgSearchContract from "../../assets/manage/searchcontract.png";

import imgDebtContract from "../../assets/manage/debt-contract.png";
import imgSearchDebtContract from "../../assets/manage/search-debt-contract.png";

import imgBorrowingAdd from "../../assets/manage/borrowing_add.svg";
import imgBorrowingList from "../../assets/manage/borrowing_lish.svg";
import imgBorrowingSearch from "../../assets/manage/borrowing_search.svg";

import imgListUser from "../../assets/manage/list-user.png";
import imgSearchUser from "../../assets/manage/search-user.png";

import { useRef, useState } from "react";
import ExtendContent from "./ExtendContent";
import BodyRight from "./BodyRight";
import UserInfo from "../user/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { toggleBottom } from "../../redux/features/showBottom";
import Manager from "../manager/Manager";
import { getUserLogin } from "../../redux/features/usersSlice";
import { toggleModalUser } from "../../redux/features/showModalUser";
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
        icon: imgDebtContract,
        path: "/debt-contracts",
      },
      {
        display: "Tìm kiếm hợp đồng nợ",
        icon: imgSearchDebtContract,
        path: "/debt-contracts-search",
      },
    ],
  },
  {
    display: "Mượn hồ sơ",
    icon: imgBorrowing,
    extend: [
      {
        display: "Them",
        icon: imgBorrowingAdd,
        path: "/borrowing-add",
      },
      {
        display: "Danh sach ",
        icon: imgBorrowingList,
        path: "/borrowing-list",
      },
      {
        display: "Tìm kiếm",
        icon: imgBorrowingSearch,
        path: "/borrowing-search",
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
        icon: imgListUser,
        path: "/users",
      },
      {
        display: "Tìm kiếm ",
        icon: imgSearchUser,
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
    display: "Quản lý",
    path: "/manager",
    icon: imgManage,
    show: <Manager />,
  },
];
const Body = (props) => {
  const { show } = useSelector((state) => state.showBottom);
  const { show: showUser, data: dataShow } = useSelector(
    (state) => state.showModalUser
  );
  // console.log(showUser);
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.users);
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

  const handleUserInfo = (e, data) => {
    e.stopPropagation();
    dispatch(getUserLogin({ username }));

    // activeShow === ""
    //   ? setActiveShow(data) &&
    //     data === "Thông tin tài khoản" &&
    //     dispatch(getUserLogin({ username }))
    //   : setActiveShow("");

    dispatch(toggleModalUser(data));
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
              <li className="icons-bottom-item" key={item.display}>
                <img
                  src={item.icon}
                  alt={item.display}
                  onClick={(e) => handleUserInfo(e, item.display)}
                />
                <div className="tool-tip">{item.display}</div>
                {/* <div
                  className={`show ${
                    activeShow === item.display ? "active" : ""
                  }`}
                  ref={refShow}
                >
                  {item.show}
                </div> */}

                {/* {activeShow &&
                  activeShow === "Thông tin tài khoản" &&
                  activeShow === item.display && <UserInfo />}
                {activeShow &&
                  activeShow === "Quản lý" &&
                  activeShow === item.display && <Manager />} */}

                {showUser &&
                  dataShow === "Thông tin tài khoản" &&
                  dataShow === item.display && <UserInfo />}
                {showUser &&
                  dataShow === "Quản lý" &&
                  dataShow === item.display && <Manager />}
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
