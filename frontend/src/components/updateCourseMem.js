import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';

export class UpdateCourseMem extends Component{
    constructor(props){
        super(props)

        this.onChangeCourseID = this.onChangeCourseID.bind(this)
        this.onChangememID = this.onChangememID.bind(this)
        this.onChangeTargetCourseID = this.onChangeTargetCourseID.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            courseID:'',
            memID:'',
            targetCourseID:'',
            message:''
        }
    }

    onChangeCourseID(e){
        this.setState({
            courseID:e.target.value
        })
    }

    onChangeTargetCourseID(e){
        this.setState({
            targetCourseID:e.target.value
        })
    }

    onChangememID(e){
        this.setState({
            memID:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()

        const req = {
            courseID:this.state.courseID,
            memID:this.state.memID,
            targetCourseID:this.state.targetCourseID
        }

        axios.post('http://localhost:3001/instructor/updateCourseMem',req,{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res=>{
            this.setState ({
                courseID:'',
                memID:'',
                targetCourseID:'',
                message:res.data
            })
        },error => console.log(error)
        )
        
    }

    render(){
        return(
            <div className='form-loc'>
                <h3>Update Member's Course</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>TA ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangememID} value={this.state.memID} placeholder="Enter TA ID" />
                        <small className="form-text text-muted">e.g. ac-1</small>
                        <br />
                        <label>Course ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeCourseID} value={this.state.courseID} placeholder="Enter course ID" />
                        <small className="form-text text-muted">e.g. CSEN702</small>
                        <br />
                        <label>Target Course ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeTargetCourseID} value={this.state.targetCourseID} placeholder="Enter Target Course ID" />
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

export default UpdateCourseMem