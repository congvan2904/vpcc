import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  createUser,
  users as getListUser,
} from "../../redux/features/usersSlice";
import instance from "../../services/configAxios";
const BodyRightUsers = () => {
  const refUserName = useRef();
  const refFullName = useRef();
  const refPhone = useRef();
  const refEmail = useRef();
  const refRule = useRef();
  const refPosition = useRef();
  const refNote = useRef();
  const refBan = useRef();

  const [dataUser, setDataUser] = useState(null);
  const refImg = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListUser());
  }, []);
  const { data, loading } = useSelector((state) => state.users);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    // console.log(refImg.current.files[0]);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("username", refUserName.current.value);
    formData.append("fullname", refFullName.current.value);
    formData.append("phone", refPhone.current.value);
    formData.append("email", refEmail.current.value);
    formData.append("role", refRule.current.value);
    formData.append("position", refPosition.current.value);
    formData.append("note", refNote.current.value);
    formData.append("ban", refBan.current.value);

    const payload = {
      ...formData,
    };
    // console.log("payload--->", payload);
    dispatch(createUser(formData));
  };
  const getUsers = async () => {
    try {
      const users = (await instance.get("user/getlists")).data;

      if (users && users.message === "success") {
        setDataUser(users.data);
        return users;
      }
      setDataUser(users.message);
      return users.message;
    } catch (error) {
      // console.log(error.message);
      setDataUser(error.message);
      return error;
    }
  };
  return (
    <div>
      <h1>Users</h1>
      {/* <button onClick={getUsers}>Get users</button> */}
      <form onSubmit={handleSubmitForm}>
        <div className="contract">
          <div className="contract-manager">
            <div className="contract-manager-group">
              <label htmlFor="">Tên đăng nhập</label>
              <input
                ref={refUserName}
                type="text"
                placeholder="Tên đăng nhập"
                name="username"
                value={inputs.name}
                onChange={handleInputChange}
              />
              <label htmlFor="">Tên đầy đủ</label>
              <input
                ref={refFullName}
                type="text"
                placeholder="Tên đầy đủ"
                name="fullname"
                value={inputs.name}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="contract-manager-group">
            <label htmlFor="">Số điện thoại</label>
            <input
              ref={refPhone}
              type="text"
              placeholder="Số điện thoại"
              name="phone"
              value={inputs.name}
              onChange={handleInputChange}
            />
            <label htmlFor="">Email</label>
            <input
              ref={refEmail}
              type="text"
              placeholder="Email"
              name="email"
              value={inputs.name}
              onChange={handleInputChange}
            />
            <label htmlFor="">Quyền</label>
            <select
              ref={refRule}
              name="rule"
              value={inputs.name}
              onChange={handleInputChange}
            >
              <option defaultValue="default">Chọn quyền</option>
              <option value="VT">Văn Thư</option>
              <option value="CCV">Công Chứng Viên</option>
              <option value="TK">Thư Ký</option>
              <option value="S">Sếp</option>
            </select>
          </div>
          <div className="contract-manager-group">
            <label htmlFor="">Vị trí</label>
            <input
              ref={refPosition}
              type="text"
              placeholder="Vị trí"
              name="position"
              value={inputs.name}
              onChange={handleInputChange}
            />
            <label htmlFor="">Hình</label>
            <input
              // ref={refImg}
              type="file"
              placeholder="Hình"
              name="image"
              accept="image/*"
              filename={file}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="">Ghi Chú</label>
            <input
              ref={refNote}
              type="text"
              placeholder="Ghi Chú"
              name="note"
              value={inputs.name}
              onChange={handleInputChange}
            />
            <label htmlFor="">Ban</label>
            <select
              ref={refBan}
              name="ban"
              value={inputs.name}
              onChange={handleInputChange}
            >
              <option defaultValue="default">Chọn </option>
              <option value="false">Không</option>
              <option value="true">Có</option>
            </select>
          </div>
          <div className="contract-manager-group">
            {/* <button onClick={handleSubmitForm}>Thêm</button> */}
            <button type="submit">Thêm</button>
          </div>
        </div>
      </form>
      {loading === true ? (
        <h2>.......Loading...</h2>
      ) : (
        <div>
          {data.map((item, i) => (
            <div key={i}>
              <h2>
                {item._id} -- {item.username} -- {item.position} -- {item.email}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BodyRightUsers;
