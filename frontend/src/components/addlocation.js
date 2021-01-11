import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import '../style/loginstyle.css'


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
        id:id,
        type:type,
        capacity:capacity
    }
    axios.post('http://localhost:3001/hr/addlocation', info, {})
    .then(res => {
      localStorage.setItem("jwtToken", res.data.t);
      if (res.data.t){
          console.log('redirecting ')
         return  history.push('/Location')   
      }else{
        setResMessage(res.data.message)
      }
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


        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <h1>
           Add a Location 
            </h1>
            
            <form onSubmit={onSubmit}>
        <input placeholder="id" type="text" onChange={handleIdChange} />
        <small className="form-text text-muted">e.g. C1.101 </small>
        <br />
        <input placeholder="capacity" type="number" onChange={handleCapacityChange} />
        <br />
        <input placeholder="type" type="text" onChange={handleTypeChange} />
        <small className="form-text text-muted">e.g.Office</small>
        <br />
        <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label>{resMessage}</label>
            </div>
        );
    
}

export default Addlocation;