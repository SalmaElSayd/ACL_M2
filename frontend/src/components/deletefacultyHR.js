import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import '../style/loginstyle.css'


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
        window.location='/hr'

      })
      
  }
  const handlefnameChange = (e)=>{
    const name = e.target.value ;
    setfaculty_name(name);
}



        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
               <div>
                <h1>
           delete a Faculty 
           <br/>
            </h1>
            </div>
            <div>
            <form onSubmit={onSubmit}>
        <input placeholder="faculty name" type="text" onChange={handlefnameChange} />
        <br />
        <input className ='btn btn-primary btn-block btn-large' type="submit" />
        
            </form>
        <label>{resMessage}</label>
            </div>
            </div>
        );
    
}

export default DeletefacultyHR;