

import 'bootstrap/dist/css/bootstrap.min.css'
import React , {useState, useEffect}from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Schedule from './schedule';

function Myschedule (props){

    const [schedule, setSchedule]=useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/academicMember/viewSchedule',{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res => {console.log(res.data);
          console.log(res.data.schedule);
                    setSchedule(res.data.schedule);
                    console.log("schedule data here :")
                    console.log(res.data)
                  })
       
    }, []);
   
    console.log('getting Schedule')
      return (
<div className="schedule">
      <h1>My Schedule</h1>
      <Schedule sched={schedule}/>


      </div>) 
}

export default Myschedule;

/*
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const schedule = ()=>{
    console.log("get auth")
    axios.post('schedule',{}, {headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => console.log(res.data))
  }

  
 class myschedule extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          schedule: []
      }
  }

  componentDidMount(){
    axios.get('/AM_viewschedule',
    {headers:{authorisation:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlMSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MTAxMTAxNTV9.-MOowNg4OrDhSJM1aeYZazaYfqF7RwQxRSdBGRT2WpU'
     }})
    .then(res => {this.setState({schedule:res.data})})
    .catch((error) => {
      console.log(error);
    })
    
}

render(){
  return (
<div className="App">
  <h1>My Schedule</h1>
    <p>{this.state.schedule}</p>
   

    
  </div>)
} 
}

export default myschedule;

/*
  componentDidMount() {
    axios.get('http://localhost:3000/viewschedule/')
      .then(response => {
        this.setState({ schedule: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

 

  schedule() {
    return this.state.schedule.map(currentSchedule => {
      return <schedule schedule={currentSchedule} key={currentSchedule._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Your Schedule</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Thursday</th>
              <th>Saturday</th>
            </tr>
          </thead>
          <tbody>
            { this.schedule() }
          </tbody>
        </table>
      </div>
    )
  }
}

*/
//-------------------------



 

