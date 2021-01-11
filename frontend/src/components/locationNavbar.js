import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LocationNavbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="./addlocation" className="nav-link">  add a location    </Link>
          </li>
          <li className="navbar-item">
          <Link to="/updatelocation" className="nav-link">update a location   </Link>
          </li>
          <li className="navbar-item">
          <Link to="/deletlocation" className="nav-link">delete a location</Link>
          </li>
          
        </ul>
        </div>
      </nav>
    );
  }
}