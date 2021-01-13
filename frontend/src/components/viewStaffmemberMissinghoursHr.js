import axios from 'axios'
import React, {useState} from 'react';
import '../style/idk.css'
import '../style/buttons.css'
import '../style/ViewStaff.css';
import '../style/myprofile.css'
import Button from 'react-bootstrap/Button'



function ViewStaffmemberMissinghoursHr(){

    const [att, setAttendance]=useState([]);

    const [resMessage, setResMessage]=useState('');


const onSubmit = (e)=>{

    e.preventDefault();

  const info = {
     
  }
  axios.post('http://localhost:3001/hr/viewStaffmemberMissinghours',{},{headers:{authorisation:localStorage.getItem('jwtToken')}})
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
            <div className="enable-scroll" >
                <h1>
         view staff memebers with missing hours 
            </h1>

            <form className="submit" onSubmit={onSubmit}>
       
            <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>

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

                    <h1>hi</h1>
        <label>{resMessage}</label>
<div className="gobackbutton">
         <Button onClick={handleHome} variant="outline-primary">Go back gome </Button>{'    '}
         </div>
            </div>

        );
    
}


export default ViewStaffmemberMissinghoursHr;  