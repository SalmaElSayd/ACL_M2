import 'bootstrap/dist/css/bootstrap.min.css'
import React , {useState, useEffect}from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Schedule from './schedule';

function Myprofile (props){

    const [profile, setProfile]=useState([]);
    const [schedule, setSchedule]=useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/myProfile',{headers:{authorisation:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlMSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MTAxMTAxNTV9.-MOowNg4OrDhSJM1aeYZazaYfqF7RwQxRSdBGRT2WpU'}})
        .then(res => {setProfile([res.data]);
            setSchedule(res.data.schedule);
        console.log(res.data.schedule)})
       
    }, []);
   
      

    console.log('getting profile')
 
    
    
    
    

 
      return (
<div className="App">
      <h1>My Profile</h1>
    
       
       
        <table className='table-hover'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Office</th>
                                <th>Leave Balance</th>
                                <th>Information</th>
                                <th>Day Off</th>
                            </tr>
                        </thead>
                        <tbody>
                        {profile.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        
                                        <td>{item['name']}</td>
                                        <td>{item['email']}</td>
                                        <td>{item['office']}</td>
                                        <td>{item['leave_balance']}</td>
                                        <td>{item['information']}</td>
                                        <td>{item['day_off']}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <h3>Schedule</h3>

                    <Schedule sched={schedule}/>
        
      </div>)
  
}

export default Myprofile;
