import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';
import Datepic from './DatePicker';  

export class slotLinkingRequest extends Component {
    constructor(props) {
        super(props)

        this.onChangeReq_slot = this.onChangeReq_slot.bind(this);
        this.onChangeCourseId = this.onChangeCourseId.bind(this);
        this.onChangeRequest_date = this.onChangeRequest_date.bind(this);
        this.onChangeDate_slot = this.onChangeDate_slot.bind(this);
        this.onChangeReason = this.onChangeReason.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            reason: '',
            req_slot:'',
            course_id:'',
            request_date: ''
                  }
    }

    onChangeReq_slot(e) {
      this.setState({
        req_slot: e.target.value
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

    onSubmit(e) {
        e.preventDefault();

        const request = {
      req_slot:this.state.req_slot,
      course_id: this.state.course_id,
      request_date: this.state.request_date,
      reason: this.state.reason,

                }

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

        this.setState({
          reason: '',
          req_slot:'',
          course_id:'',
          request_date: '',
          date_slot:''
        })
    }
    render() {
        return (
            <div className='form-loc'>
                <h3>Send a Slot Linking Request</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">

                        <label>Request Slot</label>
                        <input type="text" required className="form-control" onChange={this.onChangeReq_slot} value={this.state.req_slot} placeholder="Enter request slot " />
                        <small className="form-text text-muted">Please enter the slot you want to slot link to.</small>
                        <br />
                        <label>Course ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeCourseId} value={this.state.course_id} placeholder="Enter course id " />
                        <small className="form-text text-muted">e.g. CSEN701</small>
                        <br />
                        <label>Request Date</label>
                        <small className="form-text text-muted">Please choose the date you want to leave.</small>
                        <Datepic></Datepic> 
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