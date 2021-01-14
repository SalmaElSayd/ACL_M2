import axios from 'axios'
import React, {useState} from 'react';
import setAuthToken from '../api'
import {Redirect,  Link , useHistory} from 'react-router-dom'
import '../style/loginstyle.css'

function Login() { 
  
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [newPass, setNewPassword]=useState();
    const [resMessage, setResMessage]=useState('');
    const [firstLogin, setFirstLogin]=useState(false);
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("logging in")
    const info = {
        email:email,
        password:password,
        newPassword:newPass
    }
    axios.post('http://localhost:3001/login', info, {})
    .then(res => {
      localStorage.setItem("jwtToken", res.data.t);
      if (res.data.first){
        setFirstLogin(true);
      }
      if (res.data.t){
          console.log('redirecting ')
         return  history.push('/home')   
      }else{
        setResMessage(res.data.message)
      }
      })
      



  }
  const handleEmailChange = (e)=>{
    const useremail = e.target.value ;
        setEmail(useremail);
}
const handlePasswordChange = (e)=>{
    const userpass = e.target.value ;
    setPassword(userpass);
}
const handleNewPasswordChange = (e)=>{
  const usernewpass = e.target.value ;
  setNewPassword(usernewpass);
}
if (firstLogin){
  return (
    <body >
      <div className="login">
        <h2>
            Log in
            </h2>
            
        

            <form onSubmit={onSubmit}>
        <input placeholder="email" type="email" onChange={handleEmailChange} />
        <input placeholder="password" type="password"onChange={handlePasswordChange} />
        <input placeholder="new password" type="password"onChange={handleNewPasswordChange} />
        <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label>{resMessage}</label>
    </div>
    </body>
  );}
  else{
    return (
    <div className='loginbody'>
      <div className="login">
        <h1>
            Log in
            </h1>
            
        

            <form onSubmit={onSubmit}>
        <input placeholder="email" type="email" onChange={handleEmailChange} />
        <input placeholder="password" type="password"onChange={handlePasswordChange} />
        <input placeholder="new password" type="password"onChange={handleNewPasswordChange} />
        <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label>{resMessage}</label>
    </div>
    </div>)
  }
}

export default Login;