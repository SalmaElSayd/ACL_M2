import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import '../style/loginstyle.css'


function Deletelocation(){

    const [id, setId]=useState('');
    const [type, setType]=useState('');
    const [capacity, setCapacity]=useState('');
    const [resMessage, setResMessage]=useState('');
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
        loc_id:id
    }
    axios.post('http://localhost:3001/hr/deleteLocation', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
     
        setResMessage(res.data.mess)
      window.location='/hr'

      })
  }
  const handleIdChange = (e)=>{
    const id = e.target.value ;
        setId(id);
  }

        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <h1>
           Delete a Location 
            </h1>
            
            <form  onSubmit={onSubmit}>
        <input placeholder="id" type="text" onChange={handleIdChange} />
        <small className="form-text text-muted">e.g. C1.101 </small>
        <br />
        <input className ='btn btn-primary btn-block btn-large' type="submit" />

        </form>
        <label>  {resMessage}</label>
            </div>
        );
    

}

export default  Deletelocation