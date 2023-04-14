import { useDispatch } from "react-redux";
import "./contract-full.scss";
import { update_status as updateContract } from "../../redux/features/contractsSlice";
import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import addDotNumber from "../../helpers/addDotNumber";
import ItemContract from "./ItemContract";
const ContractFull = (props) => {
  // const [refContract, setRefContract] = useState(true);
  const refTr = useRef(null);
  const dispatch = useDispatch();
  const number_contract = props.numberContract;
  const nameContract = props.name;
  const id_contract = props.idContract;
  const notary = props.notary;
  const secretary = props.secretary;
  const nameCustomer = props.name_customer;
  const phone = props.phone;

  const handleClick = (event) => {
    refTr.current.classList.toggle("active-tr");
    console.log("first");
    if (event.detail === 2) {
      console.log("double click", id_contract);
      // dispatch(updateContract({ name: id_contract, status: false }));
    }
  };
  return (
    // <div className="contract-item" onClick={handleClick}>
    //   <div className="item-id">{number_contract}</div>
    //   <div className="item-secretary">{secretary}</div>
    //   <div className="item-notary">{notary}</div>
    //   <div className="item-name-contract">{nameContract}</div>
    //   <div className="item-customer">{nameCustomer}</div>
    //   <div className="item-phone">{phone}</div>
    // </div>
    <>
      <tr onClick={handleClick} ref={refTr}>
        <td>{addDotNumber(number_contract)}</td>
        <td>{secretary}</td>
        <td>{notary}</td>
        <td>{nameContract}</td>
        <td>{nameCustomer}</td>
        <td>{phone}</td>
      </tr>
      <div className="contract-detail">
        <input type="text" value={addDotNumber(number_contract)} />
        <input type="text" value={secretary} />
        <input type="text" value={notary} />
        <input type="text" value={nameContract} />
        <input type="text" value={nameCustomer} />
        <input type="text" value={phone} />
      </div>
    </>
  );
};

export default ContractFull;
