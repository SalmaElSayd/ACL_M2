import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import '../style/loginstyle.css'


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
        window.location='/hr'

      
      })
      
  }
  const handleIdChange = (e)=>{
    const id = e.target.value ;
        setid(id);
}

        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
              <div>
                <h1>
          Delete a staff memeber
<br/>
            </h1>
            </div>
            <br/>   
            
            <form onSubmit={onSubmit}>
        <input placeholder="id" type="text" onChange={handleIdChange} />

            <br/>
        <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label>{resMessage}</label>
            </div>
        );
    
}

export default  DeleteStaffHr
    