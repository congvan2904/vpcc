import "./body-right-new-contract-today.scss";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatPhoneNumber from "../../helpers/formatPhoneNumber";
import Contract from "../contract/Contract";
import {
  createContract,
  createContractToday,
  deleteContracts,
  getContractGroupSort,
  getLastContract,
} from "../../redux/features/contractsSlice";
import ContractCompact from "../contract/ContractCompact";
import ContractFull from "../contract/ContractFull";

const BodyRightNewContractToday = () => {
  const [idContract, setIdContract] = useState(null);
  const dispatch = useDispatch();
  const refId = useRef(null);

  useEffect(() => {
    async function getIdContract() {
      const result = await dispatch(getLastContract());
      // console.log(result.payload.id_contract);
      setIdContract(+result.payload.id_contract + 1);
      // refId.current.value = +result.payload.id_contract + 1;
    }
    getIdContract();
  }, []);
  const [dataContract, setDataContract] = useState([]);
  const { data, number } = useSelector((state) => state.contracts);
  const refDate = useRef(null);
  const refPhoneCustomer = useRef(null);
  const refNameCustomer = useRef(null);
  const refNameContract = useRef(null);
  const refNotary = useRef(null);
  const refSecretary = useRef(null);
  // console.log({ lastContract });
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
      setInputs({
        ...inputs,
        [e.target.name]: formattedPhoneNumber,
        dateAuto: refDate.current.value,
        idAuto: refId.current.value,
      });
    } else
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
        dateAuto: refDate.current.value,
        idAuto: refId.current.value,
      });
  };
  // const dispatch = useDispatch();
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const payload = {
      ...inputs,
    };
    console.log("payload--->", payload);
    // dispatch(createContractToday(payload));
    // refId.current.value = +refId.current.value + 1;
    setIdContract((pre) => pre + 1);
    refId.current.focus();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const payload = {
        ...inputs,
      };
      console.log("payload--->", payload);
      // dispatch(createContractToday(payload));
      // refId.current.value = +refId.current.value + 1;
      setIdContract((pre) => pre + 1);

      refId.current.focus();
    }
  };
  const handleChangerFocusPhone = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refPhoneCustomer.current.focus();
    }
  };
  const handleChangerFocusNameCustomer = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refNameCustomer.current.focus();
    }
  };
  const handleChangerFocusNameContract = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refNameContract.current.focus();
    }
  };
  const handleChangerFocusNotary = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refNotary.current.focus();
    }
  };
  const handleChangerFocusSecretary = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refSecretary.current.focus();
    }
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
                  ref={refId}
                  id="number_contract"
                  type="text"
                  placeholder="SCC"
                  name="idAuto"
                  defaultValue={idContract}
                  // value={idContract || ""}
                  onChange={handleInputChange}
                  onKeyDown={handleChangerFocusSecretary}
                  autoFocus
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
                  id="dateAuto"
                  name="dateAuto"
                  value={inputs.name}
                  defaultValue={getCurrentDateInput()}
                  onChange={handleInputChange}
                  ref={refDate}
                />
                <span className="tooltip-text">
                  Ngày công chứng.Ngày sẽ tự động theo đúng ngày hệ thống.Nếu
                  muốn cũng có thể thay đổi ngày
                </span>
              </div>
            </div>

            <div className="new-contract-group">
              <label htmlFor="">Tên thư ký</label>
              <select
                ref={refSecretary}
                name="dropdownSecretary"
                value={inputs.name}
                onChange={handleInputChange}
                onKeyDown={handleChangerFocusNotary}
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
                ref={refNotary}
                name="dropdownNotary"
                value={inputs.name}
                onChange={handleInputChange}
                onKeyDown={handleChangerFocusNameContract}
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
                ref={refNameContract}
                id="name_contract"
                type="text"
                placeholder="Tên hồ sơ"
                name="nameContract"
                value={inputs.name}
                onChange={handleInputChange}
                onKeyDown={handleChangerFocusNameCustomer}
              />
            </div>

            <div className="new-contract-group">
              <label htmlFor="">Tên khách hàng</label>
              <input
                ref={refNameCustomer}
                id="name_customer"
                type="text"
                placeholder="Tên Khách Hàng"
                name="nameCustomer"
                value={inputs.name}
                onChange={handleInputChange}
                onKeyDown={handleChangerFocusPhone}
              />
              <label htmlFor="">Số điện thoại</label>
              <input
                ref={refPhoneCustomer}
                id="phone_number"
                type="text"
                placeholder="Số điện thoại"
                name="phone"
                onChange={handleInputChange}
                value={inputs["phone"] || ""}
                onKeyDown={handleKeyDown}
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
          {data && (
            <table>
              <thead>
                <tr>
                  <th className="header-contract">So Cong Chung</th>
                  <th className="header-header-secretary">Thu ky</th>
                  <th className="header-notary">Cong chung vien</th>
                  <th className="header-name">Hop dong</th>
                  <th className="header-customer">Khach hang</th>
                  <th className="header-phone">Dien thoai</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <ContractFull
                    idContract={item["_id"]}
                    numberContract={item["id_contract"]}
                    name={item["name"]}
                    notary={item["id_user_notary"].username}
                    secretary={item["id_user_secretary"].username}
                    name_customer={item["note"]}
                    phone={item["phone"]}
                    key={item["_id"]}
                  />
                ))}
              </tbody>
            </table>
          )}

          {number > 0 && <h2>Đã xóa {number} hợp đồng</h2>}
        </div>
      </div>
    </>
  );
};

export default BodyRightNewContractToday;
