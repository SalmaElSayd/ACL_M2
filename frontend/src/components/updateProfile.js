import React , {useState, useEffect} from 'react'
import axios from 'axios';
import '../style/ViewStaff.css';

function UpdateProfile() {
  
  const [userInfo, setUserInfo]=useState('');
  const [resMessage, setResMessage]=useState('');
  useEffect(() => {
      axios.get('http://localhost:3001/myProfile',{headers:{authorisation:localStorage.getItem('jwtToken')}})
      .then(res => {setUserInfo([res.data.profile.information]);
      console.log('profile info '+res.data.profile.information)})
     
  }, []);
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log("updating profile")
    axios.post('http://localhost:3001/updateProfile',{info:userInfo}, {headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {   console.log(res.data);      setResMessage([res.data.message])
     })
  }

  const handleChange = (e) =>{
    setUserInfo(e.target.value);
    console.log(userInfo)
  }
  return (
    
    <div className='form-loc'>
    <h3>Update Profile Information</h3>
    <form onSubmit={handleSubmit} >
        <div className="form-group">
            <label>Information</label>
            <textarea rows="5" type="text" required className="form-control" onChange={handleChange} defaultValue={userInfo} />
            <br />
            
        </div>
        <input type="submit" className="btn btn-primary" />
        <p>{resMessage}</p>
    </form>
    <div>
        <br />
      
    </div>
</div>
    
  );
}

export default UpdateProfile;
