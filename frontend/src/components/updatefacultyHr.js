import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import '../style/loginstyle.css'


function UpdatefacultyHr(){

    const [faculty_name, setfaculty_name]=useState('');
    const [faculty_name_update, setfaculty_name_update]=useState('');


    const [resMessage, setResMessage]=useState('');
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
        faculty_name:faculty_name,
        faculty_name_update:faculty_name_update
      
    }
    axios.post('http://localhost:3001/hr/updatefaculty', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
     
        setResMessage(res.data.mess)
        window.location='/hr'

      })
      
  }
  const handlefnameChange = (e)=>{
    const name = e.target.value ;
    setfaculty_name(name);
}
const handlefnameChangeU = (e)=>{
    const name = e.target.value ;
    setfaculty_name_update(name);
}





        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
               <div>
                <h1>
           update a Faculty 
           <br/>
            </h1>
            </div>
            <div>
            <form onSubmit={onSubmit}>
        <input placeholder="faculty name" type="text" onChange={handlefnameChange} />
        <br />
        <input placeholder="change to" type="text" onChange={handlefnameChangeU} />

        <input className ='btn btn-primary btn-block btn-large' type="submit" />
        
            </form>
        <label>{resMessage}</label>
            </div>
            </div>
        );
    
}

export default UpdatefacultyHr;