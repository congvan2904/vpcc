import "./body.scss";
const IconsTop = [
  {
    display: "Hợp đồng mới",
    path: "./contracts",
    icon: "",
  },
  {
    display: "Hợp đồng ",
    path: "./contracts",
    icon: "",
  },
  {
    display: "Người dùng",
    path: "./contracts",
    icon: "",
  },
];
const IconsBottom = [
  {
    display: "Thông tin tài khoản",
    path: "./contracts",
    icon: "",
  },
  {
    display: "Quản lý ",
    path: "./contracts",
    icon: "",
  },
];
const Body = () => {
  return (
    <div className="manager-body">
      <div className="manager-body-left">
        <div className="manager-body-left-icons">
          <ul className="icons-top">
            {IconsTop.map((item) => (
              <li className="icons-top-item">{item.display}</li>
            ))}
          </ul>
          <ul className="icons-bottom">
            {IconsBottom.map((item) => (
              <li className="icons-bottom-item">{item.display}</li>
            ))}
          </ul>
        </div>
        <div className="manager-body-left-extend">extend</div>
      </div>
      <div className="manager-body-right">Right</div>
    </div>
  );
};

export default Body;
