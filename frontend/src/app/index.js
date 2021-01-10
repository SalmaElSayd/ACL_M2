import 'bootstrap/dist/css/bootstrap.min.css'
import { Login, Sign , Public,  Navbar, ViewStaff, UpdateCourseInstructor, AssignCourseInstructor, DeleteCourseInstructor, ViewDayOff,
  HomePage, ViewRequests,RejectRequests, ViewCourseCoverage, ViewTeachingAssignments, MyProfile } from '../components'
import { Link } from 'react-router-dom'
import {PublicNavbar} from '../components'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

function App() {
 
  return (
    <div className="App">
      <div className="jss100">
      <div className="jss101">
        
        </div>
        <Router>
          
      <Switch>
        <Route exact path="/login" component = {Login} />
        <Route  path="/" component = {Public} />
        
      </Switch>
    </Router>
 

        </div>
    </div>
  );
}

export default App;

// import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// import Navbar from '../components/Navbar';
// import HomePage from '../components/HomePage';
// import ViewStaff from '../components/ViewStaff';
// import AssignCourseInstructor from '../components/AssignCourseInstructor';
// import UpdateCourseInstructor from '../components/UpdateCourseInstructor';
// import DeleteCourseInstructor from '../components/DeleteCourseInstructor';
// import ViewDayOff from '../components/ViewDayOff';
// import ViewRequests from '../components/ViewRequests';
// // import AcceptRequests from '../components/AcceptRequests';
// import RejectRequests from '../components/RejectRequests';
// import ViewCourseCoverage from '../components/ViewCourseCoverage';
// import ViewTeachingAssignments from '../components/ViewTeachingAssignments';

// function App() {
//   return(
//     <Router>
//       <Navbar />
//       <Switch>
//         <Route path='/' exact component={HomePage}></Route>
//         <Route path='/assignCourseInstructor' exact component={AssignCourseInstructor}></Route>
//         <Route path='/updateCourseInstructor' exact component={UpdateCourseInstructor}></Route>
//         <Route path='/deleteCourseInstructor' exact component={DeleteCourseInstructor}></Route>
//         <Route path='/viewStaff' exact component={ViewStaff}></Route>
//         <Route path='/viewDayOff' exact component={ViewDayOff}></Route>
//         <Route path='/viewRequests' exact component={ViewRequests}></Route>
//         {/* <Route path='/acceptRequest' exact component={AcceptRequests}></Route> */}
//         <Route path='/rejectRequest' exact component={RejectRequests}></Route>
//         <Route path='/viewCourseCoverage' exact component={ViewCourseCoverage}></Route>
//         <Route path='/viewTeachingAssignments' exact component={ViewTeachingAssignments}></Route>
//       </Switch>
//     </Router>
//   );
// }

// export default App;

