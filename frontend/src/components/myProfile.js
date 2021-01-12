import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/scrollable.css';

import React , {useState, useEffect}from 'react'
import '../style/ViewStaff.css';
import '../style/myprofile.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Schedule from './schedule';
import Logout from './logout';
import MissingDays from './viewMissingDays';
import MissingHours from './viewMissingHours';
import UpdatedSalary from './updatedSalary';

function Myprofile (props){

    const [profile, setProfile]=useState([]);
    const [schedule, setSchedule]=useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/myProfile',{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res => {setProfile([res.data.profile]);
            setSchedule(res.data.profile.schedule);
        console.log('profile.schedule'+res.data.profile.schedule)})
       
    }, []);
   
      

    console.log('getting profile')
 
    
    
    
    

 
      return (
          <div >
<div className="form-loc">
    <div className='logout'>
    <Logout />
    </div>
    <div className='row'>
    
   <div className='col mx-1'>
       <div className='infocard'>
      <h1>My Profile</h1>
    
                 
       
                      
                        {profile.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <p><b>Name</b>
                                        <br />
                                        {item['name']}</p>

                                        <p><b>Email</b>
                                        <br />
                                        {item['email']}</p>

                                        <p><b>Office</b>
                                        <br />
                                        {item['office']}</p>
                                        
                                        <p><b>Leave Balance</b>
                                        <br />
                                        {item['leave_balance']}</p>

                                        <p><b>Day Off</b>
                                        <br />
                                        {item['day_off']}</p>
                                        
                                        <p><b>Information</b>
                                        <br />
                                        {item['information']}</p>

                                        
                                    </div>
                                );
                            })}


                       </div>
                       </div>
                       <div className='col mx-1'>
<div className='infocard'>
    <MissingDays />
   </div>
   <div className='infocard'>

    <MissingHours />
    </div>
    <div className='infocard'>

    <UpdatedSalary />
    </div>
   </div>
                       </div> 
                    <h3>Schedule</h3>

                    <Schedule sched={schedule}/>
        
      </div>
      </div>
      )
  
}

export default Myprofile;
