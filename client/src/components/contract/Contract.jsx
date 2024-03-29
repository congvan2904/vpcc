import { useDispatch } from "react-redux";
import "../contract/contract.scss";
import { update_status as updateContract } from "../../redux/features/contractsSlice";
import { useState } from "react";
import { Navigate } from "react-router-dom";
const Contract = (props) => {
  // const [refContract, setRefContract] = useState(true);
  const dispatch = useDispatch();
  const number_contract = props.numberContract;
  const count_contract = props.name;
  const id_contract = props.idContract;
  // console.log(id_contract);
  let _do;
  const t2 = "Văn Thư Nguyễn văn văn văn Công";
  const t1 = ` ==== ⭐️  VĂN PHÒNG CÔNG CHỨNG NGUYỄN ĐỨC ĐIỀN  ⭐️  ==== ${t2}`;
  _do = 360 / t1.length;

  const handleClick = (event) => {
    // setRefContract(!refContract);

    // console.log(refContract);
    if (event.detail === 2) {
      console.log("double click", number_contract);
      dispatch(updateContract({ name: id_contract, status: false }));
    }
  };
  return (
    <div className="contract-main-item" onClick={handleClick}>
      <div className="contract-main-item-number under-line">
        {number_contract}
      </div>
      <div className="contract-main-item-name-secretary">{count_contract}</div>
      <div className="contract-main-item-circle">
        {t1.split("").map((item, i) => (
          <span key={i} style={{ transform: `rotate(${i * _do}deg)` }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Contract;
