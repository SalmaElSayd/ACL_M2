import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import '../style/loginstyle.css'


function Updatestaff(){

    const [id, setid]=useState('');
    const [office_location, setoffice_location]=useState('');
    const [role1, setrole1]=useState('');
    const [resMessage, setResMessage]=useState('');
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
       id:id,
     office_location:office_location,
    role1:role1,
    }
    axios.post('http://localhost:3001/hr/updatestaff', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
     
        setResMessage(res.data.mess)
        window.location='/hr'

      
      })
      
  }
  const handleIdChange = (e)=>{
    const id = e.target.value ;
        setid(id);
}

const handleLocationChange = (e)=>{
    const office = e.target.value ;
    setoffice_location(office);
}


const handleChange1 =(e)=>{
    const role1 = e.target.value ;
    setrole1(role1);  

}


        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
              <div>
                <h1>
          Update a staff memeber
<br/>
            </h1>
            </div>
            <br/>
            
            <form onSubmit={onSubmit}>
        <input placeholder="id" type="text" onChange={handleIdChange} />

<br/>
<input placeholder="office location" type="text" onChange={handleLocationChange} />
<br/>
       <div>
       <label>Role 1</label>
       <br/>

      <select onChange={handleChange1} >
       <option value="hr">Hr</option>
        <option value="Instructor">Instructor</option>
        <option value="ta">TA</option>
      </select>
      </div>


<br/>

        <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label>{resMessage}</label>
            </div>
        );
    
}

export default  Updatestaff
    