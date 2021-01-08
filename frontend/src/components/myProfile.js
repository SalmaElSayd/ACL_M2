import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
class myprofile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            profile: "profile of user"
        }
    }
componentDidMount(){
    axios.get('/myProfile',{headers:{authorisation:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFjLTEiLCJyb2xlMSI6Imluc3RydWN0b3IiLCJpYXQiOjE2MTAxMTAxNTV9.-MOowNg4OrDhSJM1aeYZazaYfqF7RwQxRSdBGRT2WpU'}}).then(res => {this.setState({profile:res.data})})
    
}
  render(){
      return (
<div className="App">
      <h1>My Profile</h1>
        <p>{this.state.profile}</p>
       

        
      </div>)
  } 
}

export default myprofile;
