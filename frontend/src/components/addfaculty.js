import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import '../style/loginstyle.css'


function AddfacultyHr(){

    const [name, setname]=useState('');
    const [dep_id, setdep_id]=useState('');
    const [dep_name, setdep_name]=useState('');
    const [course_id, setcourse_id]=useState('');

    const [resMessage, setResMessage]=useState('');
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
        name:name,
        dep_id:dep_id,
        dep_name:dep_name,
        course_id,course_id
    }
    axios.post('http://localhost:3001/hr/addFaculty', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
     
        setResMessage(res.data.mess)
        window.location='/hr'

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



        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <h1>
           Add a Faculty 
            </h1>
            
            <form onSubmit={onSubmit}>
        <input placeholder="faculty name" type="text" onChange={handlenameChange} />
        <br />
        <input placeholder="add a dep id" type="text" onChange={handledep_idChange} />
        <br />
        <input placeholder="add a dep name" type="text" onChange={handledep_nameChange} />
        <br />
        <input placeholder="add a new course  id" type="text" onChange={handledCourse_ideChange} />
        <br />
        <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label>{resMessage}</label>
            </div>
        );
    
}

export default AddfacultyHr;