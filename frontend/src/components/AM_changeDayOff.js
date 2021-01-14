import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';
//import Datepic from './DatePicker';  

export class changeDayOff extends Component {
    constructor(props) {
        super(props)

       // this.onChangeRequest_date = this.onChangeRequest_date.bind(this);
        this.onChangeNew_day_off = this.onChangeNew_day_off.bind(this);
        this.onChangeReason = this.onChangeReason.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            reason: '',
           // request_date: '',
            new_day_off: ''
        }
    }

    onChangeNew_day_off(e) {
      this.setState({
        new_day_off: e.target.value
      })
  }
 /* 
onChangeRequest_date(e) {
    this.setState({
        request_date: e.target.value
    })
}
*/
 onChangeReason(e) {
        this.setState({
            reason: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const request = {
      new_day_off:this.state.new_day_off,
      reason: this.state.reason,
      request_date: this.state.request_date
        }

        axios.put('http://localhost:3001/academicMember/changeDayOff',
         request,{headers:{authorisation:localStorage.getItem('jwtToken')}})
            .then(response => {
              console.log(response.data);
              console.log(response);
                if (response.data.message) {
                    this.setState({
                        message: response.data.message
                    })
                }
            }, error => {
                console.log(error);
            })

        this.setState({
      reason: '',
      new_day_off:'',
      request_date:''
        })
    }
    render() {
        return (
            <div className='form-loc'>
                <h3>Change Day Off</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        
                        
                        <label>New Day Off</label>
                        <input type="text" required className="form-control" onChange={this.onChangeNew_day_off} value={this.state.new_day_off} placeholder="Enter new Day off" />
                        <small className="form-text text-muted">Please add a new day off.</small>
                        <br />
                        <label>Reason</label>
                        <input type="text" required className="form-control" onChange={this.onChangeReason} value={this.state.reaseon} placeholder="Enter a reason " />
                        <small className="form-text text-muted">Please enter a reason why you are requesting this Leave.</small>
                        <br />
                      </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div>
                    <br />
                    <h4>{this.state.message}</h4>
                </div>
            </div>
        )
    }
}
export default changeDayOff






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



/*
import React from 'react';

function changeDayOff() {
  return (
    <div className='changeDayOff'>
      <h1>Change Day Off</h1>
    </div>
  );
}

export default changeDayOff;
*/
