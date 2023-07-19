import { useState } from "react";
import ContractFull from "../contract/ContractFull";
import "./modal-preview-contracts.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalPreviewContracts } from "../../redux/features/showPreviewContracts";
import { createContracts } from "../../redux/features/contractsSlice";

const ModalPreviewContract = ({ data }) => {
  // console.log(data);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleClose = () => {
    dispatch(toggleModalPreviewContracts());
  };
  const handleAddContracts = () => {
    const removeHeaderData = data.slice(1, -1);
    const payload = removeHeaderData.map((item) => ({
      id_contract: item[2],
      username_secretary: item[3],
      username_notary: item[4],
      name: item[5],
      name_customer: item[6],
      phone: item[7],
      day_created: item[8],
    }));
    removeHeaderData.length > 0 && dispatch(createContracts(payload));
  };
  const { dataContracts } = useSelector((state) => state.contracts);
  console.log({ dataContracts });
  return (
    <div className="modal-preview-contracts">
      {data && (
        <table>
          <thead>
            <tr>
              <th
                className="header-contract"
                // onClick={() => sortKey("id_contract")}
              >
                So TT
              </th>
              <th
                className="header-header-secretary"
                // onClick={sortSecretary}
                // onClick={() => sortKey("id_user_secretary")}
              >
                So Hop
              </th>
              <th
                className="header-notary"
                // onClick={() => sortKey("id_user_notary")}
              >
                So CC
              </th>
              <th
                className="header-name"
                // onClick={() => sortKey("name")}
              >
                Ten Tk
              </th>
              <th
                className="header-customer"
                //  onClick={() => sortKey("note")}
              >
                Ten CCV
              </th>
              <th className="header-phone">Ten HD</th>
              <th className="header-phone">Ten HD</th>
              <th className="header-phone">SDT</th>
              <th className="header-phone">Ngay tao</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              if (index === 0) return null;
              return (
                <tr key={index}>
                  <td>
                    {/* <input
                      type="text"
                      name=""
                      id=""
                      value={item[0]}
                      onChange={handleInputChange}
                      style={{ "--number-of-chars": inputValue.length }}
                    /> */}
                    {item[0]}
                  </td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                  <td>{item[4]}</td>
                  <td>{item[5]}</td>
                  <td>{item[6]}</td>
                  <td>{item[7]}</td>
                  <td>{item[8]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {/* {data.map((line, index) => (
        <p key={index}>{line}</p>
      ))} */}
      <button className="close" onClick={handleClose}>
        x
      </button>
      <button className="add" onClick={handleAddContracts}>
        +
      </button>
    </div>
  );
};

export default ModalPreviewContract;
