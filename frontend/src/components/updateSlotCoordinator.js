import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';

export class UpdateSlot extends Component{
    constructor(props){
        super(props)

        this.onChangeCourseID = this.onChangeCourseID.bind(this)
        this.onChangeLocationID = this.onChangeLocationID.bind(this)
        this.onChangeDay = this.onChangeDay.bind(this)
        this.onChangeGroup = this.onChangeGroup.bind(this)
        this.onChangeType = this.onChangeType.bind(this)
        this.onChangeID = this.onChangeID.bind(this)

        this.onChangeCourseIDnew = this.onChangeCourseIDnew.bind(this)
        this.onChangeLocationIDnew = this.onChangeLocationIDnew.bind(this)
        this.onChangeDaynew = this.onChangeDaynew.bind(this)
        this.onChangeGroupnew = this.onChangeGroupnew.bind(this)
        this.onChangeTypenew = this.onChangeTypenew.bind(this)
        this.onChangeIDnew = this.onChangeIDnew.bind(this)


        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            course_id:'',
            location_id:'',
            day:'',
            group:'',
            type:'',
            id:0,
            newid:0,
            newtype:'',
            newday:'',
            newlocation_id:'',
            newcourse_id:'',
            newgroup:'',
            message:''
        }
    }

    onChangeCourseID(e){
        this.setState({
            course_id:e.target.value
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

    onChangeCourseIDnew(e){
        this.setState({
            newcourse_id:e.target.value
        })
    }

    onChangeGroupnew(e){
        this.setState({
            newgroup:e.target.value
        })
    }

    onChangeLocationIDnew(e){
        this.setState({
            newlocation_id:e.target.value
        })
    }

    onChangeDaynew(e){
        this.setState({
            newday:e.target.value
        })
    }

    onChangeTypenew(e){
        this.setState({
            newtype:e.target.value
        })
    }

    onChangeIDnew(e){
        this.setState({
            newid:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()

        const req = {
            course_id:this.state.course_id,
            location_id:this.state.location_id,
            day:this.state.day,
            group:this.state.group,
            type:this.state.type,
            id:this.state.id,
            newid:this.state.newid,
            newtype:this.state.newtype,
            newdate:this.state.newdate,
            newday:this.state.newday,
            newlocation_id:this.state.newlocation_id,
            newcourse_id:this.state.newcourse_id,
            newgroup:this.state.newgroup

        }

        axios.post('http://localhost:3001/coordinator/updateSlot',req,{headers:{authorisation:localStorage.getItem('jwtToken')}})
        .then(res=>{
            this.setState ({
                course_id:'',
                location_id:'',
                day:'',
                group:'',
                type:'',
                id:0,
                newid:0,
                newtype:'',
                newday:'',
                newlocation_id:'',
                newcourse_id:'',
                newgroup:'',
                message:res.data
            })
        })
        
    }

    render(){
        return(
            <div className='form-loc'>
                <h3>Upadte Slot In Course</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Slot ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeID} value={this.state.id} placeholder="Enter Slot ID" />
                        <small className="form-text text-muted">e.g. 1,2,3 ..</small>
                        <br />
                        <label>Course ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeCourseID} value={this.state.course_id} placeholder="Enter course ID" />
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
                        <br/>
                        {/* <label>Date</label>
                        <input type="text" required className="form-control" onChange={this.onChangeDate} value={this.state.date} placeholder="Enter Date" />
                        <small className="form-text text-muted">e.g. </small>
                        <br/> */}
                        <label>New Slot ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeIDnew} value={this.state.newid} placeholder="Enter New Slot ID" />
                        <small className="form-text text-muted">e.g. 1,2,3 ..</small>
                        <br />
                        <label>New Course ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeCourseIDnew} value={this.state.newcourse_id} placeholder="Enter New course ID" />
                        <small className="form-text text-muted">e.g. CSEN702</small>
                        <br />
                        <label>New Location ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeLocationIDnew} value={this.state.newlocation_id} placeholder="Enter New Location ID" />
                        <small className="form-text text-muted">e.g. 1,2,3..</small>
                        <br />
                        <label>New Day</label>
                        <input type="text" required className="form-control" onChange={this.onChangeDaynew} value={this.state.newday} placeholder="Enter New Day" />
                        <small className="form-text text-muted">e.g. thursday</small>
                        <br/>
                        <label>New Group</label>
                        <input type="text" required className="form-control" onChange={this.onChangeGroupnew} value={this.state.newgroup} placeholder="Enter New Group" />
                        <small className="form-text text-muted">e.g. 1,2,3..</small>
                        <br />
                        <label>New Type</label>
                        <input type="text" required className="form-control" onChange={this.onChangeTypenew} value={this.state.newtype} placeholder="Enter New Type" />
                        <small className="form-text text-muted">e.g. tut/lecture/lab..</small>
                        {/* <br/>
                        <label>New Date</label>
                        <input type="text" required className="form-control" onChange={this.onChangeDatenew} value={this.state.newdate} placeholder="Enter New Date" />
                        <small className="form-text text-muted">e.g. </small> */}
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

export default UpdateSlot