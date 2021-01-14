import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'

import '../style/ViewStaff.css'
import '../style/buttons.css'



function DeleteStaffHr(){

    const [id, setid]=useState('');
    const [resMessage, setResMessage]=useState('');
    const history = useHistory();

  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
       id:id

    }
    axios.post('http://localhost:3001/hr/deletestaff', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
     
        setResMessage(res.data.mess)

      
      })
      
  }
  const handleIdChange = (e)=>{
    const id = e.target.value ;
        setid(id);
}
const handleHome=(e)=>{
    window.location='/home'
}



        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
               <div className='form-loc'>
                <h1>
          Delete a staff memeber
<br/>
            </h1>
          
            <br/>   
            
            <form onSubmit={onSubmit}>
        <input  className="form-control"   placeholder="staff id" type="text" onChange={handleIdChange} />

            <br/>
        <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label className="labelhr" >{resMessage}</label>
        </div>
        <div className="gobackbutton">
             <Button onClick={handleHome} variant="outline-primary">Go back gome </Button>{'    '}
               </div>
            </div>
        );
    
}

export default  DeleteStaffHr
    