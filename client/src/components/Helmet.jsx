import React from 'react'

const Helmet = (props) => {
    document.title=`${props.title} - Công Chứng NĐĐ`
  return (
    <div>
         {props.children}
    </div>
  )
}

export default Helmet