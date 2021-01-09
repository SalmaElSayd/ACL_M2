import 'bootstrap/dist/css/bootstrap.min.css'
import React , {useState, useEffect}from 'react'
import '../style/ViewStaff.css';

import { Link } from 'react-router-dom'
import axios from 'axios'
import Schedule from './schedule';

function SignRecords (props){

    
  

 
      return (
<div className="App">
    
       
       
        <table className='table-hover'>
                        <thead>
                            <tr>
                                <th>In</th>
                                <th>Out</th>
                                
                                
                            </tr>
                        </thead>
                        <tbody>
                        {props.recs.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        
                                        <td>{item['signIn']}</td>
                                        <td>{item['signOut']}</td>                                        
                                        
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    
        
      </div>)
  
}

export default SignRecords;
