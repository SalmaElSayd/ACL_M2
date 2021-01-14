import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import '../style/idk.css'
import Button from 'react-bootstrap/Button'
import SignRecords from './signrecords'



function ViewattendanceRecHR(){

    const [id, setid]=useState('');
    const [att, setAttendance]=useState([]);

    const [resMessage, setResMessage]=useState('');


const onSubmit = (e)=>{

    e.preventDefault();

  const info = {
      id:id
  }
  axios.post('http://localhost:3001/hr/viewattendanceRec',info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
  .then(att => {
    if (att > 0) {
        setAttendance({att
        
      })
    }
  })
  .catch((error) => {
    console.log(error);
  })
  console.log('your attendance records'+att['attendance'])
    
}


const handleidChange = (e)=>{
    const id = e.target.value ;
    setid(id);
}

const handleHome=(e)=>{
    window.location='/hr'
}




        return (
            <div >
                <h1>
           delete a course 
            </h1>
            <input className="pt" placeholder="staff id" type="text" onChange={handleidChange} />
        <br />
            <form className="submit" onSubmit={onSubmit}>
       

        <table className='table-hover'>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Status</th>
                                <th>Missing Hours</th>
                                <th>Sign in/out</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        {att.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        
                                        <td>{item['day']}</td>
                                        <td>{item['status']}</td>
                                        <td>{item['missing_hours']}</td>
                                        <SignRecords recs = {item['signs']}/>
                                        
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

        <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label>{resMessage}</label>
<div className="gobackbutton">
         <Button onClick={handleHome} variant="outline-primary">Go back gome </Button>{'    '}
         </div>
            </div>

        );
    
}


export default ViewattendanceRecHR;  