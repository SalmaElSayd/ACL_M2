import React, { Component } from 'react';
import '../style/ViewStaff.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export class AssignToSlot extends Component{
    constructor(props){
        super(props)
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCourseID = this.onChangeCourseID.bind(this);
        this.onChangeTaID = this.onChangeTaID.bind(this);
        this.onChangeDay = this.onChangeDay.bind(this);
        this.onChangeID = this.onChangeID.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeGroup = this.onChangeGroup.bind(this);
        this.onChangeLocationID = this.onChangeLocationID.bind(this);

        this.state = {
            memID:'',
            courseID:'',
            location_id:'',
            day:'',
            id:0,
            type:'',
            group:'',
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

    onSubmit(e){
        e.preventDefault();
        
        const req = {
            memID:this.state.memID,
            courseID:this.state.courseID,
            day:this.state.day,
            id:this.state.id,
            location_id:this.state.location_id,
            group:this.state.group,
            type:this.state.type
        } 

        axios.post('http://localhost:3001/instructor/assignToSlot',req,{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res =>{
            this.setState({
                memID:'',
                courseID:'',
                day:'',
                location_id:'',
                id:0,
                type:'',
                group:'',
                message:res.data
            })
        },error => console.log(error)
        )
        
    }

    render(){
        return(
            <div className='form-loc'>
                <h3>Assign To Slot</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>TA ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeTaID} value={this.state.memID} placeholder="Enter TA ID" />
                        <small className="form-text text-muted">e.g. ac-1</small>
                        <br />
                        <label>Course ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeCourseID} value={this.state.courseID} placeholder="Enter course ID" />
                        <small className="form-text text-muted">e.g. CSEN702</small>
                        <br />
                        <label>Day</label>
                        <input type="text" required className="form-control" onChange={this.onChangeDay} value={this.state.day} placeholder="Enter desired day" />
                        <small className="form-text text-muted">e.g. thursday</small>
                        <br />
                        <label>Slot ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeID} value={this.state.id} placeholder="Enter Slot id" />
                        <small className="form-text text-muted">e.g. 1,2,3..</small>
                        <br />
                        <label>Location ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeLocationID} value={this.state.location_id} placeholder="Enter Location ID" />
                        <small className="form-text text-muted">e.g. lecture/tut/lab..</small>
                        <br />
                        <label>Type</label>
                        <input type="text" required className="form-control" onChange={this.onChangeType} value={this.state.type} placeholder="Enter Slot Type" />
                        <small className="form-text text-muted">e.g. lecture/tut/lab..</small>
                        <br />
                        <label>Group</label>
                        <input type="text" required className="form-control" onChange={this.onChangeGroup} value={this.state.group} placeholder="Enter Group Number" />
                        <small className="form-text text-muted">e.g. 1,2,3..</small>
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

export default AssignToSlot