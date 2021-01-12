import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';

export class RejectSlotLinkingRequest extends Component {
    constructor(props) {
        super(props)

        this.onChangeRequestID = this.onChangeRequestID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            request_id: '',
            message: ''
        }
    }

    onChangeRequestID(e) {
        this.setState({
            request_id: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const request = {
            request_id: this.state.request_id
        }

        axios.post('http://localhost:3001/coordinator/rejectSlotLinkingRequest', request, {headers: {authorisation: localStorage.getItem('jwtToken')}})
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
            request_id: ''
        })
    }
    
    render() {
        return (
            <div className='form-loc'>
                <h3>Reject Request</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Request ID</label>
                        <input type="text" required className="form-control" onChange={this.onChangeRequestID} value={this.state.request_id} placeholder="Enter request ID" />
                        <small className="form-text text-muted">e.g. 5fe4ed6a733f622ca8b63994 (You can view all request IDs by clicking on the Slot-Linking Requests sidebar menu item)</small>
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

export default RejectSlotLinkingRequest
