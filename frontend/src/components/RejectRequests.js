import React, { Component } from 'react';
import axios from 'axios';
import '../style/ViewStaff.css';

export class RejectRequests extends Component {
    constructor(props) {
        super(props)

        this.onChangeRequestID = this.onChangeRequestID.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            request_id: '',
            comment: '',
            message: ''
        }
    }

    onChangeRequestID(e) {
        this.setState({
            request_id: e.target.value
        })
    }

    onChangeComment(e) {
        this.setState({
            comment: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const request = {
            request_id: this.state.request_id,
            comment: this.state.comment
        }

        axios.post('http://localhost:3001/rejectRequest', request, {headers: {authorisation: localStorage.getItem('jwtToken')}})
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
            request_id: '',
            comment: ''
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
                        <small className="form-text text-muted">e.g. 5fe299f7eb2ac02b2f431bfb (You can view all request IDs by clicking on the Requests sidebar menu item)</small>
                        <br />
                        <label>Comment</label>
                        <input type="text" className="form-control" onChange={this.onChangeComment} value={this.state.comment} placeholder="Enter your comment" />
                        <small className="form-text text-muted">e.g. This request clashes with your proctoring schedule. (This is an optional field)</small>
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

export default RejectRequests
