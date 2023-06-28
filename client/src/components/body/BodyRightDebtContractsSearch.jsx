import "./body-right-debt-contract-search.scss";
import imgSearch from "../../assets/manage/search.png";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findContractDebt } from "../../redux/features/contractsSlice";
import ContractFull from "../contract/ContractFull";
import formatDate from "../../helpers/formatDate";

const BodyRightDebtContractsSearch = () => {
  const [showCombobox, setShowCombobox] = useState(false);
  const refSearch = useRef();
  const refSelect = useRef();
  const refNotary = useRef();
  const refSecretary = useRef();
  const refFromDate = useRef();
  const refToDate = useRef();
  const refIdContract = useRef();
  const refId = useRef();
  const refPersion = useRef();
  const refCheckBoxSelectId = useRef();
  const refCheckBoxSecretary = useRef();
  const refCheckBoxNotary = useRef();
  const refCheckBoxDate = useRef();
  const refStartDate = useRef();
  const refEndDate = useRef();

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // let value = refSearch.current.value;
    // let dateFrom = refFromDate.current.value;
    // let dateTo = refToDate.current.value;

    // if (refSelect.current.value === "id_user_notary") {
    //   value = refNotary.current.value;
    // }
    // if (refSelect.current.value === "id_user_secretary") {
    //   value = refNotary.current.value;
    // }
    // let payload = {
    //   [refSelect.current.value]: value,
    // };
    // if (dateFrom && dateTo) {
    //   payload = {
    //     [refSelect.current.value]: value,
    //     dateFrom,
    //     dateTo,
    //   };
    // }

    let payload = {};
    if (refCheckBoxSelectId.current.checked) {
      if (refIdContract.current.value) {
        payload = {
          [refIdContract.current.name]: refIdContract.current.value,
          ...payload,
        };
      }
    }
    if (refCheckBoxDate.current.checked) {
      if (refStartDate.current.value && refEndDate.current.value) {
        payload = {
          [refStartDate.current.name]: refStartDate.current.value,
          [refEndDate.current.name]: refEndDate.current.value,
          ...payload,
        };
      }
    }
    if (refCheckBoxSecretary.current.checked) {
      payload = {
        [refSecretary.current.name]: refSecretary.current.value,
        ...payload,
      };
    }
    if (refCheckBoxNotary.current.checked) {
      payload = {
        [refNotary.current.name]: refNotary.current.value,
        ...payload,
      };
    }
    // console.log(payload);

    dispatch(findContractDebt(payload));
    // refFromDate.current.value = null;
    // refToDate.current.value = null;
    // console.log(result.payload);
  };
  const { findDebt } = useSelector((state) => state.contracts);
  const { data: dataUsers, loading } = useSelector((state) => state.users);

  // console.log({ findDebt });
  // const handleChange = () => {
  //   if (refSelect.current.value === "id_user_notary") {
  //     setShowCombobox(true);
  //   } else setShowCombobox(false);
  // };
  const listCheck = ["selectId", "secretary", "notary", "selectDay"];
  const handleChange = (e) => {
    const { value, checked } = e.target;
    // console.log();
    if (checked) {
      if (value === listCheck[0]) {
        refIdContract.current.classList.toggle("show");
        refPersion.current.classList.toggle("hide");
      }
      if (value === listCheck[1]) {
        refSecretary.current.classList.toggle("show");
        refId.current.classList.add("hide");
      }
      if (value === listCheck[2]) {
        refNotary.current.classList.toggle("show");
        refId.current.classList.add("hide");
      }
      if (value === listCheck[3]) {
        refFromDate.current.classList.toggle("show");
        refToDate.current.classList.toggle("show");
      }
    } else {
      if (value === listCheck[0]) {
        refIdContract.current.classList.toggle("show");
        refPersion.current.classList.toggle("hide");
      }
      if (value === listCheck[1]) {
        refSecretary.current.classList.toggle("show");
        refCheckBoxNotary.current.checked === false &&
          refId.current.classList.remove("hide");
      }
      if (value === listCheck[2]) {
        refNotary.current.classList.toggle("show");
        refCheckBoxSecretary.current.checked === false &&
          refId.current.classList.remove("hide");
      }
      if (value === listCheck[3]) {
        refFromDate.current.classList.toggle("show");
        refToDate.current.classList.toggle("show");
      }
    }
  };
  return (
    <div className="debt-contract-search">
      {/* <select ref={refSelect} onChange={handleChange}>
        <option value="id_contract">So ho so</option>

        <option value={"id_user_notary"}>cong chung vien</option>
        <option value={"id_user_secretary"}>Thu ky</option>
        <option value={"name"}>Ten ho so</option>
        <option value={"note"}>Ten khach hang</option>
        <option value={"phone"}>so dien thoai</option>
      </select>
      <div className="choose-day">
        <div className="choose-day-from">
          <label htmlFor="">Tu Ngày </label>
          <input
            type="date"
            id="dateAuto"
            name="dateAuto"
            // value={inputs.name}
            // defaultValue={getCurrentDateInput()}
            // onChange={handleInputChange}
            ref={refFromDate}
          />
        </div>
        <div className="choose-day-to">
          <label htmlFor="">Den Ngày </label>
          <input
            type="date"
            id="dateAuto"
            name="dateAuto"
            // value={inputs.name}
            // defaultValue={getCurrentDateInput()}
            // onChange={handleInputChange}
            ref={refToDate}
          />
        </div>
      </div>
      <div className="search-bar">
        <input
          type="text"
          className={showCombobox ? "hide searchTerm" : "show searchTerm"}
          placeholder="What are you looking for?"
          ref={refSearch}
        />
        <select
          ref={refNotary}
          name="dropdownNotary"
          // value={inputs.name}
          // onChange={handleInputChange}
          // onKeyDown={handleChangerFocusNameContract}
          className={showCombobox ? "show" : "hide"}
        >
          {dataUsers.map((e) => {
            return (
              <option value={e._id} key={e._id}>
                {e.username}
              </option>
            );
          })}
        </select>
        <button type="submit" className="searchButton" onClick={handleSubmit}>
          <img src={imgSearch} alt="" />
        </button>
      </div>
      <div className="contract-table">
        {findData && (
          <table>
            <thead>
              <tr>
                <td>So hop</td>
                <td>So ho so</td>
                <td>Thu ky</td>
                <td>Cong chung vien</td>
                <td>Ten Ho so</td>
                <td>Ten khach hang</td>
                <td>So dien thoai</td>
                <td>Ngay tao</td>
              </tr>
            </thead>
            <tbody>
              {findData.map((item, index) => (
                <tr key={index}>
                  <td>{Math.ceil(item.id_contract / 50)}</td>
                  <td>{item.id_contract}</td>
                  <td>{item.id_user_secretary.username}</td>
                  <td>{item.id_user_notary.username}</td>
                  <td>{item.name}</td>
                  <td>{item.note}</td>
                  <td>{item.phone}</td>
                  <td>{formatDate(item.date_create)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div> */}
      <div className="search-title">
        <div className="search-title-contractid" ref={refId}>
          <input
            type="checkbox"
            id=""
            value={"selectId"}
            ref={refCheckBoxSelectId}
            onChange={handleChange}
          />
          <label htmlFor="">Ma ho so</label>
          <input
            type="text"
            className="idContract"
            name="id_contract"
            ref={refIdContract}
          />
        </div>
        <div className="search-title-persion" ref={refPersion}>
          <div className="search-title-persion-secretary">
            <input
              type="checkbox"
              name=""
              id=""
              value={"secretary"}
              ref={refCheckBoxSecretary}
              onChange={handleChange}
            />
            <label htmlFor="">Thu ky</label>
            <select
              ref={refSecretary}
              name="id_user_secretary"
              className="secretary"
              // value={inputs.name}
              // onChange={handleInputChange}
              // onKeyDown={handleChangerFocusNameContract}
              // className={showCombobox ? "show" : "hide"}
            >
              {dataUsers.map((e) => {
                return (
                  <option value={e._id} key={e._id}>
                    {e.username}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="search-title-persion-notary">
            <input
              type="checkbox"
              name=""
              id=""
              ref={refCheckBoxNotary}
              value={"notary"}
              onChange={handleChange}
            />
            <label htmlFor="">Cong chung vien</label>
            <select
              ref={refNotary}
              name="id_user_notary"
              className="notary"
              // value={inputs.name}
              // onChange={handleInputChange}
              // onKeyDown={handleChangerFocusNameContract}
              // className={showCombobox ? "show" : "hide"}
            >
              {dataUsers.map((e) => {
                return (
                  <option value={e._id} key={e._id}>
                    {e.username}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="search-title-date">
          <div className="search-title-date-select">
            <input
              type="checkbox"
              name=""
              id=""
              value={"selectDay"}
              ref={refCheckBoxDate}
              onChange={handleChange}
            />
            <label htmlFor="">Chon ngay</label>
          </div>
          <div className="search-title-date-from" ref={refFromDate}>
            <label htmlFor="">Tu ngay</label>
            <input type="date" name="start" id="" ref={refStartDate} />
          </div>
          <div className="search-title-date-to" ref={refToDate}>
            <label htmlFor="">Den ngay</label>
            <input type="date" name="end" id="" ref={refEndDate} />
          </div>
        </div>
        <button type="submit" className="searchButton" onClick={handleSubmit}>
          <img src={imgSearch} alt="" />
        </button>
      </div>
      <div className="search-content">
        {findDebt && (
          <table>
            <thead>
              <tr>
                <td>So hop</td>
                <td>So ho so</td>
                <td>Thu ky</td>
                <td>Cong chung vien</td>
                <td>Ten Ho so</td>
                <td>Ten khach hang</td>
                <td>So dien thoai</td>
                <td>Ngay tao</td>
              </tr>
            </thead>
            <tbody>
              {findDebt.map((item, index) => (
                <tr key={index}>
                  <td>{Math.ceil(item.id_contract / 50)}</td>
                  <td>{item.id_contract}</td>
                  <td>{item.id_user_secretary.username}</td>
                  <td>{item.id_user_notary.username}</td>
                  <td>{item.name}</td>
                  <td>{item.note}</td>
                  <td>{item.phone}</td>
                  <td>{formatDate(item.date_create)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BodyRightDebtContractsSearch;
