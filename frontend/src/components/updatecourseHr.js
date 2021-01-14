import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'

import '../style/ViewStaff.css'
import '../style/buttons.css'


function UpdatecourseHr(){

    const [faculty_name, setfaculty_name]=useState('');
    const [dep_id, setdep_id]=useState('');
    const [course_id, setcourse_id]=useState('');
    const [credit_hours, setcredit_hours]=useState('');

    const [resMessage, setResMessage]=useState('');
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
        faculty_name:faculty_name,
        dep_id:dep_id,
        course_id:course_id,
        credit_hours:credit_hours
    }
    axios.post('http://localhost:3001/hr/updatecourse', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
     
        setResMessage(res.data.mess)

      })
      
  }
  const handleHome=(e)=>{
    window.location='/home'
}

  const handleFnameChange = (e)=>{
    const faculty_name = e.target.value ;
    setfaculty_name(faculty_name);
}
const handledep_idChange = (e)=>{
    const dep_id = e.target.value ;
    setdep_id(dep_id);
}

const handlesetcourse_idChange = (e)=>{
    const h = e.target.value ;
    setcourse_id(h);
}
const handlecredit_hourseChange = (e)=>{
    const credit_hours = e.target.value ;
    setcredit_hours(credit_hours);
}




        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <h1>
           update a course 
            </h1>
            
            <div className='form-loc'>

            <form onSubmit={onSubmit}>
        <input className="form-control" placeholder="faculty name"  placeholder="faculty name" type="text" onChange={handleFnameChange} />
        <br />
        <input className="form-control" placeholder="faculty name"  placeholder="add the dep id" type="text" onChange={handledep_idChange} />
        <br />
        <input className="form-control" placeholder="faculty name"  placeholder="add the course id" type="text" onChange={handlesetcourse_idChange} />
        <br />
        <input className="form-control" placeholder="faculty name"  placeholder="add course credit hours" type="number" onChange={handlecredit_hourseChange} />
        <br />

        <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label  className="labelhr" >{resMessage}</label>
            </div>
            <div className="gobackbutton">
             <Button onClick={handleHome} variant="outline-primary">Go back gome </Button>{'    '}
               </div>
            </div>
        );
    
}

export default UpdatecourseHr;