import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,withRouter 
} from "react-router-dom";

import { HrNavbar,Hrc,
  MyProfile,addStaffHr,addlocation,updatelocation,deletelocation
  } from '.'
 
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




        </Switch>
  
  
  
}
    </Router> 
        
    </div>
  );
}

export default Hr;
