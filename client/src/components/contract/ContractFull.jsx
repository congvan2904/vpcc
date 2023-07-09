import { useDispatch } from "react-redux";
import "./contract-full.scss";
import {
  deleteContractToday,
  update_status as updateContract,
} from "../../redux/features/contractsSlice";
import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import addDotNumber from "../../helpers/addDotNumber";
import { toggleModal } from "../../redux/features/showModalItemContract";
import capitalizeFirstLetterOfEachWord from "../../helpers/capitalizeFirstLetterOfEachWord";
const ContractFull = (props) => {
  const [idDelete, setIdDelete] = useState({});
  const refTr = useRef(null);
  const dispatch = useDispatch();
  const id_contract = props.idContract;
  const number_contract = props.numberContract;
  const nameContract = props.name;
  const notary = props.notary;
  const secretary = props.secretary;
  const nameCustomer = props.name_customer;
  const phone = props.phone;

  const handleClick = (event, data) => {
    refTr.current.classList.toggle("active-tr");
    // console.log(data);
    setIdDelete({ id: data.idContract, number: data.numberContract });
    // console.log({ idDelete });
    if (event.detail === 2) {
      // console.log("double click", data);
      // dispatch(updateContract({ name: id_contract, status: false }));
      dispatch(toggleModal(data));
    }
  };

  const handleKeyDown = (e) => {
    e.preventDefault();
    // console.log(e);
    if (e.key === "Delete") {
      let confirm = window.prompt(`Hay nhap ma ho so can xoa`);
      if (+confirm === number_contract) {
        const payload = { id: id_contract };
        dispatch(deleteContractToday(payload));
      }
    }
  };

  useEffect(() => {
    const element = refTr.current;
    element.addEventListener("keydown", handleKeyDown);
    return () => element.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <tr
        onClick={(e) => handleClick(e, props)}
        ref={refTr}
        tabIndex={0}
        // onKeyDown={handleKeyDown}
      >
        <td>{addDotNumber(number_contract)}</td>
        <td>{capitalizeFirstLetterOfEachWord(secretary)}</td>
        <td>{capitalizeFirstLetterOfEachWord(notary)}</td>
        <td>{capitalizeFirstLetterOfEachWord(nameContract)}</td>
        <td>{capitalizeFirstLetterOfEachWord(nameCustomer)}</td>
        <td>{phone}</td>
      </tr>
      {/* <div className="contract-detail">
        <input type="text" value={addDotNumber(number_contract)} />
        <input type="text" value={secretary} />
        <input type="text" value={notary} />
        <input type="text" value={nameContract} />
        <input type="text" value={nameCustomer} />
        <input type="text" value={phone} />
      </div> */}
    </>
  );
};

export default ContractFull;
