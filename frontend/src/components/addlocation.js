import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button'

import '../style/ViewStaff.css'
import '../style/buttons.css'


function Addlocation(){

    const [id, setId]=useState('');
    const [type, setType]=useState('');
    const [capacity, setCapacity]=useState('');
    const [resMessage, setResMessage]=useState('');
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
        location_id:id,
        location_type:type,
        capacity:capacity
    }
    axios.post('http://localhost:3001/hr/addLocation', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
     
        setResMessage(res.data.mess)

      })
      
  }
  const handleIdChange = (e)=>{
    const id = e.target.value ;
        setId(id);
}
const handleCapacityChange = (e)=>{
    const capacity = e.target.value ;
    setCapacity(capacity);
}
const handleTypeChange = (e)=>{
    const Type = e.target.value ;
    setType(Type);
}
const handleHome=(e)=>{
    window.location='/home'
}






        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <h1>
           Add a Location 
            </h1>
            <div className='form-loc'>
            <form onSubmit={onSubmit}>
        <input className="form-control" placeholder="id" type="text" onChange={handleIdChange} />
        <small className="form-text text-muted">e.g. C1.101 </small>
        <br />
        <input className="form-control"  placeholder="capacity" type="number" onChange={handleCapacityChange} />
        <br />
        <input className="form-control" placeholder="type" type="text" onChange={handleTypeChange} />
        <small className="form-text text-muted">e.g.Office</small>
        <br />
        <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label>{resMessage}</label>
            </div>
            <div className="gobackbutton">
             <Button onClick={handleHome} variant="outline-primary">Go back gome </Button>{'    '}
               </div>
            </div>
        );
    
}

export default Addlocation;