import axios from 'axios'
import React, {useState} from 'react';
import setAuthToken from '../api'
import { Link } from 'react-router-dom'

function ResetPassword() {
    const [newpassword, setPassword]=useState();
    const [resMessage, setResMessage]=useState('');
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("resetting password")
    const info = {
        password:newpassword
    }
    axios.post('http://localhost:3001/resetPassword', info, {headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
      console.log("resdata "+res.data.message);
      })
      



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
            
        
<div className="form-loc">
    <div>
            <form onSubmit={onSubmit}>
        <input placeholder="password" type="password"onChange={handlePasswordChange} />
        <input type="submit" />
            </form>
  <label>{resMessage}</label>
        </div>
    </div>

    </div>
    
  );
}

export default ResetPassword;