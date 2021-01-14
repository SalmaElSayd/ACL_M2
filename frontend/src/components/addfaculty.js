import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'

import '../style/ViewStaff.css'
import '../style/buttons.css'


function AddfacultyHr(){

    const [name, setname]=useState('');
    const [dep_id, setdep_id]=useState('');
    const [dep_name, setdep_name]=useState('');
    const [course_id, setcourse_id]=useState('');
    const [head_id, sethead_id]=useState('');
     
    const [resMessage, setResMessage]=useState('');
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
        faculty_name:name,
        dep_id:dep_id,
        dep_name:dep_name,
        course_id,course_id,
        head_id:head_id
    }
    axios.post('http://localhost:3001/hr/addFaculty', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
     
        setResMessage(res.data.mess)

      })
      
  }
  const handlenameChange = (e)=>{
    const name = e.target.value ;
        setname(name);
}
const handledep_idChange = (e)=>{
    const dep_id = e.target.value ;
    setdep_id(dep_id);
}
const handledep_nameChange = (e)=>{
    const dep_name = e.target.value ;
    setdep_name(dep_name);
}
const handledCourse_ideChange = (e)=>{
    const course_id = e.target.value ;
    setcourse_id(course_id);
}
const handledhead_idChange = (e)=>{
    const head_id = e.target.value ;
    sethead_id(head_id);
}
const handleHome=(e)=>{
    window.location='/home'
}




        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <h1>
           Add a Faculty 
            </h1>
            <div className='form-loc'>

            <form onSubmit={onSubmit}>
        <input  className="form-control"  placeholder="faculty name" type="text" onChange={handlenameChange} />
        <br />
        <input  className="form-control"   placeholder="add a dep id" type="text" onChange={handledep_idChange} />
        <br />
        <input  className="form-control"  placeholder="add a dep name" type="text" onChange={handledep_nameChange} />
        <br />
        <input  className="form-control"  placeholder="add a dep head id" type="text" onChange={handledhead_idChange} />
        <br />
        <input  className="form-control"  placeholder="add a new course  id" type="text" onChange={handledCourse_ideChange} />
        <br />
        <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label className="labelhr">{resMessage}</label>
            </div>
            <div className="gobackbutton">
             <Button onClick={handleHome} variant="outline-primary">Go back gome </Button>{'    '}
               </div>

            </div>
        );
    
}

export default AddfacultyHr;