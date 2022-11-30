import "../contract/contract.scss";
const Contract = (props) => {
  const id_contract = props.contract;
  const count_contract = props.name;
  // console.log(id_contract);
  const handleClick = (event) => {
    if (event.detail === 2) {
      console.log("double click", id_contract);
    }
  };
  return (
    <div className="contract-main-item" onClick={handleClick}>
      <div className="contract-main-item-number">{id_contract}</div>
      <div className="contract-main-item-name-secretary">{count_contract}</div>
    </div>
  );
};

export default Contract;
