import React from "react";
import Helmet from "../components/Helmet";

const Contracts = () => {
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
            <option selected value="default">
              Chọn thư ký
            </option>
            <option value="Lực">Lực</option>
            <option value="Hồng">Hồng</option>
            <option value="Sơn">Sơn</option>
            <option value="Thủy">Thủy</option>
          </select>
        </div>
        <div className="contract-manager-group">
          <label htmlFor="">Tên công chứng viên</label>
          <select>
            <option selected value="Điền">
              Nguyễn Đức Điền
            </option>
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
        <div className="contract-show"></div>
      </div>
    </Helmet>
  );
};

export default Contracts;
