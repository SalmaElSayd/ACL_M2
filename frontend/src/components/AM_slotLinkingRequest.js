import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';
import Datepic from './DatePicker';  
import SlotPicker from './SlotPicker';

export class slotLinkingRequest extends Component {
    constructor(props) {
        super(props)

        this.onChangeReq_slot = this.onChangeReq_slot.bind(this);
        this.onChangeCourseId = this.onChangeCourseId.bind(this);
        this.onChangeRequest_date = this.onChangeRequest_date.bind(this);
        this.onChangeDate_slot = this.onChangeDate_slot.bind(this);
        this.onChangeReason = this.onChangeReason.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onChangeSlotCourseID = this.onChangeSlotCourseID.bind(this)
        this.onChangeSlotDay = this.onChangeSlotDay.bind(this)
        this.onChangeSlotType = this.onChangeSlotType.bind(this)
        this.onChangeSlotID = this.onChangeSlotID.bind(this)

        this.state = {
            reason: '',
            req_slot:'',
            
            course_id:'',
            request_date: new Date(),
            slotcourseID:'',
          slotday:new Date(),
          slottype:'',
          slotid:''
                  }
    }

  //   onChangeReq_slot(e) {
  //     this.setState({
  //       req_slot: e.target.value
  //     })
  // }

  onChangeReq_slot(courseID,
    day,
    type,
    id) {
    this.setState({
      req_slot: {
        course_id: courseID,
    date:day,
    type:type,
    id:id
      }
    })
}
  onChangeCourseId(e) {
    this.setState({
      course_id: e.target.value
    })
}
onChangeRequest_date(e) {
    this.setState({
        request_date: e.target.value
    })
}
onChangeDate_slot(e) {
  this.setState({
    date_slot: e.target.value
  })
}
 onChangeReason(e) {
        this.setState({
            reason: e.target.value
        })
    }
    onChangeSlotCourseID(e){
      this.setState({
          slotcourseID:e.target.value
      })
  }

  onChangeSlotDay(e){
      this.setState({
          slotday:e.target.value
      })
  }

  onChangeSlotType(e){
      this.setState({
          slottype:e.target.value
      })
  }

  onChangeSlotID(e){
      this.setState({
          slotid:e.target.value
      })
  }
    onSubmit(e) {
        e.preventDefault();

        
        const request = {
          req_slot:{
            course_id: this.state.course_id,
            date:this.state.slotday,
            type:this.state.slottype,
            id:this.state.slotid
          },
          course_id: this.state.course_id,
          request_date: this.state.request_date,
          reason: this.state.reason,
    
                    }
        
    console.log(request)

        axios.post('http://localhost:3001/academicMember/slotLinkingRequest',request,{headers:{authorisation:localStorage.getItem('jwtToken')}})
            .then(response => {
              console.log(response.data)
                if (response.data.message) {
                    this.setState({
                        message: response.data.message

                    })
                    console.log(response.data.message)
                }
            }, error => {
                console.log(error);
            })

        // this.setState({
        //   reason: '',
        //   req_slot:'',
        //   course_id:'',
        //   request_date: new Date(),
        //   date_slot:''
        // })
    }
    render() {
        return (
            <div className='form-loc'>
                <h3>Send a Slot Linking Request</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">

                        <label>Request Slot</label>
                        {/* <input type="text" required className="form-control" onChange={this.onChangeReq_slot} value={this.state.req_slot} placeholder="Enter request slot " /> */}
                        <small className="form-text text-muted">Please enter the slot you want to slot link to.</small>
                        {/* <SlotPicker slotSubmit={this.onChangeReq_slot} /> */}
                        <small className="form-text text-muted">Please enter the slot you will leave.</small>
                        <label>Slot ID</label>
                        <select className="form-control" onChange={this.onChangeSlotID}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                        <small className="form-text text-muted">e.g. 1,2,3 ..</small>
                        <br />
                        
                        <label>Slot Date</label>
                        <small className="form-text text-muted">Please choose the slot date.</small>
                        <Datepic required onChange={(newDate) => this.setState({compensation_date:new Date(newDate).format("yyyy-MM-dd")})} /> 
                        <br />
                        <label>Type</label>
                        <select className="form-control" onChange={this.onChangeSlotType}>
                                    <option>lecture</option>
                                    <option>tut</option>
                                    <option>lab</option>
                                   
                                </select>
                        <small className="form-text text-muted">e.g. tut/lecture/lab..</small>
                        <br />
                        <label>Course ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeCourseId} value={this.state.course_id} placeholder="Enter course id " />
                        <small className="form-text text-muted">e.g. CSEN701</small>
                        <br />
                        <label>Request Date</label>
                        <small className="form-text text-muted">Please choose the date you want to leave.</small>
                        {/* <Datepic onChange={(newDate) => this.setState({request_date:new Date(newDate).format("yyyy-MM-dd")})} />  */}
                        <br />
                        <label>Reason</label>
                        <input type="text" required className="form-control" onChange={this.onChangeReason} value={this.state.reason} placeholder="Enter a reason" />
                        <small className="form-text text-muted">Please enter a reason why you are requesting this Leave.</small>
                        <br />
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

export default slotLinkingRequest




/*
import React from 'react';

function slotLinkingRequest() {
  return (
    <div className='slotLinkingRequest'>
      <h1>slotLinkingRequest</h1>
    </div>
  );
}

export default slotLinkingRequest;
*/