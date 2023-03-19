import "./extend-content.scss";
import { IconsTop } from "./Body";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelect } from "../../redux/features/showDataSlice";

const ExtendContent = (props) => {
  const refDataItem = useRef(null);
  const [selectData, setSelectData] = useState("");
  const getDataSelect = IconsTop.find((item) => item.display === props.title);
  const dispatch = useDispatch();
  const handleDataItem = (e) => {
    // selectData === e.currentTarget.getAttribute("data-name")
    //   ? setSelectData(e.currentTarget.getAttribute("data-name"))
    //   : setSelectData("");
    setSelectData(e.currentTarget.getAttribute("data-name"));
    dispatch(setSelect(e.currentTarget.getAttribute("data-name")));
    // refDataItem.current.classList.add("extend-active");
  };
  return (
    <div className="extend-content">
      <div className="extend-content-title">{props.title}</div>
      <div className="extend-content-body">
        <ul className="extend-data">
          {getDataSelect &&
            getDataSelect.extend.map((item) => (
              // <Link to={item.path}>
              <li
                ref={refDataItem}
                className={`extend-data-item ${
                  selectData === item.path ? "extend-active" : ""
                }`}
                key={item.display}
                data-name={item.path}
                onClick={handleDataItem}
              >
                <img src={item.icon} alt={item.display} />
                <div className="extend-data-item-content">{item.display}</div>
              </li>
              // </Link>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ExtendContent;
