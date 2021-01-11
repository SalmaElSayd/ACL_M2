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
    
      
            
        
<div className="form-loc">
        <h3>
            Reset Password
            </h3>
    <div>
            <form onSubmit={onSubmit}>
        <input placeholder="password" type="password" className="form-control" onChange={handlePasswordChange} />
        <input type="submit" className="btn btn-primary" />
            </form>
  <label>{resMessage}</label>
        </div>
    </div>

    
    
  );
}

export default ResetPassword;