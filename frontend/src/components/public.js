import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/scrollable.css';

import {React, useState, useEffect} from 'react'
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import {Login, Sign, Public, MyProfile, Schedule, PublicNavbar, MyAttendance, ResetPassword,UpdateProfile,

  //instructor
  NavbarInstructor, AssignCoordinator,ViewCourseCoverageInstructor, ViewSlots, ViewStaffDepartment, ViewStaffCourse,AssignToSlot,UpdateCourseMem,DeleteCourseMem,RemoveCourseMem,
  //hod
  NavbarHOD, Navbar, ViewStaff, UpdateCourseInstructor, AssignCourseInstructor, DeleteCourseInstructor, ViewDayOff,
  HomePage, ViewRequests,RejectRequests, ViewCourseCoverage, ViewTeachingAssignments,AssignCourseTA,AcceptRequests,

  //academic member
  NavbarAcademicMember, AMHome,changeDayOff,sendLeaveRequest,slotLinkingRequest,
  viewAllAcceptedRequests,viewAllRejectedRequests,viewAllPendingRequests,
  viewAllRequests,viewReceivedReplacementRequest,viewSendReplacementRequest,
  viewschedule,
  Notifications,
  cancelRequest,
  
  //coordintor
  NavbarCoordinator,DeleteSlot,UpdateSlot,AddSlot, AcceptSlotLinkingRequest, RejectSlotLinkingRequest, ViewSlotLinkingRequests,

  //hr
  HrNavbar,Hrc,Locationc,addlocation,
  updatelocation,deletelocation,addStaffHr,updatestaff,deleteStaffHr
  ,addfacultyHr,updatefacultyHr,deletefacultyHR,adddepartmentHr
  ,updatedepartmentHr,deletedepartmentHr,addcourseHr,updatecourseHr,deletecourseHr,
  viewattendanceRecHR,
  addmissingSignInHr,addmissingSignOutHr,
  updateSalaryHr,viewStaffmemberMissinghoursHr,viewStaffmemberMissingdaysHr
} from '../components'
import { Link } from 'react-router-dom'
import { login } from '../api';

function Allstaff() {
  //render conditionally according to role
  const[role1, setRole1]=useState('');
   const[role2, setRole2]=useState('');
  useEffect(() => {
    axios.get('http://localhost:3001/getRoles',{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
      if (res.data.role1)setRole1(res.data.role1);
      if (res.data.role2)setRole2(res.data.role2);
    console.log('role1, role2 '+role1+" "+role2)})
   
}, []);
if (role1.toLowerCase()=='instructor'&& role2.toLowerCase()=='hod'){
  
  return (
    <div className="enable-scroll">
     
        
      
        <Router>
        <NavbarHOD /> 
        {/* replace with hod navbar */}
          
      <Switch>
        <Route exact path="/home" component = {MyProfile} />
        <Route path='/signinout' exact component={Sign}></Route>
        <Route path='/viewAttendance' exact component={MyAttendance}></Route>
        <Route path='/resetPassword' exact component={ResetPassword}></Route>
        <Route path='/updateProfile' exact component={UpdateProfile}></Route>



        <Route path='/assignCoordinator' exact component={AssignCoordinator}></Route>
            <Route path='/viewCoverageInstructor' exact component={ViewCourseCoverageInstructor}></Route>
            <Route path='/viewSlots' exact component={ViewSlots}></Route>
            <Route path='/viewStaffDepartment' exact component={ViewStaffDepartment}></Route>
            <Route path='/viewStaffCourse' exact component={ViewStaffCourse}></Route>
            <Route path='/assignToSlot' exact component={AssignToSlot}></Route>
            <Route path='/updateCourseMem' exact component={UpdateCourseMem}></Route>
            <Route path='/deleteCourseMem' exact component={DeleteCourseMem}></Route>
            <Route path='/removeCourseMem' exact component={RemoveCourseMem}></Route>

            {/* <Route path='/homePageHOD' exact component={HomePage}></Route> */}
            <Route path='/assignCourseInstructor' exact component={AssignCourseInstructor}></Route>
            <Route path='/assignCourseTA' exact component={AssignCourseTA}></Route>
            <Route path='/updateCourseInstructor' exact component={UpdateCourseInstructor}></Route>
            <Route path='/deleteCourseInstructor' exact component={DeleteCourseInstructor}></Route>
            <Route path='/viewStaff' exact component={ViewStaff}></Route>
            <Route path='/viewDayOff' exact component={ViewDayOff}></Route>
            <Route path='/viewRequests' exact component={ViewRequests}></Route>
            <Route path='/acceptRequest' exact component={AcceptRequests}></Route>
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

        <div className="enable-scroll">
         
            
          
            <Router>
            <NavbarInstructor /> 
            {/* //replace with instructor navbar */}
              
          <Switch>
            <Route exact path="/home" component = {MyProfile} />
            <Route path='/signinout' exact component={Sign}></Route>
            <Route path='/viewAttendance' exact component={MyAttendance}></Route>
            <Route path='/resetPassword' exact component={ResetPassword}></Route>
            <Route path='/updateProfile' exact component={UpdateProfile}></Route>
            <Route path='/viewStaff' exact component={ViewStaff}></Route>


            <Route path='/assignCoordinator' exact component={AssignCoordinator}></Route>
            <Route path='/viewCoverageInstructor' exact component={ViewCourseCoverageInstructor}></Route>
            <Route path='/viewSlots' exact component={ViewSlots}></Route>
            <Route path='/viewStaffDepartment' exact component={ViewStaffDepartment}></Route>
            <Route path='/viewStaffCourse' exact component={ViewStaffCourse}></Route>
            <Route path='/assignToSlot' exact component={AssignToSlot}></Route>
            <Route path='/updateCourseMem' exact component={UpdateCourseMem}></Route>
            <Route path='/deleteCourseMem' exact component={DeleteCourseMem}></Route>
            <Route path='/removeCourseMem' exact component={RemoveCourseMem}></Route>
            
          </Switch>
        </Router>
            
        </div>
      );}
      else{
    
        if (role1.toLowerCase()=='ta' && role2.toLowerCase()=='coordinator'){
  
          return (


            <div className="enable-scroll">
             
                
              
                <Router>
                <NavbarCoordinator /> 
                {/* //replace with coordinator navbar */}
                  
              <Switch>
                <Route exact path="/home" component = {MyProfile} />
                <Route path='/signinout' exact component={Sign}></Route>
                <Route path='/viewAttendance' exact component={MyAttendance}></Route>
                <Route path='/resetPassword' exact component={ResetPassword}></Route>
                <Route path='/updateProfile' exact component={UpdateProfile}></Route>

                <Route path='/academicMember/changeDayOff' exact component={changeDayOff}></Route>
                  <Route path='/academicMember/sendLeaveRequest' exact component={sendLeaveRequest}></Route>
                  <Route path='/academicMember/slotLinkingRequest' exact component={slotLinkingRequest}></Route>
                  <Route path='/academicMember/viewAcceptedRequests' exact component={viewAllAcceptedRequests}></Route>
                  <Route path='/academicMember/viewRejectedRequest' exact component={viewAllRejectedRequests}></Route>
                  <Route path='/academicMember/viewPendingRequest' exact component={viewAllPendingRequests}></Route>
                  <Route path='/academicMember/viewAllRequests' exact component={viewAllRequests}></Route>
                  <Route path='/academicMember/viewReceivedReplacementRequest' exact component={viewReceivedReplacementRequest}></Route>
                  <Route path='/academicMember/viewSendReplacementRequest' exact component={viewSendReplacementRequest}></Route>
                  <Route path='/academicMember/viewSchedule' exact component={viewschedule}></Route>
                  <Route path='/academicMember/notifications' exact component={Notifications}></Route>
                  <Route path='/academicMember/cancelRequest' exact component={cancelRequest}></Route>

                <Route path='/coordinator/viewSlotLinkingRequests' exact component={ViewSlotLinkingRequests}></Route>
                <Route path='/coordinator/rejectSlotLinkingRequest' exact component={RejectSlotLinkingRequest}></Route>
                <Route path='/coordinator/acceptSlotLinkingRequests' exact component={AcceptSlotLinkingRequest}></Route>
                <Route path='/deleteSlot' exact component={DeleteSlot}></Route>
        <Route path='/updateSlot' exact component={UpdateSlot}></Route>
        <Route path='/addSlot' exact component={AddSlot}></Route>
                
              </Switch>
            </Router>
                
            </div>
          );}
          else{
        
        
        
            
          }
          if (role1.toLowerCase()=='ta' ){
  
            return (
  
              <div className="enable-scroll">
               
                  
                
                  <Router>
                  <NavbarAcademicMember /> 
                    
                <Switch>
                  <Route exact path="/home" component = {MyProfile} />
                  <Route path='/signinout' exact component={Sign}></Route>
                  <Route path='/viewAttendance' exact component={MyAttendance}></Route>
                  <Route path='/resetPassword' exact component={ResetPassword}></Route>
                  <Route path='/updateProfile' exact component={UpdateProfile}></Route>
          
                
                  <Route path='/academicMember/changeDayOff' exact component={changeDayOff}></Route>
                  <Route path='/academicMember/sendLeaveRequest' exact component={sendLeaveRequest}></Route>
                  <Route path='/academicMember/slotLinkingRequest' exact component={slotLinkingRequest}></Route>
                  <Route path='/academicMember/viewAcceptedRequests' exact component={viewAllAcceptedRequests}></Route>
                  <Route path='/academicMember/viewRejectedRequest' exact component={viewAllRejectedRequests}></Route>
                  <Route path='/academicMember/viewPendingRequest' exact component={viewAllPendingRequests}></Route>
                  <Route path='/academicMember/viewAllRequests' exact component={viewAllRequests}></Route>
                  <Route path='/academicMember/viewReceivedReplacementRequest' exact component={viewReceivedReplacementRequest}></Route>
                  <Route path='/academicMember/viewSendReplacementRequest' exact component={viewSendReplacementRequest}></Route>
                  <Route path='/academicMember/viewSchedule' exact component={viewschedule}></Route>
                  <Route path='/academicMember/notifications' exact component={Notifications}></Route>
                  <Route path='/academicMember/cancelRequest' exact component={cancelRequest}></Route>
                </Switch>
              </Router>
                  
              </div>
            );}
            else{
          
              if (role1.toLowerCase()=='hr' ){
  
                return (

                  <div className="enable-scroll">
                   
                      
                    
                      <Router>
                      <HrNavbar /> 
                      {/* //replace with ta navbar */}
                          
                    <Switch>
                      <Route exact path="/home" component = {MyProfile} />
                      <Route exact path="/" component = {login} />
                      <Route path='/signinout' exact component={Sign}></Route>
                      <Route path='/viewAttendance' exact component={MyAttendance}></Route>
                      <Route path='/resetPassword' exact component={ResetPassword}></Route>
                      <Route path='/updateProfile' exact component={UpdateProfile}></Route>
                      <Route path='/viewStaff' exact component={ViewStaff}></Route>
                      <Route path='/assignCoordinator' exact component={AssignCoordinator}></Route>

              
                      <Route exact path="/addlocation" exact component = {addlocation} />
        <Route exact path="/updatelocation" exact component = {updatelocation} />
        <Route exact path="/deletelocation" exact component = {deletelocation} />
        <Route exact path="/addStaffHr" exact component = {addStaffHr} />
        <Route exact path="/updateStaffHr" exact component = {updatestaff} />
        <Route exact path="/deleteStaffHr" exact component = {deleteStaffHr} />
        <Route exact path="/addfaculty" exact component = {addfacultyHr} />
        <Route exact path="/updatefaculty" exact component = {updatefacultyHr} />
        <Route exact path="/deletefaculty" exact component = {deletefacultyHR} />
        <Route exact path="/adddepartment" exact component = {adddepartmentHr} />
        <Route exact path="/updatedepartment" exact component = {updatedepartmentHr} />
        <Route exact path="/deletedepartment" exact component = {deletedepartmentHr} />
        <Route exact path="/addcourse" exact component = {addcourseHr} />
        <Route exact path="/updatecourse" exact component = {updatecourseHr} />
        <Route exact path="/deletecourse" exact component = {deletecourseHr} />
        <Route exact path="/viewattendanceRec" exact component = {viewattendanceRecHR} />
        <Route exact path="/addmissingSignIn" exact component = {addmissingSignInHr} />
        <Route exact path="/addmissingSignOut" exact component = {addmissingSignOutHr} />
        <Route exact path="/updateSalary" exact component = {updateSalaryHr} />
        <Route exact path="/viewStaffmemberMissinghours" exact component = {viewStaffmemberMissinghoursHr} />
        <Route exact path="/viewStaffmemberMissingdays" exact component = {viewStaffmemberMissingdaysHr} />
                      
                    </Switch>
                  </Router>
                      
                  </div>
                );}
                else{
              
              return (
                <div>
                <h1>No Access</h1>
                <p>You could ne trying to access a page without the necessary credentials or facing a network connection issue</p>
                </div>
              )
              
                  
                }
        
          
              
            }
    
        
      }


  }
}

export default Allstaff;
