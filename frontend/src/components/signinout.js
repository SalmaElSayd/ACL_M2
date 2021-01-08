import axios from 'axios'
import api from '../api'
import { Link } from 'react-router-dom'
function Sign() {

  const signin = ()=>{
    console.log("signing in")
    axios.post('http://localhost:3001/signIn',{} ,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => console.log(res.data))
  }
  const signout = ()=>{
    console.log("signing out")
    axios.post('http://localhost:3001/signOut',{}, {headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => console.log(res.data))
  }
  return (
    
      <div className="jss102">
        <h3>
            Sign in or out
            </h3>
            
        
<div className="container">
    <div>
        <button className="btn btn-primary" type="button" onClick={signin}>
            <span>Sign In</span>
            </button>
            <button className="btn btn-primary"  type="button" onClick={signout}>
            <span >Sign Out</span>
            </button>
        </div>
    </div>

    </div>
    
  );
}

export default Sign;