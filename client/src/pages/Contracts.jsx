import React from 'react'
import Helmet from '../components/Helmet'

const Contracts = () => {
  return (
   <Helmet title='Hợp đồng'>
    <div className="contract">
      <div className="contract-manager">
        <div className="contract-manager-group">
          <label htmlFor="">Số CC</label>
          <input type="text" placeholder='Số công chứng' />
        </div>
      </div>
      <div className="contract-manager-group">
          <label htmlFor="">Tên thư ký</label>
          <input type="text" placeholder='Tên thư ký' />
        </div>
        <div className="contract-manager-group">
          <label htmlFor="">Tên công chứng viên</label>
          <input type="text" placeholder='Tên công chứng viên' />
        </div>
        <div className="contract-manager-group">
          <label htmlFor="">Ngày</label>
          <input type="date" name="" id="" />
          <input type="datetime" name="" id="" />
        </div>
      <div className="contract-show"></div>
    </div>
   </Helmet>
  )
}

export default Contracts