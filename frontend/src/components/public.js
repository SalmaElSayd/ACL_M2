import 'bootstrap/dist/css/bootstrap.min.css'
import {React, useState, useEffect} from 'react'
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import {Login, Sign, Public, MyProfile, Schedule, PublicNavbar, MyAttendance, ResetPassword,UpdateProfile,
Navbar, ViewStaff, UpdateCourseInstructor, AssignCourseInstructor, DeleteCourseInstructor, ViewDayOff,
HomePage, ViewRequests,RejectRequests, ViewCourseCoverage, ViewTeachingAssignments } from '../components'
import { Link } from 'react-router-dom'

function Allstaff() {
  //render conditionally according to role
  const[role1, setRole1]=useState('');
   const[role2, setRole2]=useState('');
  useEffect(() => {
    axios.get('http://localhost:3001/getRoles',{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {setRole1(res.data.role1);
      setRole2(res.data.role2);
    console.log('role1, role2 '+role1+" "+role2)})
   
}, []);
if (role1.toLowerCase()=='instructor'&& role2.toLowerCase()=='hod'){
  
  return (
    <div className="section">
     
        
      
        <Router>
        <PublicNavbar /> 
        {/* replace with hod navbar */}
          
      <Switch>
        <Route exact path="/home" component = {MyProfile} />
        <Route path='/signinout' exact component={Sign}></Route>
        <Route path='/viewAttendance' exact component={MyAttendance}></Route>
        <Route path='/resetPassword' exact component={ResetPassword}></Route>
        <Route path='/updateProfile' exact component={UpdateProfile}></Route>

         <Route path='/assignCourseInstructor' exact component={AssignCourseInstructor}></Route>
         <Route path='/updateCourseInstructor' exact component={UpdateCourseInstructor}></Route>
         <Route path='/deleteCourseInstructor' exact component={DeleteCourseInstructor}></Route>
         <Route path='/viewStaff' exact component={ViewStaff}></Route>
         <Route path='/viewDayOff' exact component={ViewDayOff}></Route>
         <Route path='/viewRequests' exact component={ViewRequests}></Route>
         {/* <Route path='/acceptRequest' exact component={AcceptRequests}></Route> */}
         <Route path='/rejectRequest' exact component={RejectRequests}></Route>
         <Route path='/viewCourseCoverage' exact component={ViewCourseCoverage}></Route>
         <Route path='/viewTeachingAssignments' exact component={ViewTeachingAssignments}></Route>
        
      </Switch>
    </Router>
        
    </div>
  );}
  else{

    if (role1.toLowerCase()=='instructor'){
  
      return (
        <div className="section">
         
            
          
            <Router>
            <PublicNavbar /> 
            {/* //replace with instructor navbar */}
              
          <Switch>
            <Route exact path="/home" component = {MyProfile} />
            <Route path='/signinout' exact component={Sign}></Route>
            <Route path='/viewAttendance' exact component={MyAttendance}></Route>
            <Route path='/resetPassword' exact component={ResetPassword}></Route>
            <Route path='/updateProfile' exact component={UpdateProfile}></Route>
    
            
          </Switch>
        </Router>
            
        </div>
      );}
      else{
    
        if (role1.toLowerCase()=='ta' && role2.toLowerCase()=='coordinator'){
  
          return (
            <div className="section">
             
                
              
                <Router>
                <PublicNavbar /> 
                {/* //replace with coordinator navbar */}
                  
              <Switch>
                <Route exact path="/home" component = {MyProfile} />
                <Route path='/signinout' exact component={Sign}></Route>
                <Route path='/viewAttendance' exact component={MyAttendance}></Route>
                <Route path='/resetPassword' exact component={ResetPassword}></Route>
                <Route path='/updateProfile' exact component={UpdateProfile}></Route>
        
                
                
              </Switch>
            </Router>
                
            </div>
          );}
          else{
        
        
        
            
          }
          if (role1.toLowerCase()=='ta' ){
  
            return (
              <div className="section">
               
                  
                
                  <Router>
                  <PublicNavbar /> 
                  {/* //replace with ta navbar */}
                    
                <Switch>
                  <Route exact path="/home" component = {MyProfile} />
                  <Route path='/signinout' exact component={Sign}></Route>
                  <Route path='/viewAttendance' exact component={MyAttendance}></Route>
                  <Route path='/resetPassword' exact component={ResetPassword}></Route>
                  <Route path='/updateProfile' exact component={UpdateProfile}></Route>
          
                
                  
                </Switch>
              </Router>
                  
              </div>
            );}
            else{
          
          return(

            <h1>no access</h1>
          )
          
              
            }
    
        
      }


  }
}

export default Allstaff;
