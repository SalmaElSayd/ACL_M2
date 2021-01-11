import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,withRouter 
} from "react-router-dom";

import { HrNavbar,Hrc,
  MyProfile,Locationc,
  } from '.'
 
function Hr() {
  return (
    <div className="App">
     
          <Router>
        <HrNavbar />
{
  <Switch>
        <Route exact path="/home" component = {MyProfile} />
        <Route exact path="/location" exact component = {Locationc} />

        </Switch>
  
  
  
}
    </Router> 
        
    </div>
  );
}

export default Hr;
