import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';
import Datepic from './DatePicker';  
import SlotPicker from './SlotPicker';
export class sendLeaveRequest extends Component {
    constructor(props) {
        super(props)

        this.onChangeRequest_type = this.onChangeRequest_type.bind(this);
        this.onChangeReq_slot = this.onChangeReq_slot.bind(this);
        this.onChangeReplacement_id = this.onChangeReplacement_id.bind(this);
        this.onChangeRequest_date = this.onChangeRequest_date.bind(this);
        this.onChangeCompensation_date = this.onChangeCompensation_date.bind(this);
        this.onChangeDocument = this.onChangeDocument.bind(this);
        this.onChangeReason = this.onChangeReason.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.onChangeSlotCourseID = this.onChangeSlotCourseID.bind(this)
        this.onChangeSlotDay = this.onChangeSlotDay.bind(this)
        this.onChangeSlotType = this.onChangeSlotType.bind(this)
        this.onChangeSlotID = this.onChangeSlotID.bind(this)

        this.state = {
          request_type:'',
          reason: '',
          req_slot:{},
          replacement_id: '',
          request_date:new Date(),
          compensation_date:new Date(),
          document: '',
          slotcourseID:'',
          slotday:new Date(),
          slottype:'',
          slotid:''
        }
    }

  

    onChangeRequest_type(e) {
        this.setState({
            request_type: e.target.value
        })
    }

    onChangeReq_slot(courseID,
      day,
      type,
      id) {
      this.setState({
        req_slot: {
          course_id: this.state.slotcourseID,
      date:this.state.slotday,
      type:this.state.slottype,
      id:this.state.slotid
        }
      })
  }
  onChangeReplacement_id(e) {
    this.setState({
        replacement_id: e.target.value
    })
}
onChangeRequest_date(e) {
    this.setState({
        request_date: e.target.value
    })
}
onChangeCompensation_date(e) {
  this.setState({
    compensation_date: e.target.value
  })
}onChangeDocument(e) {
  this.setState({
    document: e.target.value
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
      request_type:this.state.request_type,
      reason: this.state.reason,
      req_slot:{
        course_id: this.state.slotcourseID,
        date:this.state.slotday,
        type:this.state.slottype,
        id:this.state.slotid
      },
      replacement_id: this.state.replacement_id,
      request_date: this.state.request_date,
      compensation_date:this.state.compensation_date,
      document: this.state.document
        }
console.log(request)
        axios.post('http://localhost:3001/academicMember/sendLeaveRequest',
         request,{headers:{authorisation:localStorage.getItem('jwtToken')}})
            .then(response => {
                if (response.data.message) {
                    this.setState({
                        message: response.data.message
                    })
                }
            }, error => {
                console.log(error);
            })

      //   this.setState({
      // request_type:'',
      // reason: '',
      // req_slot:{},
      // replacement_id: '',
      // request_date:new Date(),
      // compensation_date:new Date(),
      // document: ''
      //   })
    }
    render() {
        return (
            <div className='form-loc'>
                <h3>Send a Leave Request</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">

                        <label>Request Type</label>
                        <small className="form-text text-muted">Please choose your Leave type.</small>
                        <select className="form-control" onChange={this.onChangeRequest_type}>
                                    <option>Annual</option>
                                    <option>Compensation</option>
                                    <option>Accidental</option>
                                    <option>Sick</option>
                                    <option>Maternity</option>
                                    <option>Change day off</option>
                                    <option>Slot linking</option>
                                    <option>Replacement</option>
                                </select>
                        <br />
                        <label>Request Slot</label>
                        {/* <input type="text" className="form-control" onChange={this.onChangeReq_slot}  placeholder="Enter a request slot" /> */}
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
                        <label>Course ID</label>
                        <input type="text"  className="form-control" onChange={this.onChangeSlotCourseID}  placeholder="Enter course ID" />
                        <small className="form-text text-muted">e.g. CSEN702</small>
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
                        <label>Replacement ID</label>
                        <input type="text"  className="form-control" onChange={this.onChangeReplacement_id}  placeholder="Enter replacement ID" />
                        <small className="form-text text-muted">e.g. ac-1</small>
                        <br />
                        <label>Request Date</label>
                        <small className="form-text text-muted">Please choose the date you want to leave.</small>
                        <Datepic onChange={(newDate) => this.setState({request_date:new Date(newDate).format("yyyy-MM-dd")})} /> 
                        <br />
                        <label>Compensation Date</label>
                        <small className="form-text text-muted">Please choose the date you will compensate in.</small>
                        <Datepic onChange={(newDate) => this.setState({compensation_date:new Date(newDate).format("yyyy-MM-dd")})} /> 
                        <br />
                        <label>Document</label>
                        <input  type="text"  className="form-control" onChange={this.onChangeDocument}  placeholder="Enter document link" />
                        <small className="form-text text-muted">Please enter a link with the documents needed inside of it.</small>

                        <br />
                        <label>Reason</label>
                        <input type="text"  className="form-control" onChange={this.onChangeReason}  placeholder="Enter a reason" />
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

export default sendLeaveRequest






/*
import React from 'react';

function sendLeaveRequest() {
  return (
    <div className='sendLeaveRequest'>
      <h1>sendLeaveRequest</h1>
    </div>
  );
}

export default sendLeaveRequest;
*/