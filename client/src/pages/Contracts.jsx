import React, { Fragment, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Contract from "../components/contract/Contract";
import Helmet from "../components/Helmet";
import instance from "../services/configAxios";

const Contracts = () => {
  const [dataContract, setDataContract] = useState([]);

  useEffect(() => {
    async function fetDataContract() {
      try {
        const data = (await instance.get("contract/debt")).data;
        console.log(data.message);
        if (data.message === "success") {
          setDataContract(data.data);
          return data.data;
        }
        setDataContract(data.message);
        return data.message;
      } catch (error) {
        setDataContract(error.message);
      }
    }
    fetDataContract();
  }, []);

  return (
    <Helmet title="Hợp đồng">
      <div className="contract">
        <div className="contract-manager">
          <div className="contract-manager-group">
            <label htmlFor="">Số công chứng tự dộng</label>
            <input type="text" placeholder="Số công chứng" />
            <label htmlFor="">Số công chứng hồ sơ</label>
            <input type="text" placeholder="Số công chứng" />
          </div>
        </div>
        <div className="contract-manager-group">
          <label htmlFor="">Tên thư ký</label>
          <select>
            <option defaultValue="default">Chọn thư ký</option>
            <option value="Lực">Lực</option>
            <option value="Hồng">Hồng</option>
            <option value="Sơn">Sơn</option>
            <option value="Thủy">Thủy</option>
          </select>
        </div>
        <div className="contract-manager-group">
          <label htmlFor="">Tên công chứng viên</label>
          <select>
            <option defaultValue="Điền">Nguyễn Đức Điền</option>
            <option value="Liên">Nguyễn Thị Kim Liên</option>
            <option value="Bay">Nguyễn Thị Bay</option>
          </select>
        </div>
        <div className="contract-manager-group">
          <label htmlFor="">Ngày tự động</label>
          <input type="date" name="" id="" />
          <label htmlFor="">Ngày theo hồ sơ</label>
          <input type="date" name="" id="" />
        </div>
        <div className="contract-manager-group">
          <label htmlFor="">Tên hồ sơ</label>
          <input type="text" placeholder="Tên hồ sơ" />
          <label htmlFor="">Tên khách hàng</label>
          <input type="text" placeholder="Tên Khách Hàng" />
          <label htmlFor="">Số điện thoại</label>
          <input type="text" placeholder="Số điện thoại" />
        </div>
        <div className="contract-manager-group">
          <button>Thêm hồ sơ</button>
        </div>
        <div className="contract-show">
          {/* <form>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataContract.map((contract, index) => (
                  <tr key={index}>
                    <td>{contract.user.name}</td>
                    <td>{contract.count}</td>
                    <td>
                      {contract.id_contract.map((item, i) => (
                        <div key={i}>{item}</div>
                      ))}
                    </td>
                    <td>
                      <button type="button" onClick={(event) => {}}>
                        Edit
                      </button>
                      <button type="button" onClick={() => {}}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form> */}
          {dataContract === null ? (
            ""
          ) : dataContract === "You don't have permission" ? (
            "You don't have permission"
          ) : dataContract === "jwt expired" ? (
            <Navigate to="/" replace={true} />
          ) : (
            dataContract.map((contract, index) => (
              <div className="contract-main" key={index}>
                {contract.id_contract.map((item, i) => (
                  <Contract key={i} contract={item} name={contract.user.name} />
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </Helmet>
  );
};

export default Contracts;
