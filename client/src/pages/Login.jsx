import React from 'react'
import {Link} from 'react-router-dom'
const Login = () => {
  return (
    <div>
        <form action="">
            <div className="group-user-name">
                {/* <label htmlFor="">Tên đăng nhập</label> */}
                <input type="text" placeholder='Tên đăng nhập'/>
            </div>
            <div className="group-password">
                {/* <label htmlFor="">Mật khẩu</label> */}
                <input type="text" placeholder='Mật khẩu' />
            </div>
            <button className="button">
                Đăng Nhập
            </button>
        </form>
        <p>
            Bạn đã có tài khoản chưa?
            {/* <Link to='/register'> */}
                <button>Đăng ký</button>
            {/* </Link> */}
        </p>
    </div>
  )
}

export default Login