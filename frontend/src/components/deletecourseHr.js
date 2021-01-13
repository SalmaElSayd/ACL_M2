import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'

import '../style/idk.css'
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
    window.location='/hr'
}









        return (


            <div className="login-box">

                <h2> delete a course </h2>
                        <form onSubmit={onSubmit}>
                                <div class="user-box">
                                <input type="text" name="" required="" onChange={handleFnameChange}/>
                                <label>faculty name</label>
                                </div>
                            <div class="user-box">
                            <input type="password" name="" required="" onChange={handledep_idChange}/>
                            <label>dep id</label>
                            </div>

                            <div class="user-box">
                            <input type="password" name="" required="" onChange={handlesetcourse_idChange}/>
                            <label>course id</label>
                            </div>

                            <a href="#">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Submit
                            </a>
                        </form>
                <label>{resMessage}</label>
                <div className="gobackbutton">
                        <Button onClick={handleHome} variant="outline-primary">Go back gome </Button>{'    '}
                        </div>
            </div>
                    

          

        );
    
}

export default DeletecourseHr;  