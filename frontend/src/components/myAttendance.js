import 'bootstrap/dist/css/bootstrap.min.css'
import React , {useState, useEffect}from 'react'
import '../style/ViewStaff.css';

import { Link } from 'react-router-dom'
import axios from 'axios'
import Schedule from './schedule';
import SignRecords from './signrecords'

 function MyAttendance (props){

    const [att, setAttendance]=useState([]);
    const [mon, setMonth]=useState();
    const [yr, setYear]=useState();
    // useEffect(() => {
    //     await axios.get('http://localhost:3001/viewAttendance',{headers:{authorisation:localStorage.getItem('jwtToken')}})
    //     .then(res => {
            
    //     console.log('your attendance records'+res.data.attendance_record)})
       
    // }, []);
   
      const handleClick=()=>{
          if (mon && yr){
              console.log('with params')
            axios.get('http://localhost:3001/viewAttendance/'+mon +"/"+yr,{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res => {setAttendance(res.data.attendance_record)
            
        console.log('your attendance records'+res.data.attendance_record)})
          
          }else{
        axios.get('http://localhost:3001/viewAttendance',{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res => {setAttendance(res.data.attendance_record['attendance'])
            
        console.log('your attendance records'+res.data.attendance_record['attendance'])})
          }
      }

      const handleMonthChange=(e)=>{
          console.log(e.target.value)
          setMonth(e.target.value.substr(5,6))
          setYear(e.target.value.substr(0,4))
          console.log(mon)
          console.log(yr)
      }
    
    
    
    

 
      return (
<div className='form-loc'>
    
       <form>

        <input type="month" onChange={handleMonthChange}/>
       </form>
        
       <button onClick={handleClick}>get my attendance</button>
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

        
      </div>)
  
}

export default MyAttendance;
