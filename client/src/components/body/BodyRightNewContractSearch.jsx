import "./body-right-new-contract-search.scss";
import imgSearch from "../../assets/manage/search.png";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findContract } from "../../redux/features/contractsSlice";
import ContractFull from "../contract/ContractFull";
import formatDate from "../../helpers/formatDate";
import capitalizeFirstLetterOfEachWord from "../../helpers/capitalizeFirstLetterOfEachWord";

const BodyRightNewContractSearch = () => {
  const [showCombobox, setShowCombobox] = useState(false);
  const refSearch = useRef();
  const refSelect = useRef();
  const refNotary = useRef();
  const refFromDate = useRef();
  const refToDate = useRef();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    let value = refSearch.current.value;
    let dateFrom = refFromDate.current.value;
    let dateTo = refToDate.current.value;

    if (refSelect.current.value === "id_user_notary") {
      value = refNotary.current.value;
    }
    if (refSelect.current.value === "id_user_secretary") {
      value = refNotary.current.value;
    }
    let payload = {
      [refSelect.current.value]: value,
    };
    if (dateFrom && dateTo) {
      payload = {
        [refSelect.current.value]: value,
        dateFrom,
        dateTo,
      };
    }

    console.log(payload);
    // console.log({ dateCreate });

    dispatch(findContract(payload));
    refFromDate.current.value = null;
    refToDate.current.value = null;
    // console.log(result.payload);
  };
  const { findData } = useSelector((state) => state.contracts);
  const { data: dataUsers, loading } = useSelector((state) => state.users);

  console.log({ findData });
  const handleChange = () => {
    if (refSelect.current.value === "id_user_notary") {
      setShowCombobox(true);
    } else setShowCombobox(false);
  };
  return (
    <div className="new-contract-search">
      <select ref={refSelect} onChange={handleChange}>
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
          placeholder="Nhap thong tin can tim?"
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
                <td>Cong CV</td>
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
                  <td>
                    {capitalizeFirstLetterOfEachWord(
                      item.id_user_secretary.username
                    )}
                  </td>
                  <td>
                    {capitalizeFirstLetterOfEachWord(
                      item.id_user_notary.username
                    )}
                  </td>
                  <td>{capitalizeFirstLetterOfEachWord(item.name)}</td>
                  <td>{capitalizeFirstLetterOfEachWord(item.note)}</td>
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

export default BodyRightNewContractSearch;
