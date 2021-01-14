import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'

import '../style/ViewStaff.css'
import '../style/buttons.css'



function UpdatecourseHr(){

    const [salary, setsalary]=useState('');
    const [id, setid]=useState('');

    const [resMessage, setResMessage]=useState('');
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
        salary:salary,
        id:id

    }
    axios.post('http://localhost:3001/hr/updateSalary', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
     
        setResMessage(res.data.mess)

      })
      
  }
  const handlesalary = (e)=>{
    const salary = e.target.value ;
    setsalary(salary);
}
const handleIdchange = (e)=>{
    const id = e.target.value ;
    setid(id);
}
const handleHome=(e)=>{
    window.location='/home'
}





        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <h1>
           update salary  
            </h1>
            <div className='form-loc'>

            <form onSubmit={onSubmit}>
        <input className="form-control" placeholder="staff id" type="text" onChange={handleIdchange} />
        <br />
        <input className="form-control" placeholder="add salary" type="number" onChange={handlesalary} />
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