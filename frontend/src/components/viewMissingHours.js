import 'bootstrap/dist/css/bootstrap.min.css'
import React , {useState, useEffect}from 'react'
import '../style/ViewStaff.css';

import { Link } from 'react-router-dom'
import axios from 'axios'
import Schedule from './schedule';
import SignRecords from './signrecords'

 function MissingHours (props){

    const [missingHours, setMissingHours]=useState([]);
    const [missingMinutes, setMissingMinutes]=useState([]);
    const [isExtra, setisExtra]=useState('Missing Hours');
    const [resMessage, setResMessage]=useState();
    
    useEffect(() => {
        axios.get('http://localhost:3001/viewMissingHours',{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res => { 
            setMissingHours(res.data.h)
            setMissingMinutes(res.data.m)
            if (res.data.extra){
                setisExtra('Extra Hours')
            }
        console.log('your missing hours'+res.data.m)})
       
    }, []);
   
      

      
    
    
    
    

 
      return (
<div >
      
    <h3>{isExtra}</h3>
      <p>{missingHours} : {missingMinutes}</p>
     
    </div>)
  
}

export default MissingHours;
