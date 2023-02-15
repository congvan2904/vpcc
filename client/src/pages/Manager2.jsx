import React, { useEffect, useState } from "react";
import Manager1 from "./Manager1";
import {
  contracts as contractsR,
  createContract,
} from "../redux/features/contractsSlice";
import { useDispatch, useSelector } from "react-redux";
import Contract from "../components/contract/Contract";
import { Navigate } from "react-router-dom";
const Manager2 = () => {
  const [dataContract, setDataContract] = useState([]);
  const data = useSelector((state) => state.contracts.data);
  // console.log({ data });
  const [inputs, setInputs] = useState({});
  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const payload = {
      id_contract: +inputs.idAuto,
      id_user_secretary: "637a5547660ac62a4c5b9155", // inputs.dropdownSecretary,
      id_user_notary: "637a5547660ac62a4c5b9155", // inputs.dropdownNotary,
      name: inputs.nameContract,
      phone: inputs.phone,
      // date_create: inputs.dateAuto,
      note: inputs.nameCustomer,
    };
    // console.log("payload--->", payload);
    dispatch(createContract(payload));
  };
  return (
    <Manager1>
      <form>
        <div className="contract">
          <div className="contract-manager">
            <div className="contract-manager-group">
              <label htmlFor="">Số công chứng tự dộng</label>
              <input
                type="text"
                placeholder="Số công chứng"
                name="idAuto"
                value={inputs.name}
                onChange={handleInputChange}
              />
              <label htmlFor="">Số công chứng hồ sơ</label>
              <input
                type="text"
                placeholder="Số công chứng"
                name="id"
                value={inputs.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="contract-manager-group">
            <label htmlFor="">Tên thư ký</label>
            <select
              name="dropdownSecretary"
              value={inputs.name}
              onChange={handleInputChange}
            >
              <option defaultValue="default">Chọn thư ký</option>
              <option value="Lực">Lực</option>
              <option value="Hồng">Hồng</option>
              <option value="Sơn">Sơn</option>
              <option value="Thủy">Thủy</option>
            </select>
          </div>
          <div className="contract-manager-group">
            <label htmlFor="">Tên công chứng viên</label>
            <select
              name="dropdownNotary"
              value={inputs.name}
              onChange={handleInputChange}
            >
              <option defaultValue="Điền">Nguyễn Đức Điền</option>
              <option value="Liên">Nguyễn Thị Kim Liên</option>
              <option value="Bay">Nguyễn Thị Bay</option>
            </select>
          </div>
          <div className="contract-manager-group">
            <label htmlFor="">Ngày tự động</label>
            <input
              type="date"
              id=""
              name="dateAuto"
              value={inputs.name}
              onChange={handleInputChange}
            />
            <label htmlFor="">Ngày theo hồ sơ</label>
            <input
              type="date"
              id=""
              name="date"
              value={inputs.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="contract-manager-group">
            <label htmlFor="">Tên hồ sơ</label>
            <input
              type="text"
              placeholder="Tên hồ sơ"
              name="nameContract"
              value={inputs.name}
              onChange={handleInputChange}
            />
            <label htmlFor="">Tên khách hàng</label>
            <input
              type="text"
              placeholder="Tên Khách Hàng"
              name="nameCustomer"
              value={inputs.name}
              onChange={handleInputChange}
            />
            <label htmlFor="">Số điện thoại</label>
            <input
              type="text"
              placeholder="Số điện thoại"
              name="phone"
              value={inputs.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="contract-manager-group">
            <button onClick={handleSubmitForm}>Thêm hồ sơ</button>
          </div>
          <div className="contract-show">
            {data.map((contract, index) => (
              <div className="contract-main" key={index}>
                {contract.id_contract.map((item, i) => (
                  <Contract key={i} contract={item} name={contract.user.name} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </form>
    </Manager1>
  );
};

export default Manager2;
