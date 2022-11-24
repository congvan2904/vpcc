import React from 'react'
import {Link} from 'react-router-dom'
import profile from '../assets/login/a.png'
import email from "./../assets/login/email.jpg";
import pass from "./../assets/login/pass.png";
import logo from '../assets/logo.png'
import '../sass/login.scss'
import Helmet from '../components/Helmet';
const Login = () => {
    return (
      <Helmet title={'Đăng nhập'}>
        <div className="main">
         <div className="sub-main">
           <div>
             <div className="imgs">
               <div className="container-image">
                 <img src={logo} alt="profile" className="profile"/>
    
               </div>
    
    
             </div>
             <div>
               <h1>Trang Đăng Nhập</h1>
               <div>
                 <img src={email} alt="email" className="email"/>
                 <input type="text" placeholder="Tên" className="name"/>
               </div>
               <div className="second-input">
                 <img src={pass} alt="pass" className="email"/>
                 <input type="password" placeholder="Mật khẩu" className="name"/>
               </div>
              <div className="login-button">
              <button>Đăng nhập</button>
              </div>
               
                <p className="link">
                  <a href="#">Quên mật khẩu ?</a> Or<a href="/register"> Đăng ký</a>
                </p>
               
     
             </div>
           </div>
           
    
         </div>
        </div>
        </Helmet>
      );
}

export default Login