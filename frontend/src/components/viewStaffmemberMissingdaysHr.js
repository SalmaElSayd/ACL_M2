import axios from 'axios'
import React, {useState} from 'react';
import '../style/ViewStaff.css'
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
      console.log(res.data.att[0])
    if (res.data.att ) {
        setAttendance(res.data.att)
    }
  })
  .catch((error) => {
    console.log(error);
  })
    
}



const handleHome=(e)=>{
    window.location='/home'
}




        return (
            <div >
                <h1>
         View Staff Memebers with Missing Days
            </h1>

            <div className='form-loc'>

            <form className="submit" onSubmit={onSubmit}>
       
            <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>

            <table className='table-hover'>
                        <thead>
                            <tr>
                                <th>Staff id</th>
                                
                                
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





       
        <label>{resMessage}</label>
        </div>
<div className="gobackbutton">
         <Button onClick={handleHome} variant="outline-primary">Go back gome </Button>{'    '}
         </div>
            </div>

        );
    
}


export default ViewStaffmemberMissingdaysHr;  