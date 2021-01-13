import axios from 'axios'
import {useHistory} from 'react-router-dom'
import React, {useState} from 'react';
import '../style/loginstyle.css'


function AddStaffHr(){

    const [name, setname]=useState('');
    const [email, setemail]=useState('');
    const [salary, setsalary]=useState('');
    const [gender, setgender]=useState('');
    const [office_location, setoffice_location]=useState('');
    const [role1, setrole1]=useState('');
    const [faculty, setfaculty]=useState('');
    const [dept_id, setdept_id]=useState('');
    const [role2, setrole2]=useState('');
    const [resMessage, setResMessage]=useState('');
    const history = useHistory();
  const onSubmit = (e)=>{
      e.preventDefault();
    console.log("faculty being added ")
    const info = {
       name:name,
       email:email,
       salary:salary,
       gender:gender,
       office_location:office_location,
    role1:role1,
    faculty:faculty,
    dept_id:dept_id,
    role2:role2
    }
    axios.post('http://localhost:3001/hr/addStaff', info,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    .then(res => {
     
        setResMessage(res.data.mess)
        window.location='/hr'

      
      })
      
  }
  const handleNameChange = (e)=>{
    const name = e.target.value ;
        setname(name);
}
const handleEmailChange = (e)=>{
    const email = e.target.value ;
    setemail(email);
}
const handleSalaryChange = (e)=>{
    const salary = e.target.value ;
    setsalary(salary);
}

const handleLocationChange = (e)=>{
    const office = e.target.value ;
    setoffice_location(office);
}

const handleDepChange = (e)=>{
    const dep = e.target.value ;
    setdept_id(dep);
}

const handleFacultyChange = (e)=>{
    const fac = e.target.value ;
    setfaculty(fac);
}




const onChangeGender = (e)=>{
    const gender = e.target.value ;
    setgender(gender);
}
const handleChange1 =(e)=>{
    const role1 = e.target.value ;
    setrole1(role1);  

}
const handleChange2 =(e)=>{
    const role2 = e.target.value ;
    setrole2(role2);  

}





        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 30 }}>
                <h1>
          Add a staff memeber
            </h1>
            
            <form onSubmit={onSubmit}>
        <input placeholder="name" type="text" onChange={handleNameChange} />
        <br />
        <input placeholder="email" type="email" onChange={handleEmailChange} />
        <br />
        <input placeholder="salary" type="number" onChange={handleSalaryChange} />
        <br />
        <div onChange={onChangeGender}>
        <input type="radio" value="false" name="gender" /> Male
        <input type="radio" value="true" name="gender" /> Female
      </div>
<br/>
<input placeholder="office location" type="text" onChange={handleLocationChange} />
<br/>
<input placeholder="faculty" type="text" onChange={handleFacultyChange} />
        <br />
        <input placeholder="dept id" type="text" onChange={handleDepChange} />
        <br />
       
       <div>
       <label>Role 1</label>

      <select onChange={handleChange1} > 

       <option value="hr">Hr</option>
        <option value="Instructor">Instructor</option>
        <option value="ta">TA</option>
      </select>
      </div>

      <div>
      <label>Role 2</label>

      <select onChange={handleChange2} > 
      <small className="form-text text-muted">Role2</small>

       <option value="hod">HOD</option>
        <option value="coordinator">Coordinator</option>
      </select>
      </div>

       <input className ='btn btn-primary btn-block btn-large' type="submit" />
            </form>
        <label>{resMessage}</label>
            </div>
        );
    
}

export default  AddStaffHr
    