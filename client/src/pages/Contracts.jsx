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
          <label htmlFor="">Số CC</label>
          <input type="text" placeholder='Số công chứng' />
        </div>
      <div className="contract-show"></div>
    </div>
   </Helmet>
  )
}

export default Contracts