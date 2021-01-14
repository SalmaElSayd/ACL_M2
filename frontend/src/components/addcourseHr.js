import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import '../style/loginstyle.css'
import Button from 'react-bootstrap/Button'

import '../style/ViewStaff.css'
import '../style/buttons.css'



function AddcourseHr(){

    const [faculty_name, setfaculty_name]=useState('');
    const [dep_id, setdep_id]=useState('');
    const [id, setid]=useState('');
    const [credit_hours, setcredit_hours]=useState('');
    const [coverage, setcoverage]=useState('');

    const [resMessage, setResMessage]=useState('');
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
        faculty_name:faculty_name,
        dep_id:dep_id,
        id:id,
        credit_hours:credit_hours,
        coverage:coverage
    }
    axios.post('http://localhost:3001/hr/addCourse', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
     
        setResMessage(res.data.mess)


      })
      
  }
  const handleFnameChange = (e)=>{
    const faculty_name = e.target.value ;
    setfaculty_name(faculty_name);
}
const handledep_idChange = (e)=>{
    const dep_id = e.target.value ;
    setdep_id(dep_id);
}
const handleidChange = (e)=>{
    const id = e.target.value ;
    setid(id);
}
const handledcredit_hoursChange = (e)=>{
    const h = e.target.value ;
    setcredit_hours(h);
}
const handlecoverageChange = (e)=>{
    const coverage = e.target.value ;
    setcoverage(coverage);
}
const handleHome=(e)=>{
    window.location='/home'
}







        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <h1>
           Add a course 
            </h1>
            <div className='form-loc'>
            <form onSubmit={onSubmit}>
    <input  className="form-control" placeholder="faculty name" type="text" onChange={handleFnameChange} />
        <br />
        <input  className="form-control" placeholder="add a dep id" type="text" onChange={handledep_idChange} />
        <br />
        <input  className="form-control" placeholder="add a course id" type="text" onChange={handleidChange} />
        <br />
        <input  className="form-control" placeholder="add coure credit hours" type="number" onChange={handledcredit_hoursChange} />
        <br />
        <input  className="form-control" placeholder="add coure covergae" type="number" onChange={handlecoverageChange} />
        <br />

        <button type="submit" className="btn btn-primary">Submit</button>
                            
                            
            </form>
        <label className="labelhr">{resMessage}</label>
       
               </div>
               <div className="gobackbutton">
             <Button onClick={handleHome} variant="outline-primary">Go back gome </Button>{'    '}
               </div>
            </div>



         
        );
    
}

export default AddcourseHr;