import "./body-right-new-contract-today.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BodyRightNewContractToday = () => {
  const [dataContract, setDataContract] = useState([]);
  const { data, number } = useSelector((state) => state.contracts);
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
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const payload = {
      ...inputs,
    };
    // console.log("payload--->", payload);
    // dispatch(createContract(payload));
  };
  const handleDeleteContracts = (e) => {
    e.preventDefault();
    // dispatch(deleteContracts());
  };
  const handlegetContracts = (e) => {
    e.preventDefault();
    // dispatch(getContractGroupSort());
  };
  return (
    <>
      <div className="manage-body-right-header">
        <form>
          <div className="new-contract">
            <div className="new-contract-manager">
              <div className="new-contract-manager-group">
                <label htmlFor="">Số công chứng </label>
                <input
                  type="text"
                  placeholder="Số công chứng"
                  name="idAuto"
                  value={inputs.name}
                  onChange={handleInputChange}
                />
                {/* <label htmlFor="">Số công chứng hồ sơ</label>
                <input
                  type="text"
                  placeholder="Số công chứng"
                  name="id"
                  value={inputs.name}
                  onChange={handleInputChange}
                /> */}
              </div>
            </div>
            <div className="new-contract-manager-group">
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
            </div>
            <div className="new-contract-manager-group">
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
            <div className="new-contract-manager-group">
              <label htmlFor="">Ngày </label>
              <input
                type="date"
                id=""
                name="dateAuto"
                value={inputs.name}
                defaultValue={getCurrentDateInput()}
                onChange={handleInputChange}
              />
              {/* <label htmlFor="">Ngày theo hồ sơ</label>
              <input
                type="date"
                id=""
                name="date"
                value={inputs.name}
                defaultValue={getCurrentDateInput()}
                onChange={handleInputChange}
              /> */}
            </div>
            <div className="new-contract-manager-group">
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
            <div className="new-contract-manager-group">
              <button onClick={handleSubmitForm}>Thêm hồ sơ</button>
              <button onClick={handleDeleteContracts}>Xóa tất cả hồ sơ</button>
              <button onClick={handlegetContracts}>Test</button>
            </div>
            {/* <div className="new-contract-show">
            {data.map((contract, index) => (
              <div className="new-contract-main" key={index}>
                {contract.id_contract.map((item, i) => (
                  <Contract
                    key={i}
                    idContract={item[0]}
                    numberContract={item[1]}
                    dateContract={item[2]}
                    name={contract.username}
                  />
                ))}
              </div>
            ))}
            {number > 0 && <h2>Đã xóa {number} hợp đồng</h2>}
          </div> */}
          </div>
        </form>
      </div>
      <div className="manage-body-right-body"></div>
    </>
  );
};

export default BodyRightNewContractToday;
