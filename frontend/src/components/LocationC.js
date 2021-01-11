import React, { useState } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { addlocation } from '.';

import LocationNavbar from './locationNavbar'

function location(){

    return (
        <div className="App">


        <Router>
        <LocationNavbar />

          <div className="container">
          <Route exact path="/addlocation" exact component = {addlocation} />

          <br/>
         
          </div>
        
        </Router>
        </div>
      );




}
export default location;


