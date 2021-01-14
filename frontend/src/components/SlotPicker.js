import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';
import Datepic from './DatePicker';  

export class SlotPicker extends Component{
    constructor(props){
        super(props)

        this.onChangeCourseID = this.onChangeCourseID.bind(this)
        this.onChangeDay = this.onChangeDay.bind(this)
        this.onChangeType = this.onChangeType.bind(this)
        this.onChangeID = this.onChangeID.bind(this)


        // this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            courseID:"",
            day:Date.now(),
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

    // onSubmit(e){
    //     e.preventDefault()

    //     const req = {
    //         courseID:this.state.courseID,
    //         location_id:this.state.location_id,
    //         day:this.state.day,
    //         group:this.state.group,
    //         type:this.state.type,
    //         id:this.state.id
    //     }
    //     console.log(req)

    //     axios.post('http://localhost:3001/coordinator/addSlots',req,{headers:{authorisation:localStorage.getItem('jwtToken')}})
    //     .then(response => {
    //         this.setState({
    //             courseID:"",
    //             location_id:"",
    //             day:"",
    //             group:"",
    //             type:"",
    //             id:0,
    //             message: response.data
    //         })
    //     }, error => {
    //         console.log(error);
    //     }
    //     )
    // }

    render(){
        return(
            <div className='form-loc'>
                <form>
                    <div className='form-group'>
                        <label>Slot ID</label>
                        <input type="text"  className="form-control" onChange={this.onChangeID} placeholder="Enter Slot ID" />
                        <small className="form-text text-muted">e.g. 1,2,3 ..</small>
                        <br />
                        <label>Course ID</label>
                        <input type="text"  className="form-control" onChange={this.onChangeCourseID}  placeholder="Enter course ID" />
                        <small className="form-text text-muted">e.g. CSEN702</small>
                        <br />
                        <label>Slot Date</label>
                        <small className="form-text text-muted">Please choose the slot date.</small>
                        <Datepic onChange={(newDate) => this.setState({compensation_date:new Date(newDate).format("yyyy-MM-dd")})} /> 
                        <br />
                        <label>Type</label>
                        <select className="form-control" onChange={this.onChangeType}>
                                    <option>lecture</option>
                                    <option>tutorial</option>
                                    <option>lab</option>
                                   
                                </select>
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

export default SlotPicker