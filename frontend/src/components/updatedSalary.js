import 'bootstrap/dist/css/bootstrap.min.css'
import React , {useState, useEffect}from 'react'
import '../style/ViewStaff.css';

import { Link } from 'react-router-dom'
import axios from 'axios'
import Schedule from './schedule';
import SignRecords from './signrecords'
import MissingDays from './viewMissingDays';

 function UpdatedSalary (props){

    const [missingHours, setMissingHours]=useState(0);
    const [missingMinutes, setMissingMinutes]=useState(0);
    const [missingDays, setMissingDays]=useState([]);
    const [isExtra, setisExtra]=useState(false);

    const [salary, setSalary]=useState(0);
    const [resMessage, setResMessage]=useState();
    
    useEffect(() => {

        

        axios.get('http://localhost:3001/viewMissingHours',{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res => { 
            setMissingHours(res.data.h)
            setMissingMinutes(res.data.m)
            if (res.data.extra){
                setisExtra(true)
            }
        console.log('your missing hours'+res.data.m)})

        axios.get('http://localhost:3001/viewMissingDays',{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res => { 
            let md=[];
            res.data.days.forEach(element => {
                md.push(new Date (element.day).toDateString())
            });
            setMissingDays(md)
            
        console.log('your missing days'+md)})
        axios.get('http://localhost:3001/salary',{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res => { 
            setSalary(res.data.salary);
            calculateSalary();
        console.log('your base salary'+res.data.salary)})
        
    }, []);
   
    
    const calculateSalary = ()=>{
        let d= missingDays.length;
        let m=missingHours*60 +missingMinutes;
        if (m<=179 || isExtra)m=0;
        let s =salary-((salary*d)/60)-((salary*m)/(180*60));
        console.log(s)
        setSalary(s);
        return s;
    }
   

      
    
    
    
    
    
 
      return (
<div >
      
    <h3>Salary</h3>
 <p>{salary}</p>
     
    </div>)
  
}

export default UpdatedSalary;
