import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';
import Datepic from './DatePicker';  

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

        this.state = {
          request_type:'',
          reason: '',
          req_slot:{},
          replacement_id: '',
          request_date:Date.now(),
          compensation_date:Date.now(),
          document: ''
        }
    }

  

    onChangeRequest_type(e) {
        this.setState({
            request_type: e.target.value
        })
    }

    onChangeReq_slot(e) {
      this.setState({
        req_slot: e.target.value
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

    onSubmit(e) {
        e.preventDefault();

        const request = {
      request_type:this.state.request_type,
      reason: this.state.reason,
      req_slot:this.state.req_slot,
      replacement_id: this.state.replacement_id,
      request_date: this.state.request_date,
      compensation_date:this.state.compensation_date,
      document: this.state.document
        }

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

        this.setState({
      request_type:'',
      reason: '',
      req_slot:{},
      replacement_id: '',
      request_date:Date.now(),
      compensation_date:Date.now(),
      document: ''
        })
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
                        <input type="text" className="form-control" onChange={this.onChangeReq_slot}  placeholder="Enter a request slot" />
                        <small className="form-text text-muted">Please enter the slot you will leave.</small>
                        <br />
                        <label>Replacement ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeReplacement_id}  placeholder="Enter replacement ID" />
                        <small className="form-text text-muted">e.g. ac-1</small>
                        <br />
                        <label>Request Date</label>
                        <small className="form-text text-muted">Please choose the date you want to leave.</small>
                        <Datepic></Datepic> 
                        <br />
                        <label>Compensation Date</label>
                        <small className="form-text text-muted">Please choose the date you will compensate in.</small>
                        <Datepic></Datepic> 
                        <br />
                        <label>Document</label>
                        <input type="text" required className="form-control" onChange={this.onChangeDocument}  placeholder="Enter document link" />
                        <small className="form-text text-muted">Please enter a link with the documents needed inside of it.</small>

                        <br />
                        <label>Reason</label>
                        <input type="text" required className="form-control" onChange={this.onChangeReason}  placeholder="Enter a reason" />
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