import axios from 'axios'
import React, {useState} from 'react';
import setAuthToken from '../api'
import {Redirect,  Link , useHistory} from 'react-router-dom'
import '../style/loginstyle.css'

function Logout() {
    const [resMessage, setResMessage]=useState('');
    
    const history = useHistory();
  const handleClick = (e)=>{
    
    axios.post('http://localhost:3001/logout', {}, {headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
      
      
          console.log('redirecting ')
         return  history.push('/login')   
      
      
      })
      



  }
 
  return (
      <div>
      <button onClick={handleClick}>log out</button>
  <label>{resMessage}</label>
  </div>
  )
  
  
}

export default Logout;