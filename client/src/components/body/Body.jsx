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
  const refExtend = useRef(null);
  const [active, setActive] = useState("");

  const toggleActive = (event) => {
    active === event.target.alt ? setActive("") : setActive(event.target.alt);
  };
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  const [initialSizeRight, setInitialSizeRight] = useState(null);

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
                <img src={item.icon} alt={item.display} />
                <div className="tool-tip">{item.display}</div>
              </li>
            ))}
          </ul>
        </div>
        <div
          id="Resizable-left"
          className={`manage-body-left-extend ${active === "" ? "" : "extend"}`}
          ref={refExtend}
        >
          <div className="extend-content">extend</div>
          <div
            className="extend-resize"
            draggable="true"
            onDragStart={initial}
            onDrag={resize}
          ></div>
        </div>
      </div>
      <div id="Resizable-right" className="manage-body-right">
        Right
      </div>
    </div>
  );
};

export default Body;
