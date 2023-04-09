import { useDispatch } from "react-redux";
import "./contract-full.scss";
import { update_status as updateContract } from "../../redux/features/contractsSlice";
import { useState } from "react";
import { Navigate } from "react-router-dom";
const ContractFull = (props) => {
  // const [refContract, setRefContract] = useState(true);
  const dispatch = useDispatch();
  const number_contract = props.numberContract;
  const nameContract = props.name;
  const id_contract = props.idContract;
  const notary = props.notary;
  const secretary = props.secretary;
  const nameCustomer = props.name_customer;
  const phone = props.phone;

  const handleClick = (event) => {
    // if (event.detail === 2) {
    //   console.log("double click", number_contract);
    //   dispatch(updateContract({ name: id_contract, status: false }));
    // }
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
    <tr>
      <td>{number_contract}</td>
      <td>{secretary}</td>
      <td>{notary}</td>
      <td>{nameContract}</td>
      <td>{nameCustomer}</td>
      <td>{phone}</td>
    </tr>
  );
};

export default ContractFull;
