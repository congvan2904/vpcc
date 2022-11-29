import "../contract/contract.scss";
const Contract = (props) => {
  const id_contract = props.contract;
  const count_contract = props.name;
  console.log(id_contract);
  return (
    <div className="contract-item">
      <div className="contract-item-number">{id_contract}</div>
      <div className="contract-item-name-secretary">{count_contract}</div>
    </div>
  );
};

export default Contract;
