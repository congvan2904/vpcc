import "./body-right-new-contract-today.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatPhoneNumber from "../../helpers/formatPhoneNumber";
import formatContractId from "../../helpers/formatContractId";
import Contract from "../contract/Contract";
import {
  createContract,
  createContractToday,
  deleteContracts,
  getContractGroupSort,
  getLastContract,
  sort_key,
  sort_secretary,
} from "../../redux/features/contractsSlice";
import ContractCompact from "../contract/ContractCompact";
import ContractFull from "../contract/ContractFull";
import removeDotNumber from "../../helpers/removeDotNumber";
import addDotNumber from "../../helpers/addDotNumber";
import ModalItemContract from "../contract/ModalItemContract";
import fileName from "../../helpers/fileName";
import createCsvUrl from "../../helpers/createCsvUrl";
import getValuesObjectByKeys from "../../helpers/getValuesObjectByKeys";
import downloadCSV from "../../helpers/csvDownloader";
import formatDate from "../../helpers/formatDate";
import readFile from "../../helpers/readFile";
import { toggleModalPreviewContracts } from "../../redux/features/showPreviewContracts";
import ModalPreviewContract from "../modal/ModalPreviewContract";

const BodyRightNewContractToday = () => {
  const [idContract, setIdContract] = useState(null);
  const dispatch = useDispatch();
  const refId = useRef(null);
  const { lastContract } = useSelector((state) => state.contracts);

  useEffect(() => {
    async function getIdContract() {
      console.log({ lastContract });
      if (lastContract === "") {
        refId.current.value = 1;
      } else {
        // setIdContract(lastContract + 1);
        const valueId = +removeDotNumber(lastContract) + 1;
        refId.current.value = addDotNumber(valueId);
        // console.log(refNotary.current.value);
      }
    }
    getIdContract();
  }, [lastContract]);
  const [dataContract, setDataContract] = useState([]);
  const { data, number } = useSelector((state) => state.contracts);
  const refDate = useRef(null);
  const refPhoneCustomer = useRef(null);
  const refNameCustomer = useRef(null);
  const refNameContract = useRef(null);
  const refNotary = useRef(null);
  const refSecretary = useRef(null);
  console.log({ data });
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
    if (e.target.name === "idAuto") {
      const formattedPhoneNumber = formatContractId(e.target.value);
      // setInputs({
      //   ...inputs,
      //   [e.target.name]: formattedPhoneNumber,
      // });
      refId.current.value = formattedPhoneNumber;
    }
    if (e.target.name === "phone") {
      const formattedPhoneNumber = formatPhoneNumber(e.target.value);
      setInputs({
        ...inputs,
        [e.target.name]: formattedPhoneNumber,
        dateAuto: refDate.current.value,
        idAuto: refId.current.value,
      });
    }
    if (e.target.name !== "phone" && e.target.name !== "idAuto") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
        dateAuto: refDate.current.value,
        idAuto: refId.current.value,
      });
    }
  };
  // const dispatch = useDispatch();
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const payload = {
      idAuto: removeDotNumber(refId.current.value),
      dateAuto: refDate.current.value,
      dropdownSecretary: refSecretary.current.value,
      dropdownNotary: refNotary.current.value,
      nameContract: refNameContract.current.value,
      nameCustomer: refNameCustomer.current.value,
      phone: refPhoneCustomer.current.value,
    };
    // console.log("payload--->", payload);
    dispatch(createContractToday(payload));
    const result = +removeDotNumber(refId.current.value) + 1;
    refId.current.value = addDotNumber(result);
    refId.current.focus();
    refNameContract.current.value = "";
    refNameCustomer.current.value = "";
    refPhoneCustomer.current.value = null;
    refNotary.current.value = "Chọn công chứng viên";
    refSecretary.current.value = "Chọn thư ký";
    setInputs({ ...inputs, phone: null });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const payload = {
        idAuto: removeDotNumber(refId.current.value),
        dateAuto: refDate.current.value,
        dropdownSecretary: refSecretary.current.value,
        dropdownNotary: refNotary.current.value,
        nameContract: refNameContract.current.value,
        nameCustomer: refNameCustomer.current.value,
        phone: refPhoneCustomer.current.value,
      };
      // console.log("payload--->", payload);
      dispatch(createContractToday(payload));
      const result = +removeDotNumber(refId.current.value) + 1;
      refId.current.value = addDotNumber(result);
      refId.current.focus();
      // console.log("---", refId.current.value);
      refNameContract.current.value = "";
      refNameCustomer.current.value = "";
      // refPhoneCustomer.current.value = null;
      refNotary.current.value = "Chọn công chứng viên";
      refSecretary.current.value = "Chọn thư ký";
      setInputs({ ...inputs, phone: null });
    }
    if (e.key === "Escape") {
      if (refPhoneCustomer.current.value) {
        refPhoneCustomer.current.value = null;
        setInputs({ ...inputs, phone: null });
      } else {
        refNameCustomer.current.focus();
      }
    }
  };
  const handleChangerFocusPhone = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refPhoneCustomer.current.focus();
    }
    if (e.key === "Escape") {
      if (refNameCustomer.current.value) {
        refNameCustomer.current.value = null;
      } else {
        refNameContract.current.focus();
      }
    }
  };
  const handleChangerFocusNameCustomer = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refNameCustomer.current.focus();
    }
    if (e.key === "Escape") {
      if (refNameContract.current.value) refNameContract.current.value = null;
      else refNotary.current.focus();
    }
  };
  const handleChangerFocusNameContract = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refNameContract.current.focus();
    }
    if (e.key === "Escape") {
      if (refNotary.current.value !== "Chọn công chứng viên")
        refNotary.current.value = "Chọn công chứng viên";
      else refSecretary.current.focus();
    }
  };
  const handleChangerFocusNotary = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      refNotary.current.focus();
    }
    if (e.key === "Escape") {
      refSecretary.current.value = "Chọn thư ký";
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
  const sortSecretary = () => {
    dispatch(sort_secretary());
  };
  const sortKey = (key) => {
    dispatch(sort_key(key));
  };
  const arrSort = [{ key: "id_contract" }, { key: "id_user_notary.username" }];

  const { showModal, dataModal } = useSelector(
    (state) => state.showModalContractItem
  );
  const { show: showButtonPreviewContract, data: dataPreviewContract } =
    useSelector((state) => state.showPrevewContracts);
  // console.log({ data });
  // const dataValue = data.map((value) => [
  //   value.id_contract,
  //   value.id_user_secretary.username,
  //   value.id_user_notary.username,
  //   value.name,
  //   value.note,
  //   value.phone,
  //   value.date_create,
  // ]);
  // const addHeader = [
  //   ["shoHs", "Tk", "CCV", "TenHD", "TenKh", "SDT", "NgayTao"],
  //   ...dataValue,
  // ];
  // console.log({ addHeader });
  // const dataTest = [
  //   ["Name", "Age", "Job"],
  //   ["John", "30", "Engineer"],
  //   ["Jane", "25", "Doctor"],
  //   ["Mike", "35", "Designer"],
  // ];
  const values = getValuesObjectByKeys(data, [
    "id_contract",
    "id_user_secretary.username",
    "id_user_notary.username",
    "name",
    "note",
    "phone",
    "date_create",
  ]);
  const addBoxNumber = values.map((item, i) => [
    ++i,
    Math.ceil(item[0] / 50),
    item.slice(0, -1),
    formatDate(item.slice(-1)[0]),
  ]);
  // console.log(addBoxNumber);
  const addHeader = [
    ["STT", "SoHop", "shoHs", "Tk", "CCV", "TenHD", "TenKh", "SDT", "NgayTao"],
    ...addBoxNumber,
  ];
  const csvUrl = createCsvUrl(addHeader);
  const handleClickDownload = useCallback(() => {
    downloadCSV(addHeader, `${fileName()}.csv`);
  }, []);

  const [file, setFile] = useState(null);
  const [fileContents, setFileContents] = useState([]);

  const handleFileChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleFileRead = async (e) => {
    e.preventDefault();
    const contents = await readFile(file);
    dispatch(toggleModalPreviewContracts(contents));
    // setFileContents(contents);
  };
  // useEffect(() => {
  //   refTable.current.addEventListener("keydown", handleKeyDownDelete);
  // }, []);
  // console.log({ showModalContract });
  return (
    <div className="new-contract-today">
      <div className="manage-body-right-header">
        <form autoComplete="off">
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
              {/* <button onClick={handleClickDownload}>Download CSV</button> */}
              <button>
                <a href={csvUrl} download={`${fileName()}.csv`}>
                  Download CSV
                </a>
              </button>
              <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleFileRead}>Xem truoc</button>
              </div>
            </div>
            <div className="new-contract-show"></div>
          </div>
        </form>
      </div>
      <div className="manage-body-right-body">
        {/* <div className="new-contract-main"> */}
        {data && (
          <table>
            <thead>
              <tr>
                <th
                  className="header-contract"
                  onClick={() => sortKey("id_contract")}
                >
                  So CC
                </th>
                <th
                  className="header-header-secretary"
                  // onClick={sortSecretary}
                  onClick={() => sortKey("id_user_secretary")}
                >
                  Thu ky
                </th>
                <th
                  className="header-notary"
                  onClick={() => sortKey("id_user_notary")}
                >
                  Cong CV
                </th>
                <th className="header-name" onClick={() => sortKey("name")}>
                  Hop dong
                </th>
                <th className="header-customer" onClick={() => sortKey("note")}>
                  Khach hang
                </th>
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
                  notaryId={item["id_user_notary"]._id}
                  secretary={item["id_user_secretary"].username}
                  secretaryId={item["id_user_secretary"]._id}
                  name_customer={item["note"]}
                  phone={item["phone"]}
                  key={item["_id"]}
                  dateCreate={item["date_create"]}
                />
              ))}
            </tbody>
          </table>
        )}
        {/* <div>
          {fileContents.map((line, index) => (
            <p key={index}>{line.split(",")}</p>
          ))}
        </div> */}
        {number > 0 && <h2>Đã xóa {number} hợp đồng</h2>}
        {/* </div> */}
        {showModal && <ModalItemContract details={dataModal} />}
        {showButtonPreviewContract && (
          <ModalPreviewContract data={dataPreviewContract} />
        )}
      </div>
    </div>
  );
};

export default BodyRightNewContractToday;
