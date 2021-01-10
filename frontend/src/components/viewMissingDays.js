import 'bootstrap/dist/css/bootstrap.min.css'
import React , {useState, useEffect}from 'react'
import '../style/ViewStaff.css';

import { Link } from 'react-router-dom'
import axios from 'axios'
import Schedule from './schedule';
import SignRecords from './signrecords'

 function MissingDays (props){

    const [missingDays, setMissingDays]=useState([]);
    const [resMessage, setResMessage]=useState();
    
    useEffect(() => {
        axios.get('http://localhost:3001/viewMissingDays',{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res => { 
            let md=[];
            res.data.days.forEach(element => {
                md.push(new Date (element.day).toDateString())
            });
            setMissingDays(md)
            
        console.log('your missing days'+md)})
       
    }, []);
   
      

      
    
    
    
    

 
      return (
       <div>
    <h3>Missing Days</h3>
       {missingDays.map((item, index) => {
                                return (
                                    <p key={index}>
                                        {item}

                                    </p>
                                );
                            })}
                         
      </div>
    
      )
  
}

export default MissingDays;
