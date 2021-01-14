import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'

import '../style/ViewStaff.css'
import '../style/buttons.css'



function UpdatedepartmentHr(){

    const [faculty_name, setfaculty_name]=useState('');
    const [name, setname]=useState('');
    const [dep_id, setdep_id]=useState('');
    const [head_id, sethead_id]=useState('');

    const [resMessage, setResMessage]=useState('');
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
        faculty_name:faculty_name,
        name:name,
        dep_id:dep_id,
        head_id,head_id
    }
    axios.post('http://localhost:3001/hr/updateDepartment', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
     
        setResMessage(res.data.mess)

      })
      
  }
  const handlefaculty_nameChange = (e)=>{
    const faculty_name = e.target.value ;
        setfaculty_name(faculty_name);
}
const handlenameChange = (e)=>{
    const name = e.target.value ;
    setname(name);
}
const handledep_idChange = (e)=>{
    const dep_id = e.target.value ;
    setdep_id(dep_id);
}
const handlehead_idChange = (e)=>{
    const head_id = e.target.value ;
    sethead_id(head_id);
}
const handleHome=(e)=>{
    window.location='/home'
}






        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <h1>
           update a departmentHr 
            </h1>
            
            <div className='form-loc'>
            <form onSubmit={onSubmit}>
        <input  className="form-control" placeholder="faculty name" type="text" onChange={handlefaculty_nameChange} />
        <br />
        <input  className="form-control" placeholder="add the dep id " type="text" onChange={handledep_idChange} />
        <br />
        <input  className="form-control" placeholder="change name to " type="text" onChange={handlenameChange} />
        <br />
        <input  className="form-control" placeholder="the dep head id" type="text" onChange={handlehead_idChange} />
        <br />
        <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label  className="labelhr">{resMessage}</label>
            </div>
            <div className="gobackbutton">
             <Button onClick={handleHome} variant="outline-primary">Go back gome </Button>{'    '}
               </div>
            </div>
        );
    
}

export default UpdatedepartmentHr;