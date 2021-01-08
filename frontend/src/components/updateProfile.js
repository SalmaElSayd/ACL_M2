import axios from 'axios'
import React, {useState} from 'react';
import setAuthToken from '../api'
import { Link } from 'react-router-dom'

function Login() {
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("logging in")
    const info = {
        email:email,
        password:password
    }
    axios.post('http://localhost:3001/login', info)
    .then(res => {
      localStorage.setItem("jwtToken", res.data);
      console.log("resdata "+res.data);
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

  return (
    
      <div className="jss102">
        <h3>
            Log in
            </h3>
            
        
<div className="container">
    <div>
            <form onSubmit={onSubmit}>
        <input placeholder="email" type="email" onChange={handleEmailChange} />
        <input placeholder="password" type="password"onChange={handlePasswordChange} />
        <input type="submit" />
            </form>
        </div>
    </div>

    </div>
    
  );
}

export default Login;