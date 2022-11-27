import React, { useState } from 'react'
import {Link, Navigate} from 'react-router-dom'
import profile from '../assets/login/a.png'
import email from "./../assets/login/email.jpg";
import pass from "./../assets/login/pass.png";
import logo from '../assets/logo.png'
import '../sass/login.scss'
import Helmet from '../components/Helmet';
import instance from '../services/configAxios'
// import axios from 'axios'
const Login = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [login, setLogin] = useState(false)
  // const onchangeUsername=(e)=>setUsername(e.target.value)
  // const onchangePassword=(e)=>setPassword(e.target.value)
  // const handleUsername=async()=>await instance.post('user/login',{username:'cong2',password:'1'})
  // console.log(handleUsername)
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const response=(await instance.post('user/login',{username,password})).data
    
    // console.log({response})
    if(response.accessToken){
      await instance.setLocalToken(response.accessToken,response.refreshToken);
      setLogin(true)
    }
  }
  
    return (
      
      <Helmet title={'Đăng nhập'}>
        {login&&(<Navigate to="/users" replace={true} />)}
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
                 <input type="text" placeholder="Tên" className="name" onChange={(e)=>setUsername(e.target.value)} />
               </div>
               <div className="second-input">
                 <img src={pass} alt="pass" className="email"/>
                 <input type="password" placeholder="Mật khẩu" className="password" onChange={(e)=>setPassword(e.target.value)}/>
               </div>
              <div className="login-button">
                <button onClick={handleSubmit}>Đăng nhập</button>
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