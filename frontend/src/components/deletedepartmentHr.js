import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import '../style/loginstyle.css'


function DeletedepartmentHr(){

    const [faculty_name, setfaculty_name]=useState('');
   
    const [dep_id, setdep_id]=useState('');

    const [resMessage, setResMessage]=useState('');
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
        faculty_name:faculty_name,
        dep_id:dep_id
    }
    axios.post('http://localhost:3001/hr/deleteDepartment', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
     
        setResMessage(res.data.mess)
        window.location='/hr'

      })
      
  }
  const handlefaculty_nameChange = (e)=>{
    const faculty_name = e.target.value ;
        setfaculty_name(faculty_name);
}

const handledep_idChange = (e)=>{
    const dep_id = e.target.value ;
    setdep_id(dep_id);
}



        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <h1>
           delete a departmentHr 
            </h1>
            
            <form onSubmit={onSubmit}>
        <input placeholder="faculty name" type="text" onChange={handlefaculty_nameChange} />
        <br />
        <input placeholder="add the dep id " type="text" onChange={handledep_idChange} />
        <br />

        <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label>{resMessage}</label>
            </div>
        );
    
}

export default DeletedepartmentHr;