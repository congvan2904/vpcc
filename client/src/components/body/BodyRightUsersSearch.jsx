import "./body-right-user-search.scss";
import imgSearch from "../../assets/manage/search.png";
import { useRef } from "react";

const BodyRightUsersSearch = () => {
  const refCheckboxUserName = useRef();
  const refUserName = useRef();
  const refCheckboxFullName = useRef();
  const refFullName = useRef();
  const refCheckboxRule = useRef();
  const refRule = useRef();
  const refCheckboxPosition = useRef();
  const refPosition = useRef();
  const refCheckboxBan = useRef();
  const refBan = useRef();
  const handleChange = (e) => {
    const { value, checked } = e.target;
    console.log({ value, checked });
  };
  const handleSubmit = () => {};

  return (
    <div className="user-search">
      <div className="user-search-title">
        <div className="user-search-title-group">
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
            // value={inputs.name}
            // onChange={handleChange}
          />
        </div>
        <div className="user-search-title-group">
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
            // value={inputs.name}
            // onChange={handleInputChange}
          />
        </div>
        <div className="user-search-title-group">
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
            // value={inputs.name}
            // onChange={handleInputChange}
          />
        </div>
        <div className="user-search-title-group">
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
        <div className="user-search-title-group">
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
