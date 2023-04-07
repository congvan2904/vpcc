import "./body-right-new-contract-today.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatPhoneNumber from "../../helpers/formatPhoneNumber";
import Contract from "../contract/Contract";
import {
  createContract,
  deleteContracts,
  getContractGroupSort,
} from "../../redux/features/contractsSlice";
import ContractCompact from "../contract/ContractCompact";
import ContractFull from "../contract/ContractFull";

const BodyRightNewContractToday = () => {
  const [dataContract, setDataContract] = useState([]);
  const { data, number } = useSelector((state) => state.contracts);

  // console.log({ data });
  const { data: dataUsers, loading } = useSelector((state) => state.users);
  const getCurrentDateInput = () => {
    const dateObj = new Date();

    // get the month in this format of 04, the same for months
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();

    const shortDate = `${year}-${month}-${day}`;

    return shortDate;
  };

  const [inputs, setInputs] = useState({});
  const handleInputChange = (e) => {
    if (e.target.name === "phone") {
      const formattedPhoneNumber = formatPhoneNumber(e.target.value);
      setInputs({ ...inputs, [e.target.name]: formattedPhoneNumber });
    } else setInputs({ ...inputs, [e.target.name]: e.target.value });

    // const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // setInputs({ phone: formattedPhoneNumber });
  };
  const dispatch = useDispatch();
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const payload = {
      ...inputs,
    };
    // console.log("payload--->", payload);
    dispatch(createContract(payload));
  };
  const handleDeleteContracts = (e) => {
    e.preventDefault();
    dispatch(deleteContracts());
  };
  const handlegetContracts = (e) => {
    e.preventDefault();
    dispatch(getContractGroupSort());
  };
  return (
    <>
      <div className="manage-body-right-header">
        <form>
          <div className="new-contract">
            <div className="new-contract-group">
              <label htmlFor="">Số công chứng </label>
              <div className="tooltip">
                <input
                  id="number_contract"
                  type="text"
                  placeholder="SCC"
                  name="idAuto"
                  value={inputs.name}
                  onChange={handleInputChange}
                />
                <span className="tooltip-text">
                  Số công chứng.Nếu chưa có số công chứng thì điền số vào.Nếu có
                  số công chứng rồi thì số công chứng sẽ tự động tăng khi thêm
                  hồ sơ
                </span>
              </div>
              <label htmlFor="">Ngày </label>
              <div className="tooltip">
                <input
                  type="date"
                  id=""
                  name="dateAuto"
                  value={inputs.name}
                  defaultValue={getCurrentDateInput()}
                  onChange={handleInputChange}
                />
                <span className="tooltip-text">
                  Ngày công chứng.Ngày sẽ tự động theo đúng ngày hệ thống.Nếu
                  muốn cũng có thể thay đổi ngày
                </span>
              </div>
              {/* <label htmlFor="">Số công chứng hồ sơ</label>
                <input
                  type="text"
                  placeholder="Số công chứng"
                  name="id"
                  value={inputs.name}
                  onChange={handleInputChange}
                /> */}
            </div>

            <div className="new-contract-group">
              <label htmlFor="">Tên thư ký</label>
              <select
                name="dropdownSecretary"
                value={inputs.name}
                onChange={handleInputChange}
              >
                <option defaultValue="default">Chọn thư ký</option>
                {dataUsers.map((e) => {
                  return (
                    <option value={e._id} key={e._id}>
                      {e.username}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="">Tên công chứng viên</label>
              <select
                name="dropdownNotary"
                value={inputs.name}
                onChange={handleInputChange}
              >
                <option defaultValue="default">Chọn công chứng viên</option>
                {dataUsers.map((e) => {
                  return (
                    <option value={e._id} key={e._id}>
                      {e.username}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="new-contract-group">
              <label htmlFor="">Tên hồ sơ</label>
              <input
                id="name_contract"
                type="text"
                placeholder="Tên hồ sơ"
                name="nameContract"
                value={inputs.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="new-contract-group">
              <label htmlFor="">Tên khách hàng</label>
              <input
                id="name_customer"
                type="text"
                placeholder="Tên Khách Hàng"
                name="nameCustomer"
                value={inputs.name}
                onChange={handleInputChange}
              />
              <label htmlFor="">Số điện thoại</label>
              <input
                id="phone_number"
                type="text"
                placeholder="Số điện thoại"
                name="phone"
                onChange={handleInputChange}
                value={inputs["phone"] || ""}
              />
            </div>
            <div className="new-contract-group">
              <button onClick={handleSubmitForm}>Thêm hồ sơ</button>
              <button onClick={handleDeleteContracts}>Xóa tất cả hồ sơ</button>
              <button onClick={handlegetContracts}>Test</button>
            </div>
            <div className="new-contract-show"></div>
          </div>
        </form>
      </div>
      <div className="manage-body-right-body">
        <div className="new-contract-main">
          <div className="main-header">
            <div className="header-contract">So Cong Chung</div>
            <div className="header-header-secretary">Thu ky</div>
            <div className="header-notary">Cong chung vien</div>
            <div className="header-name">Hop dong</div>
            <div className="header-customer">Khach hang</div>
            <div className="header-phone">Dien thoai</div>
          </div>
          {data &&
            data.map((item, index) => (
              <>
                {/* <Contract
                  key={i}
                  idContract={item[0]}
                  numberContract={item[1]}
                  dateContract={item[2]}
                  name={contract.username}
                />
                <ContractCompact
                  key={i}
                  idContract={item[0]}
                  numberContract={item[1]}
                  dateContract={item[2]}
                  name={contract.username}
                /> */}
                <ContractFull
                  key={item["id"]}
                  idContract={item["id"]}
                  numberContract={item["id_contract"]}
                  name={item["name"]}
                  notary={item["id_user_notary"].username}
                  secretary={item["id_user_secretary"].username}
                  name_customer={item["note"]}
                  phone={item["phone"]}
                />
              </>
            ))}

          {number > 0 && <h2>Đã xóa {number} hợp đồng</h2>}
        </div>
      </div>
    </>
  );
};

export default BodyRightNewContractToday;
