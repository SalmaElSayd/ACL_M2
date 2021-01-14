import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'

import '../style/ViewStaff.css'
import '../style/buttons.css'



function DeletefacultyHR(){

    const [faculty_name, setfaculty_name]=useState('');


    const [resMessage, setResMessage]=useState('');
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
        faculty_name:faculty_name
      
    }
    axios.post('http://localhost:3001/hr/deleteFaculty', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
     
        setResMessage(res.data.mess)

      })
      
  }
  const handlefnameChange = (e)=>{
    const name = e.target.value ;
    setfaculty_name(name);
}

const handleHome=(e)=>{
    window.location='/home'
}




        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
               <div>
                <h1>
           delete a Faculty 
           <br/>
            </h1>
            </div>
            <div className='form-loc'>

            <form onSubmit={onSubmit}>
        <input className="form-control" placeholder="faculty name" type="text" onChange={handlefnameChange} />
        <br />
        <input className ='btn btn-primary btn-block btn-large' type="submit" />
        
            </form>
        <label>{resMessage}</label>
            </div>
            <div className="gobackbutton">
                        <Button onClick={handleHome} variant="outline-primary">Go back gome </Button>{'    '}
                        </div>
            </div>
        );
    
}

export default DeletefacultyHR;