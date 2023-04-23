import { useDispatch, useSelector } from "react-redux";
import "./body-right-debt-contract.scss";
import compactDate from "../../helpers/compactDate";
import {
  updateStatusDebtContract,
  groupDebtContracts,
} from "../../redux/features/contractsSlice";
import { useEffect } from "react";
const BodyRightDebtContracts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(groupDebtContracts());
  }, []);
  const { groupData } = useSelector((state) => state.contracts);
  // console.log("groupData", groupData);

  const handUpdateDebtContract = (e, data) => {
    if (e.detail === 2) {
      const payload = { id: data, status: false };
      dispatch(updateStatusDebtContract(payload));
    }
  };

  return (
    <div className="body-right-debt-contract">
      {groupData.map((data) => (
        <div key={data._id}>
          {data.list_day.length > 0 && (
            <div className="debt" key={data._id}>
              <div className="debt-name">{data.username}</div>
              <div className="debt-days">
                {data.list_day.map((day) => (
                  <div className="debt-day" key={day.date_create}>
                    <div className="debt-day-create">
                      {compactDate(day.date_create)}
                    </div>
                    <div className="debt-contracts">
                      {day.list_contract.map((contract) => (
                        <div
                          className="debt-contract"
                          key={contract.id_contract}
                          onClick={(e) =>
                            handUpdateDebtContract(e, contract.id_contract)
                          }
                        >
                          <div className="contract-number">
                            {contract.number_contract}
                          </div>
                          <div className="contract-name">
                            {contract.name_contract}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BodyRightDebtContracts;
