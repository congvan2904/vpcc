import "./modal-item-contract.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../redux/features/showModalItemContract";
import formatDate from "../../helpers/formatDate";
import { useEffect, useRef, useState } from "react";
import removeDotNumber from "../../helpers/removeDotNumber";
import addDotNumber from "../../helpers/addDotNumber";
import formatPhoneNumber from "../../helpers/formatPhoneNumber";
import formatContractId from "../../helpers/formatContractId";
import { updateContractToday } from "../../redux/features/contractsSlice";

const ModalItemContract = ({ details }) => {
  // console.log(details);
  const refId = useRef(null);
  const refDate = useRef(null);
  const refSecretary = useRef(null);
  const refNotary = useRef(null);
  const refNameContract = useRef(null);
  const refNameCustomer = useRef(null);
  const refPhoneCustomer = useRef(null);

  const [title, setTitle] = useState("");

  const getDate = details?.dateCreate;
  const setInputDate = formatDate(getDate);
  const { data: dataUsers, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(document.activeElement);
  //   if (document.activeElement === refNameContract.current) {
  //     setTitle(refNameContract.current.alt);
  //   }
  // }, [document.activeElement]);

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      id: details.idContract,
      idAuto: removeDotNumber(refId.current.value),
      dateAuto: refDate.current.value,
      dropdownSecretary: refSecretary.current.value,
      dropdownNotary: refNotary.current.value,
      nameContract: refNameContract.current.value,
      nameCustomer: refNameCustomer.current.value,
      phone: refPhoneCustomer.current.value,
    };
    // console.log("payload--->", payload);
    dispatch(updateContractToday(payload));
    handleClose();
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

      // dispatch(createContractToday(payload));

      const result = +removeDotNumber(refId.current.value) + 1;
      refId.current.value = addDotNumber(result);
      refId.current.focus();
      // console.log("---", refId.current.value);
      refNameContract.current.value = "";
      refNameCustomer.current.value = "";
      // refPhoneCustomer.current.value = null;
      refNotary.current.value = "Chọn công chứng viên";
      refSecretary.current.value = "Chọn thư ký";
      // setInputs({ ...inputs, phone: null });
    }
    if (e.key === "Escape") {
      if (refPhoneCustomer.current.value) {
        refPhoneCustomer.current.value = null;
        // setInputs({ ...inputs, phone: null });
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
      else {
        refNotary.current.focus();
      }
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
    // dispatch(deleteContracts());
  };

  const handleClose = (e) => {
    dispatch(toggleModal());
  };
  const handleInputChange = (e) => {
    if (e.target.name === "idAuto") {
      const formattedPhoneNumber = formatContractId(e.target.value);
      refId.current.value = formattedPhoneNumber;
    }
    if (e.target.name === "phone") {
      const formattedPhoneNumber = formatPhoneNumber(e.target.value);
      refPhoneCustomer.current.value = formattedPhoneNumber;
    }
  };

  const handleFocus = (e) => {
    // console.log(e.target.getAttribute("alt"));
    setTitle(e.target.getAttribute("alt"));
  };
  const handleBlur = () => refId.current.focus();
  return (
    <div className="modal display-block">
      <section className="modal-main">
        {/* <div className="App"> */}
        {/* <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Age</th>
              <th scope="col">Location</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  defaultValue={details?.numberContract}
                  className="testrotate"
                />
              </td>
              <td>
                <input type="text" defaultValue={details?.secretary} />
              </td>
              <td>
                <input type="text" defaultValue={details?.notary} />
              </td>
              <td>
                <input type="text" defaultValue={details?.name} />
              </td>
              <td>
                <input type="text" defaultValue={details?.name_customer} />
              </td>
              <td>
                <input type="text" defaultValue={details?.phone} />
              </td>
            </tr>
          </tbody>
        </table> */}
        {/* </div> */}
        <form autoComplete="off">
          <h1>{title}</h1>
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
                  alt="Số công chứng"
                  defaultValue={formatContractId(`${details?.numberContract}`)}
                  onChange={handleInputChange}
                  onKeyDown={handleChangerFocusSecretary}
                  autoFocus
                  onFocus={handleFocus}
                  // onBlur={() => setTitle("")}
                />
              </div>
              <label htmlFor="">Ngày </label>
              <div className="tooltip">
                <input
                  ref={refDate}
                  type="date"
                  id="dateAuto"
                  name="dateAuto"
                  alt="Ngày công chứng"
                  defaultValue={setInputDate}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  // onBlur={() => setTitle("")}
                />
              </div>
            </div>

            <div className="new-contract-group">
              <label htmlFor="">Tên thư ký</label>
              <select
                ref={refSecretary}
                name="dropdownSecretary"
                defaultValue={details?.secretaryId}
                alt="Thư ký"
                // onChange={handleInputChange}
                onKeyDown={handleChangerFocusNotary}
                onFocus={handleFocus}
                // onBlur={() => setTitle("")}
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
                defaultValue={details?.notaryId}
                alt="Công chứng viên"
                // onChange={handleInputChange}
                onKeyDown={handleChangerFocusNameContract}
                onFocus={handleFocus}
                // onBlur={() => setTitle("")}
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
                defaultValue={details?.name}
                alt="Hồ sơ"
                onChange={handleInputChange}
                onKeyDown={handleChangerFocusNameCustomer}
                onFocus={handleFocus}
                // onBlur={() => setTitle("")}
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
                defaultValue={details?.name_customer}
                alt="Khách Hàng"
                onChange={handleInputChange}
                onKeyDown={handleChangerFocusPhone}
                onFocus={handleFocus}
                // onBlur={() => setTitle("")}
              />
              <label htmlFor="">Số điện thoại</label>
              <input
                ref={refPhoneCustomer}
                id="phone_number"
                type="text"
                placeholder="Số điện thoại"
                name="phone"
                defaultValue={details?.phone}
                onChange={handleInputChange}
                alt="Số điện thoại"
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                // onBlur={() => setTitle("")}
              />
            </div>
            <div className="new-contract-group">
              <button className="btn-save" onClick={handleSave}>
                💾{" "}
              </button>
            </div>
            <div className="new-contract-show"></div>
          </div>
        </form>
        <button className="btn-close" onClick={handleClose}>
          x
        </button>
      </section>
    </div>
  );
};

export default ModalItemContract;
