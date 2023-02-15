import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { users as usersT } from "../redux/features/usersSlice";
import instance from "../services/configAxios";
import Manager from "./Manager";

const Users = () => {
  const [dataUser, setDataUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(usersT());
  }, []);
  const { data, loading } = useSelector((state) => state.users);
  // console.log({ getList });
  const [inputs, setInputs] = useState({});
  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();

    const payload = {
      id_contract: +inputs.idAuto,
      id_user_secretary: "637d6ebe1f5b65e70272d8a7", // inputs.dropdownSecretary,
      id_user_notary: "637d6ebe1f5b65e70272d8a7", // inputs.dropdownNotary,
      name: inputs.nameContract,
      phone: inputs.phone,
      date_create: inputs.dateAuto,
      note: inputs.nameCustomer,
    };
    // console.log("payload--->", payload);
    // dispatch(createContract(payload));
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
    <Manager>
      <h1>Users</h1>
      {/* <button onClick={getUsers}>Get users</button> */}
      <form>
        <div className="contract">
          <div className="contract-manager">
            <div className="contract-manager-group">
              <label htmlFor="">Tên đăng nhập</label>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                name="username"
                value={inputs.name}
                onChange={handleInputChange}
              />
              <label htmlFor="">Tên đầy đủ</label>
              <input
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
              type="text"
              placeholder="Số điện thoại"
              name="phone"
              value={inputs.name}
              onChange={handleInputChange}
            />
            <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={inputs.name}
              onChange={handleInputChange}
            />
            <label htmlFor="">Quyền</label>
            <select
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
              type="text"
              placeholder="Vị trí"
              name="position"
              value={inputs.name}
              onChange={handleInputChange}
            />
            <label htmlFor="">Hình</label>
            <input
              type="text"
              placeholder="Hình"
              name="image"
              value={inputs.name}
              onChange={handleInputChange}
            />
            <label htmlFor="">Ghi Chú</label>
            <input
              type="text"
              placeholder="Ghi Chú"
              name="note"
              value={inputs.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="contract-manager-group">
            <button onClick={handleSubmitForm}>Thêm</button>
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
    </Manager>
  );
};

export default Users;
