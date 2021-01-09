import 'bootstrap/dist/css/bootstrap.min.css'
import React , {useState, useEffect}from 'react'
import '../style/ViewStaff.css';

import { Link } from 'react-router-dom'
import axios from 'axios'
import Schedule from './schedule';
import SignRecords from './signrecords'

function MyAttendance (props){

    const [attendance, setAttendance]=useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/viewAttendance',{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res => {
            
        console.log('your attendance records'+[res.data.attendance_record.attendance])})
       
    }, []);
   
      

    console.log('getting attendance')
 
    
    
    
    

 
      return (
<div className="App">
    
       
       
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
                        {attendance.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        
                                        <td>{item['day']}</td>
                                        <td>{item['status']}</td>
                                        <td>{item['missing_hours']}</td>
                                        <SignRecords recs = {item['Signs']}/>
                                        
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

        
      </div>)
  
}

export default MyAttendance;
