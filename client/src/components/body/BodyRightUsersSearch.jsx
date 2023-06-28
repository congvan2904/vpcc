import "./body-right-user-search.scss";
import imgSearch from "../../assets/manage/search.png";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUser } from "../../redux/features/usersSlice";

const BodyRightUsersSearch = () => {
  const refGroupUserName = useRef();
  const refCheckboxUserName = useRef();
  const refUserName = useRef();
  const refGroupFullName = useRef();
  const refCheckboxFullName = useRef();
  const refFullName = useRef();
  const refGroupRule = useRef();
  const refCheckboxRule = useRef();
  const refRule = useRef();
  const refGroupPosition = useRef();
  const refCheckboxPosition = useRef();
  const refPosition = useRef();
  const refGroupBan = useRef();
  const refCheckboxBan = useRef();
  const refBan = useRef();
  const listValue = ["username", "full_name", "position", "role", "ban"];
  const handleChange = (e) => {
    const { value, checked } = e.target;
    // console.log({ value, checked });
    if (checked) {
      if (value === listValue[0]) {
        refUserName.current.classList.add("show");
        refGroupFullName.current.classList.add("hide");
        refGroupPosition.current.classList.add("hide");
        refGroupRule.current.classList.add("hide");
        refGroupBan.current.classList.add("hide");
      }
      if (value === listValue[1]) {
        refGroupUserName.current.classList.add("hide");
        refFullName.current.classList.add("show");
      }
      if (value === listValue[2]) {
        refGroupUserName.current.classList.add("hide");
        refPosition.current.classList.add("show");
      }
      if (value === listValue[3]) {
        refGroupUserName.current.classList.add("hide");
        refRule.current.classList.add("show");
      }
      if (value === listValue[4]) {
        refGroupUserName.current.classList.add("hide");
        refBan.current.classList.add("show");
      }
    } else {
      if (value === listValue[0]) {
        refUserName.current.classList.remove("show");
        refGroupFullName.current.classList.remove("hide");
        refGroupPosition.current.classList.remove("hide");
        refGroupRule.current.classList.remove("hide");
        refGroupBan.current.classList.remove("hide");
      }
      if (value === listValue[1]) {
        refFullName.current.classList.remove("show");
        if (
          refCheckboxPosition.current.checked ||
          refCheckboxRule.current.checked ||
          refCheckboxBan.current.checked
        ) {
        } else {
          refGroupUserName.current.classList.remove("hide");
        }
      }
      if (value === listValue[2]) {
        refPosition.current.classList.remove("show");
        if (
          refCheckboxFullName.current.checked ||
          refCheckboxRule.current.checked ||
          refCheckboxBan.current.checked
        ) {
        } else {
          refGroupUserName.current.classList.remove("hide");
        }
      }
      if (value === listValue[3]) {
        refRule.current.classList.remove("show");
        if (
          refCheckboxPosition.current.checked ||
          refCheckboxFullName.current.checked ||
          refCheckboxBan.current.checked
        ) {
        } else {
          refGroupUserName.current.classList.remove("hide");
        }
      }
      if (value === listValue[4]) {
        refBan.current.classList.remove("show");
        if (
          refCheckboxPosition.current.checked ||
          refCheckboxRule.current.checked ||
          refCheckboxFullName.current.checked
        ) {
        } else {
          refGroupUserName.current.classList.remove("hide");
        }
      }
    }
  };
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {};
    if (refCheckboxUserName.current.checked) {
      if (refUserName.current.value) {
        payload = {
          [refUserName.current.name]: refUserName.current.value,
        };
      }
    }
    if (refCheckboxFullName.current.checked) {
      if (refFullName.current.value) {
        payload = {
          [refFullName.current.name]: refFullName.current.value,
          ...payload,
        };
      }
    }
    if (refCheckboxPosition.current.checked) {
      if (refPosition.current.value) {
        payload = {
          [refPosition.current.name]: refPosition.current.value,
          ...payload,
        };
      }
    }
    if (refCheckboxRule.current.checked) {
      if (refRule.current.value) {
        payload = {
          [refRule.current.name]: refRule.current.value,
          ...payload,
        };
      }
    }
    if (refCheckboxBan.current.checked) {
      if (refBan.current.value) {
        payload = {
          [refBan.current.name]: refBan.current.value,
          ...payload,
        };
      }
    }
    // console.log({ payload });
    dispatch(findUser(payload));
  };
  const { find } = useSelector((state) => state.users);
  console.log({ find });
  return (
    <div className="user-search">
      <div className="user-search-title">
        <div className="user-search-title-group" ref={refGroupUserName}>
          <input
            type="checkbox"
            name=""
            id=""
            value={"username"}
            ref={refCheckboxUserName}
            onChange={handleChange}
          />
          <label htmlFor="">Tên đăng nhập</label>
          <input
            ref={refUserName}
            type="text"
            placeholder="Tên đăng nhập"
            name="username"
            className="username"
            // value={inputs.name}
            // onChange={handleChange}
          />
        </div>
        <div className="user-search-title-group" ref={refGroupFullName}>
          <input
            type="checkbox"
            name=""
            id=""
            value={"full_name"}
            ref={refCheckboxFullName}
            onChange={handleChange}
          />
          <label htmlFor="">Tên đầy đủ</label>
          <input
            ref={refFullName}
            type="text"
            placeholder="Tên đầy đủ"
            name="fullname"
            className="fullname"
            // value={inputs.name}
            // onChange={handleInputChange}
          />
        </div>
        <div className="user-search-title-group" ref={refGroupPosition}>
          <input
            type="checkbox"
            name=""
            id=""
            value={"position"}
            ref={refCheckboxPosition}
            onChange={handleChange}
          />
          <label htmlFor="">Vị trí</label>
          <input
            ref={refPosition}
            type="text"
            placeholder="Vị trí"
            name="position"
            className="position"
            // value={inputs.name}
            // onChange={handleInputChange}
          />
        </div>
        <div className="user-search-title-group" ref={refGroupRule}>
          <input
            type="checkbox"
            name=""
            id=""
            value={"role"}
            ref={refCheckboxRule}
            onChange={handleChange}
          />
          <label htmlFor="">Quyền</label>
          <select
            ref={refRule}
            name="rule"
            className="rule"
            // value={inputs.name}
            // onChange={handleInputChange}
          >
            <option defaultValue="default">Chọn quyền</option>
            <option value="VT">Văn Thư</option>
            <option value="CCV">Công Chứng Viên</option>
            <option value="TK">Thư Ký</option>
            <option value="S">Sếp</option>
          </select>
        </div>
        <div className="user-search-title-group" ref={refGroupBan}>
          <input
            type="checkbox"
            name=""
            id=""
            value={"ban"}
            ref={refCheckboxBan}
            onChange={handleChange}
          />
          <label htmlFor="">Lệnh cấm</label>
          <select
            ref={refBan}
            name="ban"
            className="ban"
            // value={inputs.name}
            // onChange={handleInputChange}
          >
            <option defaultValue="default">Chọn </option>
            <option value="false">Không</option>
            <option value="true">Có</option>
          </select>
        </div>
        <div className="user-search-title-group">
          <button type="submit" className="searchButton" onClick={handleSubmit}>
            <img src={imgSearch} alt="" />
          </button>
        </div>
      </div>
      <div className="user-search-body">data</div>
    </div>
  );
};

export default BodyRightUsersSearch;
