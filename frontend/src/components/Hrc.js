import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/Navbar.css';
import '../style/scrollable.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,withRouter 
} from "react-router-dom";

import { HrNavbar,Hrc,
  MyProfile,addStaffHr,addlocation,updatelocation,deletelocation,deleteStaffHr,
  updatestaff,addfacultyHr,updatefacultyHr,deletefacultyHR,adddepartmentHr,updatedepartmentHr,
  deletedepartmentHr,addcourseHr,updatecourseHr,deletecourseHr,
  viewattendanceRecHR,
  addmissingSignInHr,addmissingSignOutHr,updateSalaryHr,
  viewStaffmemberMissinghoursHr,viewStaffmemberMissingdaysHr} from '.'
 
function Hr() {
  return (
    <div className="App">
     
          <Router>
        <HrNavbar />
{
  <Switch>
        <Route exact path="/home" component = {MyProfile} />
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
  
  
  
}
    </Router> 
        
    </div>
  );
}

export default Hr;
