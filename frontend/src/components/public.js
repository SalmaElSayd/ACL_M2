import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import {Login, Sign, Public, MyProfile, Schedule, PublicNavbar, 
  Navbar, ViewStaff, UpdateCourseInstructor, AssignCourseInstructor, DeleteCourseInstructor, ViewDayOff,
  HomePage, ViewRequests,RejectRequests, ViewCourseCoverage, ViewTeachingAssignments , myAttendance} from '../components'
import { Link } from 'react-router-dom'
import MyAttendance from './myAttendance';
function allstaff() {
  //render conditionally according to role
  return (
    <div className="App">
     
        
      
        <Router>
        <PublicNavbar />
          
      <Switch>
        <Route exact path="/home" component = {MyProfile} />
        <Route path='/signinout' exact component={Sign}></Route>
        <Route path='/viewAttendance' exact component={MyAttendance}></Route>
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
  );
}

export default allstaff;
