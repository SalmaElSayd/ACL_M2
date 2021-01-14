import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'

import '../style/ViewStaff.css'
import '../style/buttons.css'




function DeletecourseHr(){

    const [faculty_name, setfaculty_name]=useState('');
    const [dep_id, setdep_id]=useState('');
    const [course_id, setcourse_id]=useState('');

    const [resMessage, setResMessage]=useState('');
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
        faculty_name:faculty_name,
        dep_id:dep_id,
        course_id:course_id
    }
    axios.post('http://localhost:3001/hr/deletecourse', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
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

const handlesetcourse_idChange = (e)=>{
    const h = e.target.value ;
    setcourse_id(h);
}
const handleHome=(e)=>{
    window.location='/home'
}









        return (


            <div className='form-loc'>

                <h2> delete a course </h2>
                        <form onSubmit={onSubmit}>
                              
                                <input  className="form-control" placeholder="faculty name" type="text" name="" required="" onChange={handleFnameChange}/>
                             
                              
                           
            <input  className="form-control" placeholder="add a dep id"  type="password" name="" required="" onChange={handledep_idChange}/>
                         

                           
                            <input  className="form-control" placeholder="add a course id" type="password" name="" required="" onChange={handlesetcourse_idChange}/>
                          
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        <div/>
                <label className="labelhr" >{resMessage}</label>
                <div className="gobackbutton">
                        <Button onClick={handleHome} variant="outline-primary">Go back gome </Button>{'    '}
                        </div>
            </div>
                    

          

        );
    
}

export default DeletecourseHr;  