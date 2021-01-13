import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';

export class AddSlot extends Component{
    constructor(props){
        super(props)

        this.onChangeCourseID = this.onChangeCourseID.bind(this)
        this.onChangeLocationID = this.onChangeLocationID.bind(this)
        this.onChangeDay = this.onChangeDay.bind(this)
        this.onChangeGroup = this.onChangeGroup.bind(this)
        this.onChangeType = this.onChangeType.bind(this)
        this.onChangeID = this.onChangeID.bind(this)


        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            courseID:"",
            location_id:"",
            day:"",
            group:"",
            type:"",
            id:0,
            message:''
        }
    }

    onChangeCourseID(e){
        this.setState({
            courseID:e.target.value
        })
    }

    onChangeGroup(e){
        this.setState({
            group:e.target.value
        })
    }

    onChangeLocationID(e){
        this.setState({
            location_id:e.target.value
        })
    }

    onChangeDay(e){
        this.setState({
            day:e.target.value
        })
    }

    onChangeType(e){
        this.setState({
            type:e.target.value
        })
    }

    onChangeID(e){
        this.setState({
            id:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()

        const req = {
            courseID:this.state.courseID,
            location_id:this.state.location_id,
            day:this.state.day,
            group:this.state.group,
            type:this.state.type,
            id:this.state.id
        }
        console.log(req)

        axios.post('http://localhost:3001/coordinator/addSlots',req,{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(response => {
            this.setState({
                courseID:"",
                location_id:"",
                day:"",
                group:"",
                type:"",
                id:0,
                message: response.data
            })
        }, error => {
            console.log(error);
        }
        )
    }

    render(){
        return(
            <div className='form-loc'>
                <h3>Add Slot To Course</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Slot ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeID} value={this.state.id} placeholder="Enter Slot ID" />
                        <small className="form-text text-muted">e.g. 1,2,3 ..</small>
                        <br />
                        <label>Course ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeCourseID} value={this.state.courseID} placeholder="Enter course ID" />
                        <small className="form-text text-muted">e.g. CSEN702</small>
                        <br />
                        <label>Location ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeLocationID} value={this.state.location_id} placeholder="Enter Location ID" />
                        <small className="form-text text-muted">e.g. 1,2,3..</small>
                        <br />
                        <label>Day</label>
                        <input type="text" required className="form-control" onChange={this.onChangeDay} value={this.state.day} placeholder="Enter Day" />
                        <small className="form-text text-muted">e.g. thursday</small>
                        <br/>
                        <label>Group</label>
                        <input type="text" required className="form-control" onChange={this.onChangeGroup} value={this.state.group} placeholder="Enter Group" />
                        <small className="form-text text-muted">e.g. 1,2,3..</small>
                        <br />
                        <label>Type</label>
                        <input type="text" required className="form-control" onChange={this.onChangeType} value={this.state.type} placeholder="Enter Type" />
                        <small className="form-text text-muted">e.g. tut/lecture/lab..</small>
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

export default AddSlot