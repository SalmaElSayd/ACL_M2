import axios from 'axios'
import React, {useState} from 'react';
import '../style/idk.css'
import '../style/buttons.css'

import Button from 'react-bootstrap/Button'



function ViewStaffmemberMissingdaysHr(){

    const [att, setAttendance]=useState([]);

    const [resMessage, setResMessage]=useState('');


const onSubmit = (e)=>{

    e.preventDefault();

  const info = {
     
  }
  axios.post('http://localhost:3001/hr/viewStaffmemberMissingdays',{},{headers:{authorisation:localStorage.getItem('jwtToken')}})
  .then(res => {
      console.log(res.data)
    if (res.data.att > 0) {
        setAttendance([res.data.att])
    }
  })
  .catch((error) => {
    console.log(error);
  })
  console.log('your attendance records'+att)
    
}



const handleHome=(e)=>{
    window.location='/hr'
}




        return (
            <div >
                <h1>
         view staff memebers with missing Days 
            </h1>

            <form className="submit" onSubmit={onSubmit}>
       

        <table className='table-hover'>
                        <thead>
                            <tr>
                                <th>Staff id </th>
                              
                                
                            </tr>
                        </thead>
                        <tbody>
                        {att.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        
                                        <td>{item}</td>
                                      
                                        
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

        <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label>{resMessage}</label>
<div className="gobackbutton">
         <Button onClick={handleHome} variant="outline-primary">Go back gome </Button>{'    '}
         </div>
            </div>

        );
    
}


export default ViewStaffmemberMissingdaysHr;  