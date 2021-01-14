import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';

export class AssignCoordinator extends Component{
    constructor(props){
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCourseID = this.onChangeCourseID.bind(this);
        this.onChangeTaID = this.onChangeTaID.bind(this);

        this.state = {
            memID: '',
            courseID:'',
            message:''
        }
    }

    onChangeCourseID(e){
        this.setState({
            courseID:e.target.value
        })
    }

    onChangeTaID(e){
        this.setState({
            memID:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const req = {
            memID:this.state.memID,
            courseID:this.state.courseID
        }

        axios.post('http://localhost:3001/instructor/assignCoordinator',req,{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res=>{
            this.setState({
                memID:'',
                courseID:'',
                message:res.data
            })
        },error => console.log(error)
        )
        
    }

    render(){
        return(
            <div className='form-loc'>
                <h3>Assign Course Coordinator</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>TA ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeTaID} value={this.state.memID} placeholder="Enter TA ID" />
                        <small className="form-text text-muted">e.g. ac-1</small>
                        <br />
                        <label>Course ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeCourseID} value={this.state.courseID} placeholder="Enter course ID" />
                        <small className="form-text text-muted">e.g. CSEN702</small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div>
                    <br />
                    <h3>{this.state.message}</h3>
                </div>
            </div>
        )
    }


}

export default AssignCoordinator