import axios from 'axios'
import React , {useState, useEffect}from 'react'
import api from '../api'
import { Link } from 'react-router-dom'
// import '../style/siginout.css'
function Sign() {
  const [intime, setIntime]=useState();
  const [outtime, setOuttime]=useState();

  const signin = ()=>{
    console.log("signing in")
    axios.post('http://localhost:3001/signIn',{} ,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
      setIntime(res.data.time);
      console.log(res.data)})
  }
  const signout = ()=>{
    console.log("signing out")
    axios.post('http://localhost:3001/signOut',{}, {headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
      setOuttime(res.data.time);
      console.log(res.data)})
  }
  return (
    
      <div className="form-loc">
        <div className='row'>
        <h1>
            Sign in or out
            </h1>
            </div>
        
  <div className='container px-5 py-5'>
<div className="row">
    <div className='col mx-1'>
        <button className="btn btn-primary btn-lg" type="button" onClick={signin}>
            <span>Sign In</span>
            </button>
            <p>{intime}</p>
            </div>
            <div className='col mx-1'>
            <button className="btn btn-primary btn-lg"  type="button" onClick={signout}>
            <span >Sign Out</span>
            </button>
            <p>{outtime}</p>
        </div>
    </div>
    </div>

    </div>
    
  );
}

export default Sign;